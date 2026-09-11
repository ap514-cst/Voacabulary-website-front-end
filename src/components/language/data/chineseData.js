// src/data/chineseData.js

// Chinese Pinyin Alphabet (Initials & Finals)
export const chineseAlphabet = [
  // Initials (স্বরবর্ণের আগে)
  { id: 'b', letter: 'b', pinyin: 'b', english: 'b', bangla: 'ব', pronunciation: 'Beh', type: 'Initial', word: '爸爸 (bàba) - Father' },
  { id: 'p', letter: 'p', pinyin: 'p', english: 'p', bangla: 'প', pronunciation: 'Peh', type: 'Initial', word: '朋友 (péngyǒu) - Friend' },
  { id: 'm', letter: 'm', pinyin: 'm', english: 'm', bangla: 'ম', pronunciation: 'Meh', type: 'Initial', word: '妈妈 (māma) - Mother' },
  { id: 'f', letter: 'f', pinyin: 'f', english: 'f', bangla: 'ফ', pronunciation: 'Feh', type: 'Initial', word: '飞机 (fēijī) - Airplane' },
  { id: 'd', letter: 'd', pinyin: 'd', english: 'd', bangla: 'ড', pronunciation: 'Deh', type: 'Initial', word: '大 (dà) - Big' },
  { id: 't', letter: 't', pinyin: 't', english: 't', bangla: 'ট', pronunciation: 'Teh', type: 'Initial', word: '天 (tiān) - Sky' },
  { id: 'n', letter: 'n', pinyin: 'n', english: 'n', bangla: 'ন', pronunciation: 'Neh', type: 'Initial', word: '你 (nǐ) - You' },
  { id: 'l', letter: 'l', pinyin: 'l', english: 'l', bangla: 'ল', pronunciation: 'Leh', type: 'Initial', word: '来 (lái) - Come' },
  { id: 'g', letter: 'g', pinyin: 'g', english: 'g', bangla: 'গ', pronunciation: 'Geh', type: 'Initial', word: '狗 (gǒu) - Dog' },
  { id: 'k', letter: 'k', pinyin: 'k', english: 'k', bangla: 'ক', pronunciation: 'Keh', type: 'Initial', word: '看 (kàn) - Look' },
  { id: 'h', letter: 'h', pinyin: 'h', english: 'h', bangla: 'হ', pronunciation: 'Heh', type: 'Initial', word: '好 (hǎo) - Good' },
  { id: 'j', letter: 'j', pinyin: 'j', english: 'j', bangla: 'জ', pronunciation: 'Jee', type: 'Initial', word: '家 (jiā) - Home' },
  { id: 'q', letter: 'q', pinyin: 'q', english: 'q', bangla: 'চ', pronunciation: 'Chee', type: 'Initial', word: '七 (qī) - Seven' },
  { id: 'x', letter: 'x', pinyin: 'x', english: 'x', bangla: 'শ', pronunciation: 'Shee', type: 'Initial', word: '小 (xiǎo) - Small' },
  { id: 'zh', letter: 'zh', pinyin: 'zh', english: 'zh', bangla: 'ঝ', pronunciation: 'Juh', type: 'Initial', word: '中国 (Zhōngguó) - China' },
  { id: 'ch', letter: 'ch', pinyin: 'ch', english: 'ch', bangla: 'ছ', pronunciation: 'Chuh', type: 'Initial', word: '吃 (chī) - Eat' },
  { id: 'sh', letter: 'sh', pinyin: 'sh', english: 'sh', bangla: 'শ', pronunciation: 'Shuh', type: 'Initial', word: '是 (shì) - Is' },
  { id: 'r', letter: 'r', pinyin: 'r', english: 'r', bangla: 'র', pronunciation: 'Ruh', type: 'Initial', word: '人 (rén) - Person' },
  { id: 'z', letter: 'z', pinyin: 'z', english: 'z', bangla: 'য', pronunciation: 'Zuh', type: 'Initial', word: '在 (zài) - At' },
  { id: 'c', letter: 'c', pinyin: 'c', english: 'c', bangla: 'ছ', pronunciation: 'Tsuh', type: 'Initial', word: '菜 (cài) - Dish' },
  { id: 's', letter: 's', pinyin: 's', english: 's', bangla: 'স', pronunciation: 'Suh', type: 'Initial', word: '三 (sān) - Three' },
  // Finals (স্বরবর্ণ)
  { id: 'a', letter: 'a', pinyin: 'a', english: 'a', bangla: 'আ', pronunciation: 'Ah', type: 'Final', word: '啊 (a) - Ah' },
  { id: 'o', letter: 'o', pinyin: 'o', english: 'o', bangla: 'ও', pronunciation: 'Oh', type: 'Final', word: '我 (wǒ) - I' },
  { id: 'e', letter: 'e', pinyin: 'e', english: 'e', bangla: 'এ', pronunciation: 'Eh', type: 'Final', word: '饿 (è) - Hungry' },
  { id: 'i', letter: 'i', pinyin: 'i', english: 'i', bangla: 'ই', pronunciation: 'Ee', type: 'Final', word: '一 (yī) - One' },
  { id: 'u', letter: 'u', pinyin: 'u', english: 'u', bangla: 'উ', pronunciation: 'Oo', type: 'Final', word: '五 (wǔ) - Five' },
  { id: 'ü', letter: 'ü', pinyin: 'ü', english: 'ü', bangla: 'উ', pronunciation: 'Yu', type: 'Final', word: '鱼 (yú) - Fish' },
  { id: 'ai', letter: 'ai', pinyin: 'ai', english: 'ai', bangla: 'আই', pronunciation: 'Eye', type: 'Final', word: '爱 (ài) - Love' },
  { id: 'ei', letter: 'ei', pinyin: 'ei', english: 'ei', bangla: 'এই', pronunciation: 'Ay', type: 'Final', word: '谁 (shéi) - Who' },
  { id: 'ao', letter: 'ao', pinyin: 'ao', english: 'ao', bangla: 'আও', pronunciation: 'Ow', type: 'Final', word: '好 (hǎo) - Good' },
  { id: 'ou', letter: 'ou', pinyin: 'ou', english: 'ou', bangla: 'ওউ', pronunciation: 'Oh', type: 'Final', word: '都 (dōu) - All' },
  { id: 'an', letter: 'an', pinyin: 'an', english: 'an', bangla: 'আন', pronunciation: 'Ahn', type: 'Final', word: '三 (sān) - Three' },
  { id: 'en', letter: 'en', pinyin: 'en', english: 'en', bangla: 'এন', pronunciation: 'Uhn', type: 'Final', word: '人 (rén) - Person' },
  { id: 'ang', letter: 'ang', pinyin: 'ang', english: 'ang', bangla: 'আং', pronunciation: 'Ahng', type: 'Final', word: '忙 (máng) - Busy' },
  { id: 'eng', letter: 'eng', pinyin: 'eng', english: 'eng', bangla: 'এং', pronunciation: 'Uhng', type: 'Final', word: '冷 (lěng) - Cold' },
  { id: 'ong', letter: 'ong', pinyin: 'ong', english: 'ong', bangla: 'ওং', pronunciation: 'Ohng', type: 'Final', word: '中 (zhōng) - Middle' }
];

// Common Chinese Phrases
export const commonPhrases = [
  // Greetings
  { id: 'greet-1', chinese: '你好', pinyin: 'Nǐ hǎo', english: 'Hello', bangla: 'হ্যালো', category: 'Greetings' },
  { id: 'greet-2', chinese: '您好', pinyin: 'Nín hǎo', english: 'Hello (formal)', bangla: 'হ্যালো (শিষ্ট)', category: 'Greetings' },
  { id: 'greet-3', chinese: '早上好', pinyin: 'Zǎoshang hǎo', english: 'Good morning', bangla: 'সুপ্রভাত', category: 'Greetings' },
  { id: 'greet-4', chinese: '下午好', pinyin: 'Xiàwǔ hǎo', english: 'Good afternoon', bangla: 'শুভ অপরাহ্ন', category: 'Greetings' },
  { id: 'greet-5', chinese: '晚上好', pinyin: 'Wǎnshang hǎo', english: 'Good evening', bangla: 'শুভ সন্ধ্যা', category: 'Greetings' },
  { id: 'greet-6', chinese: '晚安', pinyin: 'Wǎn\'ān', english: 'Good night', bangla: 'শুভ রাত্রি', category: 'Greetings' },
  { id: 'greet-7', chinese: '再见', pinyin: 'Zàijiàn', english: 'Goodbye', bangla: 'বিদায়', category: 'Greetings' },
  { id: 'greet-8', chinese: '待会儿见', pinyin: 'Dāihuìr jiàn', english: 'See you later', bangla: 'পরে দেখা হবে', category: 'Greetings' },
  // Questions
  { id: 'ques-1', chinese: '你好吗？', pinyin: 'Nǐ hǎo ma?', english: 'How are you?', bangla: 'কেমন আছেন?', category: 'Questions' },
  { id: 'ques-2', chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: 'What is your name?', bangla: 'আপনার নাম কী?', category: 'Questions' },
  { id: 'ques-3', chinese: '洗手间在哪里？', pinyin: 'Xǐshǒujiān zài nǎlǐ?', english: 'Where is the toilet?', bangla: 'টয়লেট কোথায়?', category: 'Questions' },
  { id: 'ques-4', chinese: '多少钱？', pinyin: 'Duōshao qián?', english: 'How much does it cost?', bangla: 'দাম কত?', category: 'Questions' },
  { id: 'ques-5', chinese: '你会说英语吗？', pinyin: 'Nǐ huì shuō Yīngyǔ ma?', english: 'Do you speak English?', bangla: 'আপনি ইংরেজি বলতে পারেন?', category: 'Questions' },
  { id: 'ques-6', chinese: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', english: 'What time is it now?', bangla: 'এখন কয়টা বাজে?', category: 'Questions' },
  { id: 'ques-7', chinese: '这是什么？', pinyin: 'Zhè shì shénme?', english: 'What is this?', bangla: 'এটা কী?', category: 'Questions' },
  { id: 'ques-8', chinese: '为什么？', pinyin: 'Wèishénme?', english: 'Why?', bangla: 'কেন?', category: 'Questions' },
  // Polite
  { id: 'polite-1', chinese: '谢谢', pinyin: 'Xièxie', english: 'Thank you', bangla: 'ধন্যবাদ', category: 'Polite' },
  { id: 'polite-2', chinese: '非常感谢', pinyin: 'Fēicháng gǎnxiè', english: 'Thank you very much', bangla: 'অনেক ধন্যবাদ', category: 'Polite' },
  { id: 'polite-3', chinese: '不客气', pinyin: 'Bú kèqi', english: 'You\'re welcome', bangla: 'স্বাগতম', category: 'Polite' },
  { id: 'polite-4', chinese: '对不起', pinyin: 'Duìbuqǐ', english: 'Sorry', bangla: 'দুঃখিত', category: 'Polite' },
  { id: 'polite-5', chinese: '没关系', pinyin: 'Méi guānxi', english: 'It\'s okay', bangla: 'ঠিক আছে', category: 'Polite' },
  { id: 'polite-6', chinese: '请', pinyin: 'Qǐng', english: 'Please', bangla: 'দয়া করে', category: 'Polite' },
  { id: 'polite-7', chinese: '很高兴认识你', pinyin: 'Hěn gāoxìng rènshi nǐ', english: 'Nice to meet you', bangla: 'পরিচিত হয়ে ভালো লাগলো', category: 'Polite' },
  // Basic
  { id: 'basic-1', chinese: '是', pinyin: 'Shì', english: 'Yes', bangla: 'হ্যাঁ', category: 'Basic' },
  { id: 'basic-2', chinese: '不是', pinyin: 'Bú shì', english: 'No', bangla: 'না', category: 'Basic' },
  { id: 'basic-3', chinese: '可能', pinyin: 'Kěnéng', english: 'Maybe', bangla: 'হয়তো', category: 'Basic' },
  { id: 'basic-4', chinese: '我不明白', pinyin: 'Wǒ bù míngbai', english: 'I don\'t understand', bangla: 'আমি বুঝতে পারছি না', category: 'Basic' },
  { id: 'basic-5', chinese: '请再说一遍', pinyin: 'Qǐng zài shuō yī biàn', english: 'Please say it again', bangla: 'দয়া করে আবার বলুন', category: 'Basic' },
  // Introduction
  { id: 'intro-1', chinese: '我叫...', pinyin: 'Wǒ jiào...', english: 'My name is...', bangla: 'আমার নাম...', category: 'Introduction' },
  { id: 'intro-2', chinese: '我来自...', pinyin: 'Wǒ láizì...', english: 'I am from...', bangla: 'আমি ... থেকে এসেছি', category: 'Introduction' },
  { id: 'intro-3', chinese: '很高兴认识你', pinyin: 'Hěn gāoxìng rènshi nǐ', english: 'Nice to meet you', bangla: 'আপনার সাথে পরিচিত হয়ে ভালো লাগলো', category: 'Introduction' },
  { id: 'intro-4', chinese: '我...岁', pinyin: 'Wǒ ... suì', english: 'I am ... years old', bangla: 'আমার বয়স ... বছর', category: 'Introduction' },
  { id: 'intro-5', chinese: '我是学生', pinyin: 'Wǒ shì xuésheng', english: 'I am a student', bangla: 'আমি একজন ছাত্র', category: 'Introduction' },
  // Food
  { id: 'food-1', chinese: '我饿了', pinyin: 'Wǒ è le', english: 'I am hungry', bangla: 'আমি ক্ষুধার্ত', category: 'Food' },
  { id: 'food-2', chinese: '我渴了', pinyin: 'Wǒ kě le', english: 'I am thirsty', bangla: 'আমি তৃষ্ণার্ত', category: 'Food' },
  { id: 'food-3', chinese: '好吃', pinyin: 'Hǎo chī', english: 'Delicious', bangla: 'সুস্বাদু', category: 'Food' },
  { id: 'food-4', chinese: '请给我菜单', pinyin: 'Qǐng gěi wǒ càidān', english: 'Menu, please', bangla: 'মেনু দিন, দয়া করে', category: 'Food' },
  { id: 'food-5', chinese: '买单', pinyin: 'Mǎidān', english: 'The bill, please', bangla: 'বিল দিন, দয়া করে', category: 'Food' },
  // Shopping
  { id: 'shop-1', chinese: '太贵了', pinyin: 'Tài guì le', english: 'Too expensive', bangla: 'খুব দামি', category: 'Shopping' },
  { id: 'shop-2', chinese: '便宜一点', pinyin: 'Piányi yīdiǎn', english: 'A little cheaper', bangla: 'একটু কম দাম', category: 'Shopping' },
  { id: 'shop-3', chinese: '我想买这个', pinyin: 'Wǒ xiǎng mǎi zhège', english: 'I want to buy this', bangla: 'আমি এটা কিনতে চাই', category: 'Shopping' },
  // Emergency
  { id: 'emergency-1', chinese: '救命！', pinyin: 'Jiùmìng!', english: 'Help!', bangla: 'সাহায্য করুন!', category: 'Emergency' },
  { id: 'emergency-2', chinese: '叫警察', pinyin: 'Jiào jǐngchá', english: 'Call the police', bangla: 'পুলিশ ডাকুন', category: 'Emergency' },
  { id: 'emergency-3', chinese: '我需要医生', pinyin: 'Wǒ xūyào yīshēng', english: 'I need a doctor', bangla: 'আমার একজন ডাক্তার দরকার', category: 'Emergency' },
  { id: 'emergency-4', chinese: '叫救护车', pinyin: 'Jiào jiùhùchē', english: 'Call an ambulance', bangla: 'অ্যাম্বুলেন্স ডাকুন', category: 'Emergency' },
  // Travel
  { id: 'travel-1', chinese: '火车站', pinyin: 'Huǒchē zhàn', english: 'Train station', bangla: 'রেল স্টেশন', category: 'Travel' },
  { id: 'travel-2', chinese: '飞机场', pinyin: 'Fēijī chǎng', english: 'Airport', bangla: 'বিমানবন্দর', category: 'Travel' },
  { id: 'travel-3', chinese: '最近的地铁站在哪里？', pinyin: 'Zuìjìn de dìtiě zhàn zài nǎlǐ?', english: 'Where is the nearest metro station?', bangla: 'নিকটস্থ মেট্রো স্টেশন কোথায়?', category: 'Travel' },
  { id: 'travel-4', chinese: '一张票', pinyin: 'Yī zhāng piào', english: 'One ticket', bangla: 'একটি টিকিট', category: 'Travel' }
];

// Chinese Vocabulary
export const vocabulary = [
  // Family (家庭)
  { id: 'voc-1', chinese: '妈妈', pinyin: 'Māma', english: 'Mother', bangla: 'মা', category: 'Family' },
  { id: 'voc-2', chinese: '爸爸', pinyin: 'Bàba', english: 'Father', bangla: 'বাবা', category: 'Family' },
  { id: 'voc-3', chinese: '哥哥', pinyin: 'Gēge', english: 'Older brother', bangla: 'বড় ভাই', category: 'Family' },
  { id: 'voc-4', chinese: '姐姐', pinyin: 'Jiějie', english: 'Older sister', bangla: 'বড় বোন', category: 'Family' },
  { id: 'voc-5', chinese: '弟弟', pinyin: 'Dìdi', english: 'Younger brother', bangla: 'ছোট ভাই', category: 'Family' },
  { id: 'voc-6', chinese: '妹妹', pinyin: 'Mèimei', english: 'Younger sister', bangla: 'ছোট বোন', category: 'Family' },
  { id: 'voc-7', chinese: '爷爷', pinyin: 'Yéye', english: 'Grandfather', bangla: 'দাদা', category: 'Family' },
  { id: 'voc-8', chinese: '奶奶', pinyin: 'Nǎinai', english: 'Grandmother', bangla: 'দাদী', category: 'Family' },
  { id: 'voc-8a', chinese: '儿子', pinyin: 'Érzi', english: 'Son', bangla: 'ছেলে', category: 'Family' },
  { id: 'voc-8b', chinese: '女儿', pinyin: 'Nǚ\'ér', english: 'Daughter', bangla: 'মেয়ে', category: 'Family' },
  { id: 'voc-8c', chinese: '妻子', pinyin: 'Qīzi', english: 'Wife', bangla: 'স্ত্রী', category: 'Family' },
  { id: 'voc-8d', chinese: '丈夫', pinyin: 'Zhàngfu', english: 'Husband', bangla: 'স্বামী', category: 'Family' },
  // Home (家)
  { id: 'voc-9', chinese: '家', pinyin: 'Jiā', english: 'Home', bangla: 'বাড়ি', category: 'Home' },
  { id: 'voc-10', chinese: '房间', pinyin: 'Fángjiān', english: 'Room', bangla: 'ঘর', category: 'Home' },
  { id: 'voc-11', chinese: '厨房', pinyin: 'Chúfáng', english: 'Kitchen', bangla: 'রান্নাঘর', category: 'Home' },
  { id: 'voc-12', chinese: '浴室', pinyin: 'Yùshì', english: 'Bathroom', bangla: 'বাথরুম', category: 'Home' },
  { id: 'voc-13', chinese: '卧室', pinyin: 'Wòshì', english: 'Bedroom', bangla: 'শয়নকক্ষ', category: 'Home' },
  { id: 'voc-13a', chinese: '客厅', pinyin: 'Kètīng', english: 'Living room', bangla: 'বসার ঘর', category: 'Home' },
  { id: 'voc-13b', chinese: '花园', pinyin: 'Huāyuán', english: 'Garden', bangla: 'বাগান', category: 'Home' },
  // Objects (东西)
  { id: 'voc-14', chinese: '书', pinyin: 'Shū', english: 'Book', bangla: 'বই', category: 'Objects' },
  { id: 'voc-15', chinese: '桌子', pinyin: 'Zhuōzi', english: 'Table', bangla: 'টেবিল', category: 'Objects' },
  { id: 'voc-16', chinese: '椅子', pinyin: 'Yǐzi', english: 'Chair', bangla: 'চেয়ার', category: 'Objects' },
  { id: 'voc-17', chinese: '门', pinyin: 'Mén', english: 'Door', bangla: 'দরজা', category: 'Objects' },
  { id: 'voc-18', chinese: '窗户', pinyin: 'Chuānghu', english: 'Window', bangla: 'জানালা', category: 'Objects' },
  { id: 'voc-19', chinese: '手机', pinyin: 'Shǒujī', english: 'Mobile phone', bangla: 'মোবাইল ফোন', category: 'Objects' },
  { id: 'voc-20', chinese: '电脑', pinyin: 'Diànnǎo', english: 'Computer', bangla: 'কম্পিউটার', category: 'Objects' },
  { id: 'voc-20a', chinese: '笔', pinyin: 'Bǐ', english: 'Pen', bangla: 'কলম', category: 'Objects' },
  { id: 'voc-20b', chinese: '包', pinyin: 'Bāo', english: 'Bag', bangla: 'ব্যাগ', category: 'Objects' },
  // Animals (动物)
  { id: 'voc-21', chinese: '猫', pinyin: 'Māo', english: 'Cat', bangla: 'বিড়াল', category: 'Animals' },
  { id: 'voc-22', chinese: '狗', pinyin: 'Gǒu', english: 'Dog', bangla: 'কুকুর', category: 'Animals' },
  { id: 'voc-23', chinese: '鸟', pinyin: 'Niǎo', english: 'Bird', bangla: 'পাখি', category: 'Animals' },
  { id: 'voc-24', chinese: '马', pinyin: 'Mǎ', english: 'Horse', bangla: 'ঘোড়া', category: 'Animals' },
  { id: 'voc-25', chinese: '牛', pinyin: 'Niú', english: 'Cow', bangla: 'গরু', category: 'Animals' },
  { id: 'voc-26', chinese: '鱼', pinyin: 'Yú', english: 'Fish', bangla: 'মাছ', category: 'Animals' },
  { id: 'voc-26a', chinese: '狮子', pinyin: 'Shīzi', english: 'Lion', bangla: 'সিংহ', category: 'Animals' },
  { id: 'voc-26b', chinese: '熊', pinyin: 'Xióng', english: 'Bear', bangla: 'ভালুক', category: 'Animals' },
  // Food (食物)
  { id: 'voc-27', chinese: '米饭', pinyin: 'Mǐfàn', english: 'Rice', bangla: 'ভাত', category: 'Food' },
  { id: 'voc-28', chinese: '面包', pinyin: 'Miànbāo', english: 'Bread', bangla: 'রুটি', category: 'Food' },
  { id: 'voc-29', chinese: '牛奶', pinyin: 'Niúnǎi', english: 'Milk', bangla: 'দুধ', category: 'Food' },
  { id: 'voc-30', chinese: '肉', pinyin: 'Ròu', english: 'Meat', bangla: 'মাংস', category: 'Food' },
  { id: 'voc-31', chinese: '苹果', pinyin: 'Píngguǒ', english: 'Apple', bangla: 'আপেল', category: 'Food' },
  { id: 'voc-32', chinese: '茶', pinyin: 'Chá', english: 'Tea', bangla: 'চা', category: 'Food' },
  { id: 'voc-33', chinese: '咖啡', pinyin: 'Kāfēi', english: 'Coffee', bangla: 'কফি', category: 'Food' },
  { id: 'voc-33a', chinese: '汤', pinyin: 'Tāng', english: 'Soup', bangla: 'স্যুপ', category: 'Food' },
  { id: 'voc-33b', chinese: '糖', pinyin: 'Táng', english: 'Sugar', bangla: 'চিনি', category: 'Food' },
  { id: 'voc-33c', chinese: '盐', pinyin: 'Yán', english: 'Salt', bangla: 'লবণ', category: 'Food' },
  // Travel (旅行)
  { id: 'voc-34', chinese: '飞机', pinyin: 'Fēijī', english: 'Airplane', bangla: 'বিমান', category: 'Travel' },
  { id: 'voc-35', chinese: '火车', pinyin: 'Huǒchē', english: 'Train', bangla: 'ট্রেন', category: 'Travel' },
  { id: 'voc-36', chinese: '汽车', pinyin: 'Qìchē', english: 'Car', bangla: 'গাড়ি', category: 'Travel' },
  { id: 'voc-37', chinese: '酒店', pinyin: 'Jiǔdiàn', english: 'Hotel', bangla: 'হোটেল', category: 'Travel' },
  { id: 'voc-38', chinese: '票', pinyin: 'Piào', english: 'Ticket', bangla: 'টিকিট', category: 'Travel' },
  { id: 'voc-39', chinese: '护照', pinyin: 'Hùzhào', english: 'Passport', bangla: 'পাসপোর্ট', category: 'Travel' },
  { id: 'voc-39a', chinese: '出租车', pinyin: 'Chūzūchē', english: 'Taxi', bangla: 'ট্যাক্সি', category: 'Travel' },
  // Colors (颜色)
  { id: 'voc-40', chinese: '红色', pinyin: 'Hóngsè', english: 'Red', bangla: 'লাল', category: 'Colors' },
  { id: 'voc-41', chinese: '蓝色', pinyin: 'Lánsè', english: 'Blue', bangla: 'নীল', category: 'Colors' },
  { id: 'voc-42', chinese: '绿色', pinyin: 'Lǜsè', english: 'Green', bangla: 'সবুজ', category: 'Colors' },
  { id: 'voc-43', chinese: '黄色', pinyin: 'Huángsè', english: 'Yellow', bangla: 'হলুদ', category: 'Colors' },
  { id: 'voc-44', chinese: '白色', pinyin: 'Báisè', english: 'White', bangla: 'সাদা', category: 'Colors' },
  { id: 'voc-45', chinese: '黑色', pinyin: 'Hēisè', english: 'Black', bangla: 'কালো', category: 'Colors' },
  { id: 'voc-45a', chinese: '粉色', pinyin: 'Fěnsè', english: 'Pink', bangla: 'গোলাপি', category: 'Colors' },
  { id: 'voc-45b', chinese: '灰色', pinyin: 'Huīsè', english: 'Grey', bangla: 'ধূসর', category: 'Colors' },
  // Body Parts (身体部位) - NEW
  { id: 'voc-46', chinese: '头', pinyin: 'Tóu', english: 'Head', bangla: 'মাথা', category: 'Body Parts' },
  { id: 'voc-47', chinese: '手', pinyin: 'Shǒu', english: 'Hand', bangla: 'হাত', category: 'Body Parts' },
  { id: 'voc-48', chinese: '脚', pinyin: 'Jiǎo', english: 'Foot', bangla: 'পা', category: 'Body Parts' },
  { id: 'voc-49', chinese: '眼睛', pinyin: 'Yǎnjing', english: 'Eye', bangla: 'চোখ', category: 'Body Parts' },
  { id: 'voc-50', chinese: '耳朵', pinyin: 'Ěrduo', english: 'Ear', bangla: 'কান', category: 'Body Parts' },
  { id: 'voc-51', chinese: '鼻子', pinyin: 'Bízi', english: 'Nose', bangla: 'নাক', category: 'Body Parts' },
  { id: 'voc-52', chinese: '嘴', pinyin: 'Zuǐ', english: 'Mouth', bangla: 'মুখ', category: 'Body Parts' },
  { id: 'voc-53', chinese: '心', pinyin: 'Xīn', english: 'Heart', bangla: 'হৃদয়', category: 'Body Parts' },
  // Clothing (衣服) - NEW
  { id: 'voc-54', chinese: '衬衫', pinyin: 'Chènshān', english: 'Shirt', bangla: 'শার্ট', category: 'Clothing' },
  { id: 'voc-55', chinese: '裤子', pinyin: 'Kùzi', english: 'Trousers', bangla: 'প্যান্ট', category: 'Clothing' },
  { id: 'voc-56', chinese: '裙子', pinyin: 'Qúnzi', english: 'Dress/Skirt', bangla: 'পোশাক', category: 'Clothing' },
  { id: 'voc-57', chinese: '鞋子', pinyin: 'Xiézi', english: 'Shoes', bangla: 'জুতা', category: 'Clothing' },
  { id: 'voc-58', chinese: '帽子', pinyin: 'Màozi', english: 'Hat', bangla: 'টুপি', category: 'Clothing' },
  { id: 'voc-59', chinese: '外套', pinyin: 'Wàitào', english: 'Jacket', bangla: 'জ্যাকেট', category: 'Clothing' },
  // Weather (天气) - NEW
  { id: 'voc-60', chinese: '太阳', pinyin: 'Tàiyáng', english: 'Sun', bangla: 'সূর্য', category: 'Weather' },
  { id: 'voc-61', chinese: '雨', pinyin: 'Yǔ', english: 'Rain', bangla: 'বৃষ্টি', category: 'Weather' },
  { id: 'voc-62', chinese: '雪', pinyin: 'Xuě', english: 'Snow', bangla: 'বরফ', category: 'Weather' },
  { id: 'voc-63', chinese: '风', pinyin: 'Fēng', english: 'Wind', bangla: 'বাতাস', category: 'Weather' },
  { id: 'voc-64', chinese: '云', pinyin: 'Yún', english: 'Cloud', bangla: 'মেঘ', category: 'Weather' },
  { id: 'voc-65', chinese: '热', pinyin: 'Rè', english: 'Hot', bangla: 'গরম', category: 'Weather' },
  { id: 'voc-66', chinese: '冷', pinyin: 'Lěng', english: 'Cold', bangla: 'ঠান্ডা', category: 'Weather' },
  // School & Work (学校和工作) - NEW
  { id: 'voc-67', chinese: '老师', pinyin: 'Lǎoshī', english: 'Teacher', bangla: 'শিক্ষক', category: 'School & Work' },
  { id: 'voc-68', chinese: '学生', pinyin: 'Xuésheng', english: 'Student', bangla: 'ছাত্র', category: 'School & Work' },
  { id: 'voc-69', chinese: '工作', pinyin: 'Gōngzuò', english: 'Work/Job', bangla: 'কাজ', category: 'School & Work' },
  { id: 'voc-70', chinese: '办公室', pinyin: 'Bàngōngshì', english: 'Office', bangla: 'অফিস', category: 'School & Work' },
  { id: 'voc-71', chinese: '医生', pinyin: 'Yīshēng', english: 'Doctor', bangla: 'ডাক্তার', category: 'School & Work' },
  { id: 'voc-72', chinese: '工程师', pinyin: 'Gōngchéngshī', english: 'Engineer', bangla: 'প্রকৌশলী', category: 'School & Work' },
  // Nature (大自然) - NEW
  { id: 'voc-73', chinese: '树', pinyin: 'Shù', english: 'Tree', bangla: 'গাছ', category: 'Nature' },
  { id: 'voc-74', chinese: '花', pinyin: 'Huā', english: 'Flower', bangla: 'ফুল', category: 'Nature' },
  { id: 'voc-75', chinese: '山', pinyin: 'Shān', english: 'Mountain', bangla: 'পাহাড়', category: 'Nature' },
  { id: 'voc-76', chinese: '河', pinyin: 'Hé', english: 'River', bangla: 'নদী', category: 'Nature' },
  { id: 'voc-77', chinese: '海', pinyin: 'Hǎi', english: 'Sea', bangla: 'সমুদ্র', category: 'Nature' },
  { id: 'voc-78', chinese: '森林', pinyin: 'Sēnlín', english: 'Forest', bangla: 'বন', category: 'Nature' }
];

// Common Verbs (常用动词) - NEW
export const commonVerbs = [
  { id: 'verb-1', chinese: '说', pinyin: 'Shuō', english: 'To speak', bangla: 'কথা বলা', example: '我说汉语 (Wǒ shuō Hànyǔ) - I speak Chinese' },
  { id: 'verb-2', chinese: '看', pinyin: 'Kàn', english: 'To look/read/watch', bangla: 'দেখা/পড়া', example: '我看书 (Wǒ kàn shū) - I read a book' },
  { id: 'verb-3', chinese: '写', pinyin: 'Xiě', english: 'To write', bangla: 'লেখা', example: '我写信 (Wǒ xiě xìn) - I write a letter' },
  { id: 'verb-4', chinese: '去', pinyin: 'Qù', english: 'To go', bangla: 'যাওয়া', example: '我去学校 (Wǒ qù xuéxiào) - I go to school' },
  { id: 'verb-5', chinese: '吃', pinyin: 'Chī', english: 'To eat', bangla: 'খাওয়া', example: '我吃饭 (Wǒ chī fàn) - I eat food' },
  { id: 'verb-6', chinese: '喜欢', pinyin: 'Xǐhuan', english: 'To like', bangla: 'পছন্দ করা', example: '我喜欢茶 (Wǒ xǐhuan chá) - I like tea' },
  { id: 'verb-7', chinese: '工作', pinyin: 'Gōngzuò', english: 'To work', bangla: 'কাজ করা', example: '他工作很忙 (Tā gōngzuò hěn máng) - He works a lot' },
  { id: 'verb-8', chinese: '住', pinyin: 'Zhù', english: 'To live (reside)', bangla: 'বাস করা', example: '我住在北京 (Wǒ zhù zài Běijīng) - I live in Beijing' },
  { id: 'verb-9', chinese: '要', pinyin: 'Yào', english: 'To want', bangla: 'চাওয়া', example: '我要茶 (Wǒ yào chá) - I want tea' },
  { id: 'verb-10', chinese: '知道', pinyin: 'Zhīdào', english: 'To know', bangla: 'জানা', example: '我知道 (Wǒ zhīdào) - I know' }
];

// Adjectives (形容词) - NEW
export const adjectives = [
  { id: 'adj-1', chinese: '大', pinyin: 'Dà', english: 'Big', bangla: 'বড়' },
  { id: 'adj-2', chinese: '小', pinyin: 'Xiǎo', english: 'Small', bangla: 'ছোট' },
  { id: 'adj-3', chinese: '好', pinyin: 'Hǎo', english: 'Good', bangla: 'ভালো' },
  { id: 'adj-4', chinese: '坏', pinyin: 'Huài', english: 'Bad', bangla: 'খারাপ' },
  { id: 'adj-5', chinese: '新', pinyin: 'Xīn', english: 'New', bangla: 'নতুন' },
  { id: 'adj-6', chinese: '旧', pinyin: 'Jiù', english: 'Old (things)', bangla: 'পুরনো' },
  { id: 'adj-7', chinese: '漂亮', pinyin: 'Piàoliang', english: 'Beautiful', bangla: 'সুন্দর' },
  { id: 'adj-8', chinese: '快', pinyin: 'Kuài', english: 'Fast', bangla: 'দ্রুত' },
  { id: 'adj-9', chinese: '慢', pinyin: 'Màn', english: 'Slow', bangla: 'ধীর' },
  { id: 'adj-10', chinese: '暖和', pinyin: 'Nuǎnhuo', english: 'Warm', bangla: 'উষ্ণ' },
  { id: 'adj-11', chinese: '聪明', pinyin: 'Cōngming', english: 'Smart', bangla: 'বুদ্ধিমান' },
  { id: 'adj-12', chinese: '开心', pinyin: 'Kāixīn', english: 'Happy', bangla: 'সুখী' }
];

// Days of the Week (星期) - NEW
export const daysOfWeek = [
  { id: 'day-1', chinese: '星期一', pinyin: 'Xīngqīyī', english: 'Monday', bangla: 'সোমবার' },
  { id: 'day-2', chinese: '星期二', pinyin: 'Xīngqī\'èr', english: 'Tuesday', bangla: 'মঙ্গলবার' },
  { id: 'day-3', chinese: '星期三', pinyin: 'Xīngqīsān', english: 'Wednesday', bangla: 'বুধবার' },
  { id: 'day-4', chinese: '星期四', pinyin: 'Xīngqīsì', english: 'Thursday', bangla: 'বৃহস্পতিবার' },
  { id: 'day-5', chinese: '星期五', pinyin: 'Xīngqīwǔ', english: 'Friday', bangla: 'শুক্রবার' },
  { id: 'day-6', chinese: '星期六', pinyin: 'Xīngqīliù', english: 'Saturday', bangla: 'শনিবার' },
  { id: 'day-7', chinese: '星期日', pinyin: 'Xīngqīrì', english: 'Sunday', bangla: 'রবিবার' }
];

// Months of the Year (月份) - NEW
export const monthsOfYear = [
  { id: 'month-1', chinese: '一月', pinyin: 'Yī yuè', english: 'January', bangla: 'জানুয়ারি' },
  { id: 'month-2', chinese: '二月', pinyin: 'Èr yuè', english: 'February', bangla: 'ফেব্রুয়ারি' },
  { id: 'month-3', chinese: '三月', pinyin: 'Sān yuè', english: 'March', bangla: 'মার্চ' },
  { id: 'month-4', chinese: '四月', pinyin: 'Sì yuè', english: 'April', bangla: 'এপ্রিল' },
  { id: 'month-5', chinese: '五月', pinyin: 'Wǔ yuè', english: 'May', bangla: 'মে' },
  { id: 'month-6', chinese: '六月', pinyin: 'Liù yuè', english: 'June', bangla: 'জুন' },
  { id: 'month-7', chinese: '七月', pinyin: 'Qī yuè', english: 'July', bangla: 'জুলাই' },
  { id: 'month-8', chinese: '八月', pinyin: 'Bā yuè', english: 'August', bangla: 'আগস্ট' },
  { id: 'month-9', chinese: '九月', pinyin: 'Jiǔ yuè', english: 'September', bangla: 'সেপ্টেম্বর' },
  { id: 'month-10', chinese: '十月', pinyin: 'Shí yuè', english: 'October', bangla: 'অক্টোবর' },
  { id: 'month-11', chinese: '十一月', pinyin: 'Shíyī yuè', english: 'November', bangla: 'নভেম্বর' },
  { id: 'month-12', chinese: '十二月', pinyin: 'Shí\'èr yuè', english: 'December', bangla: 'ডিসেম্বর' }
];

// Time Expressions (时间) - NEW
export const timeExpressions = [
  { id: 'time-1', chinese: '今天', pinyin: 'Jīntiān', english: 'Today', bangla: 'আজ' },
  { id: 'time-2', chinese: '明天', pinyin: 'Míngtiān', english: 'Tomorrow', bangla: 'আগামীকাল' },
  { id: 'time-3', chinese: '昨天', pinyin: 'Zuótiān', english: 'Yesterday', bangla: 'গতকাল' },
  { id: 'time-4', chinese: '现在', pinyin: 'Xiànzài', english: 'Now', bangla: 'এখন' },
  { id: 'time-5', chinese: '早上', pinyin: 'Zǎoshang', english: 'Morning', bangla: 'সকাল' },
  { id: 'time-6', chinese: '下午', pinyin: 'Xiàwǔ', english: 'Afternoon', bangla: 'দুপুর' },
  { id: 'time-7', chinese: '晚上', pinyin: 'Wǎnshang', english: 'Evening', bangla: 'সন্ধ্যা' },
  { id: 'time-8', chinese: '夜里', pinyin: 'Yèlǐ', english: 'Night', bangla: 'রাত' },
  { id: 'time-9', chinese: '星期', pinyin: 'Xīngqī', english: 'Week', bangla: 'সপ্তাহ' },
  { id: 'time-10', chinese: '月', pinyin: 'Yuè', english: 'Month', bangla: 'মাস' },
  { id: 'time-11', chinese: '年', pinyin: 'Nián', english: 'Year', bangla: 'বছর' }
];

// Measure Words (量词) - NEW, expanded reference list
export const measureWords = [
  { id: 'mw-1', chinese: '个', pinyin: 'gè', english: 'General measure word (people, general objects)', bangla: 'সাধারণ পরিমাপক শব্দ', example: '一个人 (yī gè rén) - one person' },
  { id: 'mw-2', chinese: '本', pinyin: 'běn', english: 'For books', bangla: 'বইয়ের জন্য', example: '三本书 (sān běn shū) - three books' },
  { id: 'mw-3', chinese: '张', pinyin: 'zhāng', english: 'For flat objects (paper, tables, tickets)', bangla: 'সমতল বস্তুর জন্য', example: '一张票 (yī zhāng piào) - one ticket' },
  { id: 'mw-4', chinese: '只', pinyin: 'zhī', english: 'For animals', bangla: 'প্রাণীর জন্য', example: '一只猫 (yī zhī māo) - one cat' },
  { id: 'mw-5', chinese: '杯', pinyin: 'bēi', english: 'For cups of liquid', bangla: 'কাপ/গ্লাসের জন্য', example: '一杯茶 (yī bēi chá) - one cup of tea' },
  { id: 'mw-6', chinese: '件', pinyin: 'jiàn', english: 'For clothes/items/matters', bangla: 'পোশাক/জিনিসের জন্য', example: '一件衣服 (yī jiàn yīfu) - one piece of clothing' },
  { id: 'mw-7', chinese: '辆', pinyin: 'liàng', english: 'For vehicles', bangla: 'যানবাহনের জন্য', example: '一辆车 (yī liàng chē) - one car' }
];

// Chinese Numbers (1-1000)
export const chineseNumbers = [
  { id: 'num-1', number: '1', chinese: '一', pinyin: 'Yī', english: 'One', bangla: 'এক' },
  { id: 'num-2', number: '2', chinese: '二', pinyin: 'Èr', english: 'Two', bangla: 'দুই' },
  { id: 'num-3', number: '3', chinese: '三', pinyin: 'Sān', english: 'Three', bangla: 'তিন' },
  { id: 'num-4', number: '4', chinese: '四', pinyin: 'Sì', english: 'Four', bangla: 'চার' },
  { id: 'num-5', number: '5', chinese: '五', pinyin: 'Wǔ', english: 'Five', bangla: 'পাঁচ' },
  { id: 'num-6', number: '6', chinese: '六', pinyin: 'Liù', english: 'Six', bangla: 'ছয়' },
  { id: 'num-7', number: '7', chinese: '七', pinyin: 'Qī', english: 'Seven', bangla: 'সাত' },
  { id: 'num-8', number: '8', chinese: '八', pinyin: 'Bā', english: 'Eight', bangla: 'আট' },
  { id: 'num-9', number: '9', chinese: '九', pinyin: 'Jiǔ', english: 'Nine', bangla: 'নয়' },
  { id: 'num-10', number: '10', chinese: '十', pinyin: 'Shí', english: 'Ten', bangla: 'দশ' },
  { id: 'num-11', number: '11', chinese: '十一', pinyin: 'Shíyī', english: 'Eleven', bangla: 'এগারো' },
  { id: 'num-12', number: '12', chinese: '十二', pinyin: 'Shí\'èr', english: 'Twelve', bangla: 'বারো' },
  { id: 'num-13', number: '13', chinese: '十三', pinyin: 'Shísān', english: 'Thirteen', bangla: 'তেরো' },
  { id: 'num-14', number: '14', chinese: '十四', pinyin: 'Shísì', english: 'Fourteen', bangla: 'চৌদ্দ' },
  { id: 'num-15', number: '15', chinese: '十五', pinyin: 'Shíwǔ', english: 'Fifteen', bangla: 'পনেরো' },
  { id: 'num-16', number: '16', chinese: '十六', pinyin: 'Shíliù', english: 'Sixteen', bangla: 'ষোল' },
  { id: 'num-17', number: '17', chinese: '十七', pinyin: 'Shíqī', english: 'Seventeen', bangla: 'সতেরো' },
  { id: 'num-18', number: '18', chinese: '十八', pinyin: 'Shíbā', english: 'Eighteen', bangla: 'আঠারো' },
  { id: 'num-19', number: '19', chinese: '十九', pinyin: 'Shíjiǔ', english: 'Nineteen', bangla: 'উনিশ' },
  { id: 'num-20', number: '20', chinese: '二十', pinyin: 'Èrshí', english: 'Twenty', bangla: 'বিশ' },
  { id: 'num-21', number: '21', chinese: '二十一', pinyin: 'Èrshíyī', english: 'Twenty-one', bangla: 'একুশ' },
  { id: 'num-30', number: '30', chinese: '三十', pinyin: 'Sānshí', english: 'Thirty', bangla: 'ত্রিশ' },
  { id: 'num-40', number: '40', chinese: '四十', pinyin: 'Sìshí', english: 'Forty', bangla: 'চল্লিশ' },
  { id: 'num-50', number: '50', chinese: '五十', pinyin: 'Wǔshí', english: 'Fifty', bangla: 'পঞ্চাশ' },
  { id: 'num-60', number: '60', chinese: '六十', pinyin: 'Liùshí', english: 'Sixty', bangla: 'ষাট' },
  { id: 'num-70', number: '70', chinese: '七十', pinyin: 'Qīshí', english: 'Seventy', bangla: 'সত্তর' },
  { id: 'num-80', number: '80', chinese: '八十', pinyin: 'Bāshí', english: 'Eighty', bangla: 'আশি' },
  { id: 'num-90', number: '90', chinese: '九十', pinyin: 'Jiǔshí', english: 'Ninety', bangla: 'নব্বই' },
  { id: 'num-100', number: '100', chinese: '一百', pinyin: 'Yībǎi', english: 'One hundred', bangla: 'একশ' },
  { id: 'num-1000', number: '1000', chinese: '一千', pinyin: 'Yīqiān', english: 'One thousand', bangla: 'এক হাজার' }
];

// Grammar Rules (Chinese Grammar)
export const grammarRules = [
  {
    id: 'gram-1',
    title: 'Chinese Tones (声调)',
    description: 'Chinese has 4 main tones plus a neutral tone. Tones change the meaning of a word.',
    rules: [
      'First tone (ā) - High level',
      'Second tone (á) - Rising',
      'Third tone (ǎ) - Falling then rising',
      'Fourth tone (à) - Falling',
      'Neutral tone (a) - Light and short'
    ]
  },
  {
    id: 'gram-2',
    title: 'Chinese Word Order',
    description: 'Chinese sentences generally follow Subject-Verb-Object (SVO) order.',
    rules: [
      'Subject + Verb + Object: 我吃饭 (I eat rice)',
      'Time expressions come before the verb',
      'Adjectives come before nouns',
      'Question words stay in place of the answer'
    ]
  },
  {
    id: 'gram-3',
    title: 'Measure Words (量词)',
    description: 'Chinese uses measure words when counting nouns.',
    rules: [
      '个 (gè) - General measure word',
      '本 (běn) - For books',
      '张 (zhāng) - For flat objects',
      '只 (zhī) - For animals',
      'Example: 一个人 (one person), 三本书 (three books)'
    ]
  },
  {
    id: 'gram-4',
    title: 'Chinese Pronouns (代词)',
    description: 'Chinese pronouns are simple and do not change form.',
    rules: [
      '我 (wǒ) - I/Me',
      '你 (nǐ) - You',
      '他 (tā) - He/Him',
      '她 (tā) - She/Her',
      '我们 (wǒmen) - We/Us',
      '你们 (nǐmen) - You (plural)',
      '他们 (tāmen) - They/Them'
    ]
  },
  {
    id: 'gram-5',
    title: 'No Verb Conjugation',
    description: 'Unlike Russian or English, Chinese verbs never change form for tense, person, or number.',
    rules: [
      'The same verb form is used for I, you, he/she, we, they',
      'Time is shown with words like 昨天 (yesterday), 现在 (now), 明天 (tomorrow) instead of verb endings',
      'The particle 了 (le) often marks a completed action',
      'The particle 在 (zài) before a verb marks an ongoing action (like -ing)'
    ]
  },
  {
    id: 'gram-6',
    title: 'Asking Questions with 吗 (ma)',
    description: 'The easiest way to turn a statement into a yes/no question in Chinese is by adding 吗 at the end.',
    rules: [
      'Statement: 你是学生 (Nǐ shì xuésheng) - You are a student',
      'Question: 你是学生吗？(Nǐ shì xuésheng ma?) - Are you a student?',
      'No word order change is needed, just add 吗 at the end'
    ]
  }
];

// Chinese Culture Facts
export const cultureFacts = [
  {
    id: 'culture-1',
    icon: '🏮',
    title: 'Chinese New Year',
    description: 'The most important festival in China, celebrated with fireworks, red decorations, and family reunions.'
  },
  {
    id: 'culture-2',
    icon: '🥢',
    title: 'Chinese Cuisine',
    description: 'Famous for its diverse flavors and cooking techniques. Popular dishes include Peking duck, dumplings, and noodles.'
  },
  {
    id: 'culture-3',
    icon: '🐉',
    title: 'Chinese Dragon',
    description: 'The dragon is a symbol of power, strength, and good luck in Chinese culture, unlike Western dragons.'
  },
  {
    id: 'culture-4',
    icon: '🏯',
    title: 'Chinese Architecture',
    description: 'Famous for the Great Wall, Forbidden City, and traditional pagodas with curved roofs.'
  },
  {
    id: 'culture-5',
    icon: '🎋',
    title: 'Chinese Calligraphy',
    description: 'A traditional art form where characters are written with a brush and ink, considered a high art.'
  },
  {
    id: 'culture-6',
    icon: '🍵',
    title: 'Chinese Tea Culture',
    description: 'Tea is central to Chinese daily life and social gatherings, with many varieties and rituals.'
  },
  {
    id: 'culture-7',
    icon: '🧧',
    title: 'Red Envelopes (红包)',
    description: 'Giving money in red envelopes during holidays and celebrations symbolizes good luck and blessings.'
  },
  {
    id: 'culture-8',
    icon: '🥋',
    title: 'Martial Arts',
    description: 'Kung fu (功夫) originated in China and includes many styles developed over centuries, often linked to philosophy and discipline.'
  }
];

// Quiz Questions
export const quizQuestions = [
  {
    id: 'quiz-1',
    question: 'How do you say "Hello" in Chinese?',
    options: ['你好', '谢谢', '再见', '对不起'],
    correct: '你好',
    explanation: '你好 (Nǐ hǎo) is the most common way to say "Hello" in Chinese.'
  },
  {
    id: 'quiz-2',
    question: 'What does "谢谢" mean?',
    options: ['Hello', 'Thank you', 'Sorry', 'Goodbye'],
    correct: 'Thank you',
    explanation: '谢谢 (Xièxie) means "Thank you" in Chinese.'
  },
  {
    id: 'quiz-3',
    question: 'Which number is "三" in Chinese?',
    options: ['One', 'Two', 'Three', 'Four'],
    correct: 'Three',
    explanation: '三 (Sān) means the number "Three" in Chinese.'
  },
  {
    id: 'quiz-4',
    question: 'How do you say "No" in Chinese?',
    options: ['是', '不是', '你好', '谢谢'],
    correct: '不是',
    explanation: '不是 (Bú shì) means "No" or "Is not" in Chinese.'
  },
  {
    id: 'quiz-5',
    question: 'What is "牛奶" in English?',
    options: ['Bread', 'Meat', 'Milk', 'Fish'],
    correct: 'Milk',
    explanation: '牛奶 (Niúnǎi) means "Milk" in Chinese.'
  },
  {
    id: 'quiz-6',
    question: 'What does "星期一" mean?',
    options: ['Sunday', 'Monday', 'Friday', 'Saturday'],
    correct: 'Monday',
    explanation: '星期一 (Xīngqīyī) means "Monday" in Chinese.'
  },
  {
    id: 'quiz-7',
    question: 'Which measure word is used for books?',
    options: ['个', '本', '张', '只'],
    correct: '本',
    explanation: '本 (běn) is the measure word used specifically for books, e.g. 三本书 (three books).'
  },
  {
    id: 'quiz-8',
    question: 'How do you turn a statement into a yes/no question in Chinese?',
    options: ['Change the word order', 'Add 吗 at the end', 'Add 不 at the start', 'Raise your tone only'],
    correct: 'Add 吗 at the end',
    explanation: 'Adding 吗 (ma) at the end of a statement turns it into a yes/no question, with no word order change needed.'
  },
  {
    id: 'quiz-9',
    question: 'What does "今天" mean?',
    options: ['Tomorrow', 'Yesterday', 'Today', 'Now'],
    correct: 'Today',
    explanation: '今天 (Jīntiān) means "Today" in Chinese.'
  },
  {
    id: 'quiz-10',
    question: 'How many main tones does Mandarin Chinese have?',
    options: ['3', '4', '5', '6'],
    correct: '4',
    explanation: 'Mandarin Chinese has 4 main tones, plus a neutral tone for unstressed syllables.'
  }
];

// Helper functions
export const getVocabularyCategories = () => {
  const cats = new Set(vocabulary.map(item => item.category));
  return Array.from(cats);
};

export const getPhraseCategories = () => {
  const cats = new Set(commonPhrases.map(item => item.category));
  return Array.from(cats);
};

export const getAlphabetTypes = () => {
  const types = new Set(chineseAlphabet.map(item => item.type));
  return Array.from(types);
};