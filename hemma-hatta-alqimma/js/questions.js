/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * وحدة بنك الأسئلة الشامل والمدقق لغوياً ومعرفياً
 * جميع الأسئلة بصياغة عربية فصيحة ومباشرة مع 4 خيارات واقعية ومميزة.
 */

(function (window) {
  'use strict';

  // 1. التصنيفات العشرون المعتمدة
  const CATEGORIES = {
    GENERAL: 'معلومات عامة',
    HISTORY: 'تاريخ',
    GEOGRAPHY: 'جغرافيا',
    SCIENCE: 'علوم',
    TECHNOLOGY: 'تكنولوجيا',
    MATH: 'رياضيات',
    SPORTS: 'رياضة',
    FOOTBALL: 'كرة قدم',
    LITERATURE: 'أدب',
    ARABIC: 'اللغة العربية',
    ISLAMIC: 'ثقافة إسلامية',
    ASTRONOMY: 'فلك وفضاء',
    ANIMALS: 'عالم الحيوان',
    CAPITALS: 'دول وعواصم',
    INVENTIONS: 'اختراعات واكتشافات',
    ANATOMY: 'جسم الإنسان',
    PERSONALITIES: 'شخصيات مشهورة',
    ART: 'فنون وثقافة',
    NATURE: 'طبيعة وبيئة',
    WORLD_FACTS: 'حقائق حول العالم'
  };

  // 2. مستويات الصعوبة
  const DIFFICULTIES = {
    EASY: 'easy',          // المستويات 1–3
    MEDIUM: 'medium',      // المستويات 4–6
    HARD: 'hard',          // المستويات 7–8
    VERY_HARD: 'very_hard' // المستويات 9–10 (قمة التحدي)
  };

  /**
   * بنك الأسئلة المرجعي الكامل والمراجع لغوياً وعلمياً
   * ملاحظة: الخيار الأول في المصفوفة [0] هو الإجابة الصحيحة دائماً،
   * ويتم خلط الخيارات عشوائياً برمجياً عند بدء كل لعبة.
   */
  const MASTER_QUESTION_BANK = [
    // ==========================================
    // 1. ثقافة إسلامية وسيرة نبوية
    // ==========================================
    {
      id: "q_isl_001",
      question: "ما هي أطول سورة في القرآن الكريم؟",
      answers: ["سورة البقرة", "سورة آل عمران", "سورة النساء", "سورة المائدة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_002",
      question: "ما هي أقصر سورة في القرآن الكريم؟",
      answers: ["سورة الكوثر", "سورة الإخلاص", "سورة الفلق", "سورة النصر"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_003",
      question: "كم عدد سور القرآن الكريم؟",
      answers: ["114 سورة", "110 سور", "120 سورة", "112 سورة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_004",
      question: "من هو أول الخلفاء الراشدين؟",
      answers: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_005",
      question: "ما هي السورة القرآنية التي لا تبدأ بالبسملة؟",
      answers: ["سورة التوبة", "سورة الأنفال", "سورة النحل", "سورة الإخلاص"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_006",
      question: "ما هو أول مسجد بُني في الإسلام؟",
      answers: ["مسجد قباء", "المسجد النبوي", "المسجد الحرام", "المسجد الأقصى"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_007",
      question: "كم عدد أجزاء القرآن الكريم؟",
      answers: ["30 جزءاً", "25 جزءاً", "35 جزءاً", "40 جزءاً"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_008",
      question: "من هو الصحابي الجليل الملقب بـ (سيف الله المسلول)؟",
      answers: ["خالد بن الوليد", "علي بن أبي طالب", "حمزة بن عبد المطلب", "سعد بن أبي وقاص"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_009",
      question: "ما هي السورة التي تسمى (قلب القرآن)؟",
      answers: ["سورة يس", "سورة الرحمن", "سورة البقرة", "سورة الملك"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_010",
      question: "من هو النبي الذي ابتلعه الحوت ثم نجا بفضل الله وتسبيحه؟",
      answers: ["يونس عليه السلام", "يوسف عليه السلام", "أيوب عليه السلام", "نوح عليه السلام"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_011",
      question: "في أي سنة هجرية وقعت غزوة بدر الكبرى؟",
      answers: ["السنة الثانية للهجرة", "السنة الأولى للهجرة", "السنة الثالثة للهجرة", "السنة الخامسة للهجرة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_012",
      question: "ما هي السورة التي تحتوي على بسملتين اثنتين في القرآن الكريم؟",
      answers: ["سورة النمل", "سورة النحل", "سورة الفاتحة", "سورة الحج"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_013",
      question: "في أي سنة هجرية فُرض صيام شهر رمضان المبارك على المسلمين؟",
      answers: ["السنة الثانية للهجرة", "السنة الأولى للهجرة", "السنة الثالثة للهجرة", "السنة الرابعة للهجرة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_014",
      question: "من هو الصحابي الجليل الملقب بـ (أمين هذه الأمة)؟",
      answers: ["أبو عبيدة عامر بن الجراح", "عثمان بن عفان", "الزبير بن العوام", "طلحة بن عبيد الله"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_015",
      question: "من هو الصحابي الذي أشار على النبي صلى الله عليه وسلم بحفر الخندق في غزوة الأحزاب؟",
      answers: ["سلمان الفارسي", "عمار بن ياسر", "صهيب الرومي", "حذيفة بن اليمان"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_016",
      question: "من هو الصحابي الملقب بـ (حبر الأمة وترجمان القرآن)؟",
      answers: ["عبد الله بن عباس", "عبد الله بن مسعود", "عبد الله بن عمر", "زيد بن ثابت"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_017",
      question: "ما هي السورة القرآنية التي تسمى (عروس القرآن)؟",
      answers: ["سورة الرحمن", "سورة يس", "سورة الواقعة", "سورة الملك"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_018",
      question: "من هي أول شهيدة في تاريخ الإسلام؟",
      answers: ["سمية بنت خياط", "خديجة بنت خويلد", "نسيبة بنت كعب (أم عمارة)", "فاطمة الزهراء"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_019",
      question: "ما هي أطول آية في القرآن الكريم؟",
      answers: ["آية الدَّيْن في سورة البقرة", "آية الكرسي", "آية المباهلة", "آخر آية من سورة الفتح"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_isl_020",
      question: "من هو القائد المسلم الذي استعاد مدينة القدس بعد معركة حطين عام 1187م؟",
      answers: ["صلاح الدين الأيوبي", "نور الدين زنكي", "الظاهر بيبرس", "سيف الدين قطز"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_isl_021",
      question: "في أي سنة هجرية وقعت حجة الوداع للرسول صلى الله عليه وسلم؟",
      answers: ["السنة العاشرة للهجرة", "السنة التاسعة للهجرة", "السنة الثامنة للهجرة", "السنة الحادية عشرة للهجرة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_isl_022",
      question: "في أي غزوة جُرح النبي صلى الله عليه وسلم وكُسرت رَباعيته الشريفة؟",
      answers: ["غزوة أحد", "غزوة بدر", "غزوة حنين", "غزوة تبوك"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_isl_023",
      question: "من هو الخليفة الراشدي الذي جُمع القرآن الكريم في عهده في مصحف إمام ووزعت نسخه على الأمصار؟",
      answers: ["عثمان بن عفان", "أبو بكر الصديق", "عمر بن الخطاب", "علي بن أبي طالب"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_isl_024",
      question: "ما هو اسم الغزوة التي نزل فيها التخفيف عن الصحابة وعُرفت بغزوة العسرة؟",
      answers: ["غزوة تبوك", "غزوة مؤتة", "غزوة الطائف", "غزوة بني المصطلق"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_isl_025",
      question: "كم عدد سجدات التلاوة في القرآن الكريم وفق القول الراجح؟",
      answers: ["15 سجدة", "11 سجدة", "12 سجدة", "14 سجدة"],
      correctAnswer: 0,
      category: CATEGORIES.ISLAMIC,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 2. تاريخ وحضارات ومعارك
    // ==========================================
    {
      id: "q_his_001",
      question: "من هو أول رئيس للولايات المتحدة الأمريكية؟",
      answers: ["جورج واشنطن", "توماس جيفرسون", "أبراهام لينكولن", "جون آدمز"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_002",
      question: "في أي عام ميلادي اندلعت الحرب العالمية الأولى؟",
      answers: ["1914م", "1918م", "1939م", "1912م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_003",
      question: "في أي عام ميلادي اندلعت الحرب العالمية الثانية؟",
      answers: ["1939م", "1941م", "1935م", "1945م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_004",
      question: "في أي عام انتهت الحرب العالمية الثانية رسمياً؟",
      answers: ["1945م", "1944م", "1948م", "1946م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_005",
      question: "من هو القائد المسلم الذي فتح الأندلس عام 92 هـ؟",
      answers: ["طارق بن زياد", "موسى بن نصير", "عبد الرحمن الداخل", "عقبة بن نافع"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_006",
      question: "ما هي الحضارة القديمة التي شيّدت أهرامات الجيزة في مصر؟",
      answers: ["الحضارة المصرية القديمة (الفرعونية)", "الحضارة البابلية", "الحضارة الآشورية", "الحضارة الفينيقية"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_his_007",
      question: "في أي عام سقط جدار برلين وتوحدت ألمانيا؟",
      answers: ["1989م", "1991م", "1985م", "1975م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_008",
      question: "من هو الخليفة العباسي الذي بنى مدينة بغداد وجعلها عاصمة لدولته؟",
      answers: ["أبو جعفر المنصور", "هارون الرشيد", "المأمون", "المعتصم بالله"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_009",
      question: "ما هي المعركة الشهيرة التي أوقفت الزحف المغولي على بلاد الشام ومصر عام 1260م؟",
      answers: ["معركة عين جالوت", "معركة حطين", "معركة اليرموك", "معركة القادسية"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_010",
      question: "في أي عام هبط الإنسان لأول مرة على سطح القمر في رحلة أبوللو 11؟",
      answers: ["1969م", "1965م", "1972م", "1959م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_011",
      question: "ما هي الدولة التي خاضت حرب المئة عام ضد إنجلترا في العصور الوسطى؟",
      answers: ["فرنسا", "إسبانيا", "ألمانيا", "إيطاليا"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_012",
      question: "من هو القائد العسكري الفرنسي الذي نُفي إلى جزيرة سانت هيلانة بعد هزيمته في واترلو؟",
      answers: ["نابليون بونابرت", "لويس الرابع عشر", "لويس السادس عشر", "شارل ديغول"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_his_013",
      question: "في أي عام ميلادي وقعت الثورة الفرنسية الكبرى؟",
      answers: ["1789م", "1776م", "1804م", "1815م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_014",
      question: "في أي عام تم فتح القسطنطينية على يد السلطان العثماني محمد الفاتح؟",
      answers: ["1453م", "1492م", "1389م", "1517م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_015",
      question: "من هو القائد القرطاجي الشهير الذي عبر جبال الألب بالأفيال لمواجهة روما؟",
      answers: ["حنبعل (هانيبال)", "حملقار برقا", "صدربعل", "ماسينيسا"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_016",
      question: "من هي الملكة الفرعونية الشهيرة التي شيدت معبد الدير البحري في الأقصر؟",
      answers: ["حتشبسوت", "كليوباترا", "نفرتيتي", "نفرتاري"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_017",
      question: "في أي عام سقطت مملكة غرناطة آخر معاقل المسلمين في الأندلس؟",
      answers: ["1492م", "1453م", "1517م", "1390م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_018",
      question: "من هو مؤسس الدولة الأموية في الأندلس والملقب بـ (صقر قريش)؟",
      answers: ["عبد الرحمن الداخل", "هشام بن عبد الملك", "طارق بن زياد", "الحكم المستنصر"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_his_019",
      question: "في أي عام وُقّع صلح ويستفاليا الذي أنهى حرب الثلاثين عاماً في أوروبا؟",
      answers: ["1648م", "1713م", "1588م", "1815م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.VERY_HARD
    },
    {
      id: "q_his_020",
      question: "في أي عام ميلادي وقعت معركة بلاط الشهداء (تور - بواتييه) في فرنسا؟",
      answers: ["732م", "711م", "750م", "800م"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 3. دول وعواصم
    // ==========================================
    {
      id: "q_cap_001",
      question: "ما هي عاصمة اليابان؟",
      answers: ["طوكيو", "كيوتو", "أوساكا", "يوكوهاما"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_002",
      question: "ما هي عاصمة مصر؟",
      answers: ["القاهرة", "الإسكندرية", "الجيزة", "أسوان"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_003",
      question: "ما هي عاصمة إسبانيا؟",
      answers: ["مدريد", "برشلونة", "إشبيلية", "فالنسيا"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_004",
      question: "ما هي عاصمة المملكة العربية السعودية؟",
      answers: ["الرياض", "جدة", "مكة المكرمة", "الدمام"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_005",
      question: "ما هي عاصمة ليبيا؟",
      answers: ["طرابلس", "بنغازي", "مصراتة", "سبها"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_006",
      question: "ما هي عاصمة سلطنة عُمان؟",
      answers: ["مسقط", "صلالة", "صحار", "نزوى"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_007",
      question: "ما هي عاصمة المغرب؟",
      answers: ["الرباط", "الدار البيضاء", "مراكش", "فاس"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_008",
      question: "ما هي عاصمة تركيا؟",
      answers: ["أنقرة", "إسطنبول", "إزمير", "أنطاليا"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_009",
      question: "ما هي عاصمة كوريا الجنوبية؟",
      answers: ["سول", "بوسان", "إنتشون", "بيونغ يانغ"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_010",
      question: "ما هي عاصمة الأرجنتين؟",
      answers: ["بوينس آيرس", "قرطبة", "روزاريو", "مندوزا"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_cap_011",
      question: "ما هي عاصمة كندا الاتحادية؟",
      answers: ["أوتاوا", "تورونتو", "مونتريال", "فانكوفر"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_012",
      question: "ما هي عاصمة أستراليا الرسمية؟",
      answers: ["كانبرا", "سيدني", "ملبورن", "بيرث"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_013",
      question: "ما هي عاصمة البرازيل؟",
      answers: ["برازيليا", "ريو دي جانيرو", "ساو باولو", "سلفادور"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_014",
      question: "ما هي عاصمة سويسرا الفعلية؟",
      answers: ["بيرن", "جنيف", "زيورخ", "بازل"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_015",
      question: "ما هي عاصمة النرويج؟",
      answers: ["أوسلو", "بيرغن", "تروندهايم", "ستافانغر"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_016",
      question: "ما هي عاصمة السويد؟",
      answers: ["ستوكهولم", "غوتنبرغ", "مالمو", "أوبسالا"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_cap_017",
      question: "ما هي عاصمة كازاخستان الحالية؟",
      answers: ["أستانا", "ألماتي", "طشقند", "بيشكيك"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_cap_018",
      question: "ما هي عاصمة نيوزيلندا الرسمية؟",
      answers: ["ويلينغتون", "أوكلاند", "كرايستشيرش", "هاميلتون"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_cap_019",
      question: "ما هي عاصمة نيجيريا الاتحادية؟",
      answers: ["أبوجا", "لاغوس", "كانو", "إبادان"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_cap_020",
      question: "ما هي عاصمة أذربيجان؟",
      answers: ["باكو", "كنجه", "سومقاييت", "لنكران"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_cap_021",
      question: "ما هي عاصمة فيتنام؟",
      answers: ["هانوي", "هو تشي منه", "دا نانغ", "هاي فونغ"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_cap_022",
      question: "ما هي عاصمة بوليفيا الدستورية؟",
      answers: ["سوكري", "لا باز", "سانتا كروز", "كوتشابامبا"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.VERY_HARD
    },
    {
      id: "q_cap_023",
      question: "ما هي عاصمة ميانمار (بورما) الحالية؟",
      answers: ["نايبيداو", "يانغون (رانغون)", "ماندالاي", "باغان"],
      correctAnswer: 0,
      category: CATEGORIES.CAPITALS,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 4. جغرافيا ومضائق وتضاريس
    // ==========================================
    {
      id: "q_geo_001",
      question: "ما هو أطول نهر في العالم؟",
      answers: ["نهر النيل", "نهر الأمازون", "نهر المسيسيبي", "نهر يانغتسي"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_geo_002",
      question: "ما هي أصغر دولة في العالم من حيث المساحة؟",
      answers: ["الفاتيكان", "موناكو", "سان مارينو", "ليختنشتاين"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_geo_003",
      question: "ما هي أعلى قمة جبلية على وجه الأرض؟",
      answers: ["قمة إفرست", "قمة كي 2", "قمة كليمنجارو", "قمة مون بلان"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_geo_004",
      question: "ما هي أكبر قارة في العالم من حيث المساحة وعدد السكان؟",
      answers: ["قارة آسيا", "قارة إفريقيا", "قارة أوروبا", "أمريكا الشمالية"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_geo_005",
      question: "ما هو البحر الأكثر ملوحة في العالم والذي تنعدم فيه حياة الأسماك؟",
      answers: ["البحر الميت", "البحر الأحمر", "بحر قزوين", "البحر الأسود"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_geo_006",
      question: "ما هو المضيق الذي يربط البحر الأبيض المتوسط بالمحيط الأطلسي؟",
      answers: ["مضيق جبل طارق", "مضيق باب المندب", "مضيق هرمز", "مضيق البوسفور"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_geo_007",
      question: "ما هو المضيق المائي الذي يتحكم في المدخل الجنوبي للبحر الأحمر؟",
      answers: ["مضيق باب المندب", "مضيق هرمز", "مضيق جبل طارق", "مضيق ملقا"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_geo_008",
      question: "ما هو المضيق الحيوي الذي يربط الخليج العربي بخليج عُمان وبحر العرب؟",
      answers: ["مضيق هرمز", "مضيق باب المندب", "مضيق البوسفور", "مضيق تيران"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_geo_009",
      question: "ما هو أكبر بحر مغلق في العالم من حيث المساحة السطحية؟",
      answers: ["بحر قزوين", "البحر الميت", "بحر آرال", "بحيرة بايكال"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_geo_010",
      question: "ما هو النهر الأكبر في العالم من حيث حجم تدفق المياه ومساحة حوض التصريف؟",
      answers: ["نهر الأمازون", "نهر النيل", "نهر الكونغو", "نهر الدانوب"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_geo_011",
      question: "ما هو أعمق خندق مائي محيطي على كوكب الأرض؟",
      answers: ["خندق ماريانا", "خندق بويرتوريكو", "خندق جاوة", "خندق تونغا"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_geo_012",
      question: "ما هي أطول سلسلة جبال قارية في العالم؟",
      answers: ["جبال الأنديز", "جبال الهيمالايا", "جبال روكي", "جبال الألب"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_geo_013",
      question: "ما هي أعمق بحيرة مياه عذبة في العالم وتوجد في روسيا؟",
      answers: ["بحيرة بايكال", "بحيرة فيكتوريا", "بحيرة تنجانيقا", "بحيرة سوبيريور"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_geo_014",
      question: "ما هي أعلى الشلالات المائية في العالم وتقع في فنزويلا؟",
      answers: ["شلالات آنجل", "شلالات نياجرا", "شلالات فيكتوريا", "شلالات إجوازو"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_geo_015",
      question: "ما هي الدولة التي تمتلك أكبر عدد من الجزر الطبيعية في العالم؟",
      answers: ["السويد", "النرويج", "إندونيسيا", "الفلبين"],
      correctAnswer: 0,
      category: CATEGORIES.WORLD_FACTS,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 5. علوم وكيمياء وفيزياء
    // ==========================================
    {
      id: "q_sci_001",
      question: "ما هو الغاز الأكثر وفرة في الغلاف الجوي لكوكب الأرض؟",
      answers: ["النيتروجين", "الأكسجين", "ثاني أكسيد الكربون", "الأرجون"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_002",
      question: "ما هو الرمز الكيميائي لعنصر الحديد في الجدول الدوري؟",
      answers: ["Fe", "Ir", "Au", "Pb"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_003",
      question: "ما هو الرمز الكيميائي لعنصر الذهب؟",
      answers: ["Au", "Ag", "Gd", "Pt"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_004",
      question: "ما هو الرمز الكيميائي لعنصر الفضة؟",
      answers: ["Ag", "Au", "Si", "Sl"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_005",
      question: "ما هي أصلب مادة طبيعية معروفة على كوكب الأرض؟",
      answers: ["الألماس", "الكوارتز", "التيتانيوم", "الياقوت"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_006",
      question: "كم تبلغ السرعة التقريبية لانتشار الضوء في الفراغ؟",
      answers: ["300,000 كم/ثانية", "150,000 كم/ثانية", "500,000 كم/ثانية", "1,000,000 كم/ثانية"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_007",
      question: "أي جسيم داخل الذرة يحمل شحنة كهربائية سالبة ويدور حول النواة؟",
      answers: ["الإلكترون", "البروتون", "النيوترون", "الفوتون"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_sci_008",
      question: "ما هو المعدن الوحيد الذي يتواجد في الحالة السائلة عند درجة حرارة الغرفة؟",
      answers: ["الزئبق", "البروم", "الجاليوم", "السيزيوم"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_009",
      question: "ما هو العنصر الكيميائي صاحب الرمز (Na) في الجدول الدوري؟",
      answers: ["الصوديوم", "النيتروجين", "النيون", "النيكل"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_010",
      question: "ما هو الرمز الكيميائي لعنصر البوتاسيوم في الجدول الدوري؟",
      answers: ["K", "P", "Pt", "Po"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_011",
      question: "ما هي وحدة قياس القوة المعتمدة في النظام الدولي للوحدات؟",
      answers: ["النيوتن", "الجول", "الواط", "الباسكال"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_012",
      question: "ما هو الجهاز المستخدم لقياس الضغط الجوي المحيط؟",
      answers: ["الباروميتر", "الأنيموميتر", "الهيدروميتر", "الثيرموميتر"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_013",
      question: "ما هو القانون الفيزيائي القائل: (لكل فعل رد فعل مساوٍ له في المقدار ومضاد له في الاتجاه)؟",
      answers: ["قانون نيوتن الثالث للحركة", "قانون نيوتن الأول", "قانون نيوتن الثاني", "قانون الجاذبية العام"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_sci_014",
      question: "ما هو الجهاز المستخدم لقياس قوة وسرعة الرياح؟",
      answers: ["الأنيموميتر", "الباروميتر", "المانوميتر", "الجلفانوميتر"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_sci_015",
      question: "ما هو الرمز الكيميائي لعنصر التنغستن ذي أعلى نقطة انصهار بين المعادن؟",
      answers: ["W", "Tg", "Tu", "Tn"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 6. جسم الإنسان وطب وصحة
    // ==========================================
    {
      id: "q_ana_001",
      question: "كم عدد حجرات قلب الإنسان الطبيعي؟",
      answers: ["4 حجرات", "3 حجرات", "حجرتان", "5 حجرات"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ana_002",
      question: "كم عدد عظام الهيكل العظمي في جسم الإنسان البالغ الطبيعي؟",
      answers: ["206 عظام", "180 عظمة", "250 عظمة", "300 عظمة"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ana_003",
      question: "ما هو الفيتامين الذي يفرزه جلد الإنسان عند التعرض لأشعة الشمس المعتدلة؟",
      answers: ["فيتامين د (Vitamin D)", "فيتامين ج (C)", "فيتامين أ (A)", "فيتامين ب 12"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ana_004",
      question: "ما هو الهرمون المسؤول عن تنظيم مستوى السكر في دم الإنسان ويفرزه البنكرياس؟",
      answers: ["الإنسولين", "الأدرينالين", "الثيروكسين", "الكورتيزول"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ana_005",
      question: "ما هو أكبر عضو باطني داخل جسم الإنسان؟",
      answers: ["الكبد", "الرئة", "الأمعاء الدقيقة", "المعدة"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ana_006",
      question: "ما هي أصغر عظمة في جسم الإنسان؟",
      answers: ["عظمة الركاب في الأذن الوسطى", "عظمة السندان", "عظمة المطرقة", "فقرة العصعص"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ana_007",
      question: "من هو الطبيب العربي المسلم الذي اكتشف الدورة الدموية الصغرى في التاريخ الطبي؟",
      answers: ["ابن النفيس", "ويليام هارفي", "ابن سينا", "أبو بكر الرازي"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ana_008",
      question: "ما هي فصيلة الدم التي تسمى (المعطي العام) لجميع فصائل الدم الأخرى؟",
      answers: ["فصيلة O سالب", "فصيلة AB موجب", "فصيلة A موجب", "فصيلة B سالب"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ana_009",
      question: "ما هي المادة الصبغية المسؤولة عن إعطاء الجلد والشعر والعينين لونها الطبيعي؟",
      answers: ["الميلانين", "الكيراتين", "الكولاجين", "الهيموغلوبين"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ana_010",
      question: "ما هو الشريان الأكبر والأهم في جسم الإنسان الذي يضخ الدم المؤكسج من القلب؟",
      answers: ["الشريان الأبهر (الأورطي)", "الشريان الرئوي", "الشريان السباتي", "الشريان التاجي"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ana_011",
      question: "ما هو العضو الذي يلقب بـ (مقبرة خلايا الدم الحمراء) الهرمة في جسم الإنسان؟",
      answers: ["الطحال", "الكبد", "نخاع العظم", "الكلى"],
      correctAnswer: 0,
      category: CATEGORIES.ANATOMY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ana_012",
      question: "ما هو علم دراسة الأنسجة الحية تحت المجهر؟",
      answers: ["الهستولوجيا (Histology)", "السيتولوجيا", "المورفولوجيا", "الفيسيولوجيا"],
      correctAnswer: 0,
      category: CATEGORIES.SCIENCE,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 7. عالم الحيوان والطيور والطبيعة
    // ==========================================
    {
      id: "q_ani_001",
      question: "ما هو أسرع حيوان بري على وجه الأرض؟",
      answers: ["الفهد الصياد (الشيتا)", "الأسد", "الغزال", "الحصان العربي"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ani_002",
      question: "ما هو أضخم كائن حي ثديي يعيش على كوكب الأرض؟",
      answers: ["الحوت الأزرق", "الفيل الإفريقي", "قرش الحوت", "الزرافة"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ani_003",
      question: "ما هو الحيوان الوحيد من طائفة الثدييات القادر على الطيران الحقيقي؟",
      answers: ["الخفاش", "السنجاب الطائر", "الليمور", "الكوالا"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ani_004",
      question: "ما هو الحيوان الجرابي الشهير الذي يعتبر رمزاً لقارة أستراليا؟",
      answers: ["الكنغر", "الكوالا", "الباندا", "اللاما"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ani_005",
      question: "كم عدد قلوب الأخطبوط؟",
      answers: ["3 قلوب", "قلبان", "قلب واحد", "4 قلوب"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ani_006",
      question: "ما هو أسرع طائر في العالم عند الانقضاض؟",
      answers: ["صقر الشاهين", "النسر الذهبي", "العقاب الأبيض", "السنونو"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ani_007",
      question: "ما هو الطائر الوحيد الذي يمتلك القدرة على الطيران إلى الخلف؟",
      answers: ["الطائر الطنان", "نقار الخشب", "الهدهد", "البلبل"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ani_008",
      question: "كم زوجاً من الأرجل يمتلك العنكبوت؟",
      answers: ["4 أزواج (8 أرجل)", "3 أزواج (6 أرجل)", "5 أزواج (10 أرجل)", "6 أزواج (12 رجلاً)"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ani_009",
      question: "كم عدد فقرات عنق الزرافة بالرغم من طول رقبتها الفارع؟",
      answers: ["7 فقرات (مثل الإنسان)", "14 فقرة", "21 فقرة", "10 فقرات"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ani_010",
      question: "ما هو الحيوان الذي يستطيع النوم وإحدى نصفي دماغه وعينيه مستيقظة؟",
      answers: ["الدلفين", "الذئب", "الكنغر", "الشمبانزي"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ani_011",
      question: "ما هو الحيوان الثديي الفريد الذي يضع البيض بدلاً من الولادة الحية؟",
      answers: ["خلد الماء (منقار البط)", "القنفذ", "آكل النمل الحرشفي", "الأبوسوم"],
      correctAnswer: 0,
      category: CATEGORIES.ANIMALS,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 8. فلك وفضاء وكونيات
    // ==========================================
    {
      id: "q_ast_001",
      question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
      answers: ["المشتري", "زحل", "نبتون", "أورانوس"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ast_002",
      question: "ما هو الكوكب الأقرب مسافة إلى الشمس؟",
      answers: ["كوكب عطارد", "الزهرة", "الأرض", "المريخ"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ast_003",
      question: "أي من كواكب المجموعة الشمسية يلقب بالكوكب الأحمر؟",
      answers: ["المريخ", "المشتري", "الزهرة", "عطارد"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ast_004",
      question: "ما هو الكوكب الذي يمتلك نظام حلقات شهيراً وبارزاً حوله؟",
      answers: ["كوكب زحل", "المشتري", "المريخ", "أورانوس"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ast_005",
      question: "ما هي المجرة التي تنتمي إليها مجموعتنا الشمسية؟",
      answers: ["مجرة درب التبانة", "مجرة أندروميدا", "مجرة الدوامة", "مجرة المثلث"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ast_006",
      question: "ما هو الكوكب الأكثر سخونة في المجموعة الشمسية؟",
      answers: ["كوكب الزهرة", "عطارد", "المريخ", "المشتري"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ast_007",
      question: "كم دقيقة يستغرق ضوء الشمس تقريباً للوصول إلى كوكب الأرض؟",
      answers: ["8 دقائق و20 ثانية", "12 دقيقة", "5 دقائق و10 ثوانٍ", "15 دقيقة"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ast_008",
      question: "ما هو العنصر الكيميائي الأساسي المسؤول عن الاندماج النووي داخل الشمس؟",
      answers: ["الهيدروجين", "الهيليوم", "الأكسجين", "النيتروجين"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ast_009",
      question: "ما هو أضخم قمر تابع لكوكب المشتري وأكبر قمر في النظام الشمسي؟",
      answers: ["غانيميد", "تيتان", "أوروبا", "كاليستو"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ast_010",
      question: "ما هو اسم أقرب نجم إلى الأرض بعد الشمس؟",
      answers: ["بروكسيما سنتوري (قنطور الأقرب)", "نجم الشعرى اليمانية", "نجم الجدي", "منكب الجوزاء"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ast_011",
      question: "ما هو الانفجار النجمي العظيم الذي يمثل نهاية حياة نجم عملاق؟",
      answers: ["المستعر الأعظم (Supernova)", "السديم الكوني", "الرياح الشمسية", "الثقب الأسود"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ast_012",
      question: "ما هي أبعد نقطة في مدار الكوكب حول الشمس تسمى فلكياً؟",
      answers: ["نقطة الأوج", "نقطة الحضيض", "نقطة الاعتدال", "نقطة الانقلاب"],
      correctAnswer: 0,
      category: CATEGORIES.ASTRONOMY,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 9. تكنولوجيا واختراعات وبرمجيات
    // ==========================================
    {
      id: "q_tec_001",
      question: "من هو مخترع المصباح الكهربائي العملي ومسجل أكثر من ألف براءة اختراع؟",
      answers: ["توماس إديسون", "نيكولا تسلا", "ألكسندر غراهام بيل", "جيمس وات"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_tec_002",
      question: "من هو مخترع الهاتف التقليدي الأول؟",
      answers: ["ألكسندر غراهام بيل", "ماركوني", "توماس إديسون", "نيكولا تسلا"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_tec_003",
      question: "من هو مخترع الديناميت ومؤسس الجوائز العالمية الشهيرة؟",
      answers: ["ألفريد نوبل", "أوبنهايمر", "إرنست رذرفورد", "أنطوان لافوازييه"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_tec_004",
      question: "من هما الأخوان اللذان قاما بأول رحلة طيران ناجحة بطائرة بمحرك عام 1903؟",
      answers: ["الأخوان رايت", "الأخوان مونتغولفييه", "الأخوان لوميير", "الأخوان فورد"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_tec_005",
      question: "ما هي لغة البرمجة التي ابتكرها خايدو فان روسم (Guido van Rossum) عام 1991؟",
      answers: ["بايثون (Python)", "جافا (Java)", "سي بلس بلس (C++)", "روبي (Ruby)"],
      correctAnswer: 0,
      category: CATEGORIES.TECHNOLOGY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_tec_006",
      question: "كم بايت يساوي الكيلوبايت الواحد (Kilobyte) بالنظام الثنائي الدقيق؟",
      answers: ["1024 بايت", "1000 بايت", "512 بايت", "2048 بايت"],
      correctAnswer: 0,
      category: CATEGORIES.TECHNOLOGY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_tec_007",
      question: "من هو العالم الاسكتلندي مكتشف البنسلين كأول مضاد حيوي في التاريخ الطبي؟",
      answers: ["ألكسندر فليمنغ", "لويس باستور", "روبرت كوخ", "إدوارد جينر"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_tec_008",
      question: "من هو العالم البريطاني الملقب بأبي علوم الحاسوب ومحلل شيفرة إنيغما؟",
      answers: ["آلان تورنغ (Alan Turing)", "تشارلز باباج", "جون فون نيومان", "تيم بيرنرز لي"],
      correctAnswer: 0,
      category: CATEGORIES.TECHNOLOGY,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_tec_009",
      question: "من هو مخترع الشبكة العنكبوتية العالمية (World Wide Web) عام 1989؟",
      answers: ["تيم بيرنرز لي", "بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_tec_010",
      question: "من هو مخترع آلة الطباعة بالحروف المعدنية المتحركة في أوروبا؟",
      answers: ["يوهانس غوتنبرغ", "ليوناردو دافنشي", "إسحاق نيوتن", "غاليلو غاليلي"],
      correctAnswer: 0,
      category: CATEGORIES.INVENTIONS,
      difficulty: DIFFICULTIES.HARD
    },

    // ==========================================
    // 10. لغة عربية وأدب وبلاغة
    // ==========================================
    {
      id: "q_ara_001",
      question: "من هو الشاعر العربي الملقب بـ (أمير الشعراء)؟",
      answers: ["أحمد شوقي", "حافظ إبراهيم", "المتنبي", "نزار قباني"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ara_002",
      question: "ما هو الحرف الفريد الذي تلقب اللغة العربية باسمه لعدم وجوده في أغلب اللغات؟",
      answers: ["حرف الضاد", "حرف القاف", "حرف العين", "حرف الظاء"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ara_003",
      question: "ما إعراب الفاعل في الجملة الفعلية التامة دائماً؟",
      answers: ["مرفوع", "منصوب", "مجرور", "مبني على السكون"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ara_004",
      question: "ما هو المحسن البديعي القائم على الجمع بين الكلمة وضدها في المعنى؟",
      answers: ["الطباق", "الجناس", "المقابلة", "السجع"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ara_005",
      question: "من هو صاحب المعلقة الشهيرة: (قفا نبكِ من ذِكرى حبيبٍ ومنزلِ)؟",
      answers: ["امرؤ القيس", "عنترة بن شداد", "زهير بن أبي سلمى", "طرفة بن العبد"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ara_006",
      question: "من هو الفارس الجاهلي صاحب المعلقة التي مطلعها: (هل غادرَ الشعراءُ من متردَّمِ)؟",
      answers: ["عنترة بن شداد", "عمرو بن كلثوم", "الحارث بن حلزة", "النابغة الذبياني"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ara_007",
      question: "من هو واضع علم النحو العربي بأمر من أمير المؤمنين علي بن أبي طالب؟",
      answers: ["أبو الأسود الدؤلي", "سيبويه", "ابن جني", "الزمخشري"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ara_008",
      question: "ما هو المحسن البديعي القائم على تشابه كلمتين في اللفظ واختلافهما في المعنى؟",
      answers: ["الجناس", "السجع", "الطباق", "التورية"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ara_009",
      question: "من هو مؤلف ملحمتي الإلياذة والأوديسة الإغريقيتين؟",
      answers: ["هوميروس", "أفلاطون", "أرسطو", "سقراط"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_ara_010",
      question: "من هو الأديب العربي الحائز على جائزة نوبل في الأدب عام 1988م؟",
      answers: ["نجيب محفوظ", "طه حسين", "توفيق الحكيم", "عباس محمود العقاد"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_ara_011",
      question: "ما هو جمع كلمة (حليب) في المعاجم العربية المعتمدة؟",
      answers: ["أحلبة أو حُلبان", "أحلاء", "حليبات", "محالب"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ara_012",
      question: "من هو واضع علم العروض لضبط أوزان وبحور الشعر العربي؟",
      answers: ["الخليل بن أحمد الفراهيدي", "سيبويه", "أبو الأسود الدؤلي", "ابن جني"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ara_013",
      question: "ما هو المحسن البديعي القائم على توافق فواصل الجمل في الحرف الأخير نثراً؟",
      answers: ["السجع", "الجناس", "الطباق", "التورية"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ara_014",
      question: "ما هو المعجم اللغوي العربي الشهير الذي ألفه الفيروزآبادي؟",
      answers: ["القاموس المحيط", "لسان العرب", "تاج العروس", "معجم العين"],
      correctAnswer: 0,
      category: CATEGORIES.ARABIC,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_ara_015",
      question: "كم عدد بحور الشعر العربي التي وضعها الخليل بن أحمد وتدارك عليها الأخفش؟",
      answers: ["16 بحراً", "14 بحراً", "18 بحراً", "12 بحراً"],
      correctAnswer: 0,
      category: CATEGORIES.LITERATURE,
      difficulty: DIFFICULTIES.VERY_HARD
    },

    // ==========================================
    // 11. رياضة وكرة قدم
    // ==========================================
    {
      id: "q_spo_001",
      question: "ما هي الدولة الأكثر تتويجاً ببطولة كأس العالم لكرة القدم برصيد 5 ألقاب؟",
      answers: ["البرازيل", "ألمانيا", "إيطاليا", "الأرجنتين"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_002",
      question: "ما هو النادي الأكثر تتويجاً بلقب دوري أبطال أوروبا عبر التاريخ؟",
      answers: ["ريال مدريد", "ميلان", "بايرن ميونخ", "ليفربول"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_003",
      question: "كم دقيقة تبلغ المدة الأصلية لمباراة كرة القدم الرسمية بدون أوقات إضافية؟",
      answers: ["90 دقيقة", "80 دقيقة", "100 دقيقة", "60 دقيقة"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_004",
      question: "كم يبلغ عدد اللاعبين الأساسيين لكل فريق داخل ملعب كرة القدم؟",
      answers: ["11 لاعباً", "10 لاعبين", "12 لاعباً", "9 لاعبين"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_005",
      question: "كم عدد لاعبي فريق كرة السلة الأساسيين داخل أرضية الملعب أثناء المباراة؟",
      answers: ["5 لاعبين", "6 لاعبين", "7 لاعبين", "4 لاعبين"],
      correctAnswer: 0,
      category: CATEGORIES.SPORTS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_006",
      question: "في أي دولة أقيمت بطولة كأس العالم لكرة القدم عام 2022؟",
      answers: ["قطر", "روسيا", "البرازيل", "جنوب إفريقيا"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_007",
      question: "ما هي الدولة الإفريقية والعربية الأولى التي بلغت نصف نهائي كأس العالم (قطر 2022)؟",
      answers: ["المغرب", "الجزائر", "مصر", "السنغال"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_spo_008",
      question: "ما هي الدولة الفائزة بأول بطولة كأس عالم لكرة القدم عام 1930؟",
      answers: ["الأوروغواي", "الأرجنتين", "البرازيل", "إيطاليا"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_spo_009",
      question: "من هو اللاعب الأكثر تتويجاً بجائزة الكرة الذهبية (Ballon d'Or) عبر التاريخ؟",
      answers: ["ليونيل ميسي", "كريستيانو رونالدو", "ميشيل بلاتيني", "يوهان كرويف"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_spo_010",
      question: "من هو الهداف التاريخي لبطولات كأس العالم لكرة القدم برصيد 16 هدفاً؟",
      answers: ["ميروسلاف كلوزه", "الظاهرة رونالدو", "بيليه", "غيرد مولر"],
      correctAnswer: 0,
      category: CATEGORIES.FOOTBALL,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_spo_011",
      question: "كم يبلغ طول سباق الماراثون الرسمي بالكيلومترات؟",
      answers: ["42.195 كيلومتراً", "40 كيلومتراً", "45.5 كيلومتراً", "38.2 كيلومتراً"],
      correctAnswer: 0,
      category: CATEGORIES.SPORTS,
      difficulty: DIFFICULTIES.HARD
    },
    {
      id: "q_spo_012",
      question: "في أي عام انطلقت أول دورة ألعاب أولمبية في العصر الحديث بأثينا؟",
      answers: ["عام 1896م", "عام 1900م", "عام 1888م", "عام 1904م"],
      correctAnswer: 0,
      category: CATEGORIES.SPORTS,
      difficulty: DIFFICULTIES.HARD
    },

    // ==========================================
    // 12. معلومات عامة وحقائق حول العالم
    // ==========================================
    {
      id: "q_gen_001",
      question: "ما هي العملة الرسمية المعتمدة في المملكة المتحدة (بريطانيا)؟",
      answers: ["الجنيه الإسترليني", "اليورو", "الدولار", "الفرنك"],
      correctAnswer: 0,
      category: CATEGORIES.WORLD_FACTS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_002",
      question: "ما هي العملة الرسمية المعتمدة في دولة اليابان؟",
      answers: ["الين", "اليوان", "الوون", "الروبية"],
      correctAnswer: 0,
      category: CATEGORIES.WORLD_FACTS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_003",
      question: "ما هو الهيكل المعماري الأثري الوحيد الباقي من عجائب الدنيا السبع القديمة؟",
      answers: ["الهرم الأكبر بالجيزة", "حدائق بابل المعلقة", "منارة الإسكندرية", "تمثال رودس"],
      correctAnswer: 0,
      category: CATEGORIES.HISTORY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_004",
      question: "كم يبلغ عدد ألوان الطيف في قوس قزح؟",
      answers: ["7 ألوان", "6 ألوان", "8 ألوان", "5 ألوان"],
      correctAnswer: 0,
      category: CATEGORIES.NATURE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_005",
      question: "ما هي أكبر دولة عربية من حيث المساحة الجغرافية؟",
      answers: ["الجزائر", "السعودية", "مصر", "السودان"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_006",
      question: "ما هي أكثر الدول العربية من حيث عدد السكان؟",
      answers: ["جمهورية مصر العربية", "السودان", "العراق", "الجزائر"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_007",
      question: "كم تبلغ نسبة المياه التي تغطي سطح الكرة الأرضية تقريباً؟",
      answers: ["حوالي 71%", "حوالي 50%", "حوالي 85%", "حوالي 60%"],
      correctAnswer: 0,
      category: CATEGORIES.NATURE,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_008",
      question: "ما هي المنظمة الدولية المسؤولة عن الصحة العامة والتابعة للأمم المتحدة؟",
      answers: ["منظمة الصحة العالمية (WHO)", "اليونيسف", "اليونسكو", "الفاو"],
      correctAnswer: 0,
      category: CATEGORIES.GENERAL,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_009",
      question: "ما هو مجموع قياسات الزوايا الداخلية لأي مثلث في الهندسة المستوية؟",
      answers: ["180 درجة", "360 درجة", "90 درجة", "270 درجة"],
      correctAnswer: 0,
      category: CATEGORIES.MATH,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_010",
      question: "ما هو العدد الأولي الوحيد الذي يكون عدداً زوجياً؟",
      answers: ["العدد 2", "العدد 4", "العدد 0", "العدد 1"],
      correctAnswer: 0,
      category: CATEGORIES.MATH,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_gen_011",
      question: "من هو الرسام العالمي صاحب اللوحة الشهيرة (الموناليزا) المعروضة في متحف اللوفر؟",
      answers: ["ليوناردو دافنشي", "مايكل أنجلو", "فنسنت فان غوخ", "بابلو بيكاسو"],
      correctAnswer: 0,
      category: CATEGORIES.ART,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_012",
      question: "ما هو أعلى برج وناطحة سحاب في العالم شيد حتى الآن؟",
      answers: ["برج خليفة في دبي", "برج شنغهاي", "أبراج البيت بمكة", "برج تايبيه 101"],
      correctAnswer: 0,
      category: CATEGORIES.WORLD_FACTS,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_013",
      question: "ما هي القناة البحرية الصناعية التي تربط بين البحر الأبيض المتوسط والبحر الأحمر؟",
      answers: ["قناة السويس", "قناة بنما", "قناة كيل", "قناة كورنث"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.EASY
    },
    {
      id: "q_gen_014",
      question: "ما هي القناة المائية التي تختصر مسافة العبور بين المحيط الأطلسي والمحيط الهادئ في أمريكا الوسطى؟",
      answers: ["قناة بنما", "قناة السويس", "مضيق ماجلان", "قناة إيري"],
      correctAnswer: 0,
      category: CATEGORIES.GEOGRAPHY,
      difficulty: DIFFICULTIES.MEDIUM
    },
    {
      id: "q_gen_015",
      question: "ما هي مبرهنة فيرما الأخيرة التي استعصت على الإثبات لأكثر من 350 عاماً حتى أثبتها أندرو وايلز؟",
      answers: [
        "المعادلة an + bn = cn ليس لها حلول صحيحة موجبة إذا كانت n > 2",
        "كل عدد زوجي أكبر من 2 هو مجموع عددين أوليين",
        "أي خريطة يمكن تلوينها بأربعة ألوان فقط دون تجاور لونين",
        "توزيع الأعداد الأولية مرتبط بأصفار دالة ريمان"
      ],
      correctAnswer: 0,
      category: CATEGORIES.MATH,
      difficulty: DIFFICULTIES.VERY_HARD
    }
  ];

  /**
   * وحدة إدارة واختيار الأسئلة للعبة همة حتى القمة
   */
  const QuestionsManager = {
    /**
     * الحصول على بنك الأسئلة المرجعي الكامل
     * @returns {Array}
     */
    getMasterBank() {
      return MASTER_QUESTION_BANK;
    },

    /**
     * إرجاع عدد الأسئلة في البنك المحلي
     * @returns {number}
     */
    getBankCount() {
      return MASTER_QUESTION_BANK.length;
    },

    /**
     * خلط مصفوفة عشوائياً (Fisher-Yates Shuffle)
     * @param {Array} array 
     * @returns {Array}
     */
    shuffleArray(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    /**
     * خلط إجابات سؤال واحد مع إعادة تعيين مؤشر الإجابة الصحيحة بدقة
     * @param {Object} questionItem كائن السؤال الأصلي
     * @returns {Object} كائن سؤال جديد بإجابات مبعثرة
     */
    prepareQuestionWithShuffledAnswers(questionItem) {
      const originalAnswers = [...questionItem.answers];
      const correctAnswerIndex = questionItem.correctAnswer !== undefined ? questionItem.correctAnswer : 0;
      const correctAnswerText = originalAnswers[correctAnswerIndex];

      // إنشاء أزواج (النص، هل هو الصحيح)
      const options = originalAnswers.map((text, idx) => ({
        text: text,
        isCorrect: idx === correctAnswerIndex
      }));

      // خلط الخيارات عشوائياً
      const shuffledOptions = this.shuffleArray(options);

      // تحديد المؤشر الجديد للإجابة الصحيحة
      const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

      return {
        id: questionItem.id,
        question: questionItem.question,
        answers: shuffledOptions.map(opt => opt.text),
        correctAnswer: newCorrectIndex >= 0 ? newCorrectIndex : 0,
        category: questionItem.category || 'معلومات عامة',
        difficulty: questionItem.difficulty || DIFFICULTIES.MEDIUM
      };
    },

    /**
     * اختيار 10 أسئلة متدرجة الصعوبة لجلسة لعب واحدة
     * التوزيع المعتمد:
     * - المستويات 1–3: سهل (easy)
     * - المستويات 4–6: متوسط (medium)
     * - المستويات 7–8: صعب (hard)
     * - المستويات 9–10: قمة التحدي (very_hard)
     * 
     * @param {Array} sourceQuestions مصدر الأسئلة (قادمة من Firebase أو البنك المرجعي)
     * @returns {Array} 10 أسئلة مجهزة ومرتبة تصاعدياً
     */
    selectGameQuestions(sourceQuestions = null) {
      const pool = (Array.isArray(sourceQuestions) && sourceQuestions.length >= 10) 
        ? sourceQuestions 
        : MASTER_QUESTION_BANK;

      // تصنيف الأسئلة حسب الصعوبة
      const easyPool = pool.filter(q => q.difficulty === DIFFICULTIES.EASY);
      const mediumPool = pool.filter(q => q.difficulty === DIFFICULTIES.MEDIUM);
      const hardPool = pool.filter(q => q.difficulty === DIFFICULTIES.HARD);
      const veryHardPool = pool.filter(q => q.difficulty === DIFFICULTIES.VERY_HARD);

      // دالة مساعدة لاختيار N أسئلة عشوائية بدون تكرار مع fallback آمن
      const pickRandom = (arr, count, fallbackArr) => {
        const available = arr.length >= count ? arr : (fallbackArr.length >= count ? fallbackArr : pool);
        const shuffled = this.shuffleArray(available);
        return shuffled.slice(0, count);
      };

      // اختيار الأسئلة بحسب المستويات
      const selectedEasy = pickRandom(easyPool, 3, pool);
      const selectedMedium = pickRandom(mediumPool, 3, pool);
      const selectedHard = pickRandom(hardPool, 2, pool);
      const selectedVeryHard = pickRandom(veryHardPool, 2, pool);

      // تجميع الأسئلة الـ 10
      const combined = [
        ...selectedEasy,      // مستويات 1, 2, 3
        ...selectedMedium,    // مستويات 4, 5, 6
        ...selectedHard,      // مستويات 7, 8
        ...selectedVeryHard   // مستويات 9, 10
      ];

      // التأكد من عدم وجود أي تكرار
      const seenIds = new Set();
      const uniqueGameQuestions = [];

      for (const q of combined) {
        if (!seenIds.has(q.id)) {
          seenIds.add(q.id);
          uniqueGameQuestions.push(q);
        }
      }

      // إذا حدث نقص نادر بسبب تكرار في التجميع، نكمل من البنك
      if (uniqueGameQuestions.length < 10) {
        const remaining = pool.filter(q => !seenIds.has(q.id));
        const extra = this.shuffleArray(remaining).slice(0, 10 - uniqueGameQuestions.length);
        uniqueGameQuestions.push(...extra);
      }

      // خلط الإجابات لكل سؤال من الأسئلة العشرة المختارة
      return uniqueGameQuestions.map(q => this.prepareQuestionWithShuffledAnswers(q));
    },

    /**
     * ترجمة مسمى الصعوبة إلى العربية للعرض
     * @param {string} diff 
     * @returns {string}
     */
    getDifficultyLabel(diff) {
      switch (diff) {
        case DIFFICULTIES.EASY: return 'سهل';
        case DIFFICULTIES.MEDIUM: return 'متوسط';
        case DIFFICULTIES.HARD: return 'صعب';
        case DIFFICULTIES.VERY_HARD: return 'قمة التحدي';
        default: return 'متوسط';
      }
    },

    /**
     * إرجاع الصعوبة المناسبة لمستوى معين
     * @param {number} level رقم المستوى (1-10)
     * @returns {string}
     */
    getDifficultyForLevel(level) {
      if (level <= 3) return DIFFICULTIES.EASY;
      if (level <= 6) return DIFFICULTIES.MEDIUM;
      if (level <= 8) return DIFFICULTIES.HARD;
      return DIFFICULTIES.VERY_HARD;
    }
  };

  window.CATEGORIES = CATEGORIES;
  window.DIFFICULTIES = DIFFICULTIES;
  window.QuestionsManager = QuestionsManager;
})(window);
