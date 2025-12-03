import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, ChevronDown } from "lucide-react";

type Language = {
  code: string;
  name: string;       // English name
  nativeName: string; // Native script
};

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
];

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(currentLanguage);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("appLanguage");
    const validLanguages = languages.map(lang => lang.code);
    if (savedLang && validLanguages.includes(savedLang)) {
      setSelectedLang(savedLang);
      onLanguageChange(savedLang);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setSelectedLang(code);
    onLanguageChange(code);
    localStorage.setItem("appLanguage", code); // Persist language
  };

  const currentLang =
    languages.find((lang) => lang.code === selectedLang) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-w-[160px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="font-medium">{currentLang.nativeName}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              selectedLang === language.code
                ? "bg-primary/10 text-primary font-medium"
                : ""
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">
                {language.name}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
