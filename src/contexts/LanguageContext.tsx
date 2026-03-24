import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    'nav.home': 'Beranda',
    'nav.services': 'Layanan',
    'nav.about': 'Tentang Kami',
    'hero.title.1': 'Because Your Brand ',
    'hero.title.2': 'Deserves the Best',
    'hero.subtitle': 'Betterworks adalah portal aktivasi brand & tools berbasis AI yang powerful untuk startup, entrepreneur, dan brand. Layanan modern dan efisien untuk hasil kerja yang lebih baik.',
    'hero.cta.contact': 'Hubungi Kami',
    'hero.cta.services': 'Pelajari Layanan',
    'services.header.title.1': 'Solusi ',
    'services.header.title.2': 'Digital',
    'services.header.title.3': ' Kami',
    'services.header.subtitle': 'Solusi digital terpadu untuk membantu bisnis Anda tumbuh dan berkembang di era digital',
    'about.header.1': 'Tentang ',
    'about.header.2': 'Betterworks',
    'about.desc.1': 'Betterworks.id adalah sebuah startup yang bertujuan untuk memberdayakan bisnis menengah di Indonesia, khususnya di area Jabodetabek, untuk berkembang di pasar digital. Misi inti kami adalah menyediakan layanan aktivasi digital yang disesuaikan untuk mendukung bisnis dalam memperoleh dan mempertahankan pelanggan melalui saluran digital.',
    'about.desc.2': 'Kami hadir untuk menjadi partner digital yang membantu bisnis Anda tumbuh dengan solusi teknologi terkini, termasuk pemanfaatan AI untuk mengoptimalkan proses bisnis dan meningkatkan pengalaman pelanggan.',
    'about.feature.1.title': 'Keamanan Data',
    'about.feature.1.desc': 'Keamanan data Anda adalah prioritas utama kami dengan enkripsi tingkat tinggi dan protokol keamanan terbaru.',
    'about.feature.2.title': 'Kualitas Terbaik',
    'about.feature.2.desc': 'Kami menghadirkan layanan dengan standar kualitas tinggi untuk hasil yang optimal bagi bisnis Anda.',
    'about.feature.3.title': 'Pertumbuhan Bisnis',
    'about.feature.3.desc': 'Fokus pada solusi yang mendorong pertumbuhan bisnis dan meningkatkan konversi pelanggan Anda.',
    'about.stat.1': 'Proyek Selesai',
    'about.stat.2': 'Klien Puas',
    'about.stat.3': 'Dukungan',
    'about.stat.4': 'Mitra Bisnis',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'hero.title.1': 'Because Your Brand ',
    'hero.title.2': 'Deserves the Best',
    'hero.subtitle': 'Betterworks is a powerful AI-driven brand activation portal & tools for startups, entrepreneurs, and brands. Modern and efficient services for better work results.',
    'hero.cta.contact': 'Contact Us',
    'hero.cta.services': 'Explore Services',
    'services.header.title.1': 'Our ',
    'services.header.title.2': 'Digital',
    'services.header.title.3': ' Solutions',
    'services.header.subtitle': 'Integrated digital solutions to help your business grow and thrive in the digital era',
    'about.header.1': 'About ',
    'about.header.2': 'Betterworks',
    'about.desc.1': 'Betterworks.id is a startup aimed at empowering medium-sized businesses in Indonesia, specifically in the Jabodetabek area, to thrive in the digital market. Our core mission is to provide tailored digital activation services to support businesses in acquiring and retaining customers through digital channels.',
    'about.desc.2': 'We are here to be your digital partner, helping your business grow with the latest technological solutions, including the utilization of AI to optimize business processes and enhance customer experience.',
    'about.feature.1.title': 'Data Security',
    'about.feature.1.desc': 'Your data security is our top priority with high-level encryption and the latest security protocols.',
    'about.feature.2.title': 'Best Quality',
    'about.feature.2.desc': 'We deliver services with high quality standards for optimal results for your business.',
    'about.feature.3.title': 'Business Growth',
    'about.feature.3.desc': 'Focus on solutions that drive business growth and increase your customer conversion.',
    'about.stat.1': 'Completed Projects',
    'about.stat.2': 'Satisfied Clients',
    'about.stat.3': 'Support',
    'about.stat.4': 'Business Partners',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
