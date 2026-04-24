import React, { useState } from 'react';
import { Send, Mic, Paperclip, Sparkles } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';

const suggestedPrompts = [
  "How do I treat early blight?",
  "Best irrigation schedule?",
  "Recommend fertilizer for tomatoes",
  "Pest control strategies",
];

const messages = [
  {
    type: 'assistant',
    content: "Hello! I'm your AI Agronomist. How can I help you with your farm today?",
    time: '10:30 AM'
  },
  {
    type: 'user',
    content: "What should I do about the early blight detected in Field A?",
    time: '10:32 AM'
  },
  {
    type: 'assistant',
    content: "Based on the diagnosis from Field A, here's my recommended action plan:\n\n1. Immediate treatment: Apply copper-based fungicide\n2. Remove affected leaves to prevent spread\n3. Improve air circulation by pruning\n4. Adjust watering to avoid leaf wetness\n5. Monitor daily for the next week\n\nWould you like specific product recommendations?",
    time: '10:32 AM'
  }
];

export default function AIConsultant() {
  const { language } = useApp();
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-full">
      <TopBar title={language === 'en' ? 'AI Agronomist' : 'المستشار الزراعي'} />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Context Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge variant="secondary" className="whitespace-nowrap">
            Field A Data
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap">
            Recent Diagnosis
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap">
            Weather
          </Badge>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : ''}`}>
                <Card className={`p-3 ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  {msg.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-accent p-1.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium">AI Agronomist</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.type === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {msg.time}
                  </p>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggested questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="text-left text-xs p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                onClick={() => setMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Ask your farming question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Mic className="w-5 h-5" />
          </Button>
          <Button size="icon" className="flex-shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <span className="text-accent">•</span> 1 credit per message
        </p>
      </div>
    </div>
  );
}
