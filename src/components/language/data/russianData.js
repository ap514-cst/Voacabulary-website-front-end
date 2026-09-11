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
  { id: 'greet-7', russian: 'До свидания', english: 'Goodbye', bangla: 'বিদায়', category: 'Greetings' },
  { id: 'greet-8', russian: 'Пока', english: 'Bye (informal)', bangla: 'বাই', category: 'Greetings' },
  { id: 'greet-9', russian: 'Увидимся', english: 'See you later', bangla: 'পরে দেখা হবে', category: 'Greetings' },
  // Questions
  { id: 'ques-1', russian: 'Как дела?', english: 'How are you?', bangla: 'কেমন আছেন?', category: 'Questions' },
  { id: 'ques-2', russian: 'Что нового?', english: 'What\'s new?', bangla: 'কী নতুন?', category: 'Questions' },
  { id: 'ques-3', russian: 'Где туалет?', english: 'Where is the toilet?', bangla: 'টয়লেট কোথায়?', category: 'Questions' },
  { id: 'ques-4', russian: 'Сколько стоит?', english: 'How much does it cost?', bangla: 'দাম কত?', category: 'Questions' },
  { id: 'ques-5', russian: 'Где находится...?', english: 'Where is...?', bangla: '... কোথায়?', category: 'Questions' },
  { id: 'ques-6', russian: 'Как вас зовут?', english: 'What is your name?', bangla: 'আপনার নাম কী?', category: 'Questions' },
  { id: 'ques-7', russian: 'Сколько времени?', english: 'What time is it?', bangla: 'কয়টা বাজে?', category: 'Questions' },
  { id: 'ques-8', russian: 'Вы говорите по-английски?', english: 'Do you speak English?', bangla: 'আপনি ইংরেজি বলেন?', category: 'Questions' },
  { id: 'ques-9', russian: 'Почему?', english: 'Why?', bangla: 'কেন?', category: 'Questions' },
  { id: 'ques-10', russian: 'Что это?', english: 'What is this?', bangla: 'এটা কী?', category: 'Questions' },
  // Polite
  { id: 'polite-1', russian: 'Спасибо', english: 'Thank you', bangla: 'ধন্যবাদ', category: 'Polite' },
  { id: 'polite-2', russian: 'Большое спасибо', english: 'Thank you very much', bangla: 'অনেক ধন্যবাদ', category: 'Polite' },
  { id: 'polite-3', russian: 'Пожалуйста', english: 'Please / You\'re welcome', bangla: 'দয়া করে / স্বাগতম', category: 'Polite' },
  { id: 'polite-4', russian: 'Извините', english: 'Excuse me / Sorry', bangla: 'মাফ করবেন', category: 'Polite' },
  { id: 'polite-5', russian: 'Не за что', english: 'You\'re welcome (no problem)', bangla: 'কোনো ব্যাপার না', category: 'Polite' },
  { id: 'polite-6', russian: 'Приятно познакомиться', english: 'Nice to meet you', bangla: 'পরিচিত হয়ে ভালো লাগলো', category: 'Polite' },
  // Basic
  { id: 'basic-1', russian: 'Да', english: 'Yes', bangla: 'হ্যাঁ', category: 'Basic' },
  { id: 'basic-2', russian: 'Нет', english: 'No', bangla: 'না', category: 'Basic' },
  { id: 'basic-3', russian: 'Может быть', english: 'Maybe', bangla: 'হতে পারে', category: 'Basic' },
  { id: 'basic-4', russian: 'Я не понимаю', english: 'I don\'t understand', bangla: 'আমি বুঝতে পারছি না', category: 'Basic' },
  { id: 'basic-5', russian: 'Повторите, пожалуйста', english: 'Please repeat', bangla: 'দয়া করে আবার বলুন', category: 'Basic' },
  // Introduction
  { id: 'intro-1', russian: 'Меня зовут...', english: 'My name is...', bangla: 'আমার নাম...', category: 'Introduction' },
  { id: 'intro-2', russian: 'Я из...', english: 'I am from...', bangla: 'আমি ... থেকে এসেছি', category: 'Introduction' },
  { id: 'intro-3', russian: 'Я говорю по-русски', english: 'I speak Russian', bangla: 'আমি রুশ ভাষায় কথা বলি', category: 'Introduction' },
  { id: 'intro-4', russian: 'Мне ... лет', english: 'I am ... years old', bangla: 'আমার বয়স ... বছর', category: 'Introduction' },
  { id: 'intro-5', russian: 'Я студент', english: 'I am a student', bangla: 'আমি একজন ছাত্র', category: 'Introduction' },
  // Food
  { id: 'food-1', russian: 'Я голоден', english: 'I am hungry', bangla: 'আমি ক্ষুধার্ত', category: 'Food' },
  { id: 'food-2', russian: 'Я хочу пить', english: 'I want to drink', bangla: 'আমি পান করতে চাই', category: 'Food' },
  { id: 'food-3', russian: 'Что вы хотите?', english: 'What do you want?', bangla: 'আপনি কী চান?', category: 'Food' },
  { id: 'food-4', russian: 'Приятного аппетита', english: 'Enjoy your meal', bangla: 'খাবার উপভোগ করুন', category: 'Food' },
  { id: 'food-5', russian: 'Дайте меню, пожалуйста', english: 'Menu, please', bangla: 'মেনু দিন, দয়া করে', category: 'Food' },
  { id: 'food-6', russian: 'Счёт, пожалуйста', english: 'The bill, please', bangla: 'বিল দিন, দয়া করে', category: 'Food' },
  // Shopping
  { id: 'shop-1', russian: 'Сколько это стоит?', english: 'How much is this?', bangla: 'এটার দাম কত?', category: 'Shopping' },
  { id: 'shop-2', russian: 'Я хочу купить', english: 'I want to buy', bangla: 'আমি কিনতে চাই', category: 'Shopping' },
  { id: 'shop-3', russian: 'Это слишком дорого', english: 'This is too expensive', bangla: 'এটা খুব দামি', category: 'Shopping' },
  { id: 'shop-4', russian: 'У вас есть скидка?', english: 'Do you have a discount?', bangla: 'আপনার কি ছাড় আছে?', category: 'Shopping' },
  // Emergency
  { id: 'emergency-1', russian: 'Помогите!', english: 'Help!', bangla: 'সাহায্য করুন!', category: 'Emergency' },
  { id: 'emergency-2', russian: 'Вызовите полицию', english: 'Call the police', bangla: 'পুলিশ ডাকুন', category: 'Emergency' },
  { id: 'emergency-3', russian: 'Мне нужен врач', english: 'I need a doctor', bangla: 'আমার একজন ডাক্তার দরকার', category: 'Emergency' },
  { id: 'emergency-4', russian: 'Вызовите скорую помощь', english: 'Call an ambulance', bangla: 'অ্যাম্বুলেন্স ডাকুন', category: 'Emergency' },
  { id: 'emergency-5', russian: 'Я потерялся', english: 'I am lost', bangla: 'আমি হারিয়ে গেছি', category: 'Emergency' },
  // Travel
  { id: 'travel-1', russian: 'Где остановиться?', english: 'Where to stay?', bangla: 'কোথায় থাকবেন?', category: 'Travel' },
  { id: 'travel-2', russian: 'Как добраться?', english: 'How to get there?', bangla: 'কীভাবে যাবেন?', category: 'Travel' },
  { id: 'travel-3', russian: 'Где ближайшая станция метро?', english: 'Where is the nearest metro station?', bangla: 'নিকটস্থ মেট্রো স্টেশন কোথায়?', category: 'Travel' },
  { id: 'travel-4', russian: 'Один билет, пожалуйста', english: 'One ticket, please', bangla: 'একটি টিকিট, দয়া করে', category: 'Travel' }
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
  { id: 'voc-8a', russian: 'Сын', english: 'Son', bangla: 'ছেলে', category: 'Family' },
  { id: 'voc-8b', russian: 'Дочь', english: 'Daughter', bangla: 'মেয়ে', category: 'Family' },
  { id: 'voc-8c', russian: 'Жена', english: 'Wife', bangla: 'স্ত্রী', category: 'Family' },
  { id: 'voc-8d', russian: 'Муж', english: 'Husband', bangla: 'স্বামী', category: 'Family' },
  // Home (Дом)
  { id: 'voc-9', russian: 'Дом', english: 'House', bangla: 'বাড়ি', category: 'Home' },
  { id: 'voc-10', russian: 'Квартира', english: 'Apartment', bangla: 'অ্যাপার্টমেন্ট', category: 'Home' },
  { id: 'voc-11', russian: 'Комната', english: 'Room', bangla: 'ঘর', category: 'Home' },
  { id: 'voc-12', russian: 'Кухня', english: 'Kitchen', bangla: 'রান্নাঘর', category: 'Home' },
  { id: 'voc-13', russian: 'Ванная', english: 'Bathroom', bangla: 'বাথরুম', category: 'Home' },
  { id: 'voc-14', russian: 'Спальня', english: 'Bedroom', bangla: 'শয়নকক্ষ', category: 'Home' },
  { id: 'voc-14a', russian: 'Гостиная', english: 'Living room', bangla: 'বসার ঘর', category: 'Home' },
  { id: 'voc-14b', russian: 'Сад', english: 'Garden', bangla: 'বাগান', category: 'Home' },
  // Objects (Предметы)
  { id: 'voc-15', russian: 'Книга', english: 'Book', bangla: 'বই', category: 'Objects' },
  { id: 'voc-16', russian: 'Стол', english: 'Table', bangla: 'টেবিল', category: 'Objects' },
  { id: 'voc-17', russian: 'Стул', english: 'Chair', bangla: 'চেয়ার', category: 'Objects' },
  { id: 'voc-18', russian: 'Дверь', english: 'Door', bangla: 'দরজা', category: 'Objects' },
  { id: 'voc-19', russian: 'Окно', english: 'Window', bangla: 'জানালা', category: 'Objects' },
  { id: 'voc-20', russian: 'Телефон', english: 'Phone', bangla: 'ফোন', category: 'Objects' },
  { id: 'voc-21', russian: 'Компьютер', english: 'Computer', bangla: 'কম্পিউটার', category: 'Objects' },
  { id: 'voc-21a', russian: 'Ручка', english: 'Pen', bangla: 'কলম', category: 'Objects' },
  { id: 'voc-21b', russian: 'Сумка', english: 'Bag', bangla: 'ব্যাগ', category: 'Objects' },
  // Animals (Животные)
  { id: 'voc-22', russian: 'Кошка', english: 'Cat', bangla: 'বিড়াল', category: 'Animals' },
  { id: 'voc-23', russian: 'Собака', english: 'Dog', bangla: 'কুকুর', category: 'Animals' },
  { id: 'voc-24', russian: 'Птица', english: 'Bird', bangla: 'পাখি', category: 'Animals' },
  { id: 'voc-25', russian: 'Лошадь', english: 'Horse', bangla: 'ঘোড়া', category: 'Animals' },
  { id: 'voc-26', russian: 'Корова', english: 'Cow', bangla: 'গরু', category: 'Animals' },
  { id: 'voc-27', russian: 'Медведь', english: 'Bear', bangla: 'ভালুক', category: 'Animals' },
  { id: 'voc-27a', russian: 'Рыба', english: 'Fish', bangla: 'মাছ', category: 'Animals' },
  { id: 'voc-27b', russian: 'Лев', english: 'Lion', bangla: 'সিংহ', category: 'Animals' },
  // Food (Еда)
  { id: 'voc-28', russian: 'Хлеб', english: 'Bread', bangla: 'রুটি', category: 'Food' },
  { id: 'voc-29', russian: 'Молоко', english: 'Milk', bangla: 'দুধ', category: 'Food' },
  { id: 'voc-30', russian: 'Мясо', english: 'Meat', bangla: 'মাংস', category: 'Food' },
  { id: 'voc-31', russian: 'Рыба', english: 'Fish', bangla: 'মাছ', category: 'Food' },
  { id: 'voc-32', russian: 'Яблоко', english: 'Apple', bangla: 'আপেল', category: 'Food' },
  { id: 'voc-33', russian: 'Чай', english: 'Tea', bangla: 'চা', category: 'Food' },
  { id: 'voc-34', russian: 'Кофе', english: 'Coffee', bangla: 'কফি', category: 'Food' },
  { id: 'voc-34a', russian: 'Рис', english: 'Rice', bangla: 'ভাত', category: 'Food' },
  { id: 'voc-34b', russian: 'Суп', english: 'Soup', bangla: 'স্যুপ', category: 'Food' },
  { id: 'voc-34c', russian: 'Сахар', english: 'Sugar', bangla: 'চিনি', category: 'Food' },
  { id: 'voc-34d', russian: 'Соль', english: 'Salt', bangla: 'লবণ', category: 'Food' },
  // Travel (Путешествия)
  { id: 'voc-35', russian: 'Аэропорт', english: 'Airport', bangla: 'বিমানবন্দর', category: 'Travel' },
  { id: 'voc-36', russian: 'Вокзал', english: 'Train station', bangla: 'রেল স্টেশন', category: 'Travel' },
  { id: 'voc-37', russian: 'Гостиница', english: 'Hotel', bangla: 'হোটেল', category: 'Travel' },
  { id: 'voc-38', russian: 'Билет', english: 'Ticket', bangla: 'টিকিট', category: 'Travel' },
  { id: 'voc-39', russian: 'Паспорт', english: 'Passport', bangla: 'পাসপোর্ট', category: 'Travel' },
  { id: 'voc-40', russian: 'Самолёт', english: 'Airplane', bangla: 'বিমান', category: 'Travel' },
  { id: 'voc-40a', russian: 'Поезд', english: 'Train', bangla: 'ট্রেন', category: 'Travel' },
  { id: 'voc-40b', russian: 'Такси', english: 'Taxi', bangla: 'ট্যাক্সি', category: 'Travel' },
  // Colors (Цвета)
  { id: 'voc-41', russian: 'Красный', english: 'Red', bangla: 'লাল', category: 'Colors' },
  { id: 'voc-42', russian: 'Синий', english: 'Blue', bangla: 'নীল', category: 'Colors' },
  { id: 'voc-43', russian: 'Зелёный', english: 'Green', bangla: 'সবুজ', category: 'Colors' },
  { id: 'voc-44', russian: 'Жёлтый', english: 'Yellow', bangla: 'হলুদ', category: 'Colors' },
  { id: 'voc-45', russian: 'Белый', english: 'White', bangla: 'সাদা', category: 'Colors' },
  { id: 'voc-46', russian: 'Чёрный', english: 'Black', bangla: 'কালো', category: 'Colors' },
  { id: 'voc-46a', russian: 'Розовый', english: 'Pink', bangla: 'গোলাপি', category: 'Colors' },
  { id: 'voc-46b', russian: 'Серый', english: 'Grey', bangla: 'ধূসর', category: 'Colors' },
  // Body Parts (Части тела) - NEW
  { id: 'voc-47', russian: 'Голова', english: 'Head', bangla: 'মাথা', category: 'Body Parts' },
  { id: 'voc-48', russian: 'Рука', english: 'Hand/Arm', bangla: 'হাত', category: 'Body Parts' },
  { id: 'voc-49', russian: 'Нога', english: 'Leg/Foot', bangla: 'পা', category: 'Body Parts' },
  { id: 'voc-50', russian: 'Глаз', english: 'Eye', bangla: 'চোখ', category: 'Body Parts' },
  { id: 'voc-51', russian: 'Ухо', english: 'Ear', bangla: 'কান', category: 'Body Parts' },
  { id: 'voc-52', russian: 'Нос', english: 'Nose', bangla: 'নাক', category: 'Body Parts' },
  { id: 'voc-53', russian: 'Рот', english: 'Mouth', bangla: 'মুখ', category: 'Body Parts' },
  { id: 'voc-54', russian: 'Сердце', english: 'Heart', bangla: 'হৃদয়', category: 'Body Parts' },
  // Clothing (Одежда) - NEW
  { id: 'voc-55', russian: 'Рубашка', english: 'Shirt', bangla: 'শার্ট', category: 'Clothing' },
  { id: 'voc-56', russian: 'Брюки', english: 'Trousers', bangla: 'প্যান্ট', category: 'Clothing' },
  { id: 'voc-57', russian: 'Платье', english: 'Dress', bangla: 'পোশাক', category: 'Clothing' },
  { id: 'voc-58', russian: 'Обувь', english: 'Shoes', bangla: 'জুতা', category: 'Clothing' },
  { id: 'voc-59', russian: 'Шапка', english: 'Hat', bangla: 'টুপি', category: 'Clothing' },
  { id: 'voc-60', russian: 'Куртка', english: 'Jacket', bangla: 'জ্যাকেট', category: 'Clothing' },
  // Weather (Погода) - NEW
  { id: 'voc-61', russian: 'Солнце', english: 'Sun', bangla: 'সূর্য', category: 'Weather' },
  { id: 'voc-62', russian: 'Дождь', english: 'Rain', bangla: 'বৃষ্টি', category: 'Weather' },
  { id: 'voc-63', russian: 'Снег', english: 'Snow', bangla: 'বরফ', category: 'Weather' },
  { id: 'voc-64', russian: 'Ветер', english: 'Wind', bangla: 'বাতাস', category: 'Weather' },
  { id: 'voc-65', russian: 'Облако', english: 'Cloud', bangla: 'মেঘ', category: 'Weather' },
  { id: 'voc-66', russian: 'Жарко', english: 'Hot', bangla: 'গরম', category: 'Weather' },
  { id: 'voc-67', russian: 'Холодно', english: 'Cold', bangla: 'ঠান্ডা', category: 'Weather' },
  // School & Work (Школа и работа) - NEW
  { id: 'voc-68', russian: 'Учитель', english: 'Teacher', bangla: 'শিক্ষক', category: 'School & Work' },
  { id: 'voc-69', russian: 'Ученик', english: 'Student (pupil)', bangla: 'ছাত্র', category: 'School & Work' },
  { id: 'voc-70', russian: 'Работа', english: 'Work/Job', bangla: 'কাজ', category: 'School & Work' },
  { id: 'voc-71', russian: 'Офис', english: 'Office', bangla: 'অফিস', category: 'School & Work' },
  { id: 'voc-72', russian: 'Врач', english: 'Doctor', bangla: 'ডাক্তার', category: 'School & Work' },
  { id: 'voc-73', russian: 'Инженер', english: 'Engineer', bangla: 'প্রকৌশলী', category: 'School & Work' },
  // Nature (Природа) - NEW
  { id: 'voc-74', russian: 'Дерево', english: 'Tree', bangla: 'গাছ', category: 'Nature' },
  { id: 'voc-75', russian: 'Цветок', english: 'Flower', bangla: 'ফুল', category: 'Nature' },
  { id: 'voc-76', russian: 'Гора', english: 'Mountain', bangla: 'পাহাড়', category: 'Nature' },
  { id: 'voc-77', russian: 'Река', english: 'River', bangla: 'নদী', category: 'Nature' },
  { id: 'voc-78', russian: 'Море', english: 'Sea', bangla: 'সমুদ্র', category: 'Nature' },
  { id: 'voc-79', russian: 'Лес', english: 'Forest', bangla: 'বন', category: 'Nature' }
];

// Common Verbs (Глаголы) - NEW, with basic present-tense conjugation
export const commonVerbs = [
  {
    id: 'verb-1', infinitive: 'Говорить', english: 'To speak', bangla: 'কথা বলা',
    conjugation: { я: 'говорю', ты: 'говоришь', он_она: 'говорит', мы: 'говорим', вы: 'говорите', они: 'говорят' }
  },
  {
    id: 'verb-2', infinitive: 'Читать', english: 'To read', bangla: 'পড়া',
    conjugation: { я: 'читаю', ты: 'читаешь', он_она: 'читает', мы: 'читаем', вы: 'читаете', они: 'читают' }
  },
  {
    id: 'verb-3', infinitive: 'Писать', english: 'To write', bangla: 'লেখা',
    conjugation: { я: 'пишу', ты: 'пишешь', он_она: 'пишет', мы: 'пишем', вы: 'пишете', они: 'пишут' }
  },
  {
    id: 'verb-4', infinitive: 'Идти', english: 'To go (on foot)', bangla: 'হাঁটা/যাওয়া',
    conjugation: { я: 'иду', ты: 'идёшь', он_она: 'идёт', мы: 'идём', вы: 'идёте', они: 'идут' }
  },
  {
    id: 'verb-5', infinitive: 'Есть', english: 'To eat', bangla: 'খাওয়া',
    conjugation: { я: 'ем', ты: 'ешь', он_она: 'ест', мы: 'едим', вы: 'едите', они: 'едят' }
  },
  {
    id: 'verb-6', infinitive: 'Любить', english: 'To love/like', bangla: 'ভালোবাসা',
    conjugation: { я: 'люблю', ты: 'любишь', он_она: 'любит', мы: 'любим', вы: 'любите', они: 'любят' }
  },
  {
    id: 'verb-7', infinitive: 'Работать', english: 'To work', bangla: 'কাজ করা',
    conjugation: { я: 'работаю', ты: 'работаешь', он_она: 'работает', мы: 'работаем', вы: 'работаете', они: 'работают' }
  },
  {
    id: 'verb-8', infinitive: 'Жить', english: 'To live', bangla: 'বাস করা',
    conjugation: { я: 'живу', ты: 'живёшь', он_она: 'живёт', мы: 'живём', вы: 'живёте', они: 'живут' }
  },
  {
    id: 'verb-9', infinitive: 'Хотеть', english: 'To want', bangla: 'চাওয়া',
    conjugation: { я: 'хочу', ты: 'хочешь', он_она: 'хочет', мы: 'хотим', вы: 'хотите', они: 'хотят' }
  },
  {
    id: 'verb-10', infinitive: 'Знать', english: 'To know', bangla: 'জানা',
    conjugation: { я: 'знаю', ты: 'знаешь', он_она: 'знает', мы: 'знаем', вы: 'знаете', они: 'знают' }
  }
];

// Adjectives (Прилагательные) - NEW
export const adjectives = [
  { id: 'adj-1', russian: 'Большой', english: 'Big', bangla: 'বড়' },
  { id: 'adj-2', russian: 'Маленький', english: 'Small', bangla: 'ছোট' },
  { id: 'adj-3', russian: 'Хороший', english: 'Good', bangla: 'ভালো' },
  { id: 'adj-4', russian: 'Плохой', english: 'Bad', bangla: 'খারাপ' },
  { id: 'adj-5', russian: 'Новый', english: 'New', bangla: 'নতুন' },
  { id: 'adj-6', russian: 'Старый', english: 'Old', bangla: 'পুরনো' },
  { id: 'adj-7', russian: 'Красивый', english: 'Beautiful', bangla: 'সুন্দর' },
  { id: 'adj-8', russian: 'Быстрый', english: 'Fast', bangla: 'দ্রুত' },
  { id: 'adj-9', russian: 'Медленный', english: 'Slow', bangla: 'ধীর' },
  { id: 'adj-10', russian: 'Тёплый', english: 'Warm', bangla: 'উষ্ণ' },
  { id: 'adj-11', russian: 'Умный', english: 'Smart', bangla: 'বুদ্ধিমান' },
  { id: 'adj-12', russian: 'Счастливый', english: 'Happy', bangla: 'সুখী' }
];

// Days of the Week (Дни недели) - NEW
export const daysOfWeek = [
  { id: 'day-1', russian: 'Понедельник', english: 'Monday', bangla: 'সোমবার' },
  { id: 'day-2', russian: 'Вторник', english: 'Tuesday', bangla: 'মঙ্গলবার' },
  { id: 'day-3', russian: 'Среда', english: 'Wednesday', bangla: 'বুধবার' },
  { id: 'day-4', russian: 'Четверг', english: 'Thursday', bangla: 'বৃহস্পতিবার' },
  { id: 'day-5', russian: 'Пятница', english: 'Friday', bangla: 'শুক্রবার' },
  { id: 'day-6', russian: 'Суббота', english: 'Saturday', bangla: 'শনিবার' },
  { id: 'day-7', russian: 'Воскресенье', english: 'Sunday', bangla: 'রবিবার' }
];

// Months of the Year (Месяцы) - NEW
export const monthsOfYear = [
  { id: 'month-1', russian: 'Январь', english: 'January', bangla: 'জানুয়ারি' },
  { id: 'month-2', russian: 'Февраль', english: 'February', bangla: 'ফেব্রুয়ারি' },
  { id: 'month-3', russian: 'Март', english: 'March', bangla: 'মার্চ' },
  { id: 'month-4', russian: 'Апрель', english: 'April', bangla: 'এপ্রিল' },
  { id: 'month-5', russian: 'Май', english: 'May', bangla: 'মে' },
  { id: 'month-6', russian: 'Июнь', english: 'June', bangla: 'জুন' },
  { id: 'month-7', russian: 'Июль', english: 'July', bangla: 'জুলাই' },
  { id: 'month-8', russian: 'Август', english: 'August', bangla: 'আগস্ট' },
  { id: 'month-9', russian: 'Сентябрь', english: 'September', bangla: 'সেপ্টেম্বর' },
  { id: 'month-10', russian: 'Октябрь', english: 'October', bangla: 'অক্টোবর' },
  { id: 'month-11', russian: 'Ноябрь', english: 'November', bangla: 'নভেম্বর' },
  { id: 'month-12', russian: 'Декабрь', english: 'December', bangla: 'ডিসেম্বর' }
];

// Time Expressions (Время) - NEW
export const timeExpressions = [
  { id: 'time-1', russian: 'Сегодня', english: 'Today', bangla: 'আজ' },
  { id: 'time-2', russian: 'Завтра', english: 'Tomorrow', bangla: 'আগামীকাল' },
  { id: 'time-3', russian: 'Вчера', english: 'Yesterday', bangla: 'গতকাল' },
  { id: 'time-4', russian: 'Сейчас', english: 'Now', bangla: 'এখন' },
  { id: 'time-5', russian: 'Утро', english: 'Morning', bangla: 'সকাল' },
  { id: 'time-6', russian: 'День', english: 'Afternoon/Day', bangla: 'দিন' },
  { id: 'time-7', russian: 'Вечер', english: 'Evening', bangla: 'সন্ধ্যা' },
  { id: 'time-8', russian: 'Ночь', english: 'Night', bangla: 'রাত' },
  { id: 'time-9', russian: 'Неделя', english: 'Week', bangla: 'সপ্তাহ' },
  { id: 'time-10', russian: 'Месяц', english: 'Month', bangla: 'মাস' },
  { id: 'time-11', russian: 'Год', english: 'Year', bangla: 'বছর' }
];

// Russian Numbers (1-100+)
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
  { id: 'num-21', number: '21', russian: 'Двадцать один', english: 'Twenty-one', bangla: 'একুশ' },
  { id: 'num-30', number: '30', russian: 'Тридцать', english: 'Thirty', bangla: 'ত্রিশ' },
  { id: 'num-40', number: '40', russian: 'Сорок', english: 'Forty', bangla: 'চল্লিশ' },
  { id: 'num-50', number: '50', russian: 'Пятьдесят', english: 'Fifty', bangla: 'পঞ্চাশ' },
  { id: 'num-60', number: '60', russian: 'Шестьдесят', english: 'Sixty', bangla: 'ষাট' },
  { id: 'num-70', number: '70', russian: 'Семьдесят', english: 'Seventy', bangla: 'সত্তর' },
  { id: 'num-80', number: '80', russian: 'Восемьдесят', english: 'Eighty', bangla: 'আশি' },
  { id: 'num-90', number: '90', russian: 'Девяносто', english: 'Ninety', bangla: 'নব্বই' },
  { id: 'num-100', number: '100', russian: 'Сто', english: 'One hundred', bangla: 'একশ' },
  { id: 'num-1000', number: '1000', russian: 'Тысяча', english: 'One thousand', bangla: 'এক হাজার' }
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
  },
  {
    id: 'gram-4',
    title: 'Gender of Nouns',
    description: 'Every Russian noun has a gender: masculine, feminine, or neuter, which affects adjective and verb agreement.',
    rules: [
      'Masculine nouns usually end in a consonant (стол, дом)',
      'Feminine nouns usually end in -а or -я (мама, земля)',
      'Neuter nouns usually end in -о or -е (окно, море)',
      'Adjectives must agree in gender, number, and case with the noun they describe'
    ]
  },
  {
    id: 'gram-5',
    title: 'Personal Pronouns',
    description: 'Russian personal pronouns change depending on the grammatical case used in a sentence.',
    rules: [
      'я (I), ты (you, informal), он/она/оно (he/she/it)',
      'мы (we), вы (you, formal/plural), они (they)',
      'Pronouns decline across all six cases, similar to nouns'
    ]
  },
  {
    id: 'gram-6',
    title: 'Aspect: Perfective vs Imperfective',
    description: 'Russian verbs come in pairs showing whether an action is completed or ongoing/repeated.',
    rules: [
      'Imperfective verbs describe ongoing, repeated, or unfinished actions (читать - to read/be reading)',
      'Perfective verbs describe a completed, one-time action (прочитать - to finish reading)',
      'Only imperfective verbs have a true present tense'
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
  },
  {
    id: 'culture-5',
    icon: '🎨',
    title: 'Russian Ballet',
    description: 'The Bolshoi and Mariinsky theaters are among the most celebrated ballet companies in the world.'
  },
  {
    id: 'culture-6',
    icon: '🚀',
    title: 'Space Exploration',
    description: 'The Soviet Union launched Sputnik, the first satellite, and sent Yuri Gagarin as the first human in space.'
  },
  {
    id: 'culture-7',
    icon: '🎄',
    title: 'New Year Celebration',
    description: 'New Year (Новый год) is the most widely celebrated holiday in Russia, often bigger than Christmas.'
  },
  {
    id: 'culture-8',
    icon: '🫖',
    title: 'Tea Culture',
    description: 'Tea (чай) is central to Russian hospitality, traditionally brewed strong and served with a samovar.'
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
  },
  {
    id: 'quiz-6',
    question: 'What does "Понедельник" mean?',
    options: ['Sunday', 'Monday', 'Friday', 'Saturday'],
    correct: 'Monday',
    explanation: 'Понедельник (Ponedelnik) means "Monday" in Russian.'
  },
  {
    id: 'quiz-7',
    question: 'How do you say "I love/like" in Russian?',
    options: ['Я хочу', 'Я знаю', 'Я люблю', 'Я иду'],
    correct: 'Я люблю',
    explanation: 'Я люблю (Ya lyublyu) means "I love/like" from the verb любить.'
  },
  {
    id: 'quiz-8',
    question: 'What color is "Красный"?',
    options: ['Blue', 'Green', 'Red', 'Yellow'],
    correct: 'Red',
    explanation: 'Красный (Krasniy) means "Red" in Russian.'
  },
  {
    id: 'quiz-9',
    question: 'What does "Сегодня" mean?',
    options: ['Tomorrow', 'Yesterday', 'Today', 'Now'],
    correct: 'Today',
    explanation: 'Сегодня (Segodnya) means "Today" in Russian.'
  },
  {
    id: 'quiz-10',
    question: 'How many cases does Russian grammar have?',
    options: ['4', '5', '6', '7'],
    correct: '6',
    explanation: 'Russian has 6 grammatical cases: Nominative, Genitive, Dative, Accusative, Instrumental, and Prepositional.'
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