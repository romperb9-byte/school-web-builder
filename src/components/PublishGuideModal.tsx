import React, { useState } from 'react';
import { 
  Globe, 
  RefreshCw, 
  FileSpreadsheet, 
  Edit3, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Layers, 
  CloudUpload,
  ArrowRight
} from 'lucide-react';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEditor: () => void;
  onOpenUpload: () => void;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenEditor,
  onOpenUpload,
}) => {
  const [activeTab, setActiveTab] = useState<'publish' | 'daily_update'>('daily_update');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl shadow-inner">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-moul text-base text-white tracking-wide">
                ការណែនាំ Publish & កែប្រែព័ត៌មានជាប្រចាំ
              </h3>
              <p className="text-xs text-blue-100 font-kantumruy">
                របៀបដាក់ឱ្យដំណើរការលើអ៊ីនធឺណិត និងរបៀប Update អត្ថបទ/រូបភាពប្រចាំថ្ងៃ
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('daily_update')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'daily_update'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>១. របៀបកែប្រែជាប្រចាំ (Daily Updates)</span>
          </button>

          <button
            onClick={() => setActiveTab('publish')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'publish'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CloudUpload className="w-4 h-4" />
            <span>២. របៀប Publish លើអ៊ីនធឺណិត (Live Web)</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: DAILY / REGULAR CONTENT UPDATE */}
          {activeTab === 'daily_update' && (
            <div className="space-y-5">
              
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ប្រព័ន្ធរក្សាទុកស្វ័យប្រវត្ត (Auto-Save រួចជាស្រេច!)</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed font-kantumruy">
                  រាល់ការកែប្រែអត្ថបទ ចំណងជើង និងរូបភាពរបស់អ្នក ត្រូវបានរក្សាទុកក្នុង Browser ដោយស្វ័យប្រវត្ត។ ពេលអ្នកបើកកម្មវិធីនេះមកវិញ ព័ត៌មានទាំងអស់នៅដដែល!
                </p>
              </div>

              {/* Way 1: Direct In-App Editing */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      ១
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">
                      វិធីទី ១៖ កែប្រែដោយផ្ទាល់ក្នុងកម្មវិធី (ងាយស្រួលបំផុត ត្រឹម ៣០ វិនាទី)
                    </h4>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                    ណែនាំ
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-kantumruy pl-8">
                  <p><strong>ជំហានទី១៖</strong> ចុចលើផ្ទាំង <strong>«កែប្រែដោយដៃ»</strong> (Admin Editor)។</p>
                  <p><strong>ជំហានទី២៖</strong> ជ្រើសរើសផ្នែកដែលចង់កែ (ព័ត៌មានទូទៅ, កម្មវិធីសិក្សា, រូបភាព, គ្រូបង្រៀន, ឬទំនាក់ទំនង) រួចកែអត្ថបទ ឬចុចប្តូររូបភាព។</p>
                  <p><strong>ជំហានទី៣៖</strong> ចុចប៊ូតុង <strong>generatewebsite</strong> ពណ៌ខៀវ ដើម្បី Update កូដថ្មី។</p>
                  <p><strong>ជំហានទី៤៖</strong> ចុច <strong>ទាញយកhtml/copy</strong> រួចយកកូដថ្មីទៅ Paste ក្នុង Canva ឬ Netlify ជំនួសកូដចាស់ជាការស្រេច!</p>
                </div>

                <div className="pt-2 pl-8">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenEditor();
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>បើកផ្ទាំង «កែប្រែដោយដៃ» ឥឡូវនេះ</span>
                  </button>
                </div>
              </div>

              {/* Way 2: Excel Editing */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    ២
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">
                    វិធីទី ២៖ កែប្រែតាមរយៈ File Excel គំរូ
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-kantumruy pl-8">
                  <p><strong>ជំហានទី១៖</strong> បើកឯកសារ Excel របស់សាលាអ្នក រួចកែប្រែទិន្នន័យ (ដូចជា បន្ថែមដំណឹងថ្មី, ប្តូរលេខទូរស័ព្ទ, ឬថ្នាក់រៀន) ហើយ Save ឯកសារ។</p>
                  <p><strong>ជំហានទី២៖</strong> ចុចប៊ូតុង <strong>upload/past infor</strong> រួចជ្រើសរើស File Excel នោះចូល។</p>
                  <p><strong>ជំហានទី៣៖</strong> ចុចប៊ូតុង <strong>generatewebsite</strong> នោះកូដវេបសាយនឹង Update តាម Excel ថ្មីភ្លាមៗ!</p>
                </div>

                <div className="pt-2 pl-8">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenUpload();
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Upload File Excel ថ្មី</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: HOW TO PUBLISH LIVE */}
          {activeTab === 'publish' && (
            <div className="space-y-5">
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-bold text-xs sm:text-sm text-blue-900 mb-1">
                  🚀 ជម្រើស Publish គេហទំព័រឱ្យដំណើរការលើអ៊ីនធឺណិត (Live Domain):
                </h4>
                <p className="text-xs text-blue-700 font-kantumruy">
                  ជ្រើសរើសជម្រើសមួយក្នុងចំណោមវិធីងាយៗខាងក្រោម៖
                </p>
              </div>

              {/* Option A: Canva Website Embed */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">A</div>
                  <h5 className="font-bold text-sm text-slate-900">ដាក់ក្នុង Canva (Canva Website)</h5>
                </div>
                <div className="text-xs text-slate-600 pl-8 space-y-1.5 font-kantumruy">
                  <p>1. ចុចប៊ូតុង <strong>ទាញយកhtml/copy</strong> រួចជ្រើសរើសចម្លង «កូដសម្រាប់ Canva Embed»។</p>
                  <p>2. បើក Canva Design របស់អ្នក 👉 ចុចម៉ឺនុយ <strong>Apps</strong> 👉 ស្វែងរក <strong>Embed</strong> 👉 Paste កូដចូល។</p>
                  <p>3. ចុចប៊ូតុង <strong>Publish Website</strong> លើ Canva នោះអ្នកនឹងទទួលបាន Link គេហទំព័រផ្សាយផ្ទាល់!</p>
                </div>
              </div>

              {/* Option B: Netlify Drop */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">B</div>
                    <h5 className="font-bold text-sm text-slate-900">Netlify Drop (ឥតគិតថ្លៃ ១០០% • ត្រឹម ១០ វិនាទី)</h5>
                  </div>
                  <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full">
                    លឿនបំផុត
                  </span>
                </div>
                <div className="text-xs text-slate-600 pl-8 space-y-1.5 font-kantumruy">
                  <p>1. ចុច <strong>ទាញយកhtml/copy</strong> 👉 ចុចទាញយកឯកសារ <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-blue-600">.html</code> មកកុំព្យូទ័រ។</p>
                  <p>2. ចូលទៅកាន់ <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">app.netlify.com/drop</a>។</p>
                  <p>3. អូសទម្លាក់ឯកសារចូល រួចអ្នកនឹងទទួលបាន Website Link ផ្សាយផ្ទាល់ភ្លាមៗ (ឧ. <code>https://school-name.netlify.app</code>)។</p>
                  <p>4. <strong>ពេលចង់ Update៖</strong> គ្រាន់តែអូសទម្លាក់ឯកសារ HTML ថ្មីចូល Dashboard របស់ Netlify ជាការស្រេច!</p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            យល់ព្រម & បិទផ្ទាំង
          </button>
        </div>

      </div>
    </div>
  );
};
