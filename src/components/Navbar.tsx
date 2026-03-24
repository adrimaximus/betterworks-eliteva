import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X, ShoppingCart } from 'lucide-react';
import NavbarContainer from './navbar/NavbarContainer';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenu from './navbar/MobileMenu';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.about"), href: "#about" },
    { name: "Solusi", href: "/solusi" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer isMenuOpen={isMenuOpen}>
      <Logo />
      
      <div className="flex items-center gap-4">
        <DesktopMenu navItems={navItems} />
        
        <LanguageSwitcher />
        
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <MobileMenu 
        isOpen={isMenuOpen} 
        navItems={navItems}
        onItemClick={() => setIsMenuOpen(false)}
      />
    </NavbarContainer>
  );
};

export default Navbar;
