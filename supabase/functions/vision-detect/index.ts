import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB base64
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Helper to delay for retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Optimized system prompt for better accuracy
const systemPrompt = `You are an expert agricultural plant pathologist AI specialized in Indian crops.

TASK: Analyze the plant/crop image and detect diseases, pests, nutrient deficiencies, or health issues.

CROP EXPERTISE (prioritize these common Indian crops):
- Cereals: Rice, Wheat, Maize, Bajra, Jowar
- Pulses: Chickpea (Chana), Pigeon Pea (Tur/Arhar), Lentil (Masoor), Black Gram (Urad), Green Gram (Moong)
- Oilseeds: Groundnut, Mustard, Soybean, Sunflower, Sesame
- Cash Crops: Cotton, Sugarcane, Tobacco, Jute
- Vegetables: Tomato, Potato, Onion, Brinjal, Chilli, Okra, Cauliflower, Cabbage
- Fruits: Mango, Banana, Papaya, Guava, Citrus, Pomegranate, Grapes
- Spices: Turmeric, Ginger, Coriander, Cumin

DISEASE IDENTIFICATION CHECKLIST:
1. Leaf symptoms: spots, lesions, wilting, yellowing, curling, holes
2. Stem symptoms: cankers, rot, discoloration
3. Fruit symptoms: spots, rot, deformities
4. Root symptoms (if visible): rot, galls
5. Overall plant health: stunting, wilting pattern

RESPOND ONLY IN THIS JSON FORMAT:
{
  "detected": true,
  "crop": "Identified crop name",
  "disease": {
    "name": "Disease/issue name in English",
    "nameHi": "हिंदी नाम",
    "nameKn": "ಕನ್ನಡ ಹೆಸರು"
  },
  "severity": "mild|moderate|severe",
  "confidence": 75,
  "symptoms": {
    "en": "Observed symptoms in 2-3 sentences",
    "hi": "लक्षण हिंदी में",
    "kn": "ಲಕ್ಷಣಗಳು ಕನ್ನಡದಲ್ಲಿ"
  },
  "treatment": {
    "en": "Step 1: [action]. Step 2: [action]. Chemical: [name and dosage]. Application: [method and timing]",
    "hi": "उपचार हिंदी में",
    "kn": "ಚಿಕಿತ್ಸೆ ಕನ್ನಡದಲ್ಲಿ"
  },
  "prevention": {
    "en": "3-4 prevention tips",
    "hi": "रोकथाम हिंदी में",
    "kn": "ತಡೆಗಟ್ಟುವಿಕೆ ಕನ್ನಡದಲ್ಲಿ"
  },
  "organic_remedy": {
    "en": "Low-cost organic solution with exact measurements",
    "hi": "जैविक उपाय हिंदी में",
    "kn": "ಸಾವಯವ ಪರಿಹಾರ ಕನ್ನಡದಲ್ಲಿ"
  }
}

RULES:
1. If NOT a plant image: {"detected": false, "message": {"en": "Please upload a clear image of a plant or crop", "hi": "कृपया पौधे की स्पष्ट तस्वीर अपलोड करें", "kn": "ದಯವಿಟ್ಟು ಸಸ್ಯದ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ"}}
2. If plant is HEALTHY: {"detected": true, "disease": {"name": "Healthy Plant", ...}, "severity": "none", "confidence": 85, ...}
3. Set confidence 50-70 if unsure, recommend expert consultation
4. Provide SPECIFIC dosages (e.g., "2ml per liter water")
5. Include both chemical AND organic options
6. Keep language simple for farmers`;

async function callVisionAI(imageBase64: string, apiKey: string): Promise<Response> {
  const imageUrl = imageBase64.startsWith("data:") 
    ? imageBase64 
    : `data:image/jpeg;base64,${imageBase64}`;

  return await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: [
            {
              type: "text",
              text: "Analyze this crop image. Identify the plant, detect any disease/pest/deficiency, and provide diagnosis with treatment in English, Hindi, and Kannada."
            },
            {
              type: "image_url",
              image_url: { url: imageUrl }
            }
          ]
        }
      ],
      temperature: 0.2, // Lower for more consistent results
      max_tokens: 2500,
    }),
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ 
        error: "Too many requests. Please wait a moment and try again.",
        detected: false 
      }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const imageBase64 = body?.imageBase64;
    const language = body?.language || "en";
    
    // Input validation
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return new Response(
        JSON.stringify({ 
          error: "Image is required and must be a string",
          detected: false 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (imageBase64.length > MAX_IMAGE_SIZE) {
      return new Response(
        JSON.stringify({ 
          error: "Image is too large. Please use an image under 5MB.",
          detected: false 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate base64 format
    const base64Pattern = /^data:image\/(jpeg|jpg|png|webp|gif);base64,|^[A-Za-z0-9+/=]+$/;
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    if (cleanBase64.length < 100) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid image data. Please upload a valid image.",
          detected: false 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing image for disease detection (size: ${Math.round(imageBase64.length / 1024)}KB)`);

    // Retry logic for API calls
    let response: Response | null = null;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`Retry attempt ${attempt}/${MAX_RETRIES}`);
          await delay(RETRY_DELAY_MS * attempt);
        }

        response = await callVisionAI(imageBase64, LOVABLE_API_KEY);

        if (response.ok) {
          break;
        }

        // Handle specific error codes
        if (response.status === 429) {
          if (attempt === MAX_RETRIES) {
            return new Response(
              JSON.stringify({ 
                error: "Service is busy. Please try again in a few minutes.",
                detected: false 
              }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          continue; // Retry on rate limit
        }

        if (response.status === 402) {
          return new Response(
            JSON.stringify({ 
              error: "AI service temporarily unavailable. Please try again later.",
              detected: false 
            }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // For other errors, try to continue
        const errorText = await response.text();
        console.error(`AI gateway error (attempt ${attempt}):`, response.status, errorText);
        lastError = new Error(`AI gateway error: ${response.status}`);

      } catch (fetchError) {
        console.error(`Fetch error (attempt ${attempt}):`, fetchError);
        lastError = fetchError instanceof Error ? fetchError : new Error(String(fetchError));
      }
    }

    if (!response || !response.ok) {
      throw lastError || new Error("Failed to get AI response after retries");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Empty response from AI");
    }

    console.log("Vision AI response received successfully");

    // Parse JSON response with better error handling
    let result;
    try {
      // Clean markdown code blocks if present
      let cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Try to extract JSON if wrapped in other text
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
      }
      
      result = JSON.parse(cleanedResponse);
      
      // Validate required fields
      if (typeof result.detected !== 'boolean') {
        result.detected = true;
      }
      if (result.detected && !result.confidence) {
        result.confidence = 70; // Default confidence
      }

    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw response:", aiResponse.substring(0, 500));
      
      // Return a helpful fallback response
      result = {
        detected: false,
        error: "Could not analyze image properly",
        message: {
          en: "Unable to detect disease. Please try with a clearer, well-lit image of the affected plant part (leaf, stem, or fruit). Ensure the image is in focus.",
          hi: "रोग का पता नहीं चला। कृपया प्रभावित पौधे के भाग (पत्ती, तना, या फल) की स्पष्ट, अच्छी रोशनी वाली तस्वीर के साथ पुनः प्रयास करें।",
          kn: "ರೋಗ ಪತ್ತೆಯಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪ್ರಭಾವಿತ ಸಸ್ಯದ ಭಾಗದ (ಎಲೆ, ಕಾಂಡ, ಅಥವಾ ಹಣ್ಣು) ಸ್ಪಷ್ಟ, ಉತ್ತಮ ಬೆಳಕಿನ ಚಿತ್ರದೊಂದಿಗೆ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        },
        tips: {
          en: ["Take photo in natural daylight", "Focus on the affected area", "Include both healthy and affected parts for comparison"],
          hi: ["प्राकृतिक दिन के उजाले में फोटो लें", "प्रभावित क्षेत्र पर ध्यान केंद्रित करें", "तुलना के लिए स्वस्थ और प्रभावित दोनों भागों को शामिल करें"],
          kn: ["ನೈಸರ್ಗಿಕ ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಿರಿ", "ಪ್ರಭಾವಿತ ಪ್ರದೇಶದ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ", "ಹೋಲಿಕೆಗಾಗಿ ಆರೋಗ್ಯಕರ ಮತ್ತು ಪ್ರಭಾವಿತ ಭಾಗಗಳನ್ನು ಸೇರಿಸಿ"]
        }
      };
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in vision-detect:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const isTimeout = errorMessage.includes("timeout") || errorMessage.includes("timed out");
    
    return new Response(
      JSON.stringify({ 
        error: isTimeout 
          ? "Request timed out. Please try with a smaller image."
          : "Detection failed. Please try again.",
        detected: false,
        message: {
          en: isTimeout 
            ? "The image is taking too long to process. Please try with a smaller or compressed image."
            : "An error occurred during detection. Please try again.",
          hi: isTimeout
            ? "छवि को संसाधित करने में बहुत समय लग रहा है। कृपया छोटी छवि के साथ प्रयास करें।"
            : "पहचान के दौरान त्रुटि हुई। कृपया पुनः प्रयास करें।",
          kn: isTimeout
            ? "ಚಿತ್ರವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ತುಂಬಾ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದೆ. ದಯವಿಟ್ಟು ಸಣ್ಣ ಚಿತ್ರದೊಂದಿಗೆ ಪ್ರಯತ್ನಿಸಿ."
            : "ಪತ್ತೆ ಸಮಯದಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        }
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
