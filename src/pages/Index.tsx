import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import VisionDetection from '@/components/VisionDetection';
import LearningSection from '@/components/LearningSection';
import CommunitySection from '@/components/CommunitySection';
import FeaturesSection from '@/components/FeaturesSection';
import MobileNavBar from '@/components/MobileNavBar';
import VoiceAgent from '@/components/VoiceAgent';
import { translations } from '@/translations';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [detectionResult, setDetectionResult] = useState<any>(null);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  const handleStartDetection = () => {
    const detectSection = document.getElementById('detect');
    if (detectSection) {
      detectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDetectionResult = useCallback((result: any) => {
    setDetectionResult(result);
  }, []);

  const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        translations={currentTranslations}
      />
      
      <main className="pt-16">
        <HeroSection
          translations={currentTranslations}
          onStartDetection={handleStartDetection}
        />
        
        {/* AI Vision Detection Section */}
        <section id="detect" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {currentLanguage === 'hi' ? '🔬 AI फसल डॉक्टर' :
                 currentLanguage === 'kn' ? '🔬 AI ಬೆಳೆ ವೈದ್ಯ' :
                 currentLanguage === 'te' ? '🔬 AI పంట వైద్యుడు' :
                 '🔬 AI Crop Doctor'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {currentLanguage === 'hi' ? 'अपने पौधे की फोटो खींचें और तुरंत बीमारी का पता लगाएं' :
                 currentLanguage === 'kn' ? 'ನಿಮ್ಮ ಸಸ್ಯದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಮತ್ತು ತಕ್ಷಣ ರೋಗ ಪತ್ತೆ ಮಾಡಿ' :
                 currentLanguage === 'te' ? 'మీ మొక్క ఫోటో తీయండి మరియు వెంటనే వ్యాధిని గుర్తించండి' :
                 'Take a photo of your plant and instantly detect diseases'}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <VisionDetection 
                currentLanguage={currentLanguage} 
                translations={currentTranslations}
                onDetectionResult={handleDetectionResult}
              />
              <VoiceAgent 
                currentLanguage={currentLanguage} 
                translations={currentTranslations}
                onDetectionResult={handleDetectionResult}
              />
            </div>
          </div>
        </section>

        {/* Learning Section */}
        <LearningSection 
          currentLanguage={currentLanguage} 
          translations={currentTranslations} 
        />
             
        <CommunitySection translations={currentTranslations} currentLanguage={currentLanguage} />
        
        <FeaturesSection translations={currentTranslations} />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-3">
              🌱 {currentTranslations.appName}
            </h3>
            <p className="text-primary-foreground/80 mb-4 text-sm md:text-base">
              {currentLanguage === 'hi' ? '👨‍🌾 AI के साथ किसानों को सशक्त बनाना' :
               currentLanguage === 'kn' ? '👨‍🌾 AI ಮೂಲಕ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು' :
               currentLanguage === 'te' ? '👨‍🌾 AI తో రైతులను సాధికారం చేయడం' :
               '👨‍🌾 Empowering farmers with AI-powered agriculture assistance'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-primary-foreground/70">
              <span>© 2024 AgriBot AI</span>
              <span>🌾 {currentLanguage === 'hi' ? 'किसानों के लिए बनाया गया' : currentLanguage === 'kn' ? 'ರೈತರಿಗಾಗಿ ರಚಿಸಲಾಗಿದೆ' : currentLanguage === 'te' ? 'రైతుల కోసం తయారు చేయబడింది' : 'Made for farmers'}</span>
              <span>🌐 4 {currentLanguage === 'hi' ? 'भाषाएं' : currentLanguage === 'kn' ? 'ಭಾಷೆಗಳು' : currentLanguage === 'te' ? 'భాషలు' : 'Languages'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNavBar 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
    </div>
  );
};

export default Index;
