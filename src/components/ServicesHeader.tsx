import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesHeader: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {t('services.header.title.1')} <span className="heading-gradient">{t('services.header.title.2')}</span> {t('services.header.title.3')}
      </h2>
      <p className="text-gray-400 mx-auto text-sm md:text-base">
        {t('services.header.subtitle')}
      </p>
    </div>
  );
};

export default ServicesHeader;
