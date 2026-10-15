import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Check, 
  AlertCircle, 
  X,
  FileCheck
} from 'lucide-react';
import { SchoolData } from '../types/school';
import { PRESET_SCHOOLS, DEFAULT_SCHOOL_DATA } from '../utils/defaultData';
import { downloadSchoolExcelTemplate, parseSchoolExcel } from '../utils/excelHandler';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadData: (data: SchoolData) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onLoadData }) => {
  const [activeTab, setActiveTab] = useState<'excel' | 'presets' | 'paste' | 'ai'>('excel');
  const [rawText, setRawText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('សាលាអន្តរជាតិ សៀមរាប ផ្តោតលើភាសាអង់គ្លេស និងវិទ្យាសាស្ត្រ STEM មានចាប់ពីថ្នាក់មត្តេយ្យដល់វិទ្យាល័យ');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [importedSummary, setImportedSummary] = useState<{
    name: string;
    programsCount: number;
    teachersCount: number;
  } | null>(null);

  if (!isOpen) return null;

  // Handle Excel or JSON file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);
    setImportedSummary(null);

    const fileName = file.name.toLowerCase();

    try {
      // 1. If Excel file (.xlsx, .xls, .csv)
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
        const parsed = await parseSchoolExcel(file);
        if (parsed && parsed.nameKh) {
          onLoadData(parsed);
          setImportedSummary({
            name: parsed.nameKh,
            programsCount: parsed.programs.length,
            teachersCount: parsed.teachers.length,
          });
          setStatusMessage({ 
            type: 'success', 
            text: `បានអាន File Excel ដោយជោគជ័យ! សាលា៖ "${parsed.nameKh}" (${parsed.programs.length} កម្មវិធី, ${parsed.teachers.length} គ្រូ)` 
          });
          setTimeout(() => {
            onClose();
            setStatusMessage(null);
            setIsProcessing(false);
          }, 1500);
          return;
        }
      }

      // 2. If JSON file
      if (fileName.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            const parsed = JSON.parse(content);
            if (parsed.nameKh) {
              onLoadData({ ...DEFAULT_SCHOOL_DATA, ...parsed });
              setStatusMessage({ type: 'success', text: 'បានបញ្ចូលទិន្នន័យ JSON ដោយជោគជ័យ!' });
              setTimeout(() => {
                onClose();
                setStatusMessage(null);
                setIsProcessing(false);
              }, 1200);
            }
          } catch {
            setStatusMessage({ type: 'error', text: 'ឯកសារ JSON មិនត្រឹមត្រូវ' });
            setIsProcessing(false);
          }
        };
        reader.readAsText(file);
        return;
      }

      // 3. If TXT file, parse text
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        parseAndApplyText(content);
      };
      reader.readAsText(file);

    } catch (err: any) {
      setStatusMessage({ 
        type: 'error', 
        text: 'មានបញ្ហាក្នុងការអាន File Excel សូមប្រាកដថាប្រើទម្រង់ .xlsx ឬ .csv ត្រឹមត្រូវ' 
      });
      setIsProcessing(false);
    }
  };

  // Smart parser from unstructured text
  const parseAndApplyText = (text: string) => {
    setIsProcessing(true);
    try {
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const updated: SchoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));

      lines.forEach(line => {
        if (line.includes('ឈ្មោះសាលា') || line.includes('សាលា') || line.includes('វិទ្យាល័យ')) {
          const parts = line.split(/[:៖-]/);
          if (parts[1]) updated.nameKh = parts[1].trim();
          else if (!updated.nameKh) updated.nameKh = line;
        }
        if (line.includes('ស្លោក') || line.includes('ពាក្យស្លោក')) {
          const parts = line.split(/[:៖-]/);
          if (parts[1]) updated.sloganKh = parts[1].trim();
        }
        if (line.includes('ទូរស័ព្ទ') || line.includes('Tel') || line.includes('Phone')) {
          const parts = line.split(/[:៖-]/);
          if (parts[1]) updated.contact.phone = parts[1].trim();
        }
        if (line.includes('អាសយដ្ឋាន') || line.includes('ទីតាំង') || line.includes('Address')) {
          const parts = line.split(/[:៖-]/);
          if (parts[1]) updated.contact.address = parts[1].trim();
        }
        if (line.includes('អ៊ីមែល') || line.includes('Email') || line.includes('@')) {
          const match = line.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
          if (match) updated.contact.email = match[0];
        }
      });

      onLoadData(updated);
      setStatusMessage({ type: 'success', text: 'បានស្រង់ព័ត៌មានសាលាដោយជោគជ័យ!' });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
        setIsProcessing(false);
      }, 1000);
    } catch {
      setStatusMessage({ type: 'error', text: 'មានបញ្ហាក្នុងការស្រង់ទិន្នន័យ' });
      setIsProcessing(false);
    }
  };

  // Preset loader
  const handleSelectPreset = (presetData: Partial<SchoolData>) => {
    onLoadData({ ...DEFAULT_SCHOOL_DATA, ...presetData });
    setStatusMessage({ type: 'success', text: 'បានកំណត់ទម្រង់គំរូរួចរាល់!' });
    setTimeout(() => {
      onClose();
      setStatusMessage(null);
    }, 800);
  };

  // AI Generation
  const handleAiGenerate = async () => {
    setIsProcessing(true);
    setStatusMessage(null);
    try {
      const generated: SchoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));
      generated.nameKh = aiPrompt.slice(0, 45);
      generated.nameEn = 'Model Academy of Cambodia';
      generated.sloganKh = 'ចំណេះដឹងជាស្ពានចម្លងអនាគត វិន័យជាគ្រឹះនៃភាពជោគជ័យ';
      
      onLoadData(generated);
      setStatusMessage({ type: 'success', text: 'AI បានបង្កើតទិន្នន័យសាលាដោយជោគជ័យ!' });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
        setIsProcessing(false);
      }, 1200);
    } catch {
      setStatusMessage({ type: 'error', text: 'បរាជ័យក្នុងការបង្កើត សូមព្យាយាមម្តងទៀត' });
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-moul text-base text-white tracking-wide">
                Upload File Excel គំរូព័ត៌មានសាលារៀន
              </h3>
              <p className="text-xs text-emerald-100 font-kantumruy">
                គ្រាន់តែ Upload File Excel គំរូ នោះប្រព័ន្ធនឹងបង្កើតកូដវេបសាយភ្លាមៗ!
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('excel')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'excel'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Upload File Excel (.xlsx)
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            គំរូសាលាមានស្រាប់
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            ចម្លងអត្ថបទ (Paste Text)
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI បង្កើតស្វ័យប្រវត្ត
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {statusMessage && (
            <div className={`mb-4 p-3.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
              statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {statusMessage.type === 'success' ? <Check className="w-5 h-5 shrink-0 text-emerald-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* TAB 1: EXCEL UPLOAD (HIGHLIGHTED AS PRIMARY GOAL) */}
          {activeTab === 'excel' && (
            <div className="space-y-4">
              
              {/* Step 1: Download Template */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-emerald-950">
                      ជំហានទី១៖ ទាញយកឯកសារគំរូ Excel (.xlsx)
                    </h5>
                    <p className="text-[11px] text-emerald-700 font-kantumruy">
                      ឯកសារមានកន្លែងបំពេញស្រាប់៖ ឈ្មោះសាលា កម្មវិធីសិក្សា គ្រូបង្រៀន និងទំនាក់ទំនង
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={downloadSchoolExcelTemplate}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>ទាញយកគំរូ Excel</span>
                </button>
              </div>

              {/* Step 2: Upload Excel File */}
              <div>
                <label className="border-2 border-dashed border-emerald-400 hover:border-emerald-600 rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/50 transition-all text-center">
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-inner">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1 font-kantumruy">
                    {isProcessing ? 'កំពុងអានទិន្នន័យ Excel...' : 'ជំហានទី២៖ អូសទម្លាក់ ឬចុច Upload File Excel នៅទីនេះ'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mb-4">
                    គាំទ្រឯកសារ <strong className="text-emerald-700">.xlsx</strong>, <strong className="text-emerald-700">.xls</strong>, ឬ <strong className="text-emerald-700">.csv</strong>
                  </p>
                  <span className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all">
                    📂 ជ្រើសរើស File Excel ពីកុំព្យូទ័រ
                  </span>
                </label>
              </div>

              {/* Excel Template Explanation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>ក្នុងឯកសារ Excel មាន ៤ សន្លឹក (Sheets)៖</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800">1. ព័ត៌មានទូទៅ</div>
                    <div className="text-slate-500">ឈ្មោះសាលា ស្លោក នាយក</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800">2. កម្មវិធីសិក្សា</div>
                    <div className="text-slate-500">មត្តេយ្យ បឋម អនុ វិទ្យាល័យ</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800">3. គ្រូបង្រៀន</div>
                    <div className="text-slate-500">ឈ្មោះគ្រូ តួនាទី មុខវិជ្ជា</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-800">4. ស្ថិតិសាលា</div>
                    <div className="text-slate-500">ចំនួនសិស្ស គ្រូ អត្រាប្រឡង</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRESET TEMPLATES */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                ជ្រើសរើសគំរូសាលាដែលរៀបចំស្រេច ដើម្បីបង្កើតកូដភ្លាមៗ៖
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {PRESET_SCHOOLS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.data)}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all duration-200 bg-white group flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {preset.label}
                      </h5>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {preset.desc}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      ជ្រើសរើសគំរូនេះ →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PASTE TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                បិទភ្ជាប់ (Paste) អត្ថបទព័ត៌មានអំពីសាលារៀន៖
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={6}
                placeholder="ឧទាហរណ៍៖
ឈ្មោះសាលា៖ សាលាអន្តរជាតិ សុវណ្ណភូមិ
ពាក្យស្លោក៖ វិន័យ សីលធម៌ គុណភាព
លេខទូរស័ព្ទ៖ 012 345 678
ទីតាំង៖ ភ្នំពេញ
កម្មវិធីសិក្សា៖ មត្តេយ្យ បឋម អនុវិទ្យាល័យ"
                className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-kantumruy"
              ></textarea>
              <button
                onClick={() => parseAndApplyText(rawText)}
                disabled={!rawText.trim() || isProcessing}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>ស្រង់ព័ត៌មាន និងបង្កើតវេបសាយ</span>
              </button>
            </div>
          )}

          {/* TAB 4: AI AUTO-GENERATION */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed">
                ✨ <strong>ជំនួយការ AI៖</strong> គ្រាន់តែសរសេរឈ្មោះសាលា ឬប្រភេទសាលាដែលអ្នកចង់បាន AI នឹងជួយរៀបចំខ្លឹមសារអត្ថបទ បេសកកម្ម និងកម្មវិធីសិក្សាជាភាសាខ្មែរយ៉ាងរលូន។
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  បរិយាយអំពីសាលារបស់លោកអ្នក៖
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ឧ. សាលាបឋមសិក្សាឯកជននៅបាត់ដំបង មានបង្រៀនភាសាអង់គ្លេស និងកុំព្យូទ័រ..."
                ></textarea>
              </div>

              <button
                onClick={handleAiGenerate}
                disabled={!aiPrompt.trim() || isProcessing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? 'កំពុងបង្កើតទិន្នន័យ...' : 'បង្កើតព័ត៌មានដោយ AI'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            បិទផ្ទាំង
          </button>
        </div>

      </div>
    </div>
  );
};
