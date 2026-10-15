import React from 'react';
import { Palette, Type, Layout, Check, Sparkles, Layers } from 'lucide-react';
import { SchoolData, ThemeId } from '../types/school';
import { THEME_PRESETS } from '../utils/defaultData';

interface StyleSelectorProps {
  data: SchoolData;
  onChange: (updated: SchoolData) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ data, onChange }) => {
  const currentConfig = data.styleConfig;

  const handleSelectTheme = (themeId: ThemeId) => {
    const preset = THEME_PRESETS[themeId];
    onChange({
      ...data,
      styleConfig: {
        ...currentConfig,
        themeId,
        primaryColor: preset.primaryColor,
        accentColor: preset.accentColor,
        fontTitle: preset.fontTitle,
        fontBody: preset.fontBody,
        borderRadius: preset.borderRadius,
      },
    });
  };

  const updateConfig = (key: keyof typeof currentConfig, value: any) => {
    onChange({
      ...data,
      styleConfig: {
        ...currentConfig,
        [key]: value,
      },
    });
  };

  const quickColors = [
    { primary: '#0f2b5c', accent: '#d97706', name: 'Navy & Gold' },
    { primary: '#0284c7', accent: '#06b6d4', name: 'Sky & Cyan' },
    { primary: '#047857', accent: '#84cc16', name: 'Emerald & Lime' },
    { primary: '#881337', accent: '#f59e0b', name: 'Crimson & Amber' },
    { primary: '#ea580c', accent: '#10b981', name: 'Orange & Mint' },
    { primary: '#4f46e5', accent: '#ec4899', name: 'Indigo & Pink' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Theme Presets */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h4 className="font-bold text-sm text-slate-800">
            រចនាប័ទ្មសំខាន់ៗ (Themes):
          </h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.entries(THEME_PRESETS) as [ThemeId, typeof THEME_PRESETS[ThemeId]][]).map(([id, preset]) => {
            const isSelected = currentConfig.themeId === id;
            return (
              <button
                key={id}
                onClick={() => handleSelectTheme(id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-red-600 bg-red-50/20 shadow-md ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {preset.nameKh}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full shadow-xs border border-white"
                      style={{ backgroundColor: preset.primaryColor }}
                    />
                    <span
                      className="w-4 h-4 rounded-full shadow-xs border border-white"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Font: {preset.fontTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Palette Customization */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-blue-600" />
          <h4 className="font-bold text-xs sm:text-sm text-slate-800">
            ការកែសម្រួលពណ៌ (Color Palette):
          </h4>
        </div>

        {/* Quick Swatches */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickColors.map((col, idx) => (
            <button
              key={idx}
              onClick={() => {
                updateConfig('primaryColor', col.primary);
                updateConfig('accentColor', col.accent);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-2 text-xs transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: col.primary }} />
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: col.accent }} />
              </div>
              <span className="text-slate-600 text-[11px] font-medium">{col.name}</span>
            </button>
          ))}
        </div>

        {/* Custom Hex Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ពណ៌គោល (Primary Color)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentConfig.primaryColor}
                onChange={(e) => updateConfig('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={currentConfig.primaryColor}
                onChange={(e) => updateConfig('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ពណ៌រំលេច (Accent Color)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentConfig.accentColor}
                onChange={(e) => updateConfig('accentColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-0.5"
              />
              <input
                type="text"
                value={currentConfig.accentColor}
                onChange={(e) => updateConfig('accentColor', e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Typography & Corner Styles */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Title Font */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-xs text-slate-800">ពុម្ពអក្សរចំណងជើង (Heading):</h4>
          </div>
          <select
            value={currentConfig.fontTitle}
            onChange={(e) => updateConfig('fontTitle', e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="Moul">Moul (អក្សរមូលប្រពៃណី - ផ្លូវការ)</option>
            <option value="Koulen">Koulen (អក្សរកូលែន - ទំនើបទាន់សម័យ)</option>
            <option value="Kantumruy Pro">Kantumruy Pro (ស្រាលស្អាត)</option>
            <option value="Battambang">Battambang (បាត់ដំបង)</option>
          </select>
        </div>

        {/* Body Font */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-xs text-slate-800">ពុម្ពអក្សរតួសេចក្តី (Body):</h4>
          </div>
          <select
            value={currentConfig.fontBody}
            onChange={(e) => updateConfig('fontBody', e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="Kantumruy Pro">Kantumruy Pro (អានស្រួល ច្បាស់ល្អ)</option>
            <option value="Siemreap">Siemreap (សៀមរាប)</option>
            <option value="Battambang">Battambang (បាត់ដំបង)</option>
          </select>
        </div>
      </div>

      {/* 4. Section Visibility Toggles */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-slate-700" />
          <h4 className="font-bold text-xs text-slate-800">
            កំណត់ការបង្ហាញផ្នែកនីមួយៗ (Display Sections):
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { key: 'showHeroStats', label: 'របារស្ថិតិ (Stats)' },
            { key: 'showPrincipal', label: 'សារនាយកសាលា' },
            { key: 'showPrograms', label: 'កម្មវិធីសិក្សា' },
            { key: 'showAdmissions', label: 'ដំណឹងចុះឈ្មោះ' },
            { key: 'showTeachers', label: 'លោកគ្រូអ្នកគ្រូ' },
            { key: 'showGallery', label: 'កម្រងរូបភាពសាលា' },
          ].map(({ key, label }) => {
            const isChecked = Boolean(currentConfig[key as keyof typeof currentConfig]);
            return (
              <label
                key={key}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 select-none text-xs"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateConfig(key as keyof typeof currentConfig, e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="font-medium text-slate-700">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
};
