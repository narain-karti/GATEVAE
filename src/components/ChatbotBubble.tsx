import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { ai } from '../geminiClient';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_INSTRUCTION = `You are an omnipresent, futuristic shopping assistant for GATEVAE, a premium tech gadget e-commerce store. 
Your role is to help users navigate the site, answer questions about our premium gadgets, and provide a polite, concise, and helpful experience.
If a user is looking to buy something, guide them to '/shop' or '/checkout'.
If they ask about business operations or updating the catalog, tell them they can access the admin dashboard at '/admin'.
Keep your responses relatively short, friendly, and formatted in plain text or simple markdown.`;

export default function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hello! I'm the GATEVAE AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for Gemini
      const contents = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));
      
      // Append the new user message
      contents.push({ role: 'user', parts: [{ text: userMsg.content }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const modelText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: modelText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-black text-white shadow-xl hover:scale-105 transition-transform z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span className="font-bold tracking-widest text-sm">GATEVAE AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100 flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="p-2 bg-black text-white rounded-full disabled:opacity-50 hover:bg-gray-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
