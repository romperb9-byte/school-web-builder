import { SchoolData, ThemeId } from '../types/school';

export const THEME_PRESETS: Record<ThemeId, {
  nameKh: string;
  nameEn: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  fontTitle: 'Moul' | 'Koulen' | 'Kantumruy Pro' | 'Battambang';
  fontBody: 'Kantumruy Pro' | 'Battambang' | 'Siemreap';
  borderRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  bgHeroGradient: string;
  badgeStyle: string;
}> = {
  'royal-khmer': {
    nameKh: 'បែបផ្លូវការ & អប់រំប្រពៃណី',
    nameEn: 'Classic Royal Academic',
    description: 'ស័ក្តិសមសម្រាប់វិទ្យាល័យរដ្ឋ និងគ្រឹះស្ថានអប់រំស្តង់ដារ ពណ៌ខៀវចាស់ និងមាស',
    primaryColor: '#0f2b5c',
    accentColor: '#d97706',
    fontTitle: 'Moul',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-xl',
    bgHeroGradient: 'from-slate-900/90 via-blue-950/80 to-slate-900/90',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  },
  'modern-tech': {
    nameKh: 'បែបទំនើប & បច្ចេកវិទ្យា STEM',
    nameEn: 'Modern STEM & Innovation',
    description: 'រចនាប័ទ្មបែបបច្ចេកវិទ្យា រលោង ពណ៌ខៀវអគ្គិសនី និងបៃតងត្បូងមរកត',
    primaryColor: '#0284c7',
    accentColor: '#06b6d4',
    fontTitle: 'Koulen',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-2xl',
    bgHeroGradient: 'from-slate-950/90 via-sky-950/80 to-slate-900/90',
    badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
  },
  'colorful-primary': {
    nameKh: 'ស្រស់បំព្រង មត្តេយ្យ & បឋម',
    nameEn: 'Playful Kids & Primary',
    description: 'ពោរពេញដោយភាពរីករាយ ពណ៌ទឹកក្រូចផ្កាឈូក និងលឿង ស័ក្តិសមសម្រាប់កុមារ',
    primaryColor: '#ea580c',
    accentColor: '#10b981',
    fontTitle: 'Koulen',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-3xl',
    bgHeroGradient: 'from-orange-950/80 via-amber-950/70 to-yellow-950/80',
    badgeStyle: 'bg-orange-500/20 text-orange-200 border-orange-400/40',
  },
  'elite-international': {
    nameKh: 'អន្តរជាតិ & ប្រណិត (Bilingual)',
    nameEn: 'Elite International School',
    description: 'ទម្រង់សាលាអន្តរជាតិ ខ្មែរ-អង់គ្លេស ពណ៌ត្បូងទទឹម និងប្រាក់រលើប',
    primaryColor: '#881337',
    accentColor: '#f59e0b',
    fontTitle: 'Moul',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-2xl',
    bgHeroGradient: 'from-zinc-950/90 via-rose-950/80 to-zinc-900/90',
    badgeStyle: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
  },
  'eco-green': {
    nameKh: 'ធម្មជាតិ & សុខុមាលភាព',
    nameEn: 'Eco Green Campus',
    description: 'បរិស្ថានបៃតង ស្រស់ស្រាយ ផ្តោតលើភាពស្ងប់ស្ងាត់ និងបញ្ញាស្មារតី',
    primaryColor: '#047857',
    accentColor: '#84cc16',
    fontTitle: 'Koulen',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-xl',
    bgHeroGradient: 'from-stone-950/90 via-emerald-950/80 to-stone-900/90',
    badgeStyle: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
  },
};

export const CURATED_PHOTOS = {
  logos: [
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&auto=format&fit=crop&q=80',
  ],
  campuses: [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
  ],
  classrooms: [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
  ],
  labs: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
  ],
  activities: [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
  ],
  principals: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  ],
};

export const DEFAULT_SCHOOL_DATA: SchoolData = {
  nameKh: 'វិទ្យាល័យ និងសាលាអន្តរជាតិ សុវណ្ណភូមិ',
  nameEn: 'Sovannaphum International & General High School',
  sloganKh: 'ចំណេះដឹង វិន័យ សីលធម៌ និងភាពជាអ្នកដឹកនាំសម្រាប់អនាគត',
  sloganEn: 'Knowledge, Discipline, Morality, and Leadership for Tomorrow',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop&q=80',
  establishedYear: '2008',
  schoolType: 'សាលារៀនចំណេះទូទៅ និងអន្តរជាតិ (មត្តេយ្យ ដល់ ថ្នាក់ទី១២)',

  hero: {
    badge: '🌟 ទទួលចុះឈ្មោះសិស្សថ្មី ឆ្នាំសិក្សា ២០២៦-២០២៧',
    title: 'កសាងអនាគតដ៏ភ្លឺស្វាងសម្រាប់បុត្រធីតារបស់លោកអ្នក',
    subtitle: 'ផ្តល់ការអប់រំស្តង់ដារគុណភាពខ្ពស់ ផ្អែកលើកម្មវិធីសិក្សាជាតិ និងអន្តរជាតិ បំពាក់ដោយបច្ចេកវិទ្យាទំនើប និងគ្រូបង្រៀនមានបទពិសោធន៍ខ្ពស់។',
    ctaPrimary: 'ចុះឈ្មោះចូលរៀនឥឡូវនេះ',
    ctaSecondary: 'ស្វែងយល់ពីកម្មវិធីសិក្សា',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80',
  },

  stats: [
    { id: '1', label: 'សិស្សានុសិស្សកំពុងសិក្សា', value: '២,៨៥០+', icon: 'Users' },
    { id: '2', label: 'លោកគ្រូ-អ្នកគ្រូជំនាញ', value: '១២០+', icon: 'GraduationCap' },
    { id: '3', label: 'អត្រាប្រឡងជាប់បាក់ឌុប', value: '៩៨.៥%', icon: 'Award' },
    { id: '4', label: 'ឆ្នាំនៃបទពិសោធន៍អប់រំ', value: '១៨ ឆ្នាំ', icon: 'Clock' },
  ],

  about: {
    title: 'អំពីសាលារបស់យើងខ្ញុំ',
    story: 'សាលាយើងខ្ញុំត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ២០០៨ ដោយឈរលើគោលការណ៍លើកកម្ពស់គុណភាពអប់រំ និងការអភិវឌ្ឍសមត្ថភាពសិស្សលើគ្រប់វិស័យ។ យើងប្តេជ្ញាបង្កើតបរិយាកាសសិក្សាដែលមានសុវត្ថិភាព ផាសុកភាព និងទំនើបទាន់សម័យ។',
    mission: 'បណ្តុះបណ្តាលសិស្សឱ្យក្លាយជាពលរដ្ឋសកល ប្រកបដោយចំណេះដឹងជ្រៅជ្រះ គំនិតច្នៃប្រឌិត និងស្មារតីទទួលខុសត្រូវខ្ពស់។',
    vision: 'ក្លាយជាគ្រឹះស្ថានអប់រំឈានមុខគេនៅក្នុងប្រទេសកម្ពុជា ដែលទទួលស្គាល់ទាំងកម្រិតជាតិ និងអន្តរជាតិ។',
    coreValues: [
      'គុណភាពអប់រំជាចម្បង',
      'សីលធម៌ និងការគោរពគ្នាទៅវិញទៅមក',
      'ភាពច្នៃប្រឌិត និងការស្រាវជ្រាវបែប STEM',
      'ការទទួលខុសត្រូវក្នុងសង្គម',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
  },

  principal: {
    name: 'លោកបណ្ឌិត ឡេង វុទ្ធី',
    role: 'នាយកសាលា',
    message: '«ការអប់រំមិនមែនត្រឹមតែជាការបំពេញចំណេះដឹងក្នុងក្បាលនោះទេ តែជាការបំភ្លឺភ្លើងគំនិត និងដួងចិត្តដើម្បីកសាងអនាគត។ យើងខ្ញុំសូមស្វាគមន៍យ៉ាងកក់ក្តៅចំពោះមាតាបិតា និងសិស្សានុសិស្សទាំងអស់!»',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },

  programs: [
    {
      id: 'p1',
      title: 'កម្រិតមត្តេយ្យសិក្សា',
      titleEn: 'Kindergarten & Early Years',
      gradeLevel: 'អាយុ ៣ - ៥ ឆ្នាំ',
      description: 'រៀនតាមរយៈការលេង និងការអនុវត្តជាក់ស្តែង បណ្តុះបណ្តាលភាសាខ្មែរ-អង់គ្លេស ចំណេះដឹងទូទៅ និងបំណិនសង្គម។',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      features: ['ថ្នាក់រៀនបំពាក់ម៉ាស៊ីនត្រជាក់', 'សួនកុមារសុវត្ថិភាព', 'អាហារូបត្ថម្ភត្រឹមត្រូវតាមកម្រិត'],
      tag: 'ពេញនិយម',
    },
    {
      id: 'p2',
      title: 'កម្រិតបឋមសិក្សា (ថ្នាក់ទី១ - ទី៦)',
      titleEn: 'Primary Education',
      gradeLevel: 'អាយុ ៦ - ១១ ឆ្នាំ',
      description: 'កម្មវិធីសិក្សាមូលដ្ឋានរឹងមាំ គណិតវិទ្យា ភាសាខ្មែរ វិទ្យាសាស្ត្រ និងភាសាអង់គ្លេសប្រចាំថ្ងៃ។',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80',
      features: ['កម្មវិធីសិក្សាជាតិ + សិង្ហបុរី', 'កីឡាហែលទឹក និងតន្ត្រី', 'រៀនកុំព្យូទ័រកម្រិតដំបូង'],
    },
    {
      id: 'p3',
      title: 'កម្រិតអនុវិទ្យាល័យ (ថ្នាក់ទី៧ - ទី៩)',
      titleEn: 'Secondary School',
      gradeLevel: 'អាយុ ១២ - ១៤ ឆ្នាំ',
      description: 'ពង្រឹងការគិតបែបស៊ីជម្រៅ ការស្រាវជ្រាវវិទ្យាសាស្ត្រ និងការត្រៀមប្រឡងឌីប្លូម។',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
      features: ['បន្ទប់ពិសោធន៍រូបវិទ្យា/គីមី', 'ក្លឹបមនុស្សយន្ត (Robotics)', 'ភាសាបរទេសទីពីរ (ចិន)'],
    },
    {
      id: 'p4',
      title: 'កម្រិតវិទ្យាល័យ (ថ្នាក់ទី១០ - ទី១២)',
      titleEn: 'High School (Bac II)',
      gradeLevel: 'អាយុ ១៥ - ១៨ ឆ្នាំ',
      description: 'ផ្តោតលើថ្នាក់វិទ្យាសាស្ត្រពិត និងសង្គម ត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (បាក់ឌុប) និទ្ទេស A។',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80',
      features: ['បំប៉នពិសេសមុខវិជ្ជាស្នូល', 'ប្រឹក្សាយោបល់អាហារូបករណ៍', 'ការត្រៀមចូលសាកលវិទ្យាល័យ'],
      tag: 'និទ្ទេស A ច្រើនបំផុត',
    },
  ],

  teachers: [
    {
      id: 't1',
      name: 'អ្នកគ្រូ ស៊ឹម ចិន្តា',
      role: 'ប្រធានដេប៉ាតឺម៉ង់គណិតវិទ្យា',
      subject: 'គណិតវិទ្យាថ្នាក់ទី១២',
      qualification: 'អនុបណ្ឌិតគណិតវិទ្យា',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 't2',
      name: 'លោកគ្រូ សុខ វិសាល',
      role: 'គ្រូជំនាញរូបវិទ្យា & STEM',
      subject: 'រូបវិទ្យា និងពិសោធន៍',
      qualification: 'បរិញ្ញាបត្រអប់រំរូបវិទ្យា',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 't3',
      name: 'Mr. David Miller',
      role: 'Head of English Program',
      subject: 'ESL / Cambridge English',
      qualification: 'MA in TESOL (UK)',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  ],

  gallery: [
    { id: 'g1', title: 'ពិធីចែកសញ្ញាបត្រសិស្សឆ្នើម', category: 'កម្មវិធីប្រចាំឆ្នាំ', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80' },
    { id: 'g2', title: 'សកម្មភាពពិសោធន៍វិទ្យាសាស្ត្រ STEM', category: 'ការសិក្សា', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80' },
    { id: 'g3', title: 'បណ្ណាល័យស្វ័យសិក្សាទំនើប', category: 'បរិវេណសាលា', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80' },
    { id: 'g4', title: 'ទិវាកីឡា និងសុខភាពសិស្សានុសិស្ស', category: 'កីឡា', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80' },
  ],

  admissions: {
    isOpen: true,
    title: 'ការចុះឈ្មោះចូលរៀន ឆ្នាំសិក្សាថ្មី ២០២៦-២០២៧',
    badge: 'បញ្ចុះតម្លៃ ២០% សម្រាប់ការចុះឈ្មោះមុនកាលកំណត់',
    deadline: 'ថ្ងៃទី ៣០ ខែ វិច្ឆិកា ឆ្នាំ ២០២៦',
    description: 'សាលារៀនយើងខ្ញុំបើកទទួលពាក្យចុះឈ្មោះសិស្សានុសិស្សគ្រប់កម្រិតថ្នាក់។ សូមរួសរាន់ទាក់ទងមកកាន់ការិយាល័យរដ្ឋបាលដើម្បីទទួលបានការបញ្ចុះតម្លៃពិសេស!',
    steps: [
      'បំពេញទម្រង់ពាក្យស្នើសុំតាមអនឡាញ ឬមកសាលាផ្ទាល់',
      'ធ្វើតេស្តវាស់កម្រិតសមត្ថភាព (ភាសា និងគណិតវិទ្យា)',
      'ជួបពិភាក្សាជាមួយគណៈគ្រប់គ្រង និងបង់ថ្លៃសិក្សា',
      'ទទួលបានឯកសណ្ឋាន និងចាប់ផ្តើមចូលរៀន',
    ],
    documents: [
      'សំបុត្រកំណើតសិស្ស (ថតចម្លង)',
      'សៀវភៅតាមដានការសិក្សា ឬលិខិតផ្ទេរការសិក្សា',
      'រូបថត 4x6 ចំនួន ៤ សន្លឹក',
      'អត្តសញ្ញាណប័ណ្ណឪពុកម្តាយ (ថតចម្លង)',
    ],
    feeNote: 'មានអាហារូបករណ៍រហូតដល់ ៥០% សម្រាប់សិស្សនិទ្ទេសល្អ!',
    applyLink: '#contact',
  },

  contact: {
    address: 'ផ្លូវជាតិលេខ ៦A, សង្កាត់ជ្រោយចង្វារ, ខណ្ឌជ្រោយចង្វារ, រាជធានីភ្នំពេញ',
    phone: '012 345 678',
    secondaryPhone: '098 765 432',
    email: 'info@sovannaphum-school.edu.kh',
    telegramChannel: 'https://t.me/sovannaphumschool',
    facebookPage: 'https://facebook.com/sovannaphumschool',
    workingHours: 'ចន្ទ - សៅរ៍: ៧:០០ ព្រឹក - ៥:៣០ ល្ងាច',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.770617326857!2d104.9282!3d11.5833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM0JzU5LjkiTiAxMDTCsDU1JzQxLjUiRQ!5e0!3m2!1sen!2skh!4v1600000000000',
  },

  styleConfig: {
    themeId: 'royal-khmer',
    primaryColor: '#0f2b5c',
    accentColor: '#d97706',
    fontTitle: 'Moul',
    fontBody: 'Kantumruy Pro',
    borderRadius: 'rounded-xl',
    showHeroStats: true,
    showPrincipal: true,
    showPrograms: true,
    showAdmissions: true,
    showGallery: true,
    showTeachers: true,
    showContact: true,
    showEnrollmentModal: true,
  },
};

export const PRESET_SCHOOLS: { id: string; label: string; desc: string; data: Partial<SchoolData> }[] = [
  {
    id: 'international',
    label: 'សាលាអន្តរជាតិ សុវណ្ណភូមិ (Bilingual)',
    desc: 'ទម្រង់ទ្វេភាសា ខ្មែរ-អង់គ្លេស ជាមួយ STEM & Cambridge',
    data: DEFAULT_SCHOOL_DATA,
  },
  {
    id: 'public-high',
    label: 'វិទ្យាល័យ ហ៊ុន សែន ភ្នំពេញថ្មី (វិទ្យាល័យរដ្ឋ)',
    desc: 'ទម្រង់សាលារដ្ឋ ឬសាលារៀនជំនាន់ថ្មី ផ្តោតលើបាក់ឌុប និងវិន័យ',
    data: {
      nameKh: 'វិទ្យាល័យ ហ៊ុន សែន ភ្នំពេញថ្មី',
      nameEn: 'Hun Sen Phnom Penh Thmey High School',
      sloganKh: 'វិន័យនាំមកនូវសេចក្តីថ្លៃថ្នូរ ចំណេះវិជ្ជាជាពន្លឺបំភ្លឺជីវិត',
      sloganEn: 'Discipline Brings Dignity, Knowledge Lights Up Life',
      schoolType: 'វិទ្យាល័យចំណេះទូទៅរដ្ឋ (ថ្នាក់ទី៧ ដល់ ទី១២)',
      hero: {
        badge: '🇰🇭 សាលារៀនគំរូទូទាំងប្រទេស',
        title: 'វិទ្យាល័យ ហ៊ុន សែន ភ្នំពេញថ្មី',
        subtitle: 'បណ្តុះបណ្តាលសិស្សពូកែទូទាំងប្រទេស អត្រាជាប់បាក់ឌុបនិទ្ទេស A ខ្ពស់បំផុត និងបរិស្ថានសិក្សាស្អាតបៃតង។',
        ctaPrimary: 'ព័ត៌មានចុះឈ្មោះចូលរៀន',
        ctaSecondary: 'មើលស្នាដៃសិស្សឆ្នើម',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80',
      },
      styleConfig: {
        ...DEFAULT_SCHOOL_DATA.styleConfig,
        themeId: 'royal-khmer',
        primaryColor: '#1e3a8a',
        accentColor: '#b45309',
        fontTitle: 'Moul',
      },
    },
  },
  {
    id: 'kids-primary',
    label: 'សាលាមត្តេយ្យ និងបឋមសិក្សា ត្រួយខ្ចី',
    desc: 'សម្រាប់សាលាកុមារតូចៗ ស្រស់បំព្រង សប្បាយរីករាយ និងកក់ក្តៅ',
    data: {
      nameKh: 'សាលាមត្តេយ្យ និងបឋមសិក្សា ត្រួយខ្ចី',
      nameEn: 'Bright Sprout Kindergarten & Primary School',
      sloganKh: 'រៀនដោយរីករាយ លូតលាស់ដោយក្តីស្រឡាញ់ និងការយកចិត្តទុកដាក់',
      sloganEn: 'Learn with Joy, Grow with Love and Care',
      schoolType: 'សាលាមត្តេយ្យ និងបឋមសិក្សា',
      hero: {
        badge: '🎈 ស្វាគមន៍ប្អូនៗមកកាន់ផ្ទះទី២ដ៏កក់ក្តៅ',
        title: 'កន្លែងលេង និងរៀនសូត្រដ៏រីករាយរបស់កុមារ',
        subtitle: 'យើងបណ្តុះបំណិនច្នៃប្រឌិត ភាសា និងសីលធម៌តាមរយៈវិធីសាស្ត្រ Montessori និងការលេងបែបអប់រំ។',
        ctaPrimary: 'ចុះឈ្មោះទស្សនាសាលា',
        ctaSecondary: 'កម្មវិធីសិក្សាកុមារ',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80',
      },
      styleConfig: {
        ...DEFAULT_SCHOOL_DATA.styleConfig,
        themeId: 'colorful-primary',
        primaryColor: '#ea580c',
        accentColor: '#10b981',
        fontTitle: 'Koulen',
      },
    },
  },
  {
    id: 'stem-tech',
    label: 'វិទ្យាស្ថានបច្ចេកវិទ្យា & STEM កម្ពុជា',
    desc: 'ទម្រង់បច្ចេកវិទ្យា Coding, AI, Robotics និងវិស្វកម្ម',
    data: {
      nameKh: 'វិទ្យាស្ថានបច្ចេកវិទ្យា & STEM កម្ពុជា',
      nameEn: 'Cambodia STEM & Robotics Academy',
      sloganKh: 'ច្នៃប្រឌិតបច្ចេកវិទ្យា កសាងអនាគតឌីជីថល',
      sloganEn: 'Innovate Technology, Shape the Digital Future',
      schoolType: 'វិទ្យាស្ថានបច្ចេកវិទ្យា និងវិទ្យាសាស្ត្រកុំព្យូទ័រ',
      hero: {
        badge: '⚡ កម្មវិធីសិក្សា Coding, Robotics & AI ឆ្នាំ២០២៦',
        title: 'បណ្តុះទេពកោសល្យបច្ចេកវិទ្យាវ័យក្មេង',
        subtitle: 'រៀនបង្កើតកម្មវិធី កូដមនុស្សយន្ត បញ្ញាសិប្បនិម្មិត (AI) និងការស្រាវជ្រាវវិទ្យាសាស្ត្រតាមស្តង់ដារអន្តរជាតិ។',
        ctaPrimary: 'ចុះឈ្មោះចូលរៀន STEM',
        ctaSecondary: 'ទស្សនាបន្ទប់ពិសោធន៍',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=80',
      },
      styleConfig: {
        ...DEFAULT_SCHOOL_DATA.styleConfig,
        themeId: 'modern-tech',
        primaryColor: '#0284c7',
        accentColor: '#06b6d4',
        fontTitle: 'Koulen',
      },
    },
  },
];
