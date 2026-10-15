import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  ExternalLink,
  Eye,
  Sparkles
} from 'lucide-react';
import { SchoolData } from '../types/school';
import { generateSchoolHtml } from '../utils/htmlGenerator';

interface LivePreviewProps {
  data: SchoolData;
  onUpdateSchoolData?: (updated: SchoolData) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ data, onUpdateSchoolData }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const fullHtml = generateSchoolHtml(data);

  // Listen to postMessage from iframe when in-place admin edits are saved or redeployed
  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.data) return;

      if (event.data.type === 'SCHOOL_WEB_SAVED') {
        console.log('Received updated edits from in-place editor', event.data);
      }

      if (event.data.type === 'REQUEST_REDEPLOY_FROM_PARENT') {
        // Iframe is delegating redeployment to parent to bypass any iframe origin/sandbox issues!
        const token = localStorage.getItem('gh_pat_token');
        const repo = localStorage.getItem('gh_repo_name') || 'school-website';
        const owner = localStorage.getItem('gh_repo_owner') || 'romperb9-byte';
        const branch = localStorage.getItem('gh_repo_branch') || 'main';

        const iframe = document.querySelector('iframe');

        if (!token) {
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'REDEPLOY_RESULT',
              success: false,
              message: 'សូមបញ្ចូល GitHub Token ក្នុងផ្ទាំង Auto Deploy with GitHub ជាមុនសិន!'
            }, '*');
          }
          return;
        }

        try {
          const htmlToDeploy = event.data.html;
          const utf8Bytes = new TextEncoder().encode(htmlToDeploy);
          let binary = '';
          for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
          }
          const base64Content = btoa(binary);

          // Get file sha
          let fileSha = undefined;
          try {
            const fileCheck = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/index.html`, {
              headers: {
                Authorization: `Bearer ${token.trim()}`,
                Accept: 'application/vnd.github+json',
              },
            });
            if (fileCheck.ok) {
              const fileData = await fileCheck.json();
              fileSha = fileData.sha;
            }
          } catch {}

          // Commit to GitHub
          const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/index.html`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token.trim()}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Update school website [redeploy]`,
              content: base64Content,
              sha: fileSha,
              branch: branch,
            }),
          });

          if (!commitRes.ok) {
            const err = await commitRes.json();
            throw new Error(err.message || 'GitHub commit failed');
          }

          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'REDEPLOY_RESULT',
              success: true,
              message: '🎉 Redeploy ជោគជ័យ! គេហទំព័រលើ GitHub Pages ទទួលបានទិន្នន័យថ្មីទាំងស្រុង'
            }, '*');
          }
        } catch (err: any) {
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
              type: 'REDEPLOY_RESULT',
              success: false,
              message: '❌ Redeploy បរាជ័យ: ' + (err.message || 'Error')
            }, '*');
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  const handleOpenNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(fullHtml);
      newWindow.document.close();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
      
      {/* Device & Preview Controls Header */}
      <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-xs sm:text-sm text-slate-800">
            ផ្ទាំងមើលផ្ទាល់ (Interactive Live Preview)
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-medium">
            ផ្សាយផ្ទាល់ (Live)
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === 'desktop' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">កុំព្យូទ័រ</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === 'tablet' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">ថេប្លេត</span>
          </button>

          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              device === 'mobile' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">ទូរស័ព្ទ</span>
          </button>
        </div>

        {/* Open Full View */}
        <button
          onClick={handleOpenNewTab}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          <span>បើកពេញអេក្រង់</span>
        </button>
      </div>

      {/* Frame Container */}
      <div className="bg-slate-200/70 p-4 sm:p-6 flex justify-center items-center overflow-auto min-h-[600px]">
        <div className={`transition-all duration-300 w-full ${getContainerWidth()} shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-300/80`}>
          
          {/* Mock Browser Frame Header */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="bg-white px-3 py-0.5 rounded-md text-[11px] text-slate-600 font-mono border border-slate-200 truncate max-w-xs">
              https://school.{data.nameEn?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'cambodia'}.edu.kh
            </div>
            <div className="text-[10px] text-slate-400">
              {device === 'desktop' ? '1280px' : device === 'tablet' ? '768px' : '390px'}
            </div>
          </div>

          {/* Render Iframe */}
          <iframe
            srcDoc={fullHtml}
            title="School Website Preview"
            className="w-full h-[680px] border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />

        </div>
      </div>

    </div>
  );
};
