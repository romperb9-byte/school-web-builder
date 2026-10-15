/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Copy, 
  Palette, 
  Edit3, 
  Eye, 
  Code2, 
  Download, 
  Sparkles, 
  Check, 
  School, 
  FileSpreadsheet,
  ExternalLink,
  RotateCcw,
  Layers,
  FileCheck
} from 'lucide-react';

import { SchoolData } from './types/school';
import { DEFAULT_SCHOOL_DATA } from './utils/defaultData';
import { generateSchoolHtml, generateCanvaIframeSnippet } from './utils/htmlGenerator';
import { downloadSchoolExcelTemplate, parseSchoolExcel } from './utils/excelHandler';
import { UploadModal } from './components/UploadModal';
import { StyleSelector } from './components/StyleSelector';
import { AdminEditor } from './components/AdminEditor';
import { LivePreview } from './components/LivePreview';
import { CodeOutputSection } from './components/CodeOutputSection';
import { PublishGuideModal } from './components/PublishGuideModal';

export default function App() {
  const [schoolData, setSchoolData] = useState<SchoolData>(() => {
    const saved = localStorage.getItem('school_web_builder_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SCHOOL_DATA;
      }
    }
    return DEFAULT_SCHOOL_DATA;
  });

  // Current view inside the main output container
  const [activeView, setActiveView] = useState<'preview' | 'code' | 'editor' | 'style'>('preview');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [inputInfoText, setInputInfoText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persist edits to local storage
  useEffect(() => {
    localStorage.setItem('school_web_builder_data', JSON.stringify(schoolData));
  }, [schoolData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Quick Copy Handler for Canva / Hosting
  const handleQuickCopy = () => {
    const fullHtml = generateSchoolHtml(schoolData);
    navigator.clipboard.writeText(fullHtml);
    setCopiedNotification(true);
    showToast('✓ បានចម្លងកូដវេបសាយ (HTML) រួចរាល់! អាចយកទៅ Paste ក្នុង Canva Embed បានភ្លាមៗ');
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  // Direct Download HTML
  const handleDownloadHtml = () => {
    const fullHtml = generateSchoolHtml(schoolData);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `school-website-${schoolData.nameKh.replace(/\s+/g, '-').slice(0, 20)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('✓ បានទាញយកឯកសារ HTML រួចរាល់');
  };

  // Direct Excel upload handler
  const handleDirectExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await parseSchoolExcel(file);
      if (parsed && parsed.nameKh) {
        setSchoolData(parsed);
        setInputInfoText(`File Excel: ${file.name} (${parsed.nameKh})`);
        showToast(`🎉 បាន Upload File Excel ជោគជ័យ! បង្កើតកូដវេបសាយ "${parsed.nameKh}" រួចរាល់`);
        setActiveView('preview');
      }
    } catch {
      alert('មានបញ្ហាក្នុងការអាន File Excel សូមប្រាកដថាប្រើទម្រង់គំរូ .xlsx ត្រឹមត្រូវ');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Action: generatewebsite button from wireframe
  const handleGenerateWebsite = () => {
    setIsGenerating(true);
    
    // If user typed something in inputInfoText, update school name
    if (inputInfoText.trim() && !inputInfoText.startsWith('File Excel:')) {
      setSchoolData(prev => ({
        ...prev,
        nameKh: inputInfoText.trim(),
        hero: {
          ...prev.hero,
          title: `ស្វាគមន៍មកកាន់ ${inputInfoText.trim()}`,
        }
      }));
    }

    setTimeout(() => {
      setIsGenerating(false);
      setActiveView('preview');
      showToast('✨ បាន Generate Website និងធ្វើបច្ចុប្បន្នភាពកូដដោយជោគជ័យ!');
    }, 400);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('តើអ្នកពិតជាចង់កំណត់ទិន្នន័យឡើងវិញមែនទេ?')) {
      setSchoolData(DEFAULT_SCHOOL_DATA);
      setInputInfoText('');
      showToast('បានកំណត់ទិន្នន័យដើមឡើងវិញ');
    }
  };

  return (
    <div className="min-h-screen bg-[#e8ecf4] text-slate-800 flex flex-col font-kantumruy py-6 px-3 sm:px-6">
      
      {/* Hidden file input for one-click Excel upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDirectExcelUpload}
        accept=".xlsx,.xls,.csv"
        className="hidden"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-700">
          <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">{toastMessage}</div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MAIN CONTAINER MATCHING USER'S EXACT WIREFRAME           */}
      {/* ======================================================== */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* 1. TITLE AT TOP: ប្រព័ន្ធបង្កើតវេបសាយ (IN BOLD RED) */}
        <h1 className="font-moul text-2xl sm:text-3xl text-red-600 tracking-wide text-center mb-6 drop-shadow-2xs">
          ប្រព័ន្ធបង្កើតវេបសាយ
        </h1>

        {/* Quick Helper Bar: Excel Template Link, Publish Guide, & Reset */}
        <div className="w-full max-w-2xl flex flex-wrap items-center justify-between text-xs text-slate-600 px-2 mb-2 gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadSchoolExcelTemplate}
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold hover:underline transition-all bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
              title="ទាញយកគំរូ Excel (.xlsx) ដើម្បីបំពេញព័ត៌មាន"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ទាញយក file excel គំរូ (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPublishGuideOpen(true)}
              className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 font-bold hover:underline transition-all bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs"
              title="ការណែនាំ Publish និងរបៀបកែប្រែប្រចាំថ្ងៃ"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>🚀 របៀប Publish & កែប្រែជាប្រចាំ</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
            title="កំណត់ទិន្នន័យដើមឡើងវិញ"
          >
            <RotateCcw className="w-3 h-3" />
            <span>កំណត់ឡើងវិញ</span>
          </button>
        </div>

        {/* 2. TOP INPUT ROW: [ WHITE INPUT BOX ] [ upload/past infor ] */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 mb-5">
          {/* White rounded input */}
          <div className="w-full sm:flex-1 relative">
            <input
              type="text"
              value={inputInfoText}
              onChange={(e) => setInputInfoText(e.target.value)}
              placeholder="upload file excel គំរូ ឬវាយឈ្មោះសាលារៀន..."
              className="w-full px-4 py-3 bg-white text-slate-800 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs text-xs sm:text-sm font-medium transition-all"
            />
          </div>

          {/* Blue button: upload/past infor */}
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>upload/past infor</span>
          </button>
        </div>

        {/* 3. CENTER PILL BUTTON: generatewebsite (BLUE PILL WITH BOLD RED TEXT) */}
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={handleGenerateWebsite}
            disabled={isGenerating}
            className="px-8 py-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-red-500 hover:text-red-400 font-black text-sm sm:text-base rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 tracking-wider flex items-center gap-2 border-2 border-blue-400/40"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>{isGenerating ? 'generating...' : 'generatewebsite'}</span>
          </button>
        </div>

        {/* 4. ACTION BAR ABOVE CONTAINER: */}
        {/* [ preview website ] (magenta)              [ ទាញយកhtml/copy ] (blue) */}
        <div className="w-full max-w-3xl flex items-center justify-between px-2 sm:px-4 mb-2">
          
          {/* Left: preview website (magenta/fuchsia) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`font-bold text-xs sm:text-sm transition-all pb-0.5 border-b-2 flex items-center gap-1.5 ${
                activeView === 'preview'
                  ? 'text-[#c026d3] border-[#c026d3]'
                  : 'text-[#d946ef] hover:text-[#c026d3] border-transparent'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>preview website</span>
            </button>

            {/* Additional helper tabs for Style & Manual Edit */}
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => setActiveView('style')}
              className={`text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeView === 'style' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>ជម្រើស Style</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('editor')}
              className={`text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeView === 'editor' ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>កែប្រែដោយដៃ</span>
            </button>
          </div>

          {/* Right: ទាញយកhtml/copy (blue) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (activeView === 'code') {
                  handleQuickCopy();
                } else {
                  setActiveView('code');
                  handleQuickCopy();
                }
              }}
              className="text-[#1d4ed8] hover:text-[#1e40af] font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
              title="ទាញយក HTML ឬ ចម្លងកូដ"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>ទាញយកhtml/copy</span>
            </button>
          </div>

        </div>

        {/* 5. MAIN BIG CONTAINER (WHITE / ROUNDED BOX AS IN WIREFRAME) */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden min-h-[580px] flex flex-col mb-6">
          
          {/* VIEW A: LIVE PREVIEW OF THE WEBSITE */}
          {activeView === 'preview' && (
            <div className="flex-1 flex flex-col">
              <LivePreview data={schoolData} />
            </div>
          )}

          {/* VIEW B: CODE OUTPUT, CANVA COPY, AND DOWNLOAD HTML */}
          {activeView === 'code' && (
            <div className="flex-1 p-4 sm:p-6 space-y-4">
              
              {/* Quick Action Buttons Header */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">
                    កូដវេបសាយសាលារៀន (Ready for Canva & Web)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ចុចចម្លងកូដដើម្បីដាក់ក្នុង Canva ឬ ទាញយកឯកសារ HTML
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleQuickCopy}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                      copiedNotification
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1d4ed8] hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copiedNotification ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedNotification ? 'បានចម្លងរួចរាល់!' : 'Copy Code'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadHtml}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>ទាញយក .html</span>
                  </button>
                </div>
              </div>

              {/* Code output section with Canva embed guide */}
              <CodeOutputSection data={schoolData} />
            </div>
          )}

          {/* VIEW C: ADMIN EDITOR (MANUAL TEXT & IMAGE ADJUSTMENTS) */}
          {activeView === 'editor' && (
            <div className="flex-1 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-kantumruy">
                    កែសម្រួលអត្ថបទ និងដាក់រូបភាពដោយដៃ
                  </h4>
                  <p className="text-xs text-slate-500">
                    ប្តូរឈ្មោះសាលា រូបថត Logo Banner និងកម្មវិធីសិក្សា
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('preview')}
                  className="px-3 py-1.5 rounded-xl bg-[#1d4ed8] text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>មើលលទ្ធផល</span>
                </button>
              </div>

              <AdminEditor data={schoolData} onChange={setSchoolData} />
            </div>
          )}

          {/* VIEW D: STYLE SELECTOR (THEMES & FONTS) */}
          {activeView === 'style' && (
            <div className="flex-1 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-kantumruy">
                    ជ្រើសរើស Style នៃវេបសាយ (Themes & Fonts)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ស្ទីលបែបផ្លូវការ, ទំនើប STEM, មត្តេយ្យកុមារ, ឬ អន្តរជាតិ
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('preview')}
                  className="px-3 py-1.5 rounded-xl bg-[#1d4ed8] text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>មើលលទ្ធផល</span>
                </button>
              </div>

              <StyleSelector data={schoolData} onChange={setSchoolData} />
            </div>
          )}

        </div>

        {/* 6. BOTTOM LABEL: លទ្ធផល (IN BOLD RED, CENTERED) */}
        <div className="text-center">
          <h3 className="font-moul text-xl sm:text-2xl text-red-600 tracking-wide drop-shadow-2xs">
            លទ្ធផល
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            កូដវេបសាយសាលារៀនត្រូវបានបង្កើតដោយស្វ័យប្រវត្ត អាចចម្លងដាក់ក្នុង Canva បានភ្លាមៗ
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* UPLOAD / PASTE MODAL                                     */}
      {/* ======================================================== */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onLoadData={(newData) => {
          setSchoolData(newData);
          setInputInfoText(newData.nameKh);
          setActiveView('preview');
        }}
      />

      {/* ======================================================== */}
      {/* PUBLISH & DAILY UPDATE GUIDE MODAL                       */}
      {/* ======================================================== */}
      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
        onOpenEditor={() => setActiveView('editor')}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

    </div>
  );
}
