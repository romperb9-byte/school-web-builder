import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Link, Check, Sparkles } from 'lucide-react';
import { CURATED_PHOTOS } from '../utils/defaultData';

interface ImagePickerProps {
  label: string;
  currentUrl: string;
  onChange: (url: string) => void;
  category?: 'campuses' | 'classrooms' | 'labs' | 'activities' | 'principals' | 'logos';
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  currentUrl,
  onChange,
  category = 'campuses',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const [customUrl, setCustomUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onChange(base64);
        setIsOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl('');
      setIsOpen(false);
    }
  };

  const curatedList = CURATED_PHOTOS[category] || CURATED_PHOTOS.campuses;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">
        {label}
      </label>

      <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative group">
          <img
            src={currentUrl || 'https://via.placeholder.com/150'}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-slate-500 truncate mb-1.5">
            {currentUrl?.startsWith('data:image') ? '📷 រូបភាពផ្ទាល់ខ្លួន (Uploaded Image)' : currentUrl}
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-2.5 py-1 text-xs rounded-lg font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>ផ្លាស់ប្តូររូបភាព</span>
          </button>
        </div>
      </div>

      {/* Dropdown / Popover Picker */}
      {isOpen && (
        <div className="p-3 bg-white rounded-xl border border-slate-300 shadow-xl space-y-3 mt-2 animate-in fade-in duration-150">
          <div className="flex border-b border-slate-200 pb-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`pb-1 font-semibold border-b-2 ${
                activeTab === 'upload' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500'
              }`}
            >
              Upload ពីម៉ាស៊ីន
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preset')}
              className={`pb-1 font-semibold border-b-2 ${
                activeTab === 'preset' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500'
              }`}
            >
              រូបភាពគំរូស្អាតៗ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`pb-1 font-semibold border-b-2 ${
                activeTab === 'url' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500'
              }`}
            >
              ដាក់តំណភ្ជាប់ (URL)
            </button>
          </div>

          {activeTab === 'upload' && (
            <div>
              <label className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-red-50/20 transition-all text-center">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <Upload className="w-6 h-6 text-red-600 mb-1" />
                <span className="text-xs font-semibold text-slate-700">ជ្រើសរើសរូបភាពពីទូរស័ព្ទ / កុំព្យូទ័រ</span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WebP (អតិបរមា 5MB)</span>
              </label>
            </div>
          )}

          {activeTab === 'preset' && (
            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1">
              {curatedList.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    onChange(url);
                    setIsOpen(false);
                  }}
                  className={`relative rounded-lg overflow-hidden border-2 aspect-video group hover:opacity-90 ${
                    currentUrl === url ? 'border-red-600' : 'border-transparent'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                  {currentUrl === url && (
                    <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700"
              >
                យល់ព្រម
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
