import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { Course, CourseCategory } from '~/types'

export type CourseCategoryKey =
  | 'dari'
  | 'pashto'
  | 'english'
  | 'islamic'
  | 'heritage'
  | 'premium'

export interface CourseCategorySection {
  key: CourseCategoryKey
  title: CourseCategory
  description: string
  accentClass: string
}

const categoryOrder: CourseCategoryKey[] = ['dari', 'pashto', 'english', 'islamic', 'heritage', 'premium']

const categoryLabels: Record<LocaleCode, Record<CourseCategoryKey | 'all', CourseCategory | 'All'>> = {
  en: {
    all: 'All',
    dari: 'Dari Language',
    pashto: 'Pashto Language',
    english: 'English Language',
    islamic: 'Islamic Studies',
    heritage: 'Afghan Culture & Heritage',
    premium: 'Premium Language Programs'
  },
  fa: {
    all: 'All',
    dari: 'Dari Language',
    pashto: 'Pashto Language',
    english: 'English Language',
    islamic: 'Islamic Studies',
    heritage: 'Afghan Culture & Heritage',
    premium: 'Premium Language Programs'
  },
  ps: {
    all: 'All',
    dari: 'Dari Language',
    pashto: 'Pashto Language',
    english: 'English Language',
    islamic: 'Islamic Studies',
    heritage: 'Afghan Culture & Heritage',
    premium: 'Premium Language Programs'
  }
}

const categoryDescriptions: Record<CourseCategoryKey, string> = {
  dari:
    'Live Dari classes help children and teenagers speak with family, read confidently, and build writing foundations connected to Afghan life.',
  pashto:
    'Pashto courses support listening, conversation, reading, and writing for Afghan children growing up outside the language environment.',
  english:
    'English courses build practical communication, grammar, reading, writing, and confidence for school and everyday life.',
  islamic:
    'Islamic Studies classes combine Quran reading, Tajweed, duas, manners, Seerah, and faith foundations in a respectful online setting.',
  heritage:
    'Culture and heritage lessons help students understand Afghan history, traditions, values, identity, and national memory.',
  premium:
    'Special Class only programs for English-speaking children, teenagers, and adults who want personalized Dari or Pashto instruction from the beginning or intermediate level.'
}

const categoryAccentClasses: Record<CourseCategoryKey, string> = {
  dari:
    'bg-purple-50 text-brand-purple ring-purple-100 dark:bg-purple-950/50 dark:text-purple-200 dark:ring-purple-800',
  pashto:
    'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800',
  english:
    'bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800',
  islamic:
    'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800',
  heritage:
    'bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800',
  premium:
    'bg-slate-950 text-brand-gold ring-slate-800 dark:bg-brand-gold dark:text-slate-950 dark:ring-amber-300'
}

export const classTypes = {
  group: {
    name: 'Group Class',
    price: '$30',
    priceLabel: '$30 USD / month',
    size: 'Maximum 10 students',
    summary:
      'A small live cohort where students learn with peers, practice actively, and still receive teacher attention.',
    highlights: [
      'Maximum 10 students',
      'Interactive group practice',
      'Steady monthly schedule'
    ]
  },
  special: {
    name: 'Special Class',
    price: '$100',
    priceLabel: '$100 USD / month',
    size: '1 or 2 students only',
    summary:
      'Personalized teaching for one student or two siblings/friends with flexible scheduling and focused feedback.',
    highlights: [
      '1 or 2 students only',
      'Personalized teaching',
      'Flexible schedule'
    ]
  },
  premiumSpecial: {
    name: 'Special Class Only',
    price: '$150',
    priceLabel: '$150 USD / month',
    size: 'Private: 1 student or Semi-Private: 2 students',
    summary:
      'A premium one-to-one or semi-private Afghan language program taught in English with a personalized plan and flexible schedule.',
    highlights: [
      'Private: 1 student',
      'Semi-Private: 2 students',
      'Personalized lessons',
      'Flexible schedule'
    ]
  }
}

const sharedCourseSupport = {
  groupClass: classTypes.group,
  specialClass: classTypes.special,
  monthlyProgressReport:
    'Parents receive a monthly progress report covering attendance, participation, homework, strengths, and the next learning goals.',
  certificate:
    'Students receive a certificate of completion after finishing the course objectives and teacher review.',
  trialClassInfo:
    'All students receive a 2-day trial class before payment. After the trial period, enrollment and payment are required to continue.'
}

const premiumHighlights = [
  'Native Dari/Pashto teachers',
  'Personalized lessons',
  'Flexible schedule',
  'One-on-one attention',
  'Monthly progress report',
  'Cultural immersion',
  'Certificate of completion'
]

const sharedPremiumCourseSupport = {
  badge: 'Premium One-to-One Program',
  specialOnly: true,
  groupClass: classTypes.group,
  specialClass: classTypes.premiumSpecial,
  languageOfInstruction: 'English',
  premiumHighlights,
  monthlyProgressReport:
    'Parents and adult learners receive a monthly progress report covering fluency, vocabulary, reading, writing, cultural understanding, and next learning goals.',
  certificate:
    'Students receive a certificate of completion after meeting the course goals and completing the teacher review.',
  trialClassInfo:
    'Premium language students receive a 2-day trial class before payment. After the trial period, enrollment and payment are required to continue at $150 USD per month.'
}

const courseBase: Array<Omit<Course, 'category'>> = [
  {
    slug: 'dari-for-children',
    title: 'Dari for Children',
    categoryKey: 'dari',
    summary:
      'Speaking, listening, vocabulary, reading, and writing basics for children ages 7-12.',
    description:
      'A warm beginner-friendly Dari course for Afghan children abroad who need structure, confidence, and steady practice using Dari at home and in class.',
    level: 'Beginner',
    ageGroup: 'Ages 7-12',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Ages 7-12',
    featured: true,
    accentClass: categoryAccentClasses.dari,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Helps children use Dari with parents, grandparents, and relatives.',
      'Builds confidence through short conversations, stories, and repetition.',
      'Introduces reading and writing without overwhelming young learners.'
    ],
    outcomes: [
      'Recognize core Dari sounds and letters.',
      'Use daily vocabulary for home, family, school, food, and greetings.',
      'Read and write simple words and short sentences.',
      'Speak in short guided conversations with teacher correction.'
    ],
    syllabus: [
      'Dari sounds, alphabet, and letter shapes',
      'Greetings, family words, colors, numbers, and classroom language',
      'Reading simple words and short sentences',
      'Writing practice, dictation, and picture-based sentences',
      'Stories, poems, and speaking circles'
    ],
    parentNote:
      'Best for children who understand a little Dari or are beginning from the basics and need a gentle weekly routine.',
    learningObjectives: [
      'Build a useful foundation in speaking, listening, vocabulary, reading, and writing.',
      'Help students feel comfortable answering in Dari instead of switching immediately to English.',
      'Create a home-friendly practice routine parents can support.'
    ],
    whatStudentsWillLearn: [
      'Dari alphabet recognition and early writing',
      'Everyday words and short sentences',
      'Listening comprehension through stories and teacher prompts',
      'Basic reading fluency',
      'Polite greetings and family conversation'
    ],
    teachingMethod:
      'Teachers use live conversation, visual vocabulary, reading aloud, tracing, dictation, storytelling, games, and parent practice prompts.',
    ...sharedCourseSupport
  },
  {
    slug: 'dari-for-teens',
    title: 'Dari for Teens',
    categoryKey: 'dari',
    summary:
      'Reading, writing, grammar, conversation, and cultural understanding for teenagers ages 13-16.',
    description:
      'A structured Dari course for teenagers who need stronger literacy, grammar, conversation confidence, and a deeper connection to Afghan culture.',
    level: 'Beginner to Intermediate',
    ageGroup: 'Ages 13-16',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Ages 13-16',
    featured: false,
    accentClass: categoryAccentClasses.dari,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Supports teenagers who understand Dari but need confidence speaking and reading.',
      'Connects grammar and writing with real communication.',
      'Includes Afghan cultural themes that make language learning meaningful.'
    ],
    outcomes: [
      'Read age-appropriate Dari passages with better fluency.',
      'Write short paragraphs using correct grammar patterns.',
      'Discuss family, school, identity, and culture in Dari.',
      'Understand common expressions, proverbs, and respectful speech.'
    ],
    syllabus: [
      'Reading comprehension and vocabulary expansion',
      'Sentence structure and grammar practice',
      'Conversation topics for teen life and family identity',
      'Paragraph writing and teacher feedback',
      'Cultural stories, values, and discussion'
    ],
    parentNote:
      'Best for teenagers who need a more mature class environment and practical Dari they can use with family and community.',
    learningObjectives: [
      'Improve reading, writing, grammar, conversation, and cultural understanding.',
      'Help teens express ideas in Dari with more accuracy and maturity.',
      'Strengthen confidence in Afghan identity through language.'
    ],
    whatStudentsWillLearn: [
      'Dari grammar and sentence building',
      'Reading comprehension strategies',
      'Paragraph writing',
      'Conversation for family, school, and cultural topics',
      'Afghan expressions, manners, and cultural references'
    ],
    teachingMethod:
      'Lessons combine guided reading, grammar mini-lessons, conversation practice, writing feedback, and cultural discussion.',
    ...sharedCourseSupport
  },
  {
    slug: 'dari-reading-writing',
    title: 'Dari Reading & Writing',
    categoryKey: 'dari',
    summary:
      'Reading and writing Dari fluently for students who understand the language but cannot read or write it.',
    description:
      'A focused literacy course for students of all ages who can understand spoken Dari but need step-by-step support reading and writing with fluency.',
    level: 'Literacy Foundations',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: false,
    accentClass: categoryAccentClasses.dari,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Designed for heritage learners who understand Dari orally.',
      'Moves carefully from letters to connected reading and writing.',
      'Gives families a clear path from recognition to fluency.'
    ],
    outcomes: [
      'Read connected Dari text with increasing independence.',
      'Write words, sentences, and short paragraphs.',
      'Understand spelling patterns and common reading challenges.',
      'Build fluency through repeated reading and dictation.'
    ],
    syllabus: [
      'Alphabet review and joined letter forms',
      'Vowels, spelling patterns, and word reading',
      'Sentence reading and dictation',
      'Short passages and comprehension',
      'Writing sentences and short paragraphs'
    ],
    parentNote:
      'Best for students who speak or understand Dari but missed formal literacy instruction.',
    learningObjectives: [
      'Teach students to read and write Dari fluently from their current level.',
      'Close the gap between oral understanding and literacy.',
      'Build confidence through repeated, measurable reading practice.'
    ],
    whatStudentsWillLearn: [
      'Dari letter forms and joining rules',
      'Word decoding and spelling',
      'Reading fluency and comprehension',
      'Dictation and sentence writing',
      'Short paragraph writing'
    ],
    teachingMethod:
      'Teachers use structured phonics, modeled reading, guided practice, dictation, writing correction, and fluency checks.',
    ...sharedCourseSupport
  },
  {
    slug: 'pashto-for-children',
    title: 'Pashto for Children',
    categoryKey: 'pashto',
    summary:
      'Speaking, listening, vocabulary, reading, and writing basics for children ages 7-12.',
    description:
      'An engaging Pashto course for Afghan children abroad who need a friendly start with listening, speaking, letters, vocabulary, reading, and writing.',
    level: 'Beginner',
    ageGroup: 'Ages 7-12',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Ages 7-12',
    featured: true,
    accentClass: categoryAccentClasses.pashto,
    teacherSlug: 'ahmad-wali',
    benefits: [
      'Makes Pashto approachable for children who feel shy speaking it.',
      'Strengthens pronunciation through listening and repetition.',
      'Connects language practice to family respect, greetings, and daily life.'
    ],
    outcomes: [
      'Use common Pashto greetings and family vocabulary.',
      'Recognize and write foundational Pashto letters.',
      'Read simple words and sentences.',
      'Answer basic questions in Pashto with teacher support.'
    ],
    syllabus: [
      'Pashto sounds and alphabet',
      'Greetings, family words, numbers, colors, and objects',
      'Listening and repeat-after-me practice',
      'Reading and writing basic words',
      'Short conversations and story practice'
    ],
    parentNote:
      'Best for children who are beginning Pashto or understand some words but need confidence using them.',
    learningObjectives: [
      'Build speaking, listening, vocabulary, reading, and writing basics.',
      'Help students hear and produce Pashto sounds accurately.',
      'Encourage daily use of Pashto at home.'
    ],
    whatStudentsWillLearn: [
      'Pashto alphabet and sounds',
      'Basic vocabulary for home and family',
      'Simple conversation patterns',
      'Early reading and writing',
      'Listening skills through stories and prompts'
    ],
    teachingMethod:
      'Teachers use repetition, oral storytelling, pronunciation modeling, visuals, reading practice, and short home tasks.',
    ...sharedCourseSupport
  },
  {
    slug: 'pashto-for-teens',
    title: 'Pashto for Teens',
    categoryKey: 'pashto',
    summary:
      'Reading, writing, grammar, conversation, and cultural understanding for teenagers ages 13-16.',
    description:
      'A teen-focused Pashto course that strengthens grammar, conversation, reading, writing, and Afghan cultural understanding.',
    level: 'Beginner to Intermediate',
    ageGroup: 'Ages 13-16',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Ages 13-16',
    featured: false,
    accentClass: categoryAccentClasses.pashto,
    teacherSlug: 'ahmad-wali',
    benefits: [
      'Gives teens a mature space to practice Pashto without embarrassment.',
      'Connects grammar to real conversation and writing.',
      'Builds cultural awareness through language, stories, and values.'
    ],
    outcomes: [
      'Read short Pashto passages with improving fluency.',
      'Write sentences and short paragraphs.',
      'Use grammar patterns in practical conversation.',
      'Discuss cultural topics and family identity with more confidence.'
    ],
    syllabus: [
      'Reading fluency and vocabulary development',
      'Pashto grammar and sentence patterns',
      'Guided conversation and pronunciation',
      'Writing practice and feedback',
      'Culture, manners, and identity discussion'
    ],
    parentNote:
      'Best for teenagers who want to understand, speak, read, and write Pashto in a structured class.',
    learningObjectives: [
      'Improve reading, writing, grammar, conversation, and cultural understanding.',
      'Build confidence using Pashto with relatives and community.',
      'Support teens with age-appropriate cultural themes.'
    ],
    whatStudentsWillLearn: [
      'Pashto grammar and sentence building',
      'Practical conversation',
      'Reading comprehension',
      'Short writing tasks',
      'Cultural expressions and respectful speech'
    ],
    teachingMethod:
      'Lessons include guided reading, grammar practice, speaking prompts, pronunciation coaching, and writing feedback.',
    ...sharedCourseSupport
  },
  {
    slug: 'pashto-reading-writing',
    title: 'Pashto Reading & Writing',
    categoryKey: 'pashto',
    summary: 'Reading and writing Pashto fluently for students of all ages.',
    description:
      'A focused Pashto literacy course for students who need step-by-step support recognizing letters, reading connected text, and writing clearly.',
    level: 'Literacy Foundations',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: false,
    accentClass: categoryAccentClasses.pashto,
    teacherSlug: 'ahmad-wali',
    benefits: [
      'Builds literacy for students who understand some Pashto orally.',
      'Teaches Pashto letters, joins, spelling, reading, and writing in sequence.',
      'Uses repeated practice so progress is visible to parents.'
    ],
    outcomes: [
      'Recognize Pashto letters and connected forms.',
      'Read words, sentences, and short passages.',
      'Write simple sentences with correct letter shapes.',
      'Improve fluency through reading practice and correction.'
    ],
    syllabus: [
      'Pashto alphabet and joined forms',
      'Sound-letter recognition and spelling',
      'Word and sentence reading',
      'Dictation and sentence writing',
      'Short passages and comprehension'
    ],
    parentNote:
      'Best for students who can understand Pashto but need a clear path to reading and writing.',
    learningObjectives: [
      'Teach students to read and write Pashto fluently from their current level.',
      'Build confidence with letters, sounds, and connected writing.',
      'Develop reading fluency through guided practice.'
    ],
    whatStudentsWillLearn: [
      'Pashto letter recognition',
      'Word decoding',
      'Sentence reading',
      'Dictation',
      'Short writing and comprehension'
    ],
    teachingMethod:
      'Teachers use structured letter work, modeled reading, dictation, corrected writing, and short fluency checks.',
    ...sharedCourseSupport
  },
  {
    slug: 'english-starter',
    title: 'English Starter',
    categoryKey: 'english',
    summary:
      'Alphabet, basic words, greetings, and simple communication for complete beginners.',
    description:
      'A gentle English course for complete beginners who need the alphabet, first words, greetings, classroom language, and simple communication.',
    level: 'Starter',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Complete beginners',
    featured: true,
    accentClass: categoryAccentClasses.english,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Creates a calm first step into English for new learners.',
      'Builds basic classroom confidence and simple communication.',
      'Uses repetition, visuals, and speaking practice from the first lesson.'
    ],
    outcomes: [
      'Recognize and pronounce the English alphabet.',
      'Use greetings and basic classroom phrases.',
      'Name common objects, colors, numbers, and family words.',
      'Speak in very short everyday sentences.'
    ],
    syllabus: [
      'Alphabet and letter sounds',
      'Greetings and introductions',
      'Numbers, colors, family, and classroom words',
      'Simple questions and answers',
      'Listening and speaking practice'
    ],
    parentNote:
      'Best for complete beginners who need a patient introduction to English basics.',
    learningObjectives: [
      'Introduce alphabet, basic words, greetings, and simple communication.',
      'Help students understand teacher instructions in English.',
      'Build confidence through short, repeated speaking tasks.'
    ],
    whatStudentsWillLearn: [
      'English alphabet',
      'Basic vocabulary',
      'Greetings and introductions',
      'Simple questions',
      'Early listening and speaking'
    ],
    teachingMethod:
      'Teachers use visuals, repetition, songs, pronunciation modeling, speaking turns, and short review activities.',
    ...sharedCourseSupport
  },
  {
    slug: 'english-beginner',
    title: 'English Beginner',
    categoryKey: 'english',
    summary: 'Basic grammar, vocabulary, reading, and conversation for early English learners.',
    description:
      'A beginner English course that helps students grow from single words into useful sentences, simple reading, and everyday conversation.',
    level: 'Beginner',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Beginner learners',
    featured: false,
    accentClass: categoryAccentClasses.english,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Strengthens basic grammar and sentence building.',
      'Helps students speak more comfortably in everyday situations.',
      'Supports reading and vocabulary growth.'
    ],
    outcomes: [
      'Use simple present-tense sentences and common verbs.',
      'Read short beginner passages.',
      'Answer everyday questions with more confidence.',
      'Build vocabulary for school, family, routines, and interests.'
    ],
    syllabus: [
      'Basic grammar and sentence structure',
      'Common verbs, nouns, and adjectives',
      'Reading short passages',
      'Everyday questions and answers',
      'Guided conversation practice'
    ],
    parentNote:
      'Best for students who know some English words but need structure, grammar, and more speaking practice.',
    learningObjectives: [
      'Develop basic grammar, vocabulary, reading, and conversation.',
      'Help students form correct simple sentences.',
      'Build practical English for school and daily life.'
    ],
    whatStudentsWillLearn: [
      'Simple grammar patterns',
      'Vocabulary by theme',
      'Reading short texts',
      'Conversation practice',
      'Listening comprehension'
    ],
    teachingMethod:
      'Lessons combine grammar mini-lessons, vocabulary games, reading aloud, guided speaking, and teacher correction.',
    ...sharedCourseSupport
  },
  {
    slug: 'english-intermediate',
    title: 'English Intermediate',
    categoryKey: 'english',
    summary: 'Speaking, listening, writing, and confidence building for growing English learners.',
    description:
      'An intermediate English course for students ready to strengthen communication, write more clearly, and participate with confidence.',
    level: 'Intermediate',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Intermediate learners',
    featured: false,
    accentClass: categoryAccentClasses.english,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Improves confidence in speaking and listening.',
      'Builds stronger writing habits and sentence variety.',
      'Supports students who need English for school participation.'
    ],
    outcomes: [
      'Speak in longer answers and short discussions.',
      'Understand teacher prompts and everyday conversations.',
      'Write organized paragraphs.',
      'Use a wider range of vocabulary and grammar.'
    ],
    syllabus: [
      'Conversation skills and listening practice',
      'Paragraph writing and editing',
      'Grammar review and sentence variety',
      'Vocabulary for school and daily situations',
      'Presentation and confidence activities'
    ],
    parentNote:
      'Best for students who can communicate in basic English and want to speak, listen, and write more confidently.',
    learningObjectives: [
      'Strengthen speaking, listening, writing, and confidence.',
      'Help students organize ideas in spoken and written English.',
      'Prepare learners for more independent communication.'
    ],
    whatStudentsWillLearn: [
      'Conversation fluency',
      'Listening strategies',
      'Paragraph writing',
      'Useful grammar review',
      'Presentation confidence'
    ],
    teachingMethod:
      'Teachers use discussion prompts, listening tasks, writing workshops, feedback, and short presentation practice.',
    ...sharedCourseSupport
  },
  {
    slug: 'english-advanced',
    title: 'English Advanced',
    categoryKey: 'english',
    summary: 'Advanced communication, grammar, writing, and fluency for confident learners.',
    description:
      'An advanced English course for students who want polished speaking, stronger grammar, better writing, and fluent communication.',
    level: 'Advanced',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Advanced learners',
    featured: false,
    accentClass: categoryAccentClasses.english,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Refines fluency, accuracy, and expression.',
      'Improves advanced grammar and writing quality.',
      'Supports students who want stronger academic and everyday English.'
    ],
    outcomes: [
      'Speak with clearer structure and more precise vocabulary.',
      'Use advanced grammar more accurately.',
      'Write essays, responses, and longer paragraphs.',
      'Participate in discussions with confidence.'
    ],
    syllabus: [
      'Advanced grammar and sentence control',
      'Academic and everyday vocabulary',
      'Essay and response writing',
      'Discussion, debate, and presentation',
      'Fluency and pronunciation refinement'
    ],
    parentNote:
      'Best for students who already communicate in English and want fluency, accuracy, and stronger writing.',
    learningObjectives: [
      'Develop advanced communication, grammar, writing, and fluency.',
      'Improve expressive speaking and organized writing.',
      'Prepare students for confident participation in school and public settings.'
    ],
    whatStudentsWillLearn: [
      'Advanced grammar',
      'Fluent speaking',
      'Essay-style writing',
      'Discussion skills',
      'Vocabulary precision'
    ],
    teachingMethod:
      'Lessons use advanced reading, writing conferences, discussion prompts, grammar coaching, and presentation feedback.',
    ...sharedCourseSupport
  },
  {
    slug: 'spoken-english',
    title: 'Spoken English',
    categoryKey: 'english',
    summary: 'Practical speaking and everyday communication for real-life English use.',
    description:
      'A speaking-focused English course for students who want practical conversation, pronunciation support, and confidence in everyday communication.',
    level: 'Conversation Focus',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Conversation learners',
    featured: false,
    accentClass: categoryAccentClasses.english,
    teacherSlug: 'maryam-farahi',
    benefits: [
      'Prioritizes speaking time in every class.',
      'Helps students respond naturally in everyday situations.',
      'Improves pronunciation, listening, and confidence.'
    ],
    outcomes: [
      'Hold practical conversations about daily life.',
      'Ask and answer questions with more confidence.',
      'Improve pronunciation and listening habits.',
      'Use common phrases for school, travel, shopping, and family life.'
    ],
    syllabus: [
      'Greetings, introductions, and small talk',
      'Daily routines and family conversations',
      'School, shopping, travel, and appointments',
      'Pronunciation and listening drills',
      'Role plays and speaking confidence'
    ],
    parentNote:
      'Best for students who know some English but hesitate to speak or need practical everyday conversation.',
    learningObjectives: [
      'Develop practical speaking and everyday communication.',
      'Increase speaking time and confidence.',
      'Support pronunciation and natural response habits.'
    ],
    whatStudentsWillLearn: [
      'Everyday conversation',
      'Common phrases',
      'Role-play communication',
      'Pronunciation practice',
      'Listening and response skills'
    ],
    teachingMethod:
      'Teachers use role plays, guided speaking turns, pronunciation coaching, real-life scenarios, and quick correction.',
    ...sharedCourseSupport
  },
  {
    slug: 'quran-reading-basics',
    title: 'Quran Reading Basics',
    categoryKey: 'islamic',
    summary: 'Correct Quran reading from the beginning with careful foundations.',
    description:
      'A respectful beginner Quran reading course that starts with Arabic letters, vowels, joining rules, and guided reading practice.',
    level: 'Beginner',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: true,
    accentClass: categoryAccentClasses.islamic,
    teacherSlug: 'qari-idrees',
    benefits: [
      'Builds correct Quran reading habits from the start.',
      'Supports beginners with patient, step-by-step correction.',
      'Gives parents clear progress notes on reading accuracy.'
    ],
    outcomes: [
      'Recognize Arabic letters in isolated and joined forms.',
      'Read letters with short vowels and basic rules.',
      'Join letters into words and short lines.',
      'Prepare for supervised Quran reading and Tajweed study.'
    ],
    syllabus: [
      'Arabic letters and sounds',
      'Short vowels, sukoon, and shaddah',
      'Joining letters and reading words',
      'Noorani Qaida-style fluency practice',
      'Short Quran reading with teacher correction'
    ],
    parentNote:
      'Best for students starting Quran reading or returning to the basics for a stronger foundation.',
    learningObjectives: [
      'Teach correct Quran reading from the beginning.',
      'Build accuracy before students move into longer recitation.',
      'Create a steady reading practice routine.'
    ],
    whatStudentsWillLearn: [
      'Arabic letter recognition',
      'Vowel sounds',
      'Joining rules',
      'Short Quranic words and lines',
      'Reading habits with teacher correction'
    ],
    teachingMethod:
      'Teachers use careful modeling, repeat-after-me reading, visual Qaida practice, individual correction, and short home recitation tasks.',
    ...sharedCourseSupport
  },
  {
    slug: 'quran-tajweed',
    title: 'Quran Tajweed',
    categoryKey: 'islamic',
    summary: 'Proper pronunciation and Tajweed rules for more accurate recitation.',
    description:
      'A Tajweed course for students who can read Quranic text and are ready to improve pronunciation, makharij, rule application, and recitation quality.',
    level: 'Intermediate',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Quran readers',
    featured: false,
    accentClass: categoryAccentClasses.islamic,
    teacherSlug: 'qari-idrees',
    benefits: [
      'Improves pronunciation, rhythm, and recitation confidence.',
      'Gives direct correction from qualified teachers.',
      'Helps students apply rules while reciting, not only memorize them.'
    ],
    outcomes: [
      'Apply core Tajweed rules during recitation.',
      'Improve makharij and clarity.',
      'Recognize common mistakes and correct them.',
      'Recite selected passages with better fluency and care.'
    ],
    syllabus: [
      'Makharij and sifat review',
      'Rules of noon sakin and tanween',
      'Meem sakin, qalqalah, and madd rules',
      'Stopping signs and rhythm',
      'Guided recitation assessment'
    ],
    parentNote:
      'Best for students who already read Quranic text and need accuracy, rule application, and personalized correction.',
    learningObjectives: [
      'Teach proper pronunciation and Tajweed rules.',
      'Help students apply rules during real recitation.',
      'Strengthen confidence and respect in Quran reading.'
    ],
    whatStudentsWillLearn: [
      'Makharij',
      'Core Tajweed rules',
      'Madd and stopping signs',
      'Corrective recitation',
      'Fluency and rhythm'
    ],
    teachingMethod:
      'Teachers use recitation modeling, student reading turns, rule explanation, audio correction, and weekly recitation goals.',
    ...sharedCourseSupport
  },
  {
    slug: 'islamic-studies-for-children',
    title: 'Islamic Studies for Children',
    categoryKey: 'islamic',
    summary: 'Basic Islamic knowledge, beliefs, worship, and character building.',
    description:
      'An age-appropriate Islamic Studies course that teaches faith foundations, worship, manners, stories, and character with warmth and clarity.',
    level: 'Foundations',
    ageGroup: 'Ages 7-12',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'Ages 7-12',
    featured: true,
    accentClass: categoryAccentClasses.islamic,
    teacherSlug: 'qari-idrees',
    benefits: [
      'Teaches core Islamic knowledge in child-friendly language.',
      'Connects beliefs and worship to daily character.',
      'Supports parents who want consistent Islamic learning at home.'
    ],
    outcomes: [
      'Understand basic beliefs and Islamic identity.',
      'Learn essentials of worship and respect.',
      'Practice good character through stories and examples.',
      'Build vocabulary for Islamic concepts.'
    ],
    syllabus: [
      'Basic beliefs and love of Allah',
      'Prayer, worship, and daily good deeds',
      'Islamic manners at home and school',
      'Stories of prophets and righteous examples',
      'Character, honesty, respect, and gratitude'
    ],
    parentNote:
      'Best for children who need a steady foundation in Islamic knowledge, manners, worship, and character.',
    learningObjectives: [
      'Teach basic Islamic knowledge, beliefs, worship, and character building.',
      'Help children connect learning with daily manners.',
      'Encourage respectful questions and age-appropriate understanding.'
    ],
    whatStudentsWillLearn: [
      'Basic beliefs',
      'Worship foundations',
      'Good character',
      'Islamic manners',
      'Stories and lessons'
    ],
    teachingMethod:
      'Teachers use short lessons, stories, discussion, memorization prompts, reflection questions, and simple home practice.',
    ...sharedCourseSupport
  },
  {
    slug: 'daily-duas-islamic-manners',
    title: 'Daily Duas & Islamic Manners',
    categoryKey: 'islamic',
    summary: 'Daily supplications, Islamic etiquette, and good habits.',
    description:
      'A practical course that helps students learn daily duas, Islamic etiquette, and good habits they can use at home, school, and online.',
    level: 'Foundations',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: false,
    accentClass: categoryAccentClasses.islamic,
    teacherSlug: 'qari-idrees',
    benefits: [
      'Turns Islamic manners into everyday practice.',
      'Supports memorization with meaning and repetition.',
      'Helps parents reinforce good habits between classes.'
    ],
    outcomes: [
      'Memorize selected daily duas with meanings.',
      'Practice Islamic etiquette in common situations.',
      'Build habits of gratitude, respect, cleanliness, and kindness.',
      'Use reminders and routines to keep duas active.'
    ],
    syllabus: [
      'Morning, evening, eating, sleeping, and travel duas',
      'Manners with parents, guests, teachers, and classmates',
      'Cleanliness, gratitude, and honesty',
      'Dua meanings and daily use',
      'Habit tracking and parent practice'
    ],
    parentNote:
      'Best for families who want children to learn duas with meaning and practice Islamic manners every day.',
    learningObjectives: [
      'Teach daily supplications, Islamic etiquette, and good habits.',
      'Help students understand when and why duas are used.',
      'Create practical routines parents can continue at home.'
    ],
    whatStudentsWillLearn: [
      'Daily duas',
      'Dua meanings',
      'Islamic etiquette',
      'Respectful habits',
      'Home practice routines'
    ],
    teachingMethod:
      'Teachers use memorization, meaning checks, role plays, repetition, habit charts, and parent-supported practice.',
    ...sharedCourseSupport
  },
  {
    slug: 'seerah-of-prophet-muhammad',
    title: 'Seerah of Prophet Muhammad ﷺ',
    categoryKey: 'islamic',
    summary: 'Life, character, and lessons from the Prophet ﷺ.',
    description:
      'A reflective Seerah course that teaches the life, character, mercy, patience, courage, and lessons of the Prophet Muhammad ﷺ.',
    level: 'Foundations',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: false,
    accentClass: categoryAccentClasses.islamic,
    teacherSlug: 'qari-idrees',
    benefits: [
      'Presents Seerah in an age-appropriate and heart-centered way.',
      'Connects historical events with character lessons.',
      'Helps students love and follow the example of the Prophet ﷺ.'
    ],
    outcomes: [
      'Understand major events from the Seerah.',
      'Describe qualities of the Prophet ﷺ such as mercy, patience, and honesty.',
      'Reflect on lessons students can apply in daily life.',
      'Build respect and love for Islamic history.'
    ],
    syllabus: [
      'Makkah, family, childhood, and early life',
      'Prophethood, patience, and calling to truth',
      'Hijrah, Madinah, brotherhood, and community',
      'Mercy, honesty, courage, and forgiveness',
      'Daily lessons from the Seerah'
    ],
    parentNote:
      'Best for students who should know the life and character of the Prophet ﷺ through clear stories and practical lessons.',
    learningObjectives: [
      'Teach the life, character, and lessons from the Prophet ﷺ.',
      'Help students connect Seerah with manners and choices.',
      'Build love, respect, and understanding through storytelling.'
    ],
    whatStudentsWillLearn: [
      'Major Seerah events',
      'Character lessons',
      'Islamic history vocabulary',
      'Reflection and discussion',
      'Daily-life applications'
    ],
    teachingMethod:
      'Teachers use storytelling, timelines, discussion questions, reflection tasks, and short student presentations.',
    ...sharedCourseSupport
  },
  {
    slug: 'afghan-culture-heritage',
    title: 'Afghan Culture & Heritage',
    categoryKey: 'heritage',
    summary:
      'Afghan history, traditions, values, cultural identity, famous personalities, and national heritage.',
    description:
      'A project-based heritage course that helps Afghan children and teenagers abroad understand Afghanistan, family stories, traditions, values, and identity.',
    level: 'All Levels',
    ageGroup: 'All ages',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Live online group or special class',
    price: 'From $30/month',
    rating: 'Placement based',
    students: 'All ages',
    featured: true,
    accentClass: categoryAccentClasses.heritage,
    teacherSlug: 'layla-sadat',
    benefits: [
      'Helps children feel connected to Afghan identity while living abroad.',
      'Encourages family conversations with parents and grandparents.',
      'Builds pride through history, traditions, values, and creative projects.'
    ],
    outcomes: [
      'Understand major regions, languages, and traditions of Afghanistan.',
      'Explore Afghan values, celebrations, poetry, and national heritage.',
      'Learn about famous Afghan personalities and contributions.',
      'Create and present a personal heritage project.'
    ],
    syllabus: [
      'Afghanistan map, regions, languages, and communities',
      'Family stories, oral history, and identity',
      'Traditions, clothing, food, celebrations, and values',
      'Famous personalities, poetry, arts, and national heritage',
      'Student heritage project and presentation'
    ],
    parentNote:
      'Best for families who want children to understand Afghan heritage with pride, curiosity, and respect.',
    learningObjectives: [
      'Teach Afghan history, traditions, values, cultural identity, famous personalities, and national heritage.',
      'Help students connect family stories to a wider Afghan identity.',
      'Encourage respectful cultural pride through creative projects.'
    ],
    whatStudentsWillLearn: [
      'Afghan geography and regions',
      'Traditions and values',
      'Famous Afghan personalities',
      'History and national heritage',
      'Personal heritage presentation'
    ],
    teachingMethod:
      'Teachers use storytelling, maps, images, guided discussion, family interview prompts, creative projects, and presentations.',
    ...sharedCourseSupport
  },
  {
    slug: 'dari-for-english-speakers-beginner',
    title: 'Dari for English Speakers - Beginner',
    categoryKey: 'premium',
    summary:
      'A premium Special Class only Dari program taught in English for learners starting from the beginning.',
    description:
      'This premium program helps English-speaking children, teenagers, and adults begin Dari with clear explanations in English, personalized pacing, and cultural context from native Dari teachers.',
    level: 'Beginner',
    ageGroup: 'Children, teens, and adults',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Special Class only: private or semi-private',
    price: '$150/month',
    rating: 'Premium placement',
    students: 'English speakers',
    featured: false,
    accentClass: categoryAccentClasses.premium,
    teacherSlug: 'maryam-farahi',
    benefits: premiumHighlights,
    outcomes: [
      'Basic Dari conversation',
      'Everyday vocabulary',
      'Reading Dari alphabet',
      'Writing basic sentences',
      'Understanding Afghan culture and common expressions'
    ],
    syllabus: [
      'Dari greetings, introductions, and pronunciation through English explanations',
      'Everyday vocabulary for family, home, food, travel, and community',
      'Dari alphabet reading and sound recognition',
      'Basic sentence writing and guided correction',
      'Afghan culture, manners, and common expressions'
    ],
    parentNote:
      'Best for English-speaking students who want to learn Dari from the beginning with private or semi-private support.',
    learningObjectives: [
      'Build basic Dari conversation for English-speaking learners.',
      'Teach alphabet reading and simple writing with English explanations.',
      'Introduce Afghan culture and common expressions alongside language practice.'
    ],
    whatStudentsWillLearn: [
      'Basic Dari conversation',
      'Everyday vocabulary',
      'Dari alphabet reading',
      'Basic sentence writing',
      'Afghan culture and common expressions'
    ],
    teachingMethod:
      'Native Dari teachers explain new language in English, model pronunciation, personalize lessons, and use cultural immersion tasks to build confidence.',
    targetStudents:
      'Children, teenagers, and adults who speak English and want to learn Dari from the beginning.',
    ...sharedPremiumCourseSupport
  },
  {
    slug: 'dari-for-english-speakers-intermediate',
    title: 'Dari for English Speakers - Intermediate',
    categoryKey: 'premium',
    summary:
      'A premium Special Class only Dari fluency program taught in English for students who already know basic Dari.',
    description:
      'This premium intermediate program helps English-speaking learners improve real conversation, grammar, reading, writing, and cultural understanding with personalized teacher attention.',
    level: 'Intermediate',
    ageGroup: 'Children, teens, and adults',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Special Class only: private or semi-private',
    price: '$150/month',
    rating: 'Premium placement',
    students: 'English speakers with basic Dari',
    featured: false,
    accentClass: categoryAccentClasses.premium,
    teacherSlug: 'maryam-farahi',
    benefits: premiumHighlights,
    outcomes: [
      'Real conversations',
      'Grammar improvement',
      'Reading short texts',
      'Writing paragraphs',
      'Cultural understanding'
    ],
    syllabus: [
      'Real conversation practice for family, travel, identity, and community topics',
      'Grammar improvement through sentence patterns and correction',
      'Reading short Dari texts with vocabulary support',
      'Paragraph writing and teacher feedback',
      'Cultural understanding through expressions, stories, and manners'
    ],
    parentNote:
      'Best for English-speaking students who already know basic Dari and want to improve fluency through personalized lessons.',
    learningObjectives: [
      'Improve Dari fluency for students with basic prior knowledge.',
      'Strengthen grammar, reading, and paragraph writing.',
      'Deepen cultural understanding through guided conversation.'
    ],
    whatStudentsWillLearn: [
      'Real conversations',
      'Grammar improvement',
      'Short text reading',
      'Paragraph writing',
      'Cultural understanding'
    ],
    teachingMethod:
      'Native Dari teachers use English explanations when helpful, then move students into more Dari conversation, reading, and writing with individualized correction.',
    targetStudents:
      'Students who already know basic Dari and want to improve fluency.',
    ...sharedPremiumCourseSupport
  },
  {
    slug: 'pashto-for-english-speakers-beginner',
    title: 'Pashto for English Speakers - Beginner',
    categoryKey: 'premium',
    summary:
      'A premium Special Class only Pashto program taught in English for learners starting from the beginning.',
    description:
      'This premium program helps English-speaking children, teenagers, and adults begin Pashto with clear English instruction, personalized lessons, and cultural immersion with native Pashto teachers.',
    level: 'Beginner',
    ageGroup: 'Children, teens, and adults',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Special Class only: private or semi-private',
    price: '$150/month',
    rating: 'Premium placement',
    students: 'English speakers',
    featured: false,
    accentClass: categoryAccentClasses.premium,
    teacherSlug: 'ahmad-wali',
    benefits: premiumHighlights,
    outcomes: [
      'Basic Pashto conversation',
      'Everyday vocabulary',
      'Reading Pashto alphabet',
      'Writing basic sentences',
      'Understanding Pashtun culture and traditions'
    ],
    syllabus: [
      'Pashto greetings, introductions, and pronunciation through English explanations',
      'Everyday vocabulary for home, family, food, travel, and community',
      'Pashto alphabet reading and sound recognition',
      'Basic sentence writing and guided correction',
      'Pashtun culture, traditions, manners, and common expressions'
    ],
    parentNote:
      'Best for English-speaking students who want to learn Pashto from the beginning with private or semi-private support.',
    learningObjectives: [
      'Build basic Pashto conversation for English-speaking learners.',
      'Teach alphabet reading and simple writing with English explanations.',
      'Introduce Pashtun culture and traditions alongside language practice.'
    ],
    whatStudentsWillLearn: [
      'Basic Pashto conversation',
      'Everyday vocabulary',
      'Pashto alphabet reading',
      'Basic sentence writing',
      'Pashtun culture and traditions'
    ],
    teachingMethod:
      'Native Pashto teachers explain new language in English, model pronunciation, personalize lessons, and use cultural immersion tasks to build confidence.',
    targetStudents:
      'Children, teenagers, and adults who speak English and want to learn Pashto from the beginning.',
    ...sharedPremiumCourseSupport
  },
  {
    slug: 'pashto-for-english-speakers-intermediate',
    title: 'Pashto for English Speakers - Intermediate',
    categoryKey: 'premium',
    summary:
      'A premium Special Class only Pashto fluency program taught in English for students who already know basic Pashto.',
    description:
      'This premium intermediate program helps English-speaking learners improve real conversation, grammar, reading, paragraph writing, and cultural understanding with personalized teacher attention.',
    level: 'Intermediate',
    ageGroup: 'Children, teens, and adults',
    duration: 'Monthly enrollment',
    lessons: 8,
    format: 'Special Class only: private or semi-private',
    price: '$150/month',
    rating: 'Premium placement',
    students: 'English speakers with basic Pashto',
    featured: false,
    accentClass: categoryAccentClasses.premium,
    teacherSlug: 'ahmad-wali',
    benefits: premiumHighlights,
    outcomes: [
      'Real conversations',
      'Grammar improvement',
      'Reading short texts',
      'Writing paragraphs',
      'Cultural understanding'
    ],
    syllabus: [
      'Real conversation practice for family, travel, identity, and community topics',
      'Grammar improvement through sentence patterns and correction',
      'Reading short Pashto texts with vocabulary support',
      'Paragraph writing and teacher feedback',
      'Cultural understanding through expressions, stories, and traditions'
    ],
    parentNote:
      'Best for English-speaking students who already know basic Pashto and want to improve fluency through personalized lessons.',
    learningObjectives: [
      'Improve Pashto fluency for students with basic prior knowledge.',
      'Strengthen grammar, reading, and paragraph writing.',
      'Deepen cultural understanding through guided conversation.'
    ],
    whatStudentsWillLearn: [
      'Real conversations',
      'Grammar improvement',
      'Short text reading',
      'Paragraph writing',
      'Cultural understanding'
    ],
    teachingMethod:
      'Native Pashto teachers use English explanations when helpful, then move students into more Pashto conversation, reading, and writing with individualized correction.',
    targetStudents:
      'Students who already know basic Pashto and want to improve fluency.',
    ...sharedPremiumCourseSupport
  }
]

export const getCourseCategorySections = (
  locale: LocaleCode = defaultLocale
): CourseCategorySection[] => {
  const labels = categoryLabels[locale] ?? categoryLabels[defaultLocale]

  return categoryOrder.map((key) => ({
    key,
    title: labels[key],
    description: categoryDescriptions[key],
    accentClass: categoryAccentClasses[key]
  }))
}

export const getCourseCategories = (locale: LocaleCode = defaultLocale) => [
  categoryLabels[locale]?.all ?? categoryLabels[defaultLocale].all,
  ...getCourseCategorySections(locale).map((category) => category.title)
]

export const getCourses = (locale: LocaleCode = defaultLocale): Course[] => {
  const labels = categoryLabels[locale] ?? categoryLabels[defaultLocale]

  return courseBase.map((course) => ({
    ...course,
    category: labels[course.categoryKey as CourseCategoryKey]
  }))
}

export const courseCategorySections = getCourseCategorySections()
export const courses = getCourses()
export const courseCategories = getCourseCategories()
export const featuredCourses = courses.filter((course) => course.featured)
