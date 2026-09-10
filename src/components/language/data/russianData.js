// src/data/russianData.js

// Russian Alphabet (33 letters)
export const russianAlphabet = [
  { id: 'a', letter: 'А', english: 'A', pronunciation: 'Ah', sound: 'a', word: 'Арбуз (Watermelon)' },
  { id: 'be', letter: 'Б', english: 'B', pronunciation: 'Beh', sound: 'b', word: 'Банан (Banana)' },
  { id: 've', letter: 'В', english: 'V', pronunciation: 'Veh', sound: 'v', word: 'Вода (Water)' },
  { id: 'ge', letter: 'Г', english: 'G', pronunciation: 'Geh', sound: 'g', word: 'Город (City)' },
  { id: 'de', letter: 'Д', english: 'D', pronunciation: 'Deh', sound: 'd', word: 'Дом (House)' },
  { id: 'ye', letter: 'Е', english: 'Ye', pronunciation: 'Yeh', sound: 'ye', word: 'Еда (Food)' },
  { id: 'yo', letter: 'Ё', english: 'Yo', pronunciation: 'Yoh', sound: 'yo', word: 'Ёлка (Christmas tree)' },
  { id: 'zhe', letter: 'Ж', english: 'Zh', pronunciation: 'Zheh', sound: 'zh', word: 'Жук (Beetle)' },
  { id: 'ze', letter: 'З', english: 'Z', pronunciation: 'Zeh', sound: 'z', word: 'Зима (Winter)' },
  { id: 'ee', letter: 'И', english: 'I', pronunciation: 'Ee', sound: 'ee', word: 'Игра (Game)' },
  { id: 'y', letter: 'Й', english: 'Y', pronunciation: 'Short I', sound: 'y', word: 'Йогурт (Yogurt)' },
  { id: 'ka', letter: 'К', english: 'K', pronunciation: 'Kah', sound: 'k', word: 'Книга (Book)' },
  { id: 'el', letter: 'Л', english: 'L', pronunciation: 'Ehl', sound: 'l', word: 'Лето (Summer)' },
  { id: 'em', letter: 'М', english: 'M', pronunciation: 'Ehm', sound: 'm', word: 'Море (Sea)' },
  { id: 'en', letter: 'Н', english: 'N', pronunciation: 'Ehn', sound: 'n', word: 'Ночь (Night)' },
  { id: 'oh', letter: 'О', english: 'O', pronunciation: 'Oh', sound: 'o', word: 'Окно (Window)' },
  { id: 'pe', letter: 'П', english: 'P', pronunciation: 'Peh', sound: 'p', word: 'Птица (Bird)' },
  { id: 'er', letter: 'Р', english: 'R', pronunciation: 'Ehr', sound: 'r', word: 'Река (River)' },
  { id: 'es', letter: 'С', english: 'S', pronunciation: 'Ess', sound: 's', word: 'Солнце (Sun)' },
  { id: 'te', letter: 'Т', english: 'T', pronunciation: 'Teh', sound: 't', word: 'Телефон (Phone)' },
  { id: 'oo', letter: 'У', english: 'U', pronunciation: 'Oo', sound: 'oo', word: 'Улица (Street)' },
  { id: 'ef', letter: 'Ф', english: 'F', pronunciation: 'Ef', sound: 'f', word: 'Флаг (Flag)' },
  { id: 'kh', letter: 'Х', english: 'Kh', pronunciation: 'Khah', sound: 'kh', word: 'Хлеб (Bread)' },
  { id: 'ts', letter: 'Ц', english: 'Ts', pronunciation: 'Tseh', sound: 'ts', word: 'Цветок (Flower)' },
  { id: 'ch', letter: 'Ч', english: 'Ch', pronunciation: 'Cheh', sound: 'ch', word: 'Чай (Tea)' },
  { id: 'sh', letter: 'Ш', english: 'Sh', pronunciation: 'Shah', sound: 'sh', word: 'Школа (School)' },
  { id: 'shch', letter: 'Щ', english: 'Shch', pronunciation: 'Shchah', sound: 'shch', word: 'Щука (Pike fish)' },
  { id: 'hard', letter: 'Ъ', english: 'Hard Sign', pronunciation: 'Tvyordiy Znak', sound: '', word: 'Съезд (Congress)' },
  { id: 'y', letter: 'Ы', english: 'Y', pronunciation: 'Yeh', sound: 'y', word: 'Мышь (Mouse)' },
  { id: 'soft', letter: 'Ь', english: 'Soft Sign', pronunciation: 'Myagkiy Znak', sound: '', word: 'Соль (Salt)' },
  { id: 'eh', letter: 'Э', english: 'E', pronunciation: 'Eh', sound: 'eh', word: 'Электричество (Electricity)' },
  { id: 'yu', letter: 'Ю', english: 'Yu', pronunciation: 'Yoo', sound: 'yu', word: 'Юг (South)' },
  { id: 'ya', letter: 'Я', english: 'Ya', pronunciation: 'Yah', sound: 'ya', word: 'Яблоко (Apple)' }
];

// Common Russian Phrases (Expanded)
export const commonPhrases = [
  // Greetings
  { id: 'greet-1', russian: 'Привет', english: 'Hello', bangla: 'হ্যালো', category: 'Greetings' },
  { id: 'greet-2', russian: 'Здравствуйте', english: 'Hello (formal)', bangla: 'হ্যালো (শিষ্ট)', category: 'Greetings' },
  { id: 'greet-3', russian: 'Доброе утро', english: 'Good morning', bangla: 'সুপ্রভাত', category: 'Greetings' },
  { id: 'greet-4', russian: 'Добрый день', english: 'Good afternoon', bangla: 'শুভ অপরাহ্ন', category: 'Greetings' },
  { id: 'greet-5', russian: 'Добрый вечер', english: 'Good evening', bangla: 'শুভ সন্ধ্যা', category: 'Greetings' },
  { id: 'greet-6', russian: 'Спокойной ночи', english: 'Good night', bangla: 'শুভ রাত্রি', category: 'Greetings' },
  // Questions
  { id: 'ques-1', russian: 'Как дела?', english: 'How are you?', bangla: 'কেমন আছেন?', category: 'Questions' },
  { id: 'ques-2', russian: 'Что нового?', english: 'What\'s new?', bangla: 'কী নতুন?', category: 'Questions' },
  { id: 'ques-3', russian: 'Где туалет?', english: 'Where is the toilet?', bangla: 'টয়লেট কোথায়?', category: 'Questions' },
  { id: 'ques-4', russian: 'Сколько стоит?', english: 'How much does it cost?', bangla: 'দাম কত?', category: 'Questions' },
  { id: 'ques-5', russian: 'Где находится...?', english: 'Where is...?', bangla: '... কোথায়?', category: 'Questions' },
  // Polite
  { id: 'polite-1', russian: 'Спасибо', english: 'Thank you', bangla: 'ধন্যবাদ', category: 'Polite' },
  { id: 'polite-2', russian: 'Большое спасибо', english: 'Thank you very much', bangla: 'অনেক ধন্যবাদ', category: 'Polite' },
  { id: 'polite-3', russian: 'Пожалуйста', english: 'Please / You\'re welcome', bangla: 'দয়া করে / স্বাগতম', category: 'Polite' },
  { id: 'polite-4', russian: 'Извините', english: 'Excuse me / Sorry', bangla: 'মাফ করবেন', category: 'Polite' },
  // Basic
  { id: 'basic-1', russian: 'Да', english: 'Yes', bangla: 'হ্যাঁ', category: 'Basic' },
  { id: 'basic-2', russian: 'Нет', english: 'No', bangla: 'না', category: 'Basic' },
  // Introduction
  { id: 'intro-1', russian: 'Меня зовут...', english: 'My name is...', bangla: 'আমার নাম...', category: 'Introduction' },
  { id: 'intro-2', russian: 'Я из...', english: 'I am from...', bangla: 'আমি ... থেকে এসেছি', category: 'Introduction' },
  { id: 'intro-3', russian: 'Я говорю по-русски', english: 'I speak Russian', bangla: 'আমি রুশ ভাষায় কথা বলি', category: 'Introduction' },
  // Food
  { id: 'food-1', russian: 'Я голоден', english: 'I am hungry', bangla: 'আমি ক্ষুধার্ত', category: 'Food' },
  { id: 'food-2', russian: 'Я хочу пить', english: 'I want to drink', bangla: 'আমি পান করতে চাই', category: 'Food' },
  { id: 'food-3', russian: 'Что вы хотите?', english: 'What do you want?', bangla: 'আপনি কী চান?', category: 'Food' },
  // Shopping
  { id: 'shop-1', russian: 'Сколько это стоит?', english: 'How much is this?', bangla: 'এটার দাম কত?', category: 'Shopping' },
  { id: 'shop-2', russian: 'Я хочу купить', english: 'I want to buy', bangla: 'আমি কিনতে চাই', category: 'Shopping' },
  // Emergency
  { id: 'emergency-1', russian: 'Помогите!', english: 'Help!', bangla: 'সাহায্য করুন!', category: 'Emergency' },
  { id: 'emergency-2', russian: 'Вызовите полицию', english: 'Call the police', bangla: 'পুলিশ ডাকুন', category: 'Emergency' },
  // Travel
  { id: 'travel-1', russian: 'Где остановиться?', english: 'Where to stay?', bangla: 'কোথায় থাকবেন?', category: 'Travel' },
  { id: 'travel-2', russian: 'Как добраться?', english: 'How to get there?', bangla: 'কীভাবে যাবেন?', category: 'Travel' }
];

// Vocabulary - Complete Categories
export const vocabulary = [
  // Family (Семья)
  { id: 'voc-1', russian: 'Мама', english: 'Mother', bangla: 'মা', category: 'Family' },
  { id: 'voc-2', russian: 'Папа', english: 'Father', bangla: 'বাবা', category: 'Family' },
  { id: 'voc-3', russian: 'Брат', english: 'Brother', bangla: 'ভাই', category: 'Family' },
  { id: 'voc-4', russian: 'Сестра', english: 'Sister', bangla: 'বোন', category: 'Family' },
  { id: 'voc-5', russian: 'Дедушка', english: 'Grandfather', bangla: 'দাদা', category: 'Family' },
  { id: 'voc-6', russian: 'Бабушка', english: 'Grandmother', bangla: 'দাদী', category: 'Family' },
  { id: 'voc-7', russian: 'Дядя', english: 'Uncle', bangla: 'চাচা', category: 'Family' },
  { id: 'voc-8', russian: 'Тётя', english: 'Aunt', bangla: 'চাচী', category: 'Family' },
  // Home (Дом)
  { id: 'voc-9', russian: 'Дом', english: 'House', bangla: 'বাড়ি', category: 'Home' },
  { id: 'voc-10', russian: 'Квартира', english: 'Apartment', bangla: 'অ্যাপার্টমেন্ট', category: 'Home' },
  { id: 'voc-11', russian: 'Комната', english: 'Room', bangla: 'ঘর', category: 'Home' },
  { id: 'voc-12', russian: 'Кухня', english: 'Kitchen', bangla: 'রান্নাঘর', category: 'Home' },
  { id: 'voc-13', russian: 'Ванная', english: 'Bathroom', bangla: 'বাথরুম', category: 'Home' },
  { id: 'voc-14', russian: 'Спальня', english: 'Bedroom', bangla: 'শয়নকক্ষ', category: 'Home' },
  // Objects (Предметы)
  { id: 'voc-15', russian: 'Книга', english: 'Book', bangla: 'বই', category: 'Objects' },
  { id: 'voc-16', russian: 'Стол', english: 'Table', bangla: 'টেবিল', category: 'Objects' },
  { id: 'voc-17', russian: 'Стул', english: 'Chair', bangla: 'চেয়ার', category: 'Objects' },
  { id: 'voc-18', russian: 'Дверь', english: 'Door', bangla: 'দরজা', category: 'Objects' },
  { id: 'voc-19', russian: 'Окно', english: 'Window', bangla: 'জানালা', category: 'Objects' },
  { id: 'voc-20', russian: 'Телефон', english: 'Phone', bangla: 'ফোন', category: 'Objects' },
  { id: 'voc-21', russian: 'Компьютер', english: 'Computer', bangla: 'কম্পিউটার', category: 'Objects' },
  // Animals (Животные)
  { id: 'voc-22', russian: 'Кошка', english: 'Cat', bangla: 'বিড়াল', category: 'Animals' },
  { id: 'voc-23', russian: 'Собака', english: 'Dog', bangla: 'কুকুর', category: 'Animals' },
  { id: 'voc-24', russian: 'Птица', english: 'Bird', bangla: 'পাখি', category: 'Animals' },
  { id: 'voc-25', russian: 'Лошадь', english: 'Horse', bangla: 'ঘোড়া', category: 'Animals' },
  { id: 'voc-26', russian: 'Корова', english: 'Cow', bangla: 'গরু', category: 'Animals' },
  { id: 'voc-27', russian: 'Медведь', english: 'Bear', bangla: 'ভালুক', category: 'Animals' },
  // Food (Еда)
  { id: 'voc-28', russian: 'Хлеб', english: 'Bread', bangla: 'রুটি', category: 'Food' },
  { id: 'voc-29', russian: 'Молоко', english: 'Milk', bangla: 'দুধ', category: 'Food' },
  { id: 'voc-30', russian: 'Мясо', english: 'Meat', bangla: 'মাংস', category: 'Food' },
  { id: 'voc-31', russian: 'Рыба', english: 'Fish', bangla: 'মাছ', category: 'Food' },
  { id: 'voc-32', russian: 'Яблоко', english: 'Apple', bangla: 'আপেল', category: 'Food' },
  { id: 'voc-33', russian: 'Чай', english: 'Tea', bangla: 'চা', category: 'Food' },
  { id: 'voc-34', russian: 'Кофе', english: 'Coffee', bangla: 'কফি', category: 'Food' },
  // Travel (Путешествия)
  { id: 'voc-35', russian: 'Аэропорт', english: 'Airport', bangla: 'বিমানবন্দর', category: 'Travel' },
  { id: 'voc-36', russian: 'Вокзал', english: 'Train station', bangla: 'রেল স্টেশন', category: 'Travel' },
  { id: 'voc-37', russian: 'Гостиница', english: 'Hotel', bangla: 'হোটেল', category: 'Travel' },
  { id: 'voc-38', russian: 'Билет', english: 'Ticket', bangla: 'টিকিট', category: 'Travel' },
  { id: 'voc-39', russian: 'Паспорт', english: 'Passport', bangla: 'পাসপোর্ট', category: 'Travel' },
  { id: 'voc-40', russian: 'Самолёт', english: 'Airplane', bangla: 'বিমান', category: 'Travel' },
  // Colors (Цвета)
  { id: 'voc-41', russian: 'Красный', english: 'Red', bangla: 'লাল', category: 'Colors' },
  { id: 'voc-42', russian: 'Синий', english: 'Blue', bangla: 'নীল', category: 'Colors' },
  { id: 'voc-43', russian: 'Зелёный', english: 'Green', bangla: 'সবুজ', category: 'Colors' },
  { id: 'voc-44', russian: 'Жёлтый', english: 'Yellow', bangla: 'হলুদ', category: 'Colors' },
  { id: 'voc-45', russian: 'Белый', english: 'White', bangla: 'সাদা', category: 'Colors' },
  { id: 'voc-46', russian: 'Чёрный', english: 'Black', bangla: 'কালো', category: 'Colors' }
];

// Russian Numbers (1-100)
export const russianNumbers = [
  { id: 'num-1', number: '1', russian: 'Один', english: 'One', bangla: 'এক' },
  { id: 'num-2', number: '2', russian: 'Два', english: 'Two', bangla: 'দুই' },
  { id: 'num-3', number: '3', russian: 'Три', english: 'Three', bangla: 'তিন' },
  { id: 'num-4', number: '4', russian: 'Четыре', english: 'Four', bangla: 'চার' },
  { id: 'num-5', number: '5', russian: 'Пять', english: 'Five', bangla: 'পাঁচ' },
  { id: 'num-6', number: '6', russian: 'Шесть', english: 'Six', bangla: 'ছয়' },
  { id: 'num-7', number: '7', russian: 'Семь', english: 'Seven', bangla: 'সাত' },
  { id: 'num-8', number: '8', russian: 'Восемь', english: 'Eight', bangla: 'আট' },
  { id: 'num-9', number: '9', russian: 'Девять', english: 'Nine', bangla: 'নয়' },
  { id: 'num-10', number: '10', russian: 'Десять', english: 'Ten', bangla: 'দশ' },
  { id: 'num-11', number: '11', russian: 'Одиннадцать', english: 'Eleven', bangla: 'এগারো' },
  { id: 'num-12', number: '12', russian: 'Двенадцать', english: 'Twelve', bangla: 'বারো' },
  { id: 'num-13', number: '13', russian: 'Тринадцать', english: 'Thirteen', bangla: 'তেরো' },
  { id: 'num-14', number: '14', russian: 'Четырнадцать', english: 'Fourteen', bangla: 'চৌদ্দ' },
  { id: 'num-15', number: '15', russian: 'Пятнадцать', english: 'Fifteen', bangla: 'পনেরো' },
  { id: 'num-16', number: '16', russian: 'Шестнадцать', english: 'Sixteen', bangla: 'ষোল' },
  { id: 'num-17', number: '17', russian: 'Семнадцать', english: 'Seventeen', bangla: 'সতেরো' },
  { id: 'num-18', number: '18', russian: 'Восемнадцать', english: 'Eighteen', bangla: 'আঠারো' },
  { id: 'num-19', number: '19', russian: 'Девятнадцать', english: 'Nineteen', bangla: 'উনিশ' },
  { id: 'num-20', number: '20', russian: 'Двадцать', english: 'Twenty', bangla: 'বিশ' },
  { id: 'num-30', number: '30', russian: 'Тридцать', english: 'Thirty', bangla: 'ত্রিশ' },
  { id: 'num-40', number: '40', russian: 'Сорок', english: 'Forty', bangla: 'চল্লিশ' },
  { id: 'num-50', number: '50', russian: 'Пятьдесят', english: 'Fifty', bangla: 'পঞ্চাশ' },
  { id: 'num-60', number: '60', russian: 'Шестьдесят', english: 'Sixty', bangla: 'ষাট' },
  { id: 'num-70', number: '70', russian: 'Семьдесят', english: 'Seventy', bangla: 'সত্তর' },
  { id: 'num-80', number: '80', russian: 'Восемьдесят', english: 'Eighty', bangla: 'আশি' },
  { id: 'num-90', number: '90', russian: 'Девяносто', english: 'Ninety', bangla: 'নব্বই' },
  { id: 'num-100', number: '100', russian: 'Сто', english: 'One hundred', bangla: 'একশ' }
];

// Grammar Rules (Russian Grammar)
export const grammarRules = [
  {
    id: 'gram-1',
    title: 'Russian Alphabet',
    description: 'The Russian alphabet consists of 33 letters: 21 consonants, 10 vowels, and 2 silent letters.',
    rules: [
      'There are 5 pairs of voiced/voiceless consonants: б/п, в/ф, г/к, д/т, ж/ш',
      'The letters Ъ and Ь are silent and modify the preceding consonant'
    ]
  },
  {
    id: 'gram-2',
    title: 'Russian Cases',
    description: 'Russian has 6 grammatical cases that change the ending of words.',
    rules: [
      'Nominative - Subject of the sentence',
      'Genitive - Possession',
      'Dative - Indirect object',
      'Accusative - Direct object',
      'Instrumental - Means or instrument',
      'Prepositional - Location (used with prepositions)'
    ]
  },
  {
    id: 'gram-3',
    title: 'Russian Verb Conjugation',
    description: 'Russian verbs change according to person, number, and tense.',
    rules: [
      'There are two main conjugation types: -ть and -ить endings',
      'Present tense: я говорю, ты говоришь, он говорит...',
      'Past tense: говорил (masculine), говорила (feminine)',
      'Future tense uses быть + infinitive or perfective form'
    ]
  }
];

// Russian Culture Facts
export const cultureFacts = [
  {
    id: 'culture-1',
    icon: '🎭',
    title: 'Russian Literature',
    description: 'Russia is famous for authors like Leo Tolstoy, Fyodor Dostoevsky, and Alexander Pushkin.'
  },
  {
    id: 'culture-2',
    icon: '🎵',
    title: 'Russian Music',
    description: 'Classical composers like Tchaikovsky, Rachmaninoff, and Stravinsky are world-renowned.'
  },
  {
    id: 'culture-3',
    icon: '🏛️',
    title: 'Russian Architecture',
    description: 'Famous for onion-domed churches, the Kremlin, and Soviet-era brutalist buildings.'
  },
  {
    id: 'culture-4',
    icon: '🍷',
    title: 'Russian Cuisine',
    description: 'Popular dishes include borscht, pelmeni, blini, and traditionally vodka.'
  }
];

// Quiz Questions
export const quizQuestions = [
  {
    id: 'quiz-1',
    question: 'How do you say "Hello" in Russian?',
    options: ['Привет', 'Спасибо', 'Пожалуйста', 'Да'],
    correct: 'Привет',
    explanation: 'Привет (Privet) is the informal way to say "Hello" in Russian.'
  },
  {
    id: 'quiz-2',
    question: 'What does "Спасибо" mean?',
    options: ['Hello', 'Thank you', 'Please', 'Yes'],
    correct: 'Thank you',
    explanation: 'Спасибо (Spasibo) means "Thank you" in Russian.'
  },
  {
    id: 'quiz-3',
    question: 'Which number is "Три" in Russian?',
    options: ['One', 'Two', 'Three', 'Four'],
    correct: 'Three',
    explanation: 'Три (Tri) means the number "Three" in Russian.'
  },
  {
    id: 'quiz-4',
    question: 'How do you say "No" in Russian?',
    options: ['Да', 'Нет', 'Привет', 'Спасибо'],
    correct: 'Нет',
    explanation: 'Нет (Net) means "No" in Russian.'
  },
  {
    id: 'quiz-5',
    question: 'What is "Молоко" in English?',
    options: ['Bread', 'Meat', 'Milk', 'Fish'],
    correct: 'Milk',
    explanation: 'Молоко (Moloko) means "Milk" in Russian.'
  }
];

// Categories for filtering
export const categories = {
  greetings: 'Greetings',
  questions: 'Questions',
  polite: 'Polite',
  basic: 'Basic',
  introduction: 'Introduction',
  food: 'Food',
  shopping: 'Shopping',
  emergency: 'Emergency',
  travel: 'Travel'
};

// Get unique categories from vocabulary
export const getVocabularyCategories = () => {
  const cats = new Set(vocabulary.map(item => item.category));
  return Array.from(cats);
};

// Get unique categories from phrases
export const getPhraseCategories = () => {
  const cats = new Set(commonPhrases.map(item => item.category));
  return Array.from(cats);
};