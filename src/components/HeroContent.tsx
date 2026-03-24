import { useLanguage } from "@/contexts/LanguageContext";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HeroCard from './HeroCard';

const HeroContent: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span>{t("hero.title.1")}</span>
            <span className="text-gradient">{t("hero.title.2")}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white px-8 py-6 text-lg"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t("hero.cta.contact")}
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-400/30 hover:bg-yellow-400/10 text-white px-8 py-6 text-lg group transition-all duration-300"
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t("hero.cta.services")} 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <HeroCard />
          
          <div className="absolute -bottom-6 -right-6 -z-10 w-72 h-72 bg-yellow-500/40 rounded-full blur-[80px] animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute -top-6 -left-6 -z-10 w-72 h-72 bg-amber-500/30 rounded-full blur-[80px] animate-pulse" style={{animationDuration: '6s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
