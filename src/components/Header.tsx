import React from 'react';
import { Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ 
  currentLanguage, 
  onLanguageChange, 
  translations 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-lg shadow-soft">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-heading text-primary">
                {translations.appName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {translations.tagline}
              </p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#detect" className="text-foreground hover:text-primary transition-fast font-medium">
              {translations.nav.detect}
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-fast font-medium">
              {translations.nav.community}
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-fast font-medium">
              {translations.nav.features}
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;