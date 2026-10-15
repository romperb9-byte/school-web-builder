import { SchoolData } from '../types/school';
import { THEME_PRESETS } from './defaultData';

export function generateSchoolHtml(data: SchoolData): string {
  const theme = THEME_PRESETS[data.styleConfig.themeId] || THEME_PRESETS['royal-khmer'];
  const primaryColor = data.styleConfig.primaryColor || theme.primaryColor;
  const accentColor = data.styleConfig.accentColor || theme.accentColor;
  const fontTitle = data.styleConfig.fontTitle;
  const fontBody = data.styleConfig.fontBody;

  // Generate escape-safe JSON for dynamic scripts if needed
  const escapeHtml = (str: string) =>
    (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  return `<!DOCTYPE html>
<html lang="km" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.nameKh)} - ${escapeHtml(data.nameEn)}</title>
  <meta name="description" content="${escapeHtml(data.sloganKh)}">
  
  <!-- Khmer & Modern Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,300..700;1,300..700&family=Moul&family=Koulen&family=Siemreap&family=Battambang:wght@400;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '${primaryColor}',
              accent: '${accentColor}',
              dark: '#0f172a',
            }
          },
          fontFamily: {
            title: ['${fontTitle}', 'sans-serif'],
            body: ['${fontBody}', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: '${fontBody}', sans-serif;
    }
    .title-font {
      font-family: '${fontTitle}', cursive, sans-serif;
    }
    .accent-gradient {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
    }
    .glass-nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
    }
    /* Admin In-Place Editing Styles */
    .admin-editing [contenteditable="true"] {
      cursor: text;
      transition: all 0.2s ease;
      position: relative;
    }
    .admin-editing [contenteditable="true"]:hover {
      outline: 2px dashed #2563eb !important;
      outline-offset: 4px;
      background-color: rgba(37, 99, 235, 0.05);
      border-radius: 4px;
    }
    .admin-editing [contenteditable="true"]:focus {
      outline: 2px solid #1d4ed8 !important;
      outline-offset: 4px;
      background-color: rgba(37, 99, 235, 0.08);
      border-radius: 4px;
    }
    .admin-img-wrapper {
      position: relative;
    }
    .admin-editing .admin-img-wrapper:hover .admin-img-btn {
      display: flex !important;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">

  <!-- TOP BAR NOTICE -->
  <div class="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/20 text-amber-300">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          ${escapeHtml(data.admissions.badge || 'ដំណឹងចុះឈ្មោះ')}
        </span>
        <span class="hidden md:inline text-slate-300">${escapeHtml(data.schoolType)}</span>
      </div>
      <div class="flex items-center gap-4 text-slate-300">
        <a href="tel:${escapeHtml(data.contact.phone)}" class="hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <span>📞 ${escapeHtml(data.contact.phone)}</span>
        </a>
        <span class="text-slate-600">|</span>
        <a href="${escapeHtml(data.contact.telegramChannel)}" target="_blank" rel="noopener noreferrer" class="hover:text-sky-400 transition-colors">
          <span>✈️ Telegram</span>
        </a>
      </div>
    </div>
  </div>

  <!-- NAVIGATION -->
  <header class="sticky top-0 z-40 glass-nav border-b border-slate-200/80 shadow-xs transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo & School Name -->
        <a href="#" class="flex items-center gap-3 group">
          <img src="${escapeHtml(data.logoUrl)}" alt="Logo" class="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 shadow-sm" style="border-color: ${primaryColor};">
          <div>
            <h1 class="title-font text-base sm:text-xl font-bold tracking-wide text-slate-900 group-hover:opacity-90 leading-tight">
              ${escapeHtml(data.nameKh)}
            </h1>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-medium">
              ${escapeHtml(data.nameEn)}
            </p>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 font-medium text-sm text-slate-700">
          <a href="#about" class="hover:text-[${primaryColor}] transition-colors">អំពីសាលា</a>
          ${data.styleConfig.showPrograms ? `<a href="#programs" class="hover:text-[${primaryColor}] transition-colors">កម្មវិធីសិក្សា</a>` : ''}
          ${data.styleConfig.showTeachers ? `<a href="#teachers" class="hover:text-[${primaryColor}] transition-colors">លោកគ្រូអ្នកគ្រូ</a>` : ''}
          ${data.styleConfig.showGallery ? `<a href="#gallery" class="hover:text-[${primaryColor}] transition-colors">ទិដ្ឋភាពសាលា</a>` : ''}
          <a href="#contact" class="hover:text-[${primaryColor}] transition-colors">ទំនាក់ទំនង</a>
        </nav>

        <!-- Admission CTA -->
        <div class="hidden sm:flex items-center gap-2.5">
          <a href="#admissions" class="px-4 py-2.5 rounded-xl font-medium text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center gap-1.5 transform active:scale-95" style="background-color: ${primaryColor};">
            <span>✍️ ចុះឈ្មោះចូលរៀន</span>
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
      <a href="#about" class="block py-2 text-slate-700 hover:text-blue-700 font-medium border-b border-slate-100">អំពីសាលា</a>
      ${data.styleConfig.showPrograms ? `<a href="#programs" class="block py-2 text-slate-700 hover:text-blue-700 font-medium border-b border-slate-100">កម្មវិធីសិក្សា</a>` : ''}
      ${data.styleConfig.showTeachers ? `<a href="#teachers" class="block py-2 text-slate-700 hover:text-blue-700 font-medium border-b border-slate-100">លោកគ្រូអ្នកគ្រូ</a>` : ''}
      ${data.styleConfig.showGallery ? `<a href="#gallery" class="block py-2 text-slate-700 hover:text-blue-700 font-medium border-b border-slate-100">ទិដ្ឋភាពសាលា</a>` : ''}
      <a href="#contact" class="block py-2 text-slate-700 hover:text-blue-700 font-medium border-b border-slate-100">ទំនាក់ទំនង</a>
      <div class="mt-3 pt-2 border-t border-slate-100">
        <a href="#admissions" class="block text-center py-2.5 rounded-xl text-white font-medium text-xs" style="background-color: ${primaryColor};">
          ចុះឈ្មោះចូលរៀន
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative min-h-[640px] flex items-center justify-center text-white overflow-hidden py-24 sm:py-32">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img src="${escapeHtml(data.hero.backgroundImageUrl)}" alt="School campus" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/75"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(${accentColor} 1px, transparent 1px); background-size: 24px 24px;"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border backdrop-blur-md mb-6 ${theme.badgeStyle}">
        ${escapeHtml(data.hero.badge)}
      </div>

      <!-- Main Heading -->
      <h2 class="title-font text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-snug sm:leading-tight mb-6 drop-shadow-md">
        ${escapeHtml(data.hero.title)}
      </h2>

      <!-- Subtitle -->
      <p class="max-w-3xl mx-auto text-base sm:text-xl text-slate-200 leading-relaxed font-light mb-10">
        ${escapeHtml(data.hero.subtitle)}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#admissions" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base transform hover:-translate-y-0.5" style="background-color: ${accentColor};">
          ${escapeHtml(data.hero.ctaPrimary)}
        </a>
        <a href="#about" class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 text-base">
          ${escapeHtml(data.hero.ctaSecondary)}
        </a>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  ${data.styleConfig.showHeroStats ? `
  <section class="relative z-20 -mt-12 max-w-6xl mx-auto px-4 sm:px-6">
    <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      ${data.stats.map(stat => `
        <div class="p-3 border-r last:border-none border-slate-100">
          <div class="title-font text-2xl sm:text-4xl font-bold mb-1" style="color: ${primaryColor};">${escapeHtml(stat.value)}</div>
          <div class="text-xs sm:text-sm text-slate-600 font-medium">${escapeHtml(stat.label)}</div>
        </div>
      `).join('')}
    </div>
  </section>
  ` : ''}

  <!-- ABOUT SECTION -->
  <section id="about" class="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-white mb-4" style="background-color: ${primaryColor};">
          អំពីយើង
        </div>
        <h3 class="title-font text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
          ${escapeHtml(data.about.title)}
        </h3>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
          ${escapeHtml(data.about.story)}
        </p>

        <!-- Mission & Vision Cards -->
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <div class="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="title-font font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span class="text-amber-500">🎯</span> បេសកកម្ម
            </h4>
            <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(data.about.mission)}</p>
          </div>
          <div class="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <h4 class="title-font font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span class="text-emerald-500">🔭</span> ចក្ខុវិស័យ
            </h4>
            <p class="text-sm text-slate-600 leading-relaxed">${escapeHtml(data.about.vision)}</p>
          </div>
        </div>

        <!-- Core Values Checklist -->
        <div class="space-y-2.5">
          ${data.about.coreValues.map(val => `
            <div class="flex items-center gap-3">
              <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style="background-color: ${accentColor};">✓</span>
              <span class="text-sm font-medium text-slate-700">${escapeHtml(val)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- About Image with Decorative Frame -->
      <div class="relative">
        <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <img src="${escapeHtml(data.about.imageUrl)}" alt="Campus life" class="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-500">
        </div>
        <div class="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl -z-0 opacity-20" style="background-color: ${accentColor};"></div>
        <div class="absolute -top-6 -right-6 w-48 h-48 rounded-2xl -z-0 opacity-20" style="background-color: ${primaryColor};"></div>
      </div>
    </div>
  </section>

  <!-- PRINCIPAL'S MESSAGE -->
  ${data.styleConfig.showPrincipal ? `
  <section class="py-16 bg-slate-100 border-y border-slate-200">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center gap-8">
        <img src="${escapeHtml(data.principal.photoUrl)}" alt="Principal" class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 shadow-md shrink-0" style="border-color: ${primaryColor};">
        <div>
          <div class="text-amber-500 text-3xl font-serif leading-none mb-2">“</div>
          <p class="text-base sm:text-lg text-slate-700 italic leading-relaxed mb-4">
            ${escapeHtml(data.principal.message)}
          </p>
          <div>
            <h4 class="title-font font-bold text-lg text-slate-900">${escapeHtml(data.principal.name)}</h4>
            <p class="text-xs sm:text-sm text-slate-500 font-medium">${escapeHtml(data.principal.role)}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- ACADEMIC PROGRAMS -->
  ${data.styleConfig.showPrograms ? `
  <section id="programs" class="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-white mb-3" style="background-color: ${primaryColor};">
        ការបណ្តុះបណ្តាល
      </div>
      <h3 class="title-font text-2xl sm:text-4xl font-bold text-slate-900 mb-4">
        កម្មវិធីសិក្សា និងកម្រិតថ្នាក់
      </h3>
      <p class="text-slate-600 text-sm sm:text-base">
        រៀបចំឡើងយ៉ាងសម្រិតសម្រាំងដើម្បីអភិវឌ្ឍសក្តានុពល និងបញ្ញាញាណរបស់សិស្សគ្រប់វ័យ
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      ${data.programs.map(prog => `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div class="relative h-48 overflow-hidden">
            <img src="${escapeHtml(prog.image)}" alt="${escapeHtml(prog.title)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            ${prog.tag ? `
              <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md" style="background-color: ${accentColor};">
                ${escapeHtml(prog.tag)}
              </span>
            ` : ''}
            <span class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900/80 text-white backdrop-blur-xs">
              ${escapeHtml(prog.gradeLevel)}
            </span>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="title-font text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                ${escapeHtml(prog.title)}
              </h4>
              ${prog.titleEn ? `<p class="text-xs text-slate-400 mb-3 font-medium">${escapeHtml(prog.titleEn)}</p>` : ''}
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                ${escapeHtml(prog.description)}
              </p>
            </div>

            <div class="border-t border-slate-100 pt-4 space-y-2">
              ${prog.features.map(f => `
                <div class="flex items-center gap-2 text-xs text-slate-600">
                  <span class="text-emerald-500">✓</span>
                  <span>${escapeHtml(f)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  ` : ''}

  <!-- ADMISSIONS SECTION -->
  ${data.styleConfig.showAdmissions ? `
  <section id="admissions" class="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
            ${escapeHtml(data.admissions.badge)}
          </span>
          <h3 class="title-font text-2xl sm:text-4xl font-bold mb-4 leading-tight">
            ${escapeHtml(data.admissions.title)}
          </h3>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            ${escapeHtml(data.admissions.description)}
          </p>

          <!-- Enrollment Steps -->
          <h4 class="font-bold text-base text-amber-300 mb-4">ដំណាក់កាលនៃការចុះឈ្មោះ៖</h4>
          <div class="space-y-3">
            ${data.admissions.steps.map((step, idx) => `
              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-white/10 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                <span class="text-sm text-slate-200">${escapeHtml(step)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Enrollment Form / Contact Box -->
        <div class="lg:col-span-5 bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h4 class="title-font text-lg font-bold text-slate-900 mb-2">ចុះឈ្មោះសួរព័ត៌មាន</h4>
          <p class="text-xs text-slate-500 mb-6">ក្រុមការងារយើងខ្ញុំនឹងទាក់ទងត្រឡប់ទៅវិញយ៉ាងលឿនបំផុត</p>
          
          <form onsubmit="event.preventDefault(); alert('អរគុណសម្រាប់ការចុះឈ្មោះ! ក្រុមការងារយើងនឹងទាក់ទងមកលោកអ្នកក្នុងពេលឆាប់ៗ។');" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">ឈ្មោះសិស្ស ឬអាណាព្យាបាល</label>
              <input type="text" required placeholder="ឧ. ចាន់ សុភា" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">លេខទូរស័ព្ទ ឬ Telegram</label>
              <input type="tel" required placeholder="ឧ. 012 345 678" class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">កម្រិតថ្នាក់ដែលចាប់អារម្មណ៍</label>
              <select class="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>មត្តេយ្យសិក្សា</option>
                <option>បឋមសិក្សា (ថ្នាក់ទី១ - ទី៦)</option>
                <option>អនុវិទ្យាល័យ (ថ្នាក់ទី៧ - ទី៩)</option>
                <option>វិទ្យាល័យ (ថ្នាក់ទី១០ - ទី១២)</option>
              </select>
            </div>
            <button type="submit" class="w-full py-3 rounded-lg text-white font-bold text-sm shadow-md hover:shadow-lg transition-all" style="background-color: ${primaryColor};">
              ផ្ញើព័ត៌មានចុះឈ្មោះ
            </button>
          </form>

          <div class="mt-4 pt-4 border-t border-slate-100 text-center">
            <span class="text-xs text-slate-500">ឬទាក់ទងបន្ទាន់តាមទូរស័ព្ទ៖ </span>
            <a href="tel:${escapeHtml(data.contact.phone)}" class="text-xs font-bold text-blue-600 hover:underline">${escapeHtml(data.contact.phone)}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- TEACHERS / FACULTY -->
  ${data.styleConfig.showTeachers ? `
  <section id="teachers" class="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-white mb-3" style="background-color: ${primaryColor};">
        បុគ្គលិកអប់រំ
      </div>
      <h3 class="title-font text-2xl sm:text-4xl font-bold text-slate-900 mb-4">
        លោកគ្រូ-អ្នកគ្រូឆ្នើម
      </h3>
      <p class="text-slate-600 text-sm sm:text-base">
        គ្រូដែលមានគរុកោសល្យច្បាស់លាស់ បទពិសោធន៍យូរឆ្នាំ និងការយកចិត្តទុកដាក់ចំពោះសិស្ស
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${data.teachers.map(teacher => `
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center">
          <img src="${escapeHtml(teacher.photoUrl)}" alt="${escapeHtml(teacher.name)}" class="w-28 h-28 rounded-full object-cover mb-4 border-4 shadow-sm" style="border-color: ${primaryColor};">
          <h4 class="title-font text-base sm:text-lg font-bold text-slate-900 mb-1">${escapeHtml(teacher.name)}</h4>
          <p class="text-xs font-semibold" style="color: ${accentColor};">${escapeHtml(teacher.role)}</p>
          <p class="text-xs text-slate-500 mb-2">${escapeHtml(teacher.subject)}</p>
          <span class="inline-block px-3 py-1 rounded-full text-[11px] bg-slate-100 text-slate-600">
            🎓 ${escapeHtml(teacher.qualification)}
          </span>
        </div>
      `).join('')}
    </div>
  </section>
  ` : ''}

  <!-- PHOTO GALLERY -->
  ${data.styleConfig.showGallery ? `
  <section id="gallery" class="py-20 bg-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h3 class="title-font text-2xl sm:text-4xl font-bold text-slate-900 mb-4">
          ទិដ្ឋភាព និងសកម្មភាពសាលា
        </h3>
        <p class="text-slate-600 text-sm sm:text-base">
          បរិយាកាសសិក្សាស្រស់ស្អាត សុវត្ថិភាព និងសកម្មភាពក្រៅម៉ោងសិក្សាដ៏សម្បូរបែប
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${data.gallery.map(item => `
          <div class="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-64 bg-slate-900">
            <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span class="text-[11px] font-semibold text-amber-300 uppercase">${escapeHtml(item.category)}</span>
              <h5 class="text-sm font-bold">${escapeHtml(item.title)}</h5>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- CONTACT & LOCATION SECTION -->
  <section id="contact" class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-white mb-4" style="background-color: ${primaryColor};">
          ទំនាក់ទំនង
        </div>
        <h3 class="title-font text-2xl sm:text-4xl font-bold text-slate-900 mb-6">
          មកកាន់សាលាយើងខ្ញុំផ្ទាល់
        </h3>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">📍</div>
            <div>
              <h5 class="font-bold text-sm text-slate-900">អាសយដ្ឋាន</h5>
              <p class="text-sm text-slate-600">${escapeHtml(data.contact.address)}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">📞</div>
            <div>
              <h5 class="font-bold text-sm text-slate-900">លេខទូរស័ព្ទ</h5>
              <p class="text-sm text-slate-600">${escapeHtml(data.contact.phone)} / ${escapeHtml(data.contact.secondaryPhone)}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">✉️</div>
            <div>
              <h5 class="font-bold text-sm text-slate-900">អ៊ីមែល</h5>
              <p class="text-sm text-slate-600">${escapeHtml(data.contact.email)}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">⏰</div>
            <div>
              <h5 class="font-bold text-sm text-slate-900">ម៉ោងធ្វើការ</h5>
              <p class="text-sm text-slate-600">${escapeHtml(data.contact.workingHours)}</p>
            </div>
          </div>
        </div>

        <!-- Social Buttons -->
        <div class="flex items-center gap-3">
          <a href="${escapeHtml(data.contact.facebookPage)}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs flex items-center gap-2 hover:bg-blue-700 transition-colors">
            Facebook Page
          </a>
          <a href="${escapeHtml(data.contact.telegramChannel)}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-medium text-xs flex items-center gap-2 hover:bg-sky-600 transition-colors">
            Telegram
          </a>
        </div>
      </div>

      <!-- Map Embed Frame -->
      <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[380px] bg-slate-100">
        <iframe src="${escapeHtml(data.contact.mapEmbedUrl)}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <img src="${escapeHtml(data.logoUrl)}" alt="Logo" class="w-10 h-10 rounded-full object-cover">
          <div>
            <div class="title-font text-white font-bold text-sm">${escapeHtml(data.nameKh)}</div>
            <div class="text-xs text-slate-500">${escapeHtml(data.nameEn)}</div>
          </div>
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <p class="text-xs text-slate-500 text-center sm:text-left">
            © 2026 ${escapeHtml(data.nameKh)}។ រក្សាសិទ្ធិគ្រប់យ៉ាង (All Rights Reserved)។
          </p>
          <button 
            id="footer-login-btn"
            onclick="openAdminModal()" 
            class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="ចូលគ្រប់គ្រងទំព័រ (Admin Login: admin / 123)"
          >
            <span>🔐 ចូលគ្រប់គ្រង (Admin Login)</span>
          </button>
        </div>
      </div>
    </div>
  </footer>

  <!-- ============================================== -->
  <!-- ADMIN LOGIN MODAL                              -->
  <!-- User: admin | Password: 123                    -->
  <!-- ============================================== -->
  <div id="admin-login-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
      
      <!-- Modal Header -->
      <div class="px-5 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="text-lg">🔐</span>
          <div>
            <h4 class="font-bold text-sm text-white font-title">ចូលគ្រប់គ្រងទំព័រ (Admin Login)</h4>
            <p class="text-[11px] text-blue-100">កែប្រែអត្ថបទ ចំណងជើង និងរូបភាពដោយផ្ទាល់</p>
          </div>
        </div>
        <button onclick="closeAdminModal()" class="text-white/80 hover:text-white p-1 rounded-lg">✕</button>
      </div>

      <!-- Modal Body -->
      <form onsubmit="handleAdminLoginSubmit(event)" class="p-5 space-y-3.5 text-slate-800">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">ឈ្មោះអ្នកប្រើ (Username)</label>
          <input 
            type="text" 
            id="admin-user-input" 
            required 
            placeholder="admin" 
            value="admin"
            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
          >
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">ពាក្យសម្ងាត់ (Password)</label>
          <input 
            type="password" 
            id="admin-pass-input" 
            required 
            placeholder="123" 
            value="123"
            class="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
          >
        </div>

        <div id="admin-login-error" class="hidden p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200">
          ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!
        </div>

        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-0.5">
          <div class="font-bold text-slate-700">💡 គណនីសម្រាប់ចូលគ្រប់គ្រង៖</div>
          <div>User: <strong class="text-blue-700 font-mono">admin</strong> | Password: <strong class="text-blue-700 font-mono">123</strong></div>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <button 
            type="button" 
            onclick="closeAdminModal()" 
            class="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            បោះបង់
          </button>
          <button 
            type="submit" 
            class="flex-1 py-2 rounded-xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all" 
            style="background-color: ${primaryColor};"
          >
            ចូលប្រើប្រាស់ (Login)
          </button>
        </div>
      </form>

    </div>
  </div>

  <!-- ============================================== -->
  <!-- FLOATING ADMIN TOOLBAR (ACTIVE ONCE LOGGED IN) -->
  <!-- ============================================== -->
  <div id="floating-admin-bar" class="hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-3 max-w-[95vw]">
    <div class="flex items-center gap-2 shrink-0">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-xs font-bold text-emerald-300">🛠️ របៀប Admin (ចុចលើអក្សរដើម្បីកែប្រែ)</span>
    </div>

    <div class="h-4 w-px bg-slate-700 hidden sm:block"></div>

    <div class="flex items-center gap-2 shrink-0">
      <button 
        id="admin-save-btn"
        onclick="saveAndRedeployToGitHub()" 
        class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
        title="រក្សាទុក និង Push ទៅកាន់ GitHub Pages ភ្លាមៗ (Redeploy)"
      >
        <span>💾 រក្សាទុក & Redeploy</span>
      </button>

      <button 
        onclick="openGitHubConfigModal()" 
        class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1"
        title="កំណត់ GitHub Token / Repo"
      >
        <span>⚙️ GitHub</span>
      </button>

      <button 
        onclick="downloadInPlaceHtml()" 
        class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-all flex items-center gap-1"
        title="ទាញយកជា HTML file"
      >
        <span>📥 ទាញយក HTML</span>
      </button>

      <button 
        onclick="resetSavedEdits()" 
        class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-rose-300 hover:text-white text-xs transition-all"
        title="កំណត់ទម្រង់ដើមឡើងវិញ"
      >
        <span>🔄 កំណត់ដើម</span>
      </button>

      <button 
        onclick="logoutAdmin()" 
        class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-all"
        title="ចាកចេញពី Admin Mode"
      >
        <span>🚪 ចាកចេញ</span>
      </button>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- IMAGE REPLACEMENT MODAL                         -->
  <!-- ============================================== -->
  <div id="admin-image-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 space-y-4 text-slate-800 animate-in fade-in zoom-in-95">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <h4 class="font-bold text-sm text-slate-900">📷 ផ្លាស់ប្តូររូបភាព</h4>
        <button onclick="closeImageModal()" class="text-slate-400 hover:text-slate-700">✕</button>
      </div>

      <div class="space-y-3">
        <label class="block border-2 border-dashed border-blue-400 hover:border-blue-600 rounded-xl p-4 text-center cursor-pointer bg-blue-50/40 transition-colors">
          <input type="file" accept="image/*" onchange="handleImageFileSelect(event)" class="hidden">
          <span class="text-xs font-bold text-blue-700">📁 ជ្រើសរើសរូបថតពីកុំព្យូទ័រ/ទូរស័ព្ទ</span>
          <span class="block text-[10px] text-slate-500 mt-0.5">JPG, PNG, WebP (Update ភ្លាមៗ)</span>
        </label>

        <div class="text-center text-xs text-slate-400 font-semibold">— ឬ —</div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-600 mb-1">ដាក់តំណភ្ជាប់រូបភាព (Image URL)</label>
          <input type="url" id="admin-img-url-input" placeholder="https://..." class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>

        <div class="flex items-center gap-2 pt-1">
          <button onclick="closeImageModal()" class="flex-1 py-2 text-xs rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600">
            បោះបង់
          </button>
          <button onclick="applyImageUrl()" class="flex-1 py-2 text-xs rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
            យល់ព្រម
          </button>
        </div>
  </div>

  <!-- ============================================== -->
  <!-- GITHUB CONFIG MODAL FOR DIRECT IN-PAGE REDEPLOY -->
  <!-- ============================================== -->
  <div id="admin-github-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 space-y-4 text-slate-800 animate-in fade-in zoom-in-95">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-2">
          <span class="text-base">🚀</span>
          <h4 class="font-bold text-sm text-slate-900">ការកំណត់ GitHub Auto Redeploy</h4>
        </div>
        <button onclick="closeGitHubConfigModal()" class="text-slate-400 hover:text-slate-700">✕</button>
      </div>

      <div class="space-y-3 text-xs">
        <p class="text-slate-600 font-kantumruy">
          បញ្ចូល GitHub Token និងព័ត៌មាន Repo ដើម្បីឱ្យរាល់ពេលចុច <strong>«រក្សាទុក & Redeploy»</strong> វានឹង Push ទៅកាន់ GitHub Pages ដោយស្វ័យប្រវត្ត៖
        </p>

        <div>
          <label class="block font-bold text-slate-700 mb-1">GitHub Personal Access Token (PAT)</label>
          <input type="password" id="inpage-gh-token" placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" class="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <p class="text-[10px] text-slate-400 mt-0.5">* ត្រូវមាន Scope <code>repo</code></p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-slate-700 mb-1">GitHub Username / Org</label>
            <input type="text" id="inpage-gh-owner" placeholder="romperb9-byte" class="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Repository Name</label>
            <input type="text" id="inpage-gh-repo" placeholder="school-website" class="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">Branch (ជាទូទៅ: main)</label>
          <input type="text" id="inpage-gh-branch" placeholder="main" value="main" class="w-full px-3 py-2 font-mono text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>

        <div class="flex items-center gap-2 pt-2">
          <button onclick="closeGitHubConfigModal()" class="flex-1 py-2 text-xs rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600">
            បោះបង់
          </button>
          <button onclick="saveGitHubConfig()" class="flex-1 py-2 text-xs rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
            រក្សាទុកការកំណត់
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- JAVASCRIPT LOGIC                               -->
  <!-- ============================================== -->
  <script>
    // Mobile Drawer Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }

    // Listen for TRIGGER_ADMIN_LOGIN from parent
    window.addEventListener('message', function(ev) {
      if (ev.data && ev.data.type === 'TRIGGER_ADMIN_LOGIN') {
        openAdminModal();
      }
    });

    // Modal Control
    function openAdminModal() {
      const modal = document.getElementById('admin-login-modal');
      const err = document.getElementById('admin-login-error');
      if (err) err.classList.add('hidden');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeAdminModal() {
      const modal = document.getElementById('admin-login-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    // Attach click handlers automatically once DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      const loginBtn = document.getElementById('footer-login-btn');
      if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
          e.preventDefault();
          openAdminModal();
        });
      }
    });

    // Admin Login Submission: user=admin, password=123
    function handleAdminLoginSubmit(e) {
      e.preventDefault();
      const user = document.getElementById('admin-user-input').value.trim();
      const pass = document.getElementById('admin-pass-input').value.trim();
      const err = document.getElementById('admin-login-error');

      if (user.toLowerCase() === 'admin' && pass === '123') {
        closeAdminModal();
        enableAdminMode();
        showAdminToast('🎉 ចូលគ្រប់គ្រងជោគជ័យ! អ្នកអាចចុចលើអត្ថបទ ឬរូបភាពដើម្បីកែប្រែដោយផ្ទាល់');
      } else {
        if (err) {
          err.classList.remove('hidden');
        } else {
          alert('ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ! (User: admin / Pass: 123)');
        }
      }
    }

    // Turn on in-place editing
    let currentEditingImg = null;

    function enableAdminMode() {
      document.body.classList.add('admin-editing');
      const bar = document.getElementById('floating-admin-bar');
      if (bar) bar.classList.remove('hidden');

      // Make all titles, paragraphs, and list items editable
      const editables = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .editable-text');
      editables.forEach(el => {
        // Skip elements inside modals and admin bar
        if (!el.closest('#admin-login-modal') && !el.closest('#floating-admin-bar') && !el.closest('#admin-image-modal')) {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('title', 'ចុចទីនេះដើម្បីកែប្រែអត្ថបទ');
        }
      });

      // Wrap images to make them easily replaceable
      const images = document.querySelectorAll('img:not(.no-edit)');
      images.forEach(img => {
        if (img.closest('#admin-login-modal') || img.closest('#floating-admin-bar') || img.closest('#admin-image-modal')) return;
        
        // Add click listener to change image
        img.style.cursor = 'pointer';
        img.setAttribute('title', 'ចុចលើរូបភាពដើម្បីផ្លាស់ប្តូររូបថតថ្មី');
        img.onclick = (event) => {
          if (!document.body.classList.contains('admin-editing')) return;
          event.preventDefault();
          event.stopPropagation();
          currentEditingImg = img;
          openImageModal();
        };
      });
    }

    function openImageModal() {
      const modal = document.getElementById('admin-image-modal');
      const input = document.getElementById('admin-img-url-input');
      if (input && currentEditingImg) input.value = currentEditingImg.src;
      if (modal) modal.classList.remove('hidden');
    }

    function closeImageModal() {
      const modal = document.getElementById('admin-image-modal');
      if (modal) modal.classList.add('hidden');
      currentEditingImg = null;
    }

    function handleImageFileSelect(e) {
      const file = e.target.files && e.target.files[0];
      if (!file || !currentEditingImg) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        currentEditingImg.src = evt.target.result;
        closeImageModal();
        showAdminToast('✓ បានប្តូររូបភាពរួចរាល់!');
      };
      reader.readAsDataURL(file);
    }

    function applyImageUrl() {
      const input = document.getElementById('admin-img-url-input');
      if (input && input.value.trim() && currentEditingImg) {
        currentEditingImg.src = input.value.trim();
        closeImageModal();
        showAdminToast('✓ បានប្តូររូបភាពរួចរាល់!');
      }
    }

    // ==========================================
    // PERSISTENCE ENGINE (រក្សាទុកបានរហូត ក្នុង Browser)
    // ==========================================
    const STORAGE_KEY = 'school_web_custom_edits_' + window.location.pathname;

    function applySavedEdits() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        const data = JSON.parse(saved);
        if (data.texts) {
          Object.keys(data.texts).forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.innerHTML = data.texts[selector];
          });
        }
        if (data.images) {
          Object.keys(data.images).forEach(selector => {
            const img = document.querySelector(selector);
            if (img) img.src = data.images[selector];
          });
        }
      } catch (e) {
        console.warn('Failed to load saved edits', e);
      }
    }

    // Auto load saved changes on startup
    document.addEventListener('DOMContentLoaded', applySavedEdits);
    // Also run immediately if DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      applySavedEdits();
    }

    function saveInPlaceAdminChanges() {
      try {
        const editData = { texts: {}, images: {}, timestamp: Date.now() };

        // Save texts
        const editables = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .editable-text');
        editables.forEach((el, index) => {
          if (!el.closest('#admin-login-modal') && !el.closest('#floating-admin-bar') && !el.closest('#admin-image-modal') && !el.closest('#admin-toast')) {
            const selectorKey = el.id ? '#' + el.id : el.tagName.toLowerCase() + ':nth-of-type(' + (index + 1) + ')';
            editData.texts[selectorKey] = el.innerHTML;
          }
        });

        // Save images
        const images = document.querySelectorAll('img:not(.no-edit)');
        images.forEach((img, index) => {
          if (!img.closest('#admin-login-modal') && !img.closest('#floating-admin-bar') && !img.closest('#admin-image-modal')) {
            const imgKey = img.id ? '#' + img.id : 'img:nth-of-type(' + (index + 1) + ')';
            editData.images[imgKey] = img.src;
          }
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(editData));

        // Notify parent if inside iframe
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({
            type: 'SCHOOL_WEB_SAVED',
            edits: editData,
            fullHtml: '<!DOCTYPE html>\n' + document.documentElement.outerHTML
          }, '*');
        }

        showAdminToast('✓ បានរក្សាទុកការកែប្រែទាំងអស់បានរហូតជោគជ័យ!');
      } catch (err) {
        showAdminToast('⚠️ រក្សាទុកបានតែមួយផ្នែក (រូបភាពអាចមានទំហំធំពេកសម្រាប់ LocalStorage)');
      }
    }

    // ==========================================
    // GITHUB DIRECT REDEPLOY FUNCTIONS
    // ==========================================
    function openGitHubConfigModal() {
      const modal = document.getElementById('admin-github-modal');
      const tokenInput = document.getElementById('inpage-gh-token');
      const ownerInput = document.getElementById('inpage-gh-owner');
      const repoInput = document.getElementById('inpage-gh-repo');
      const branchInput = document.getElementById('inpage-gh-branch');

      if (tokenInput) tokenInput.value = localStorage.getItem('gh_pat_token') || '';
      if (ownerInput) ownerInput.value = localStorage.getItem('gh_repo_owner') || 'romperb9-byte';
      if (repoInput) repoInput.value = localStorage.getItem('gh_repo_name') || 'school-website';
      if (branchInput) branchInput.value = localStorage.getItem('gh_repo_branch') || 'main';

      if (modal) modal.classList.remove('hidden');
    }

    function closeGitHubConfigModal() {
      const modal = document.getElementById('admin-github-modal');
      if (modal) modal.classList.add('hidden');
    }

    function saveGitHubConfig() {
      const token = document.getElementById('inpage-gh-token').value.trim();
      const owner = document.getElementById('inpage-gh-owner').value.trim();
      const repo = document.getElementById('inpage-gh-repo').value.trim();
      const branch = document.getElementById('inpage-gh-branch').value.trim() || 'main';

      if (token) localStorage.setItem('gh_pat_token', token);
      if (owner) localStorage.setItem('gh_repo_owner', owner);
      if (repo) localStorage.setItem('gh_repo_name', repo);
      localStorage.setItem('gh_repo_branch', branch);

      closeGitHubConfigModal();
      showAdminToast('✓ បានរក្សាទុកការកំណត់ GitHub រួចរាល់!');
    }

    // Listen for redeploy response from parent window
    window.addEventListener('message', function(ev) {
      if (ev.data && ev.data.type === 'REDEPLOY_RESULT') {
        const saveBtn = document.getElementById('admin-save-btn');
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<span>💾 រក្សាទុក & Redeploy</span>';
        }
        showAdminToast(ev.data.message);
      }
    });

    async function saveAndRedeployToGitHub() {
      // 1. First save edits locally in browser
      saveInPlaceAdminChanges();

      // Temporarily cleanup contenteditable before export
      const editables = document.querySelectorAll('[contenteditable]');
      editables.forEach(el => el.removeAttribute('contenteditable'));
      document.body.classList.remove('admin-editing');

      const cleanHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

      // Restore admin editing mode
      enableAdminMode();

      const saveBtn = document.getElementById('admin-save-btn');
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span>⏳ កំពុង Redeploy...</span>';
      }

      // If inside an iframe (such as App Preview), delegate to parent
      if (window.parent && window.parent !== window) {
        showAdminToast('🚀 កំពុងបញ្ជូនទិន្នន័យដើម្បី Redeploy ទៅកាន់ GitHub Pages...');
        window.parent.postMessage({
          type: 'REQUEST_REDEPLOY_FROM_PARENT',
          html: cleanHtml
        }, '*');
        return;
      }

      // If standalone page, run direct fetch
      const token = localStorage.getItem('gh_pat_token');
      const owner = localStorage.getItem('gh_repo_owner') || 'romperb9-byte';
      const repo = localStorage.getItem('gh_repo_name') || 'school-website';
      const branch = localStorage.getItem('gh_repo_branch') || 'main';

      if (!token) {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<span>💾 រក្សាទុក & Redeploy</span>';
        }
        showAdminToast('⚠️ សូមបញ្ចូល GitHub Token ដើម្បី Redeploy!');
        openGitHubConfigModal();
        return;
      }

      showAdminToast('🚀 កំពុង Push កូដថ្មីទៅកាន់ GitHub...');

      try {
        let fileSha = undefined;
        try {
          const fileCheck = await fetch('https://api.github.com/repos/' + owner + '/' + repo + '/contents/index.html', {
            headers: {
              'Authorization': 'Bearer ' + token.trim(),
              'Accept': 'application/vnd.github+json'
            }
          });
          if (fileCheck.ok) {
            const fileData = await fileCheck.json();
            fileSha = fileData.sha;
          }
        } catch (e) {
          console.warn('Could not check sha', e);
        }

        const utf8Bytes = new TextEncoder().encode(cleanHtml);
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Content = btoa(binary);

        const commitRes = await fetch('https://api.github.com/repos/' + owner + '/' + repo + '/contents/index.html', {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + token.trim(),
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: 'Admin in-page update & redeploy [skip ci]',
            content: base64Content,
            sha: fileSha,
            branch: branch
          })
        });

        if (!commitRes.ok) {
          const err = await commitRes.json();
          throw new Error(err.message || 'GitHub commit failed');
        }

        showAdminToast('🎉 Redeploy ជោគជ័យ! គេហទំព័រលើ GitHub Pages បាន Update ទិន្នន័យថ្មីទាំងស្រុង');
      } catch (err) {
        console.error(err);
        showAdminToast('❌ Redeploy បរាជ័យ: ' + (err.message || 'សូមពិនិត្យមើល Token'));
      } finally {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = '<span>💾 រក្សាទុក & Redeploy</span>';
        }
      }
    }

    function resetSavedEdits() {
      if (confirm('តើអ្នកពិតជាចង់លុបការកែប្រែ ហើយត្រឡប់ទៅទម្រង់ដើមវិញមែនទេ?')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    }

    function downloadInPlaceHtml() {
      // Temporarily cleanup contenteditable before export
      const editables = document.querySelectorAll('[contenteditable]');
      editables.forEach(el => el.removeAttribute('contenteditable'));
      document.body.classList.remove('admin-editing');

      const fullHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;

      // Restore editing
      enableAdminMode();

      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'school-website-updated.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showAdminToast('✓ បានទាញយកឯកសារ HTML ថ្មីដែលបានកែប្រែរួច!');
    }

    function logoutAdmin() {
      document.body.classList.remove('admin-editing');
      const bar = document.getElementById('floating-admin-bar');
      if (bar) bar.classList.add('hidden');

      const editables = document.querySelectorAll('[contenteditable]');
      editables.forEach(el => el.removeAttribute('contenteditable'));

      showAdminToast('បានចាកចេញពីរបៀប Admin');
    }

    function showAdminToast(msg) {
      let toast = document.getElementById('admin-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'admin-toast';
        toast.className = 'fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all duration-300';
        document.body.appendChild(toast);
      }
      toast.innerHTML = '<span>🔔</span> ' + msg;
      toast.style.display = 'flex';
      setTimeout(() => {
        if (toast) toast.style.display = 'none';
      }, 3500);
    }
  </script>
</body>
</html>`;
}

export function generateCanvaIframeSnippet(fullHtml: string): string {
  // Canva embed requires either a URL or an iframe with srcdoc or hosted URL
  const encodedHtml = encodeURIComponent(fullHtml);
  return `<!-- ============================================== -->
<!-- CANVA EMBED CODE (កូដសម្រាប់បិទភ្ជាប់ក្នុង CANVA) -->
<!-- 1. ក្នុង Canva ចុចលើ Apps -> ស្វែងរក Embeds -> បិទភ្ជាប់កូដខាងក្រោម -->
<!-- ============================================== -->
<iframe 
  srcdoc="${fullHtml.replace(/"/g, '&quot;')}"
  width="100%" 
  height="900px" 
  style="border: none; border-radius: 12px; width: 100%; min-height: 850px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" 
  loading="lazy"
  allowfullscreen>
</iframe>`;
}
