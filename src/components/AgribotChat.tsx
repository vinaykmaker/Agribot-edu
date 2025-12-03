import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  multilingualContent?: {
    en: string;
    hi: string;
    kn: string;
  };
}

interface AgribotChatProps {
  currentLanguage: string;
  translations: any;
}

const AgribotChat: React.FC<AgribotChatProps> = ({ currentLanguage, translations }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpeak = (multilingualContent: { en: string; hi: string; kn: string }) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = multilingualContent[currentLanguage as keyof typeof multilingualContent] || multilingualContent.en;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const langCodes: { [key: string]: string } = {
      en: 'en-US',
      hi: 'hi-IN',
      kn: 'kn-IN'
    };
    
    utterance.lang = langCodes[currentLanguage] || 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('agribot-chat', {
        body: { question: userMessage.content }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      // Check if it's a multilingual response
      if (data.en && data.hi && data.kn) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data[currentLanguage as keyof typeof data] || data.en,
          multilingualContent: {
            en: data.en,
            hi: data.hi,
            kn: data.kn
          }
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Fallback for any other response format
        const assistantMessage: Message = {
          role: 'assistant',
          content: typeof data === 'string' ? data : JSON.stringify(data)
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from Agribot. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-elegant">
      <CardHeader className="bg-gradient-primary text-white">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          {translations.chatbot?.title || 'Agribot AI Assistant'}
        </CardTitle>
        <p className="text-sm text-white/90">
          {translations.chatbot?.subtitle || 'Ask me about crop diseases, pests, and treatments'}
        </p>
      </CardHeader>
      <CardContent className="p-4">
        {/* Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>{translations.chatbot?.welcomeMessage || 'Welcome! Ask me any question about crop diseases or pests.'}</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              
              <div className={`flex flex-col max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {message.role === 'assistant' && message.multilingualContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak(message.multilingualContent!)}
                    className="mt-1"
                  >
                    <Volume2 className={`h-4 w-4 mr-1 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </Button>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="rounded-lg p-3 bg-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={translations.chatbot?.placeholder || 'Ask about crop diseases, pests, or treatments...'}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            variant="hero"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          {translations.chatbot?.disclaimer || 'AI assistant for farming guidance. Always consult with agricultural experts for serious issues.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default AgribotChat;
