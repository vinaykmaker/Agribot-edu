// Comprehensive database of crop diseases and pests affecting major crops in India
export const diseaseDatabase = [
  {
    disease: {
      en: "Late Blight",
      hi: "लेट ब्लाइट (पछेता अंगमारी)",
      kn: "ಲೇಟ್ ಬ್ಲೈಟ್ (ತಡವಾದ ಕುಗ್ಗುವಿಕೆ)"
    },
    confidence: 94,
    severity: "Moderate",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮ್ಯಾಟೊ"
    },
    treatment: {
      en: "• Apply copper-based fungicide immediately\n• Remove infected leaves and destroy them\n• Improve air circulation around plants\n• Water at soil level, not on leaves\n• Apply treatment in early morning or evening",
      hi: "• तुरंत कॉपर आधारित फफूंदनाशी का छिड़काव करें\n• संक्रमित पत्तियों को हटाकर नष्ट कर दें\n• पौधों के चारों ओर हवा का संचार बेहतर बनाएं\n• पत्तियों पर नहीं, मिट्टी के स्तर पर पानी दें\n• सुबह जल्दी या शाम को उपचार करें",
      kn: "• ತಕ್ಷಣ ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲಾರಸವನ್ನು ಸಿಂಪಡಿಸಿ\n• ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ\n• ಸಸ್ಯಗಳ ಸುತ್ತ ಗಾಳಿ ಪ್ರಸರಣವನ್ನು ಸುಧಾರಿಸಿ\n• ಎಲೆಗಳ ಮೇಲೆ ಅಲ್ಲ, ಮಣ್ಣಿನ ಮಟ್ಟದಲ್ಲಿ ನೀರು ಹಾಕಿ\n• ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ಚಿಕಿತ್ಸೆ ಮಾಡಿ"
    },
    prevention: {
      en: "• Plant disease-resistant varieties\n• Maintain proper spacing between plants\n• Avoid overhead watering\n• Apply preventive fungicide monthly\n• Practice crop rotation",
      hi: "• रोग प्रतिरोधी किस्में लगाएं\n• पौधों के बीच उचित दूरी रखें\n• ऊपर से पानी देने से बचें\n• मासिक निवारक छिड़काव करें\n• फसल चक्र अपनाएं",
      kn: "• ರೋಗ ನಿರೋಧಕ ಪ್ರಭೇದಗಳನ್ನು ನೆಡಿ\n• ಸಸ್ಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರ ಇಡಿ\n• ಮೇಲಿನಿಂದ ನೀರುಣಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ\n• ಮಾಸಿಕ ತಡೆಗಟ್ಟುವ ಸಿಂಪಡಣೆ\n• ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ"
    }
  },
  {
    disease: {
      en: "Leaf Curl Virus",
      hi: "पत्ती मोड़ वायरस",
      kn: "ಎಲೆ ಸುರುಳಿ ವೈರಸ್"
    },
    confidence: 87,
    severity: "Severe",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮ್ಯಾಟೊ"
    },
    treatment: {
      en: "• Remove infected plants immediately\n• Control whitefly vectors with neem oil\n• Use yellow sticky traps\n• Apply imidacloprid spray weekly\n• Isolate healthy plants from infected area",
      hi: "• संक्रमित पौधों को तुरंत हटा दें\n• नीम तेल से सफेद मक्खी नियंत्रण करें\n• पीले चिपचिपे जाल का उपयोग करें\n• साप्ताहिक इमिडाक्लोप्रिड छिड़काव करें\n• स्वस्थ पौधों को संक्रमित क्षेत्र से अलग रखें",
      kn: "• ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆಯಿರಿ\n• ಬೇವಿನ ಎಣ್ಣೆಯಿಂದ ಬಿಳಿ ಯೆಳ್ಳುಹುಳ ನಿಯಂತ್ರಣ\n• ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಬಳಸಿ\n• ವಾರಕ್ಕೊಮ್ಮೆ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಸಿಂಪಡಣೆ\n• ಆರೋಗ್ಯಕರ ಸಸ್ಯಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ"
    },
    prevention: {
      en: "• Use virus-free seedlings\n• Control whitefly population\n• Install insect-proof nets\n• Remove weed hosts nearby\n• Plant resistant varieties",
      hi: "• वायरस मुक्त पौधे का उपयोग करें\n• सफेद मक्खी की आबादी नियंत्रित करें\n• कीट प्रूफ जाली लगाएं\n• आसपास के खरपतवार हटाएं\n• प्रतिरोधी किस्में लगाएं",
      kn: "• ವೈರಸ್ ಮುಕ್ತ ಮೊಳಕೆಗಳನ್ನು ಬಳಸಿ\n• ಬಿಳಿ ಯೆಳ್ಳುಹುಳ ಜನಸಂಖ್ಯೆ ನಿಯಂತ್ರಿಸಿ\n• ಕೀಟ ನಿರೋಧಕ ಜಾಲಗಳನ್ನು ಹಾಕಿ\n• ಸಮೀಪದ ಕಳೆಗಳನ್ನು ತೆಗೆಯಿರಿ\n• ನಿರೋಧಕ ಪ್ರಭೇದಗಳನ್ನು ನೆಡಿ"
    }
  },
  {
    disease: {
      en: "Powdery Mildew",
      hi: "चूर्णी फफूंदी",
      kn: "ಪುಡಿ ಶಿಲೀಂಧ್ರ"
    },
    confidence: 91,
    severity: "Mild",
    crop: {
      en: "Wheat",
      hi: "गेहूं",
      kn: "ಗೋಧಿ"
    },
    treatment: {
      en: "• Spray sulfur-based fungicide early morning\n• Apply propiconazole at 10-day intervals\n• Increase plant spacing for better air flow\n• Remove lower infected leaves\n• Avoid excess nitrogen fertilization",
      hi: "• सुबह जल्दी सल्फर आधारित फफूंदनाशी छिड़कें\n• 10 दिन के अंतराल पर प्रोपिकोनाज़ोल का प्रयोग करें\n• बेहतर हवा के लिए पौधों की दूरी बढ़ाएं\n• निचली संक्रमित पत्तियां हटाएं\n• अधिक नाइट्रोजन उर्वरक से बचें",
      kn: "• ಬೆಳಗಿನ ಜಾವದಲ್ಲಿ ಗಂಧಕ ಆಧಾರಿತ ಶಿಲಾರಸ ಸಿಂಪಡಿಸಿ\n• 10 ದಿನಗಳ ಮಧ್ಯಂತರದಲ್ಲಿ ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ಬಳಸಿ\n• ಉತ್ತಮ ಗಾಳಿಗಾಗಿ ಸಸ್ಯಗಳ ಅಂತರ ಹೆಚ್ಚಿಸಿ\n• ಕೆಳಗಿನ ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ\n• ಅಧಿಕ ಸಾರಜನಕ ಗೊಬ್ಬರವನ್ನು ತಪ್ಪಿಸಿ"
    },
    prevention: {
      en: "• Select resistant wheat varieties\n• Maintain proper field sanitation\n• Avoid dense plantation\n• Monitor weather conditions\n• Apply preventive fungicide spray",
      hi: "• प्रतिरोधी गेहूं की किस्में चुनें\n• उचित खेत की सफाई बनाए रखें\n• घना रोपण से बचें\n• मौसम की स्थिति पर नजर रखें\n• निवारक फफूंदनाशी छिड़काव करें",
      kn: "• ನಿರೋಧಕ ಗೋಧಿ ಪ್ರಭೇದಗಳನ್ನು ಆರಿಸಿ\n• ಸರಿಯಾದ ಹೊಲ ನೈರ್ಮಲ್ಯ ಕಾಯ್ದುಕೊಳ್ಳಿ\n• ದಟ್ಟವಾದ ನೆಟ್ಟಿಗೆಯನ್ನು ತಪ್ಪಿಸಿ\n• ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ\n• ತಡೆಗಟ್ಟುವ ಶಿಲಾರಸ ಸಿಂಪಡಣೆ ಮಾಡಿ"
    }
  },
  {
    disease: {
      en: "Brown Spot",
      hi: "भूरे धब्बे",
      kn: "ಕಂದು ಚುಕ್ಕೆಗಳು"
    },
    confidence: 89,
    severity: "Moderate",
    crop: {
      en: "Rice",
      hi: "चावल",
      kn: "ಅಕ್ಕಿ"
    },
    treatment: {
      en: "• Apply carbendazim fungicide spray\n• Drain excess water from fields\n• Remove infected plant debris\n• Use balanced NPK fertilizer\n• Spray in evening hours to avoid heat",
      hi: "• कार्बेंडाजिम फफूंदनाशी का छिड़काव करें\n• खेतों से अतिरिक्त पानी निकालें\n• संक्रमित पौधों के अवशेष हटाएं\n• संतुलित NPK उर्वरक का उपयोग करें\n• गर्मी से बचने के लिए शाम को छिड़काव करें",
      kn: "• ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಶಿಲಾರಸ ಸಿಂಪಡಣೆ ಮಾಡಿ\n• ಹೊಲಗಳಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಬರಿದು ಮಾಡಿ\n• ಸೋಂಕಿತ ಸಸ್ಯ ಅವಶೇಷಗಳನ್ನು ತೆಗೆಯಿರಿ\n• ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರ ಬಳಸಿ\n• ಶಾಖದಿಂದ ತಪ್ಪಿಸಲು ಸಂಜೆ ಸಿಂಪಡಿಸಿ"
    },
    prevention: {
      en: "• Use certified disease-free seeds\n• Maintain proper water management\n• Apply silicon-based fertilizers\n• Practice field sanitation\n• Plant early maturing varieties",
      hi: "• प्रमाणित रोग मुक्त बीज का उपयोग करें\n• उचित जल प्रबंधन बनाए रखें\n• सिलिकॉन आधारित उर्वरक का प्रयोग करें\n• खेत की सफाई का अभ्यास करें\n• जल्दी पकने वाली किस्में लगाएं",
      kn: "• ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜಗಳನ್ನು ಬಳಸಿ\n• ಸರಿಯಾದ ನೀರು ನಿರ್ವಹಣೆ ಮಾಡಿ\n• ಸಿಲಿಕಾನ್ ಆಧಾರಿತ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ\n• ಹೊಲ ನೈರ್ಮಲ್ಯ ಅಭ್ಯಾಸ ಮಾಡಿ\n• ಬೇಗ ಹಣ್ಣಾಗುವ ಪ್ರಭೇದಗಳನ್ನು ನೆಡಿ"
    }
  },
  {
    disease: {
      en: "Aphids Infestation",
      hi: "माहू का संक्रमण",
      kn: "ಚೂರುಹುಳ ಸೋಂಕು"
    },
    confidence: 95,
    severity: "Moderate",
    crop: {
      en: "Cotton",
      hi: "कपास",
      kn: "ಹತ್ತಿ"
    },
    treatment: {
      en: "• Spray neem oil solution (2ml/liter)\n• Use insecticidal soap spray\n• Release ladybugs as biological control\n• Apply systemic insecticide if severe\n• Wash plants with strong water spray",
      hi: "• नीम तेल घोल का छिड़काव करें (2मिली/लीटर)\n• कीटनाशक साबुन का छिड़काव करें\n• जैविक नियंत्रण के लिए लेडीबग छोड़ें\n• गंभीर होने पर प्रणालीगत कीटनाशक का प्रयोग करें\n• तेज पानी के छिड़काव से पौधे धोएं",
      kn: "• ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ (2ಮಿಲಿ/ಲೀಟರ್)\n• ಕೀಟನಾಶಕ ಸೋಪ್ ಸಿಂಪಡಣೆ ಮಾಡಿ\n• ಜೈವಿಕ ನಿಯಂತ್ರಣಕ್ಕೆ ಲೇಡಿಬಗ್ ಬಿಡಿ\n• ತೀವ್ರವಾದರೆ ವ್ಯವಸ್ಥಿತ ಕೀಟನಾಶಕ ಬಳಸಿ\n• ಬಲವಾದ ನೀರಿನ ಸಿಂಪಡಣೆಯಿಂದ ಸಸ್ಯಗಳನ್ನು ತೊಳೆಯಿರಿ"
    },
    prevention: {
      en: "• Plant marigold as companion crop\n• Encourage beneficial insects\n• Regular monitoring of plants\n• Avoid excessive nitrogen fertilizer\n• Maintain field hygiene",
      hi: "• गेंदे को सहयोगी फसल के रूप में लगाएं\n• लाभकारी कीटों को प्रोत्साहित करें\n• पौधों की नियमित निगरानी करें\n• अधिक नाइट्रोजन उर्वरक से बचें\n• खेत की स्वच्छता बनाए रखें",
      kn: "• ಗೆಂಡೆ ಹೂವನ್ನು ಸಹಚರ ಬೆಳೆಯಾಗಿ ನೆಡಿ\n• ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ\n• ಸಸ್ಯಗಳ ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ\n• ಅಧಿಕ ಸಾರಜನಕ ಗೊಬ್ಬರವನ್ನು ತಪ್ಪಿಸಿ\n• ಹೊಲದ ನೈರ್ಮಲ್ಯ ಕಾಯ್ದುಕೊಳ್ಳಿ"
    }
  },
  {
    disease: {
      en: "Whitefly Infestation",
      hi: "सफेद मक्खी संक्रमण",
      kn: "ಬಿಳಿ ಯೆಳ್ಳುಹುಳ ಸೋಂಕು"
    },
    confidence: 88,
    severity: "Severe",
    crop: {
      en: "Cotton",
      hi: "कपास",
      kn: "ಹತ್ತಿ"
    },
    treatment: {
      en: "• Use yellow sticky traps extensively\n• Apply thiamethoxam spray weekly\n• Spray neem oil with sticker\n• Remove heavily infested leaves\n• Use reflective mulch to deter flies",
      hi: "• व्यापक रूप से पीले चिपचिपे जाल का उपयोग करें\n• साप्ताहिक थायामेथोक्सम का छिड़काव करें\n• चिपकने वाले के साथ नीम तेल का छिड़काव करें\n• अधिक संक्रमित पत्तियों को हटाएं\n• मक्खियों को रोकने के लिए परावर्तक मल्च का उपयोग करें",
      kn: "• ವ್ಯಾಪಕವಾಗಿ ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಬಳಸಿ\n• ವಾರಕ್ಕೊಮ್ಮೆ ಥಯಾಮೆಥೋಕ್ಸಾಮ್ ಸಿಂಪಡಣೆ\n• ಅಂಟಿಕೊಳ್ಳುವ ವಸ್ತುವಿನೊಂದಿಗೆ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ\n• ಹೆಚ್ಚು ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ\n• ಯೆಳ್ಳುಹುಳಗಳನ್ನು ತಡೆಯಲು ಪ್ರತಿಫಲಿತ ಮಲ್ಚ್ ಬಳಸಿ"
    },
    prevention: {
      en: "• Plant early in season\n• Use insect-proof nets in nursery\n• Grow border crops like maize\n• Regular field inspection\n• Destroy crop residues after harvest",
      hi: "• मौसम में जल्दी रोपण करें\n• नर्सरी में कीट प्रूफ जाली का उपयोग करें\n• मक्का जैसी सीमावर्ती फसलें उगाएं\n• नियमित खेत निरीक्षण करें\n• फसल के बाद अवशेषों को नष्ट करें",
      kn: "• ಋತುವಿನಲ್ಲಿ ಬೇಗನೇ ನೆಡಿ\n• ನರ್ಸರಿಯಲ್ಲಿ ಕೀಟ ನಿರೋಧಕ ಜಾಲಗಳನ್ನು ಬಳಸಿ\n• ಮೆಕ್ಕೆಜೋಳದಂತಹ ಗಡಿ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಿರಿ\n• ನಿಯಮಿತ ಹೊಲ ತಪಾಸಣೆ\n• ಸುಗ್ಗಿಯ ನಂತರ ಬೆಳೆ ಅವಶೇಷಗಳನ್ನು ನಾಶಮಾಡಿ"
    }
  },
  {
    disease: {
      en: "Stem Borer",
      hi: "तना छेदक",
      kn: "ಕಾಂಡ ನಾಶಕ"
    },
    confidence: 93,
    severity: "Severe",
    crop: {
      en: "Rice",
      hi: "चावल",
      kn: "ಅಕ್ಕಿ"
    },
    treatment: {
      en: "• Apply cartap hydrochloride granules\n• Release Trichogramma egg parasites\n• Cut and destroy dead hearts\n• Use pheromone traps for monitoring\n• Apply chlorantraniliprole spray",
      hi: "• कार्टाप हाइड्रोक्लोराइड दाने का प्रयोग करें\n• ट्राइकोग्रामा अंडा परजीवी छोड़ें\n• मृत दिलों को काटकर नष्ट करें\n• निगरानी के लिए फेरोमोन ट्रैप का उपयोग करें\n• क्लोरैंट्रानिलिप्रोल का छिड़काव करें",
      kn: "• ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ ಕಣಗಳನ್ನು ಹಾಕಿ\n• ಟ್ರೈಕೋಗ್ರಾಮ್ಮ ಮೊಟ್ಟೆ ಪರಾವಲಂಬಿಗಳನ್ನು ಬಿಡಿ\n• ಸತ್ತ ಹೃದಯಗಳನ್ನು ಕತ್ತರಿಸಿ ನಾಶಮಾಡಿ\n• ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಬಳಸಿ\n• ಕ್ಲೊರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಸಿಂಪಡಣೆ ಮಾಡಿ"
    },
    prevention: {
      en: "• Avoid staggered planting\n• Maintain clean field bunds\n• Use resistant varieties\n• Remove stubbles after harvest\n• Apply organic manure to strengthen plants",
      hi: "• चरणबद्ध रोपण से बचें\n• साफ खेत की मेड़ें बनाए रखें\n• प्रतिरोधी किस्मों का उपयोग करें\n• फसल के बाद ठूंठ हटाएं\n• पौधों को मजबूत बनाने के लिए जैविक खाद डालें",
      kn: "• ಹಂತ ಹಂತವಾಗಿ ನೆಟ್ಟಿಗೆಯನ್ನು ತಪ್ಪಿಸಿ\n• ಸ್ವಚ್ಛ ಹೊಲದ ಅಂಚುಗಳನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ\n• ನಿರೋಧಕ ಪ್ರಭೇದಗಳನ್ನು ಬಳಸಿ\n• ಸುಗ್ಗಿಯ ನಂತರ ಬೇರುಸಂಗಟಿಯನ್ನು ತೆಗೆಯಿರಿ\n• ಸಸ್ಯಗಳನ್ನು ಬಲಪಡಿಸಲು ಸಾವಯವ ಗೊಬ್ಬರ ಹಾಕಿ"
    }
  },
  {
    disease: {
      en: "Fruit Borer",
      hi: "फल छेदक",
      kn: "ಹಣ್ಣು ನಾಶಕ"
    },
    confidence: 86,
    severity: "Moderate",
    crop: {
      en: "Tomato",
      hi: "टमाटर",
      kn: "ಟೊಮ್ಯಾಟೊ"
    },
    treatment: {
      en: "• Install pheromone traps for males\n• Spray Bacillus thuringiensis (Bt)\n• Apply spinosad insecticide\n• Hand-pick and destroy affected fruits\n• Use nuclear polyhedrosis virus (NPV)",
      hi: "• नर के लिए फेरोमोन ट्रैप लगाएं\n• बैसिलस थुरिंजिएंसिस (बीटी) का छिड़काव करें\n• स्पिनोसैड कीटनाशी का प्रयोग करें\n• प्रभावित फलों को हाथ से चुनकर नष्ट करें\n• न्यूक्लियर पॉलीहेड्रोसिस वायरस (NPV) का उपयोग करें",
      kn: "• ಗಂಡುಗಳಿಗಾಗಿ ಫೆರೋಮೋನ್ ಬಲೆಗಳನ್ನು ಹಾಕಿ\n• ಬ್ಯಾಸಿಲಸ್ ತುರಿಂಜಿಯೆನ್ಸಿಸ್ (ಬಿಟಿ) ಸಿಂಪಡಿಸಿ\n• ಸ್ಪಿನೋಸಾಡ್ ಕೀಟನಾಶಕ ಬಳಸಿ\n• ಪೀಡಿತ ಹಣ್ಣುಗಳನ್ನು ಕೈಯಿಂದ ಆರಿಸಿ ನಾಶಮಾಡಿ\n• ನ್ಯೂಕ್ಲಿಯರ್ ಪಾಲಿಹೆಡ್ರೋಸಿಸ್ ವೈರಸ್ (NPV) ಬಳಸಿ"
    },
    prevention: {
      en: "• Regular field sanitation\n• Destroy crop residues\n• Intercrop with marigold or basil\n• Use row covers during flowering\n• Monitor traps weekly",
      hi: "• नियमित खेत की सफाई\n• फसल अवशेष नष्ट करें\n• गेंदे या तुलसी के साथ अंतर फसली\n• फूल आने के दौरान पंक्ति कवर का उपयोग करें\n• साप्ताहिक ट्रैप की निगरानी करें",
      kn: "• ನಿಯಮಿತ ಹೊಲ ನೈರ್ಮಲ್ಯ\n• ಬೆಳೆ ಅವಶೇಷಗಳನ್ನು ನಾಶಮಾಡಿ\n• ಗೆಂಡೆ ಅಥವಾ ತುಳಸಿಯೊಂದಿಗೆ ಅಂತರ ಬೆಳೆ\n• ಹೂಬಿಡುವ ಸಮಯದಲ್ಲಿ ಸಾಲು ಮುಚ್ಚುಗೆಗಳನ್ನು ಬಳಸಿ\n• ವಾರಕ್ಕೊಮ್ಮೆ ಬಲೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ"
    }
  },
  {
    disease: {
      en: "Red Rot",
      hi: "लाल सड़न",
      kn: "ಕೆಂಪು ಕೊಳೆತ"
    },
    confidence: 90,
    severity: "Severe",
    crop: {
      en: "Sugarcane",
      hi: "गन्ना",
      kn: "ಕಬ್ಬು"
    },
    treatment: {
      en: "• Remove and burn infected canes\n• Apply Bordeaux mixture spray\n• Use copper oxychloride fungicide\n• Improve field drainage immediately\n• Avoid injuries during cultivation",
      hi: "• संक्रमित गन्नों को हटाकर जलाएं\n• बोर्डो मिश्रण का छिड़काव करें\n• कॉपर ऑक्सीक्लोराइड फफूंदनाशी का उपयोग करें\n• तुरंत खेत की जल निकासी सुधारें\n• खेती के दौरान चोट से बचें",
      kn: "• ಸೋಂಕಿತ ಕಬ್ಬುಗಳನ್ನು ತೆಗೆದು ಸುಡಿ\n• ಬೋರ್ಡೊ ಮಿಶ್ರಣ ಸಿಂಪಡಣೆ ಮಾಡಿ\n• ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಶಿಲಾರಸ ಬಳಸಿ\n• ತಕ್ಷಣ ಹೊಲದ ಒಳಚರಂಡಿ ಸುಧಾರಿಸಿ\n• ಕೃಷಿ ಸಮಯದಲ್ಲಿ ಗಾಯಗಳನ್ನು ತಪ್ಪಿಸಿ"
    },
    prevention: {
      en: "• Plant disease-free setts only\n• Practice proper field sanitation\n• Ensure good field drainage\n• Avoid waterlogged conditions\n• Use certified planting material",
      hi: "• केवल रोग मुक्त सेट्स लगाएं\n• उचित खेत स्वच्छता का अभ्यास करें\n• अच्छी खेत जल निकासी सुनिश्चित करें\n• जलभराव की स्थिति से बचें\n• प्रमाणित रोपण सामग्री का उपयोग करें",
      kn: "• ರೋಗಮುಕ್ತ ಸೆಟ್‌ಗಳನ್ನು ಮಾತ್ರ ನೆಡಿ\n• ಸರಿಯಾದ ಹೊಲ ನೈರ್ಮಲ್ಯ ಅಭ್ಯಾಸ ಮಾಡಿ\n• ಉತ್ತಮ ಹೊಲದ ಒಳಚರಂಡಿ ಖಚಿತಪಡಿಸಿ\n• ನೀರು ಕಾಯುವ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ತಪ್ಪಿಸಿ\n• ಪ್ರಮಾಣೀಕೃತ ನೆಟ್ಟಿಗೆ ಸಾಮಗ್ರಿಯನ್ನು ಬಳಸಿ"
    }
  },
  {
    disease: {
      en: "Rust Disease",
      hi: "रतुआ रोग",
      kn: "ತುಕ್ಕು ರೋಗ"
    },
    confidence: 92,
    severity: "Moderate",
    crop: {
      en: "Wheat",
      hi: "गेहूं",
      kn: "ಗೋಧಿ"
    },
    treatment: {
      en: "• Apply propiconazole fungicide immediately\n• Use mancozeb for early stages\n• Remove infected plant parts\n• Spray at 15-day intervals\n• Apply during cool weather",
      hi: "• तुरंत प्रोपिकोनाज़ोल फफूंदनाशी का प्रयोग करें\n• प्रारंभिक अवस्था के लिए मैंकोज़ेब का उपयोग करें\n• संक्रमित पौधे के हिस्सों को हटाएं\n• 15 दिन के अंतराल पर छिड़काव करें\n• ठंडे मौसम में छिड़काव करें",
      kn: "• ತಕ್ಷಣ ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ಶಿಲಾರಸ ಬಳಸಿ\n• ಆರಂಭಿಕ ಹಂತಗಳಿಗೆ ಮ್ಯಾಂಕೋಝೆಬ್ ಬಳಸಿ\n• ಸೋಂಕಿತ ಸಸ್ಯ ಭಾಗಗಳನ್ನು ತೆಗೆಯಿರಿ\n• 15 ದಿನಗಳ ಮಧ್ಯಂತರದಲ್ಲಿ ಸಿಂಪಡಿಸಿ\n• ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ಸಿಂಪಡಿಸಿ"
    },
    prevention: {
      en: "• Plant rust-resistant varieties\n• Ensure proper plant nutrition\n• Avoid excessive nitrogen\n• Practice crop rotation\n• Remove volunteer plants",
      hi: "• रतुआ प्रतिरोधी किस्में लगाएं\n• उचित पौधे पोषण सुनिश्चित करें\n• अधिक नाइट्रोजन से बचें\n• फसल चक्र का अभ्यास करें\n• स्वयंसेवी पौधों को हटाएं",
      kn: "• ತುಕ್ಕು ನಿರೋಧಕ ಪ್ರಭೇದಗಳನ್ನು ನೆಡಿ\n• ಸರಿಯಾದ ಸಸ್ಯ ಪೋಷಣೆ ಖಚಿತಪಡಿಸಿ\n• ಅಧಿಕ ಸಾರಜನಕವನ್ನು ತಪ್ಪಿಸಿ\n• ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ\n• ಸ್ವಯಂಸೇವಕ ಸಸ್ಯಗಳನ್ನು ತೆಗೆಯಿರಿ"
    }
  },
  {
    disease: {
      en: "Bacterial Wilt",
      hi: "जीवाणु मुरझान",
      kn: "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಬಾಡುವಿಕೆ"
    },
    confidence: 84,
    severity: "Severe",
    crop: {
      en: "Potato",
      hi: "आलू",
      kn: "ಆಲೂಗಡ್ಡೆ"
    },
    treatment: {
      en: "• Remove infected plants immediately\n• Apply copper-based bactericide\n• Improve soil drainage urgently\n• Use bleaching powder in irrigation water\n• Avoid wounding plants during cultivation",
      hi: "• संक्रमित पौधों को तुरंत हटाएं\n• कॉपर आधारित जीवाणुनाशी का प्रयोग करें\n• तुरंत मिट्टी की जल निकासी सुधारें\n• सिंचाई के पानी में ब्लीचिंग पाउडर का उपयोग करें\n• खेती के दौरान पौधों को घायल करने से बचें",
      kn: "• ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆಯಿರಿ\n• ತಾಮ್ರ ಆಧಾರಿತ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ಬಳಸಿ\n• ತುರ್ತಾಗಿ ಮಣ್ಣಿನ ಒಳಚರಂಡಿ ಸುಧಾರಿಸಿ\n• ನೀರಾವರಿ ನೀರಿನಲ್ಲಿ ಬ್ಲೀಚಿಂಗ್ ಪೌಡರ್ ಬಳಸಿ\n• ಕೃಷಿ ಸಮಯದಲ್ಲಿ ಸಸ್ಯಗಳನ್ನು ಗಾಯಗೊಳಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ"
    },
    prevention: {
      en: "• Use certified disease-free seed tubers\n• Practice 3-4 year crop rotation\n• Ensure well-drained soil\n• Avoid planting in infected fields\n• Sanitize farming tools regularly",
      hi: "• प्रमाणित रोग मुक्त बीज आलू का उपयोग करें\n• 3-4 साल का फसल चक्र अपनाएं\n• अच्छी जल निकासी वाली मिट्टी सुनिश्चित करें\n• संक्रमित खेतों में रोपण से बचें\n• कृषि उपकरणों को नियमित रूप से साफ करें",
      kn: "• ಪ್ರಮಾಣೀಕೃತ ರೋಗಮುಕ್ತ ಬೀಜ ಆಲೂಗಡ್ಡೆಗಳನ್ನು ಬಳಸಿ\n• 3-4 ವರ್ಷಗಳ ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ\n• ಚೆನ್ನಾಗಿ ಒಳಚರಂಡಿಯಾಗುವ ಮಣ್ಣನ್ನು ಖಚಿತಪಡಿಸಿ\n• ಸೋಂಕಿತ ಹೊಲಗಳಲ್ಲಿ ನೆಟ್ಟಿಗೆಯನ್ನು ತಪ್ಪಿಸಿ\n• ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಶುದ್ಧೀಕರಿಸಿ"
    }
  }
];

// Function to get a random disease from the database
export const getRandomDisease = () => {
  const randomIndex = Math.floor(Math.random() * diseaseDatabase.length);
  return diseaseDatabase[randomIndex];
};