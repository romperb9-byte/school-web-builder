import * as XLSX from 'xlsx';
import { SchoolData, AcademicProgram, FacultyMember, SchoolStat } from '../types/school';
import { DEFAULT_SCHOOL_DATA, CURATED_PHOTOS } from './defaultData';

/**
 * Downloads a ready-to-fill Khmer Excel template file (.xlsx)
 */
export function downloadSchoolExcelTemplate() {
  const wb = XLSX.utils.book_new();

  // 1. Sheet: ព័ត៌មានទូទៅ (General Info)
  const generalData = [
    ['ឈ្មោះវាល (Field)', 'តម្លៃ (Value)', 'ការណែនាំ (Description)'],
    ['ឈ្មោះសាលា (ខ្មែរ)', 'វិទ្យាល័យ និងសាលាអន្តរជាតិ សុវណ្ណភូមិ', 'ឈ្មោះពេញរបស់សាលារៀន'],
    ['ឈ្មោះសាលា (English)', 'Sovannaphum International School', 'ឈ្មោះជាភាសាអង់គ្លេស'],
    ['ពាក្យស្លោក', 'ចំណេះដឹង វិន័យ សីលធម៌ និងភាពជាអ្នកដឹកនាំ', 'ពាក្យស្លោក ឬបាវចនាសាលា'],
    ['ប្រភេទសាលា', 'សាលារៀនចំណេះទូទៅ និងអន្តរជាតិ', 'ឧ. វិទ្យាល័យរដ្ឋ / អន្តរជាតិ'],
    ['ឆ្នាំបង្កើត', '2008', 'ឆ្នាំបង្កើតសាលា (គ.ស)'],
    ['ចំណងជើងផ្ទាំងធំ (Hero)', 'កសាងអនាគតដ៏ភ្លឺស្វាងសម្រាប់បុត្រធីតារបស់លោកអ្នក', 'ចំណងជើងធំលើគេហទំព័រ'],
    ['ការពិពណ៌នាសង្ខេប', 'ផ្តល់ការអប់រំស្តង់ដារគុណភាពខ្ពស់ ផ្អែកលើកម្មវិធីសិក្សាជាតិ និងអន្តរជាតិ...', 'អត្ថបទរៀបរាប់បន្ថែម'],
    ['ប៊ូតុងចុះឈ្មោះ', 'ចុះឈ្មោះចូលរៀនឥឡូវនេះ', 'អក្សរលើប៊ូតុង'],
    ['អំពីសាលារៀន', 'សាលាយើងខ្ញុំត្រូវបានបង្កើតឡើងដោយឈរលើគោលការណ៍លើកកម្ពស់គុណភាពអប់រំ...', 'ប្រវត្តិ និងដំណើររឿង'],
    ['បេសកកម្ម', 'បណ្តុះបណ្តាលសិស្សឱ្យក្លាយជាពលរដ្ឋសកល ប្រកបដោយចំណេះដឹងជ្រៅជ្រះ...', 'បេសកកម្មសាលា'],
    ['ចក្ខុវិស័យ', 'ក្លាយជាគ្រឹះស្ថានអប់រំឈានមុខគេនៅក្នុងប្រទេសកម្ពុជា...', 'ចក្ខុវិស័យសាលា'],
    ['ឈ្មោះនាយកសាលា', 'លោកបណ្ឌិត ឡេង វុទ្ធី', 'ឈ្មោះនាយក ឬអ្នកដឹកនាំ'],
    ['តួនាទីនាយក', 'នាយកសាលា', 'តួនាទី'],
    ['សាររបស់នាយក', 'ការអប់រំជាពន្លឺបំភ្លឺគំនិត និងដួងចិត្តដើម្បីកសាងអនាគត...', 'សារស្វាគមន៍របស់នាយក'],
    ['លេខទូរស័ព្ទ', '012 345 678', 'លេខទាក់ទងទី១'],
    ['លេខទូរស័ព្ទទី២', '098 765 432', 'លេខទាក់ទងទី២'],
    ['អ៊ីមែល', 'info@school.edu.kh', 'អ៊ីមែលសាលា'],
    ['Telegram', 'https://t.me/sovannaphumschool', 'តំណភ្ជាប់ Telegram'],
    ['Facebook', 'https://facebook.com/sovannaphumschool', 'តំណភ្ជាប់ Facebook'],
    ['អាសយដ្ឋាន', 'ផ្លូវជាតិលេខ ៦A, សង្កាត់ជ្រោយចង្វារ, រាជធានីភ្នំពេញ', 'ទីតាំងសាលា'],
    ['ម៉ោងធ្វើការ', 'ចន្ទ - សៅរ៍: ៧:០០ ព្រឹក - ៥:៣០ ល្ងាច', 'ម៉ោងបើកបម្រើការ'],
    ['ដំណឹងចុះឈ្មោះ (Badge)', '🌟 ទទួលចុះឈ្មោះសិស្សថ្មី ឆ្នាំសិក្សា ២០២៦-២០២៧', 'ដំណឹងពិសេស'],
    ['រចនាប័ទ្ម (Style)', 'royal-khmer', 'ជម្រើស: royal-khmer / modern-tech / colorful-primary / elite-international / eco-green'],
  ];
  const wsGeneral = XLSX.utils.aoa_to_sheet(generalData);
  XLSX.utils.book_append_sheet(wb, wsGeneral, 'ព័ត៌មានទូទៅ');

  // 2. Sheet: កម្មវិធីសិក្សា (Academic Programs)
  const programsData = [
    ['ឈ្មោះកម្មវិធី', 'ឈ្មោះអង់គ្លេស', 'កម្រិតថ្នាក់_អាយុ', 'ការពិពណ៌នា', 'ចំណុចពិសេស (ខណ្ឌដោយសញ្ញាក្បៀស)', 'ផ្លាកសំគាល់'],
    ['កម្រិតមត្តេយ្យសិក្សា', 'Kindergarten', 'អាយុ ៣ - ៥ ឆ្នាំ', 'រៀនតាមរយៈការលេង និងការអនុវត្តជាក់ស្តែង បណ្តុះបណ្តាលភាសាខ្មែរ-អង់គ្លេស', 'ថ្នាក់រៀនម៉ាស៊ីនត្រជាក់, សួនកុមារសុវត្ថិភាព', 'ពេញនិយម'],
    ['កម្រិតបឋមសិក្សា', 'Primary Education', 'អាយុ ៦ - ១១ ឆ្នាំ', 'កម្មវិធីសិក្សាមូលដ្ឋានរឹងមាំ គណិតវិទ្យា ភាសាខ្មែរ វិទ្យាសាស្ត្រ', 'កម្មវិធីសិក្សាជាតិ, កីឡាហែលទឹក, កុំព្យូទ័រ', ''],
    ['កម្រិតអនុវិទ្យាល័យ', 'Secondary School', 'អាយុ ១២ - ១៤ ឆ្នាំ', 'ពង្រឹងការគិតបែបស៊ីជម្រៅ ការស្រាវជ្រាវវិទ្យាសាស្ត្រ', 'បន្ទប់ពិសោធន៍, ក្លឹបមនុស្សយន្ត Robotics', ''],
    ['កម្រិតវិទ្យាល័យ', 'High School', 'អាយុ ១៥ - ១៨ ឆ្នាំ', 'ផ្តោតលើថ្នាក់វិទ្យាសាស្ត្រពិត និងសង្គម ត្រៀមប្រឡងបាក់ឌុប', 'បំប៉នមុខវិជ្ជាស្នូល, ប្រឹក្សាអាហារូបករណ៍', 'និទ្ទេស A ច្រើន'],
  ];
  const wsPrograms = XLSX.utils.aoa_to_sheet(programsData);
  XLSX.utils.book_append_sheet(wb, wsPrograms, 'កម្មវិធីសិក្សា');

  // 3. Sheet: គ្រូបង្រៀន (Teachers)
  const teachersData = [
    ['ឈ្មោះគ្រូ', 'តួនាទី', 'មុខវិជ្ជា', 'កម្រិតវប្បធម៌_សញ្ញាបត្រ'],
    ['អ្នកគ្រូ ស៊ឹម ចិន្តា', 'ប្រធានដេប៉ាតឺម៉ង់គណិតវិទ្យា', 'គណិតវិទ្យាថ្នាក់ទី១២', 'អនុបណ្ឌិតគណិតវិទ្យា'],
    ['លោកគ្រូ សុខ វិសាល', 'គ្រូជំនាញរូបវិទ្យា & STEM', 'រូបវិទ្យា និងពិសោធន៍', 'បរិញ្ញាបត្រអប់រំ'],
    ['Mr. David Miller', 'Head of English', 'ESL / Cambridge English', 'MA in TESOL (UK)'],
  ];
  const wsTeachers = XLSX.utils.aoa_to_sheet(teachersData);
  XLSX.utils.book_append_sheet(wb, wsTeachers, 'គ្រូបង្រៀន');

  // 4. Sheet: ស្ថិតិសាលា (Statistics)
  const statsData = [
    ['ចំណងជើងស្ថិតិ', 'តួលេខ'],
    ['សិស្សានុសិស្សកំពុងសិក្សា', '២,៨៥០+'],
    ['លោកគ្រូ-អ្នកគ្រូជំនាញ', '១២០+'],
    ['អត្រាប្រឡងជាប់បាក់ឌុប', '៩៨.៥%'],
    ['ឆ្នាំនៃបទពិសោធន៍អប់រំ', '១៨ ឆ្នាំ'],
  ];
  const wsStats = XLSX.utils.aoa_to_sheet(statsData);
  XLSX.utils.book_append_sheet(wb, wsStats, 'ស្ថិតិសាលា');

  // Trigger browser download
  XLSX.writeFile(wb, 'គំរូឯកសារបញ្ចូលព័ត៌មានសាលារៀន_School_Template.xlsx');
}

/**
 * Parses an uploaded Excel (.xlsx, .xls) or CSV file into SchoolData
 */
export async function parseSchoolExcel(file: File): Promise<SchoolData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const result: SchoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));

        // Helper to find sheet by name
        const findSheet = (keywords: string[]) => {
          const sheetName = workbook.SheetNames.find(name => 
            keywords.some(kw => name.toLowerCase().includes(kw.toLowerCase()))
          );
          return sheetName ? workbook.Sheets[sheetName] : null;
        };

        // 1. Process General Info Sheet
        const generalSheet = findSheet(['ព័ត៌មានទូទៅ', 'ទូទៅ', 'general', 'info']) || workbook.Sheets[workbook.SheetNames[0]];
        if (generalSheet) {
          const rows: any[][] = XLSX.utils.sheet_to_json(generalSheet, { header: 1 });
          rows.forEach((row) => {
            if (!row || row.length < 2) return;
            const field = String(row[0] || '').trim().toLowerCase();
            const val = String(row[1] || '').trim();
            if (!val) return;

            if (field.includes('ឈ្មោះសាលា (ខ្មែរ)') || (field.includes('ឈ្មោះសាលា') && !field.includes('eng')) || field === 'school name kh') {
              result.nameKh = val;
            } else if (field.includes('ឈ្មោះសាលា (english)') || field.includes('english') || field === 'school name en') {
              result.nameEn = val;
            } else if (field.includes('ពាក្យស្លោក') || field.includes('motto') || field.includes('slogan')) {
              result.sloganKh = val;
            } else if (field.includes('ប្រភេទសាលា') || field.includes('type')) {
              result.schoolType = val;
            } else if (field.includes('ឆ្នាំបង្កើត') || field.includes('year')) {
              result.establishedYear = val;
            } else if (field.includes('ចំណងជើងផ្ទាំងធំ') || field.includes('hero title')) {
              result.hero.title = val;
            } else if (field.includes('ការពិពណ៌នាសង្ខេប') || field.includes('hero subtitle')) {
              result.hero.subtitle = val;
            } else if (field.includes('ប៊ូតុងចុះឈ្មោះ') || field.includes('cta')) {
              result.hero.ctaPrimary = val;
            } else if (field.includes('អំពីសាលារៀន') || field.includes('about') || field.includes('ប្រវត្តិ')) {
              result.about.story = val;
            } else if (field.includes('បេសកកម្ម') || field.includes('mission')) {
              result.about.mission = val;
            } else if (field.includes('ចក្ខុវិស័យ') || field.includes('vision')) {
              result.about.vision = val;
            } else if (field.includes('ឈ្មោះនាយក') || field.includes('principal name')) {
              result.principal.name = val;
            } else if (field.includes('តួនាទីនាយក') || field.includes('principal role')) {
              result.principal.role = val;
            } else if (field.includes('សាររបស់នាយក') || field.includes('principal message')) {
              result.principal.message = val;
            } else if (field.includes('លេខទូរស័ព្ទទី២')) {
              result.contact.secondaryPhone = val;
            } else if (field.includes('លេខទូរស័ព្ទ') || field.includes('phone') || field.includes('tel')) {
              result.contact.phone = val;
            } else if (field.includes('អ៊ីមែល') || field.includes('email')) {
              result.contact.email = val;
            } else if (field.includes('telegram')) {
              result.contact.telegramChannel = val;
            } else if (field.includes('facebook')) {
              result.contact.facebookPage = val;
            } else if (field.includes('អាសយដ្ឋាន') || field.includes('address') || field.includes('ទីតាំង')) {
              result.contact.address = val;
            } else if (field.includes('ម៉ោងធ្វើការ') || field.includes('hour')) {
              result.contact.workingHours = val;
            } else if (field.includes('ដំណឹងចុះឈ្មោះ') || field.includes('badge')) {
              result.hero.badge = val;
              result.admissions.badge = val;
            } else if (field.includes('រចនាប័ទ្ម') || field.includes('style') || field.includes('theme')) {
              const themeVal = val.toLowerCase();
              if (['royal-khmer', 'modern-tech', 'colorful-primary', 'elite-international', 'eco-green'].includes(themeVal)) {
                result.styleConfig.themeId = themeVal as any;
              }
            }
          });
        }

        // 2. Process Programs Sheet
        const progSheet = findSheet(['កម្មវិធីសិក្សា', 'កម្មវិធី', 'programs', 'courses']);
        if (progSheet) {
          const progRows: any[][] = XLSX.utils.sheet_to_json(progSheet, { header: 1 });
          const parsedPrograms: AcademicProgram[] = [];
          
          // skip header row
          for (let i = 1; i < progRows.length; i++) {
            const r = progRows[i];
            if (!r || !r[0]) continue;
            
            const title = String(r[0] || '').trim();
            const titleEn = r[1] ? String(r[1]).trim() : undefined;
            const gradeLevel = r[2] ? String(r[2]).trim() : 'គ្រប់កម្រិត';
            const description = r[3] ? String(r[3]).trim() : '';
            const featuresRaw = r[4] ? String(r[4]).trim() : '';
            const tag = r[5] ? String(r[5]).trim() : undefined;

            const features = featuresRaw
              ? featuresRaw.split(/[,،、]/).map(s => s.trim()).filter(Boolean)
              : ['កម្មវិធីស្តង់ដារ', 'គ្រូមានបទពិសោធន៍'];

            const photoIdx = (i - 1) % CURATED_PHOTOS.classrooms.length;
            parsedPrograms.push({
              id: 'prog_' + i + '_' + Date.now(),
              title,
              titleEn,
              gradeLevel,
              description,
              features,
              tag,
              image: CURATED_PHOTOS.classrooms[photoIdx],
            });
          }

          if (parsedPrograms.length > 0) {
            result.programs = parsedPrograms;
          }
        }

        // 3. Process Teachers Sheet
        const teachSheet = findSheet(['គ្រូបង្រៀន', 'គ្រូ', 'teachers', 'faculty']);
        if (teachSheet) {
          const teachRows: any[][] = XLSX.utils.sheet_to_json(teachSheet, { header: 1 });
          const parsedTeachers: FacultyMember[] = [];

          for (let i = 1; i < teachRows.length; i++) {
            const r = teachRows[i];
            if (!r || !r[0]) continue;

            const name = String(r[0] || '').trim();
            const role = r[1] ? String(r[1]).trim() : 'គ្រូបង្រៀន';
            const subject = r[2] ? String(r[2]).trim() : 'មុខវិជ្ជាទូទៅ';
            const qualification = r[3] ? String(r[3]).trim() : 'បរិញ្ញាបត្រ';

            const photoIdx = (i - 1) % CURATED_PHOTOS.principals.length;
            parsedTeachers.push({
              id: 't_' + i + '_' + Date.now(),
              name,
              role,
              subject,
              qualification,
              photoUrl: CURATED_PHOTOS.principals[photoIdx],
            });
          }

          if (parsedTeachers.length > 0) {
            result.teachers = parsedTeachers;
          }
        }

        // 4. Process Stats Sheet
        const statsSheet = findSheet(['ស្ថិតិ', 'stats', 'statistics']);
        if (statsSheet) {
          const statsRows: any[][] = XLSX.utils.sheet_to_json(statsSheet, { header: 1 });
          const parsedStats: SchoolStat[] = [];

          for (let i = 1; i < statsRows.length; i++) {
            const r = statsRows[i];
            if (!r || !r[0]) continue;

            const label = String(r[0] || '').trim();
            const value = r[1] ? String(r[1]).trim() : '';

            parsedStats.push({
              id: 's_' + i,
              label,
              value,
              icon: i === 1 ? 'Users' : i === 2 ? 'GraduationCap' : i === 3 ? 'Award' : 'Clock',
            });
          }

          if (parsedStats.length > 0) {
            result.stats = parsedStats;
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
