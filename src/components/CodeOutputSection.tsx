import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Code, 
  Layers, 
  BookOpen, 
  Sparkles,
  Info
} from 'lucide-react';
import { SchoolData } from '../types/school';
import { generateSchoolHtml, generateCanvaIframeSnippet } from '../utils/htmlGenerator';

interface CodeOutputSectionProps {
  data: SchoolData;
}

export const CodeOutputSection: React.FC<CodeOutputSectionProps> = ({ data }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'canva' | 'guide'>('html');
  const [copied, setCopied] = useState(false);

  const fullHtml = generateSchoolHtml(data);
  const canvaSnippet = generateCanvaIframeSnippet(fullHtml);

  const currentDisplayCode = activeCodeTab === 'canva' ? canvaSnippet : fullHtml;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDisplayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `school-website-${data.nameKh.replace(/\s+/g, '-').slice(0, 20)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenPreviewWindow = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(fullHtml);
      newWindow.document.close();
    }
  };

  const linesCount = currentDisplayCode.split('\n').length;
  const fileSizeKb = (new Blob([currentDisplayCode]).size / 1024).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Top Bar - Matches user's sketch "លទ្ធផល" and "copy" button */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600/30 rounded-xl text-red-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-moul text-sm sm:text-base text-red-400 tracking-wide">
                លទ្ធផល (Result)
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {fileSizeKb} KB • {linesCount} បន្ទាត់
              </span>
            </div>
            <p className="text-xs text-slate-400 font-kantumruy">
              កូដវេបសាយសាលារៀនរួចរាល់សម្រាប់យកទៅប្រើប្រាស់ក្នុង Canva ឬ Hosting
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* THE PROMINENT COPY BUTTON REQUESTED IN THE SKETCH */}
          <button
            onClick={handleCopy}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md transform active:scale-95 ${
              copied
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>បានចម្លងរួចរាល់! (Copied)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>copy (ចម្លងកូដ)</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            title="ទាញយកជាឯកសារ .html"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenPreviewWindow}
            title="បើកមើលក្នុងផ្ទាំងថ្មី (New Tab)"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-slate-100 px-6 pt-2 gap-2 text-xs">
        <button
          onClick={() => setActiveCodeTab('html')}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeCodeTab === 'html'
              ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>កូដ HTML ពេញលេញ (Full Code)</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('canva')}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeCodeTab === 'canva'
              ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>កូដសម្រាប់ Canva Embed</span>
        </button>

        <button
          onClick={() => setActiveCodeTab('guide')}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeCodeTab === 'guide'
              ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>របៀបដាក់ក្នុង Canva (Deploy Guide)</span>
        </button>
      </div>

      {/* Code Display Area / Guide */}
      <div className="p-4 sm:p-6 bg-slate-900 text-slate-100">
        
        {activeCodeTab === 'guide' ? (
          <div className="space-y-6 text-slate-200 py-2">
            
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>របៀបយកកូដទៅប្រើប្រាស់ក្នុង Canva Website (Canva Deploy)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-kantumruy">
                Canva មានមុខងារបង្កើតគេហទំព័រ (Canva Websites) និងអនុញ្ញាតឱ្យលោកអ្នកបញ្ចូល HTML/Iframe តាមរយៈមុខងារ Embeds បានយ៉ាងងាយស្រួល៖
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              
              {/* Step 1 */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  ១
                </div>
                <h5 className="font-bold text-xs text-white">ចម្លងកូដ (Copy Code)</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-kantumruy">
                  ចុចលើប៊ូតុង <strong>copy</strong> ពណ៌ខៀវខាងលើ ដើម្បីចម្លងកូដ HTML ពេញលេញ ឬ កូដ Canva Embed។
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                  ២
                </div>
                <h5 className="font-bold text-xs text-white">ចូលទៅកាន់ Canva</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-kantumruy">
                  បើកផ្ទាំង Canva Design របស់អ្នក ចុចម៉ឺនុយ <strong>Apps</strong> នៅខាងឆ្វេង 👉 ស្វែងរកពាក្យ <strong>Embed</strong> ឬ <strong>HTML</strong>។
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  ៣
                </div>
                <h5 className="font-bold text-xs text-white">បិទភ្ជាប់ និង Deploy</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-kantumruy">
                  បិទភ្ជាប់ (Paste) កូដចូលក្នុងប្រអប់ Embed រួចចុច <strong>Add to design</strong>។ អ្នកក៏អាចចុច <strong>Publish Website</strong> លើ Canva បានភ្លាមៗ!
                </p>
              </div>

            </div>

            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong>ជម្រើសបន្ថែមឥតគិតថ្លៃ (Free Hosting 10 វិនាទី):</strong><br />
                អ្នកក៏អាចទាញយកឯកសារ <code className="text-amber-300 font-mono">index.html</code> ដោយចុចប៊ូតុង Download រួចអូសទម្លាក់ចូល <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-bold">Netlify Drop</a> ឬ <a href="https://tiiny.host" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-bold">Tiiny Host</a> ដើម្បីទទួលបាន Link គេហទំព័រផ្សាយផ្ទាល់លើអ៊ីនធឺណិតដោយឥតគិតថ្លៃ ១០០%។
              </div>
            </div>

          </div>
        ) : (
          <div className="relative">
            <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto max-h-[460px] p-4 rounded-xl bg-slate-950/80 border border-slate-800 select-all scrollbar-thin">
              <code>{currentDisplayCode}</code>
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
