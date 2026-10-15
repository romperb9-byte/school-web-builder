import React, { useState, useEffect } from 'react';
import { 
  Github, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Terminal, 
  Key, 
  Globe, 
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  FolderGit2
} from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  schoolName: string;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({
  isOpen,
  onClose,
  htmlContent,
  schoolName,
}) => {
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem('gh_pat_token') || '';
  });
  const [repoName, setRepoName] = useState<string>(() => {
    const sanitized = schoolName
      ? schoolName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 30)
      : 'school-website';
    return sanitized || 'school-website';
  });
  const [isPrivate, setIsPrivate] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [publishedUrl, setPublishedUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'auto' | 'manual'>('auto');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [showTokenHelp, setShowTokenHelp] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('gh_pat_token', token);
    }
  }, [token]);

  if (!isOpen) return null;

  // Auto deploy using GitHub REST API
  const handleAutoDeploy = async () => {
    if (!token.trim()) {
      setStatus('error');
      setStatusMessage('សូមបញ្ចូល GitHub Personal Access Token (PAT) ជាមុនសិន!');
      return;
    }

    setStatus('loading');
    setStatusMessage('កំពុងភ្ជាប់ទៅកាន់ GitHub API...');

    try {
      // 1. Get authenticated user
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (!userRes.ok) {
        throw new Error('GitHub Token មិនត្រឹមត្រូវ ឬផុតកំណត់។ សូមពិនិត្យ Token ឡើងវិញ។');
      }

      const userData = await userRes.json();
      const username = userData.login;

      const cleanRepo = (repoName.trim() || 'school-website').replace(/[^a-zA-Z0-9._-]/g, '-');

      // 2. Check if repo already exists, or create new
      setStatusMessage(`កំពុងពិនិត្យ/បង្កើត Repository "${cleanRepo}"...`);
      let repoTarget = null;

      const checkRepoRes = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (checkRepoRes.ok) {
        repoTarget = await checkRepoRes.json();
      } else {
        const createRepoRes = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.trim()}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: cleanRepo,
            description: `Official School Website for ${schoolName} - Built with School Web Builder`,
            private: isPrivate,
            auto_init: true,
          }),
        });

        if (!createRepoRes.ok) {
          const errData = await createRepoRes.json();
          throw new Error(errData.message || 'មិនអាចបង្កើត GitHub Repository បានទេ។');
        }
        repoTarget = await createRepoRes.json();
        // Wait a brief moment for repo initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // 3. Get existing index.html SHA if it exists (for updates)
      setStatusMessage('កំពុង Push ឯកសារ index.html ទៅកាន់ GitHub...');
      let fileSha: string | undefined = undefined;

      const fileCheckRes = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}/contents/index.html`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (fileCheckRes.ok) {
        const fileData = await fileCheckRes.json();
        fileSha = fileData.sha;
      }

      // Convert HTML content to UTF-8 base64
      const utf8Bytes = new TextEncoder().encode(htmlContent);
      let binary = '';
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      // Create or update index.html
      const commitRes = await fetch(`https://api.github.com/repos/${username}/${cleanRepo}/contents/index.html`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update school website: ${schoolName} [skip ci]`,
          content: base64Content,
          sha: fileSha,
          branch: repoTarget.default_branch || 'main',
        }),
      });

      if (!commitRes.ok) {
        const commitErr = await commitRes.json();
        throw new Error(commitErr.message || 'ការបញ្ជូនកូដ index.html មិនបានជោគជ័យ។');
      }

      // 4. Enable GitHub Pages if not already enabled
      setStatusMessage('កំពុងបើកដំណើរការ GitHub Pages...');
      const defaultBranch = repoTarget.default_branch || 'main';

      await fetch(`https://api.github.com/repos/${username}/${cleanRepo}/pages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: {
            branch: defaultBranch,
            path: '/',
          },
        }),
      }).catch(() => {
        // Ignore if Pages is already enabled
      });

      const liveUrl = `https://${username}.github.io/${cleanRepo}/`;
      setPublishedUrl(liveUrl);
      setRepoUrl(repoTarget.html_url || `https://github.com/${username}/${cleanRepo}`);
      setStatus('success');
      setStatusMessage('🎉 អបអរសាទរ! បាន Deploy ទៅកាន់ GitHub Pages ជោគជ័យ ១០០%!');
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(err.message || 'មានបញ្ហាមិនអាច Deploy បានទេ។ សូមពិនិត្យមើល Token ឬការតភ្ជាប់អ៊ីនធឺណិត។');
    }
  };

  const manualCommands = `# 1. បង្កើតថត និងឯកសារ index.html លើម៉ាស៊ីនរបស់អ្នក
# 2. បើក Terminal/PowerShell រួចដំណើរការពាក្យបញ្ជាខាងក្រោម៖

git init -b main
git add index.html
git commit -m "Deploy official school website"
git remote add origin https://github.com/YOUR-USERNAME/${repoName || 'school-website'}.git
git branch -M main
git push -u origin main

# បន្ទាប់មកចូលទៅ GitHub Repository Settings -> Pages -> ជ្រើសរើស "main" branch ជាការស្រេច!`;

  const copyManualCmd = () => {
    navigator.clipboard.writeText(manualCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-between shrink-0 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-moul text-sm sm:text-base text-white tracking-wide">
                  Auto Deploy with GitHub
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  1-Click Live
                </span>
              </div>
              <p className="text-xs text-slate-300 font-kantumruy">
                ផ្សាយផ្ទាល់គេហទំព័រលើ GitHub Pages ឥតគិតថ្លៃ ១០០%
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers: Auto vs Manual */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('auto')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'auto'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto Deploy (ស្វ័យប្រវត្ត)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Git Commands (ដោយដៃ)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          
          {activeTab === 'auto' ? (
            <div className="space-y-4">
              
              {/* GitHub Token Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    <span>GitHub Personal Access Token (PAT)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTokenHelp(!showTokenHelp)}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>របៀបបង្កើត Token</span>
                  </button>
                </div>

                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                />
                
                <p className="text-[11px] text-slate-500 font-kantumruy">
                  * Token នឹងរក្សាទុកក្នុង Browser របស់អ្នកដោយស្វ័យប្រវត្ត (មិនបាច់វាយម្តងទៀតពេលកែប្រែប្រចាំថ្ងៃ)។
                </p>

                {/* Token Help Accordion */}
                {showTokenHelp && (
                  <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs space-y-2 text-amber-900 font-kantumruy mt-2 animate-in fade-in duration-150">
                    <div className="font-bold flex items-center gap-1.5">
                      <span>💡 របៀបយក GitHub Token (ចំណាយពេលត្រឹម ៣០ វិនាទី)៖</span>
                    </div>
                    <ol className="list-decimal pl-5 space-y-1 text-[11px]">
                      <li>ចូលទៅ <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">github.com/settings/tokens/new</a></li>
                      <li>ដាក់ឈ្មោះ Note (ឧ. <code>school-builder</code>)</li>
                      <li>កំណត់ Expiration (ឧ. 90 days ឬ No expiration)</li>
                      <li>ធិកជ្រើសរើស Scope <strong>repo</strong> (Full control of private repositories)</li>
                      <li>រំកិលចុះក្រោម ចុច <strong>Generate token</strong> រួច Copy យកមក Paste ក្នុងប្រអប់ខាងលើ!</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Repo Name & Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>ឈ្មោះ Repository</span>
                  </label>
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    placeholder="school-website"
                    className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-600" />
                    <span>ភាពឯកជន (Privacy)</span>
                  </label>
                  <div className="flex items-center gap-4 pt-1.5">
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input 
                        type="radio" 
                        name="privacy" 
                        checked={!isPrivate} 
                        onChange={() => setIsPrivate(false)}
                        className="text-blue-600"
                      />
                      <span>Public (ឥតគិតថ្លៃ)</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input 
                        type="radio" 
                        name="privacy" 
                        checked={isPrivate} 
                        onChange={() => setIsPrivate(true)}
                        className="text-blue-600"
                      />
                      <span>Private</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Status Message Box */}
              {statusMessage && (
                <div className={`p-4 rounded-2xl text-xs flex items-start gap-3 border ${
                  status === 'error'
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : status === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0 mt-0.5" />}
                  {status === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                  {status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  <div className="flex-1 space-y-2 font-kantumruy">
                    <div className="font-semibold">{statusMessage}</div>

                    {status === 'success' && (
                      <div className="pt-2 space-y-2 border-t border-emerald-200">
                        <div>
                          <div className="text-[11px] text-emerald-700 font-bold">គេហទំព័រផ្សាយផ្ទាល់របស់អ្នក (Live Website):</div>
                          <a
                            href={publishedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono font-bold text-blue-700 underline flex items-center gap-1 break-all mt-0.5"
                          >
                            <span>{publishedUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>

                        <div>
                          <div className="text-[11px] text-emerald-700">GitHub Repository:</div>
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-slate-700 hover:text-blue-700 underline flex items-center gap-1 break-all"
                          >
                            <span>{repoUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Deploy Action Button */}
              <button
                type="button"
                onClick={handleAutoDeploy}
                disabled={status === 'loading'}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>កំពុង Deploy ទៅកាន់ GitHub...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    <span>ចុច Deploy ស្វ័យប្រវត្ត (1-Click Deploy)</span>
                  </>
                )}
              </button>

            </div>
          ) : (
            /* MANUAL GIT COMMANDS TAB */
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-600 font-kantumruy">
                សម្រាប់អ្នកដែលចង់គ្រប់គ្រង និង Push តាមរយៈ <strong>Git CLI</strong> ឬ <strong>VS Code</strong> ដោយខ្លួនឯង៖
              </div>

              <div className="relative">
                <pre className="font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{manualCommands}</code>
                </pre>
                
                <button
                  type="button"
                  onClick={copyManualCmd}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'បានចម្លង!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            បិទផ្ទាំង
          </button>
        </div>

      </div>
    </div>
  );
};
