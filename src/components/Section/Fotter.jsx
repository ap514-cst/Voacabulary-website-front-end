// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Heart,
  Shield,
  Scale,
  MessageCircle
} from 'lucide-react';

// Import social icons from react-icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'কুইক লিংক',
      links: [
        { name: 'হোম', path: '/' },
        { name: 'শুরু করুন', path: '/start' },
        { name: 'ভোকাবুলারি লিস্ট', path: '/voc' },
        { name: 'কুইজ', path: '/quiz' },
        { name: 'কিডস কর্নার', path: '/kids' }
      ]
    },
    {
      title: 'লেভেল সমূহ',
      links: [
        { name: 'বেসিক লেভেল', path: '/basic' },
        { name: 'ইন্টারমিডিয়েট লেভেল', path: '/inter' },
        { name: 'অ্যাডভান্সড লেভেল', path: '/advanced' },
        { name: 'সংখ্যা শিখুন', path: '/number' },
        { name: 'ইরেগুলার ভার্ব', path: '/irregular' }
      ]
    },
    {
      title: 'সাপোর্ট',
      links: [
        { name: 'সাহায্য', path: '/help' },
        { name: 'FAQ', path: '/faq' },
        { name: 'যোগাযোগ', path: '/contact' },
        { name: 'আমাদের সম্পর্কে', path: '/about' },
        { name: 'ব্লগ', path: '/blog' }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, color: 'bg-blue-600', hover: 'hover:bg-blue-700', url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, color: 'bg-sky-500', hover: 'hover:bg-sky-600', url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, color: 'bg-pink-600', hover: 'hover:bg-pink-700', url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedin, color: 'bg-blue-700', hover: 'hover:bg-blue-800', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaYoutube, color: 'bg-red-600', hover: 'hover:bg-red-700', url: 'https://youtube.com', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">ভোকাবুলারি</span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              আপনার ভাষা দক্ষতা উন্নত করার জন্য আধুনিক ও ইন্টারেক্টিভ প্ল্যাটফর্ম। 
              সহজে ইংরেজি শিখুন, কুইজ দিন এবং নিজের দক্ষতা যাচাই করুন।
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 ${social.hover}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                {section.title}
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-indigo-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Row */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">ইমেইল</p>
                <p className="text-sm font-medium">info@vocabulary.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">ফোন</p>
                <p className="text-sm font-medium">+880 1630795443</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">সাপোর্ট টাইম</p>
                <p className="text-sm font-medium">সকাল ৯টা - রাত ৯টা (সপ্তাহের ৭ দিন)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} ভোকাবুলারি. সমস্ত অধিকার সংরক্ষিত।
          </p>
          <div>
            <p className='text-cyan-600'><u><a href="">Develop by Apu Mojumder</a></u></p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-1">
              <Heart className="w-3 h-3" />
              আমাদের সম্পর্কে
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              যোগাযোগ
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" />
              গোপনীয়তা নীতি
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors flex items-center gap-1">
              <Scale className="w-3 h-3" />
              শর্তাবলী
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;