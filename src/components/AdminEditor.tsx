import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  GraduationCap, 
  Users, 
  Image as ImageIcon, 
  PhoneCall, 
  Plus, 
  Trash2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { SchoolData, AcademicProgram, FacultyMember, GalleryItem } from '../types/school';
import { ImagePicker } from './ImagePicker';

interface AdminEditorProps {
  data: SchoolData;
  onChange: (updated: SchoolData) => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'programs' | 'teachers' | 'gallery' | 'contact'>('general');

  // Generic updater
  const updateField = (path: string, value: any) => {
    const copy: any = JSON.parse(JSON.stringify(data));
    const keys = path.split('.');
    let cur = copy;
    for (let i = 0; i < keys.length - 1; i++) {
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    onChange(copy);
  };

  // Program Management
  const addProgram = () => {
    const newProg: AcademicProgram = {
      id: 'p_' + Date.now(),
      title: 'កម្មវិធីសិក្សាថ្មី',
      titleEn: 'New Course',
      gradeLevel: 'គ្រប់កម្រិត',
      description: 'ការពិពណ៌នាសង្ខេបអំពីកម្មវិធីសិក្សា...',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      features: ['គុណភាពខ្ពស់', 'គ្រូមានបទពិសោធន៍'],
    };
    onChange({ ...data, programs: [...data.programs, newProg] });
  };

  const removeProgram = (id: string) => {
    onChange({ ...data, programs: data.programs.filter(p => p.id !== id) });
  };

  const updateProgram = (id: string, field: keyof AcademicProgram, value: any) => {
    onChange({
      ...data,
      programs: data.programs.map(p => p.id === id ? { ...p, [field]: value } : p),
    });
  };

  // Teacher Management
  const addTeacher = () => {
    const newTeacher: FacultyMember = {
      id: 't_' + Date.now(),
      name: 'លោកគ្រូ/អ្នកគ្រូ ថ្មី',
      role: 'គ្រូបង្រៀន',
      subject: 'មុខវិជ្ជាឯកទេស',
      qualification: 'បរិញ្ញាបត្រ',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    };
    onChange({ ...data, teachers: [...data.teachers, newTeacher] });
  };

  const removeTeacher = (id: string) => {
    onChange({ ...data, teachers: data.teachers.filter(t => t.id !== id) });
  };

  const updateTeacher = (id: string, field: keyof FacultyMember, value: any) => {
    onChange({
      ...data,
      teachers: data.teachers.map(t => t.id === id ? { ...t, [field]: value } : t),
    });
  };

  // Gallery Management
  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: 'g_' + Date.now(),
      title: 'សកម្មភាពសាលាថ្មី',
      category: 'ទិដ្ឋភាព',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    };
    onChange({ ...data, gallery: [...data.gallery, newItem] });
  };

  const removeGalleryItem = (id: string) => {
    onChange({ ...data, gallery: data.gallery.filter(g => g.id !== id) });
  };

  const updateGalleryItem = (id: string, field: keyof GalleryItem, value: any) => {
    onChange({
      ...data,
      gallery: data.gallery.map(g => g.id === id ? { ...g, [field]: value } : g),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* Navigation tabs for Admin */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 p-2 gap-1.5 scrollbar-thin">
        {[
          { id: 'general', label: 'ព័ត៌មានទូទៅ & Hero', icon: Building2 },
          { id: 'about', label: 'អំពីសាលា & នាយក', icon: FileText },
          { id: 'programs', label: 'កម្មវិធីសិក្សា', icon: GraduationCap },
          { id: 'teachers', label: 'លោកគ្រូអ្នកគ្រូ', icon: Users },
          { id: 'gallery', label: 'កម្រងរូបភាព', icon: ImageIcon },
          { id: 'contact', label: 'ចុះឈ្មោះ & ទំនាក់ទំនង', icon: PhoneCall },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6 space-y-6">

        {/* TAB 1: GENERAL & HERO */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ឈ្មោះសាលា (ភាសាខ្មែរ) *
                </label>
                <input
                  type="text"
                  value={data.nameKh}
                  onChange={(e) => updateField('nameKh', e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ឈ្មោះសាលា (English)
                </label>
                <input
                  type="text"
                  value={data.nameEn}
                  onChange={(e) => updateField('nameEn', e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ពាក្យស្លោកសាលា (Motto / Slogan)
                </label>
                <input
                  type="text"
                  value={data.sloganKh}
                  onChange={(e) => updateField('sloganKh', e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ប្រភេទសាលា
                </label>
                <input
                  type="text"
                  value={data.schoolType}
                  onChange={(e) => updateField('schoolType', e.target.value)}
                  placeholder="ឧ. សាលារៀនចំណេះទូទៅ និងអន្តរជាតិ"
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>

            {/* Images for Logo & Hero */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <ImagePicker
                label="ឡូហ្គោសាលា (School Logo)"
                currentUrl={data.logoUrl}
                category="logos"
                onChange={(url) => updateField('logoUrl', url)}
              />

              <ImagePicker
                label="រូបភាពផ្ទាំងធំខាងលើ (Hero Banner Image)"
                currentUrl={data.hero.backgroundImageUrl}
                category="campuses"
                onChange={(url) => updateField('hero.backgroundImageUrl', url)}
              />
            </div>

            {/* Hero Text */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-xs text-slate-800">
                ខ្លឹមសារផ្ទាំងស្វាគមន៍ (Hero Section):
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ផ្លាកសញ្ញាដំណឹង (Badge text)
                </label>
                <input
                  type="text"
                  value={data.hero.badge}
                  onChange={(e) => updateField('hero.badge', e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ចំណងជើងធំ (Hero Title)
                </label>
                <input
                  type="text"
                  value={data.hero.title}
                  onChange={(e) => updateField('hero.title', e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  អត្ថបទរៀបរាប់បន្ថែម (Subtitle)
                </label>
                <textarea
                  value={data.hero.subtitle}
                  onChange={(e) => updateField('hero.subtitle', e.target.value)}
                  rows={2}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ប៊ូតុងទី១ (Primary CTA)
                  </label>
                  <input
                    type="text"
                    value={data.hero.ctaPrimary}
                    onChange={(e) => updateField('hero.ctaPrimary', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ប៊ូតុងទី២ (Secondary CTA)
                  </label>
                  <input
                    type="text"
                    value={data.hero.ctaSecondary}
                    onChange={(e) => updateField('hero.ctaSecondary', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT & LEADERSHIP */}
        {activeTab === 'about' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ចំណងជើងផ្នែក «អំពីសាលា»
              </label>
              <input
                type="text"
                value={data.about.title}
                onChange={(e) => updateField('about.title', e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ប្រវត្តិ និងដំណើររឿងរបស់សាលា
              </label>
              <textarea
                value={data.about.story}
                onChange={(e) => updateField('about.story', e.target.value)}
                rows={4}
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  🎯 បេសកកម្ម (Mission)
                </label>
                <textarea
                  value={data.about.mission}
                  onChange={(e) => updateField('about.mission', e.target.value)}
                  rows={3}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  🔭 ចក្ខុវិស័យ (Vision)
                </label>
                <textarea
                  value={data.about.vision}
                  onChange={(e) => updateField('about.vision', e.target.value)}
                  rows={3}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <ImagePicker
              label="រូបភាពអមផ្នែកអំពីសាលា"
              currentUrl={data.about.imageUrl}
              category="campuses"
              onChange={(url) => updateField('about.imageUrl', url)}
            />

            {/* Principal Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-xs text-slate-800">
                សារ និងព័ត៌មាននាយកសាលា៖
              </h4>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ឈ្មោះនាយកសាលា
                  </label>
                  <input
                    type="text"
                    value={data.principal.name}
                    onChange={(e) => updateField('principal.name', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    តួនាទី
                  </label>
                  <input
                    type="text"
                    value={data.principal.role}
                    onChange={(e) => updateField('principal.role', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  សាររបស់នាយកសាលា
                </label>
                <textarea
                  value={data.principal.message}
                  onChange={(e) => updateField('principal.message', e.target.value)}
                  rows={3}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 italic"
                />
              </div>

              <ImagePicker
                label="រូបថតនាយកសាលា"
                currentUrl={data.principal.photoUrl}
                category="principals"
                onChange={(url) => updateField('principal.photoUrl', url)}
              />
            </div>
          </div>
        )}

        {/* TAB 3: ACADEMIC PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  បញ្ជីកម្មវិធីសិក្សា និងកម្រិតថ្នាក់ ({data.programs.length})
                </h4>
                <p className="text-xs text-slate-500">
                  លោកអ្នកអាចកែប្រែ បន្ថែម ឬលុបកម្មវិធីសិក្សា
                </p>
              </div>
              <button
                type="button"
                onClick={addProgram}
                className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>បន្ថែមកម្មវិធីសិក្សា</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.programs.map((prog, index) => (
                <div key={prog.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">កម្មវិធីសិក្សា #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeProgram(prog.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>លុប</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">ឈ្មោះកម្មវិធី</label>
                      <input
                        type="text"
                        value={prog.title}
                        onChange={(e) => updateProgram(prog.id, 'title', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">កម្រិតវ័យ/ថ្នាក់</label>
                      <input
                        type="text"
                        value={prog.gradeLevel}
                        onChange={(e) => updateProgram(prog.id, 'gradeLevel', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">ការពិពណ៌នាសង្ខេប</label>
                    <textarea
                      value={prog.description}
                      onChange={(e) => updateProgram(prog.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <ImagePicker
                    label="រូបភាពតំណាងកម្មវិធីសិក្សា"
                    currentUrl={prog.image}
                    category="classrooms"
                    onChange={(url) => updateProgram(prog.id, 'image', url)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEACHERS & FACULTY */}
        {activeTab === 'teachers' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  បញ្ជីលោកគ្រូ-អ្នកគ្រូ ({data.teachers.length})
                </h4>
                <p className="text-xs text-slate-500">
                  បង្ហាញបុគ្គលិកអប់រំ និងគ្រូឆ្នើមលើគេហទំព័រ
                </p>
              </div>
              <button
                type="button"
                onClick={addTeacher}
                className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>បន្ថែមគ្រូបង្រៀន</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.teachers.map((teacher, index) => (
                <div key={teacher.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">គ្រូបង្រៀន #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeTeacher(teacher.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>លុប</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">ឈ្មោះ</label>
                    <input
                      type="text"
                      value={teacher.name}
                      onChange={(e) => updateTeacher(teacher.id, 'name', e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">តួនាទី</label>
                      <input
                        type="text"
                        value={teacher.role}
                        onChange={(e) => updateTeacher(teacher.id, 'role', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">មុខវិជ្ជា</label>
                      <input
                        type="text"
                        value={teacher.subject}
                        onChange={(e) => updateTeacher(teacher.id, 'subject', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <ImagePicker
                    label="រូបថតគ្រូបង្រៀន"
                    currentUrl={teacher.photoUrl}
                    category="principals"
                    onChange={(url) => updateTeacher(teacher.id, 'photoUrl', url)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  កម្រងរូបភាពសាលា ({data.gallery.length})
                </h4>
                <p className="text-xs text-slate-500">
                  រូបភាពសកម្មភាព បរិវេណសាលា កីឡា និងពិធីផ្សេងៗ
                </p>
              </div>
              <button
                type="button"
                onClick={addGalleryItem}
                className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>បន្ថែមរូបភាព</span>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.gallery.map((item, index) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">រូបថត #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(item.id)}
                      className="text-rose-600 hover:text-rose-800 p-1 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>លុប</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">ចំណងជើងរូបភាព</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">ប្រភេទ</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => updateGalleryItem(item.id, 'category', e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>

                  <ImagePicker
                    label="រូបភាព"
                    currentUrl={item.imageUrl}
                    category="activities"
                    onChange={(url) => updateGalleryItem(item.id, 'imageUrl', url)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CONTACT & ADMISSIONS */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Admissions announcement */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-xs text-slate-800">
                ព័ត៌មានចុះឈ្មោះចូលរៀន (Admissions Notice):
              </h4>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ចំណងជើងដំណឹង
                  </label>
                  <input
                    type="text"
                    value={data.admissions.title}
                    onChange={(e) => updateField('admissions.title', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ផ្លាកបញ្ចុះតម្លៃ/ចំណាំ
                  </label>
                  <input
                    type="text"
                    value={data.admissions.badge}
                    onChange={(e) => updateField('admissions.badge', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ការពិពណ៌នាអំពីការចុះឈ្មោះ
                </label>
                <textarea
                  value={data.admissions.description}
                  onChange={(e) => updateField('admissions.description', e.target.value)}
                  rows={2}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  លេខទូរស័ព្ទទី១ (Phone) *
                </label>
                <input
                  type="text"
                  value={data.contact.phone}
                  onChange={(e) => updateField('contact.phone', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  លេខទូរស័ព្ទទី២
                </label>
                <input
                  type="text"
                  value={data.contact.secondaryPhone}
                  onChange={(e) => updateField('contact.secondaryPhone', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  អ៊ីមែល (Email)
                </label>
                <input
                  type="email"
                  value={data.contact.email}
                  onChange={(e) => updateField('contact.email', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  តំណភ្ជាប់ Telegram
                </label>
                <input
                  type="text"
                  value={data.contact.telegramChannel}
                  onChange={(e) => updateField('contact.telegramChannel', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  អាសយដ្ឋានទីតាំងសាលា
                </label>
                <input
                  type="text"
                  value={data.contact.address}
                  onChange={(e) => updateField('contact.address', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ម៉ោងធ្វើការ
                </label>
                <input
                  type="text"
                  value={data.contact.workingHours}
                  onChange={(e) => updateField('contact.workingHours', e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
