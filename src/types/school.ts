export interface SchoolStat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface AcademicProgram {
  id: string;
  title: string;
  titleEn?: string;
  gradeLevel: string;
  description: string;
  image: string;
  features: string[];
  tag?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  photoUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface AdmissionInfo {
  isOpen: boolean;
  title: string;
  badge: string;
  deadline: string;
  description: string;
  steps: string[];
  documents: string[];
  feeNote: string;
  applyLink: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  telegramChannel: string;
  facebookPage: string;
  workingHours: string;
  mapEmbedUrl: string;
}

export type ThemeId = 'royal-khmer' | 'modern-tech' | 'colorful-primary' | 'elite-international' | 'eco-green';

export interface StyleConfig {
  themeId: ThemeId;
  primaryColor: string;
  accentColor: string;
  fontTitle: 'Moul' | 'Koulen' | 'Kantumruy Pro' | 'Battambang';
  fontBody: 'Kantumruy Pro' | 'Battambang' | 'Siemreap';
  borderRadius: 'rounded-md' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  showHeroStats: boolean;
  showPrincipal: boolean;
  showPrograms: boolean;
  showAdmissions: boolean;
  showGallery: boolean;
  showTeachers: boolean;
  showContact: boolean;
  showEnrollmentModal: boolean;
}

export interface SchoolData {
  nameKh: string;
  nameEn: string;
  sloganKh: string;
  sloganEn: string;
  logoUrl: string;
  establishedYear: string;
  schoolType: string;
  
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImageUrl: string;
  };
  
  stats: SchoolStat[];
  
  about: {
    title: string;
    story: string;
    mission: string;
    vision: string;
    coreValues: string[];
    imageUrl: string;
  };
  
  principal: {
    name: string;
    role: string;
    message: string;
    photoUrl: string;
  };
  
  programs: AcademicProgram[];
  teachers: FacultyMember[];
  gallery: GalleryItem[];
  admissions: AdmissionInfo;
  contact: ContactInfo;
  styleConfig: StyleConfig;
}
