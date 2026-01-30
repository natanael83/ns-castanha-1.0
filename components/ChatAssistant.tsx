
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { sendMessageToAI } from '../services/geminiService';
import { Message } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: 'Olá! Sou o Consultor da NS Castanhas. Como posso ajudar você hoje a escolher a melhor nutrição para seu dia?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const aiResponse = await sendMessageToAI(input, history);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: aiResponse || 'Desculpe, tive um problema ao pensar.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center h-16 w-16 bg-brand-green text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <div className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            IA Online
          </div>
          <MessageSquare className="h-8 w-8" />
        </button>
      )}

      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-brand-green/10 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-brand-green p-6 text-white flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-xl mr-3">
                <Bot className="h-6 w-6 text-brand-lime" />
              </div>
              <div>
                <h3 className="font-bold leading-none mb-1">Olá sou Bot</h3>
                <p className="text-[10px] opacity-70 font-medium">Especialista em Nutrição</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll bg-gray-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                  <div className={`p-1.5 rounded-lg shrink-0 ${m.role === 'user' ? 'bg-brand-orange/10' : 'bg-brand-green/10'}`}>
                    {m.role === 'user' ? <User className="h-4 w-4 text-brand-orange" /> : <Bot className="h-4 w-4 text-brand-green" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-orange text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-brand-green/5 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-green" />
                  <span className="text-xs text-brand-green font-bold">Consultando base nutricional...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder="Ex: Qual castanha tem mais ômega 3?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-green transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2 bg-brand-green text-white rounded-lg hover:bg-brand-orange transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-medium flex items-center justify-center">
              <Sparkles className="h-3 w-3 mr-1 text-brand-lime" />
              Dica: Pergunte sobre benefícios para pré-treino ou dietas específicas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
