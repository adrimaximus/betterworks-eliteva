import React from 'react';
import { Shield, Award, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Shield,
      title: t('about.feature.1.title'),
      description: t('about.feature.1.desc')
    },
    {
      icon: Award,
      title: t('about.feature.2.title'),
      description: t('about.feature.2.desc')
    },
    {
      icon: Rocket,
      title: t('about.feature.3.title'),
      description: t('about.feature.3.desc')
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900/80 to-background relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.header.1')} <span className="heading-gradient">{t('about.header.2')}</span>
            </h2>
            <p className="text-gray-300">
              {t('about.desc.1')}
            </p>
            <p className="text-gray-400">
              {t('about.desc.2')}
            </p>
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-morphism p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mb-3">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="glass-morphism border border-white/10 rounded-xl p-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">100+</h3>
                    <p className="text-sm text-gray-400">{t('about.stat.1')}</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">90%</h3>
                    <p className="text-sm text-gray-400">{t('about.stat.2')}</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">24/7</h3>
                    <p className="text-sm text-gray-400">{t('about.stat.3')}</p>
                  </div>
                </div>
                <div className="glass-morphism aspect-square rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-gradient mb-1">50+</h3>
                    <p className="text-sm text-gray-400">{t('about.stat.4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
