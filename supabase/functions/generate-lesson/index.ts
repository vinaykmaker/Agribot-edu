import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 15; // requests per window
const RATE_WINDOW_MS = 60000; // 1 minute
const MAX_INPUT_LENGTH = 500; // max characters for text inputs

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const topic = body?.topic;
    const cropType = body?.cropType;
    const season = body?.season;
    const language = body?.language || "en";
    
    // Input validation - check string types and lengths
    if (topic && (typeof topic !== "string" || topic.length > MAX_INPUT_LENGTH)) {
      return new Response(
        JSON.stringify({ error: "Topic must be a string with max 500 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (cropType && (typeof cropType !== "string" || cropType.length > MAX_INPUT_LENGTH)) {
      return new Response(
        JSON.stringify({ error: "Crop type must be a string with max 500 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (season && (typeof season !== "string" || season.length > MAX_INPUT_LENGTH)) {
      return new Response(
        JSON.stringify({ error: "Season must be a string with max 500 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Generate personalized farming lesson
    const systemPrompt = `You are an expert agricultural educator creating bite-sized lessons for Indian farmers.
Create a short, practical farming lesson that farmers can learn in 5 minutes.

IMPORTANT: Respond in JSON format with these exact keys:

{
  "title": {
    "en": "English title",
    "hi": "Hindi title", 
    "kn": "Kannada title"
  },
  "duration": "5 mins",
  "difficulty": "beginner/intermediate/advanced",
  "icon": "emoji representing topic",
  "summary": {
    "en": "2-3 sentence summary",
    "hi": "Hindi summary",
    "kn": "Kannada summary"
  },
  "keyPoints": [
    {
      "en": "Point 1 in English",
      "hi": "Point 1 in Hindi",
      "kn": "Point 1 in Kannada"
    }
  ],
  "practicalTip": {
    "en": "One actionable tip",
    "hi": "Hindi tip",
    "kn": "Kannada tip"
  },
  "didYouKnow": {
    "en": "Interesting fact",
    "hi": "Hindi fact",
    "kn": "Kannada fact"
  },
  "quiz": {
    "question": {
      "en": "Simple question",
      "hi": "Hindi question",
      "kn": "Kannada question"
    },
    "options": ["A", "B", "C"],
    "answer": 0
  }
}

Rules:
1. Keep language very simple - 8th grade reading level
2. Focus on practical, actionable advice
3. Include local context (Indian farming practices)
4. Make it engaging with interesting facts
5. Keep each point under 2 sentences`;

    const userPrompt = topic 
      ? `Create a lesson about: ${topic}${cropType ? ` for ${cropType} farming` : ''}${season ? ` during ${season} season` : ''}`
      : `Create a general farming lesson${cropType ? ` about ${cropType}` : ''}${season ? ` for ${season} season` : ''}. Pick an interesting topic like pest management, soil health, water conservation, or organic farming.`;

    console.log("Generating lesson:", userPrompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let lesson;
    try {
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      lesson = JSON.parse(cleanedResponse);
      lesson.generatedAt = new Date().toISOString();
    } catch (parseError) {
      console.error("Failed to parse lesson:", parseError);
      throw new Error("Failed to generate lesson");
    }

    return new Response(
      JSON.stringify(lesson),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-lesson:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
