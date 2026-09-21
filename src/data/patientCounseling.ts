export interface PatientCounselingItem {
  caseId: string;
  patientName: string;
  chiefComplaintVoice: string; // The audio/speech script for the patient's voice
  amharicScript: string;
  amharicPhonetic: string;
  englishTranslation: string;
  counselingFocusPoints: {
    topic: string;
    amharic: string;
    english: string;
  }[];
}

export const PATIENT_COUNSELING_GUIDES: Record<string, PatientCounselingItem> = {
  'htn-01': {
    caseId: 'htn-01',
    patientName: 'Ato Kebede',
    chiefComplaintVoice:
      'Doctor, I have had this irritating tickling dry cough in my chest for three weeks now. I can barely sleep. Plus, my knee osteoarthritis has been very painful, so I bought Diclofenac from the pharmacy down my street, but now my headaches and blood pressure are getting worse.',
    amharicScript:
      'ጤና ይስጥልኝ አቶ ከበደ። ሳልዎ የተከሰተው ቀድመው ይወስዱት በነበረው የደም ግፊት መድኃኒት (ኢናላፕሪል/Enalapril) ምክንያት ነው። አሁን ወደ ሎዛርታን (Losartan) እንቀይርልዎታለን፤ ሳል አያመጣም። ለጉልበት ህመምዎ ደግሞ ዲክሎፌናክን ያቁሙና ፓራሲታሞል ይውሰዱ። በጾም ወቅት ደግሞ የውሃ እጥረት እንዳይኖር መድኃኒቱን ጾም ሲፈቱ ይውሰዱ።',
    amharicPhonetic:
      'Tena yistelegn Ato Kebede. Salwo yetekesetew qedmew yiwesdut beneberew yedem gifit medhanit (Enalapril) miknyat new. Ahun wede Losartan enkeyerliwotalen; sal ayametam. Legulbet himemwo degmo Diclofenac-n yaqumuna Paracetamol yiwesdu. Betsom weqt degmo yewuha etret endayinor medhanitun tsom sifetu yiwesdu.',
    englishTranslation:
      'Hello Ato Kebede. Your dry cough was caused by your previous blood pressure medication (Enalapril). We are switching you to Losartan, which does not cause cough. For your knee pain, please stop Diclofenac as it worsens your blood pressure and strains your kidneys; take Paracetamol instead. During fasting, adjust your dose to when you break your fast to avoid daytime dehydration.',
    counselingFocusPoints: [
      {
        topic: 'ACEi Induced Cough',
        amharic: 'የኢናላፕሪል ሳል በመድኃኒት ሽሮፕ አይድንም፤ መድኃኒቱን ወደ ሎዛርታን በመቀየር ብቻ ይጠፋል።',
        english: 'Explain that the cough is a known bradykinin side effect of Enalapril and will resolve within 1-2 weeks on Losartan.'
      },
      {
        topic: 'Avoiding NSAIDs (Diclofenac)',
        amharic: 'ዲክሎፌናክ የደም ግፊትን ስለሚጨምርና ኩላሊትን ስለሚጎዳ ማቆም አለብዎት።',
        english: 'Counsel on nephrotoxicity and BP blunting caused by OTC Diclofenac. Substitute with scheduled Paracetamol.'
      },
      {
        topic: 'Religious Fasting (Tsom) Guidance',
        amharic: 'በጾም ወቅት ጠዋት በባዶ ሆድ ከመውሰድ ይልቅ የጾም መፍቻ ሰዓት ላይ እንዲወስዱ እና በቂ ውሃ እንዲጠጡ።',
        english: 'Advise taking the antihypertensive dose in the evening with the fasting break meal, ensuring hydration.'
      }
    ]
  },
  'dm-02': {
    caseId: 'dm-02',
    patientName: 'W/ro Almaz',
    chiefComplaintVoice:
      'I feel dizzy, especially around eleven in the morning when I am doing housework. My urine output has also decreased slightly, and my legs feel heavy and swollen.',
    amharicScript:
      'ወይዘሮ አልማዝ፣ የመዞርና የድካም ስሜት የሚሰማዎት የስኳር መጠኑ ከመጠን በላይ በመቀነሱ (Hypoglycemia) ምክንያት ነው። ግሊቤንክላማይድ የኩላሊት ሥራ ሲቀንስ በሰውነት ውስጥ ስለሚከማች ማቆም አለብዎት። ለስኳርዎ ኢንሱሊን ወይም ዝቅተኛ ሜትፎርሚን እንጀምራለን። የማዞር ስሜት ሲመጣ ወዲያውኑ 2 የሻይ ማንኪያ ስኳር በውሃ በጥብጠው ይጠጡ።',
    amharicPhonetic:
      'Woizero Almaz, yemezorna yedikam simet yemisemawot yesukwar metenu kemeten belay bemeqenesu miknyat new. Glibenclamide yekulalit sira siqenes besewinet wust silemikemach maqum alebwot. Yemazor simet simeta wediyawnu 2 yeshay mankiya sukwar bewuha betbitew yitetu.',
    englishTranslation:
      'Woizero Almaz, your dizziness and fatigue are caused by hypoglycemia (low blood sugar). Because your kidney filtration has reduced, Glibenclamide accumulates in your body and must be discontinued. We will transition you to safer glycemic therapy. If you feel sudden sweating or dizziness, immediately take sugar water or fruit juice.',
    counselingFocusPoints: [
      {
        topic: 'Hypoglycemia Recognition',
        amharic: 'የስኳር ማነስ ምልክቶች፡ ማላብ፣ መንቀጥቀጥ፣ ማዞር እና ድካም።',
        english: 'Educate on recognizing and treating adrenergic symptoms of hypoglycemia immediately with 15g simple carbohydrates.'
      },
      {
        topic: 'Renal Elimination Impairment',
        amharic: 'ኩላሊት መድኃኒትን የማስወገድ አቅሟ ስለቀነሰ የተስተካከለ መጠን ያስፈልጋል።',
        english: 'Explain why previous long-acting pills are no longer safe due to reduced creatinine clearance.'
      }
    ]
  },
  'tb-03': {
    caseId: 'tb-03',
    patientName: 'Ato Dawit',
    chiefComplaintVoice:
      'I am currently on medication for both Tuberculosis and HIV. For the past two weeks, my urine and sweat have turned reddish-orange, and I am worried the HIV virus is not being suppressed because my fever came back.',
    amharicScript:
      'አቶ ዳዊት፣ የሽንትና ላብዎ ወደ ቀይ ወይም ብርቱካናማ መቀየር በሪፋምፒሲን (Rifampicin) የቲቢ መድኃኒት ምክንያት የሚከሰት የተለመደና ጉዳት የሌለው ነገር ነው። አትደንግጡ። ነገር ግን ሪፋምፒሲን የኤችአይቪ መድኃኒቱን (Dolutegravir) አቅም ስለሚቀንስ የኤችአይቪ መድኃኒቱን መጠን በእጥፍ (በቀን 2 ጊዜ) መውሰድ አለብዎት።',
    amharicPhonetic:
      'Ato Dawit, yeshintina labwo wede qey meqeyer be-Rifampicin ye-TB medhanit miknyat yemikeset yetelemadewina gudat yelelew neger new. Rifampicin ye-HIV medhanitun aqim silemiqenes, ye-Dolutegravir-n meten be-etif (beqen 2 gize) mewsed alebwot.',
    englishTranslation:
      'Ato Dawit, the orange/reddish discoloration of your urine and sweat is a harmless, expected effect of Rifampicin. However, because Rifampicin speeds up the breakdown of your HIV medication (Dolutegravir), you must take an extra 50mg dose in the evening to maintain complete viral suppression.',
    counselingFocusPoints: [
      {
        topic: 'Discoloration Reassurance',
        amharic: 'የፈሳሽ ወደ ቀይ መቀየር ጉዳት እንደሌለው በማስረዳት ፍርሃትን ማስወገጃ መስጠት።',
        english: 'Reassure patient regarding benign Rifampicin-induced bodily fluid chromaturia to ensure adherence.'
      },
      {
        topic: 'Dolutegravir Twice-Daily Schedule',
        amharic: 'የዶሉቴግራቪርን መድኃኒት በየ 12 ሰዓቱ በትክክል መውሰድ አለብዎት።',
        english: 'Emphasize the critical importance of the 50mg BID adjustment to prevent viral resistance while on anti-TB therapy.'
      }
    ]
  }
};
