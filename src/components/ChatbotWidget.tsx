import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, User } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ChatbotWidgetProps {
  language: Language;
  onNavigateToContact: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  language,
  onNavigateToContact,
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const initialBotMessage: ChatMessage = {
    id: 'msg-init',
    sender: 'bot',
    text: t.bot.welcome,
    time: 'Just now',
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const [inputVal, setInputVal] = useState('');

  // Quick prompt buttons
  const quickOptions = [
    { label: t.bot.quick1, action: 'home' },
    { label: t.bot.quick2, action: 'beauty' },
    { label: t.bot.quick3, action: 'shipping' },
    { label: t.bot.quick4, action: 'returns' },
    { label: t.bot.quick5, action: 'support' },
  ];

  const handleSendPrompt = (action: string, userText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let botReplyText = '';
    let followUpAction: { label: string; action: string }[] | undefined = undefined;

    switch (action) {
      case 'home':
        botReplyText = t.bot.replyHome;
        followUpAction = [{ label: t.categories.viewCollection, action: 'nav-home-living' }];
        break;
      case 'beauty':
        botReplyText = t.bot.replyBeauty;
        followUpAction = [{ label: t.categories.viewCollection, action: 'nav-beauty-selfcare' }];
        break;
      case 'shipping':
        botReplyText = t.bot.replyShipping;
        break;
      case 'returns':
        botReplyText = t.bot.replyReturns;
        break;
      case 'support':
        botReplyText = t.bot.replySupport;
        followUpAction = [{ label: t.bot.takeToContact, action: 'nav-contact' }];
        break;
      default:
        botReplyText =
          language === 'EN'
            ? 'Thank you for your question! I can help guide you through our Home & Living and Beauty collections, or connect you with our human team on the Contact page.'
            : language === 'RU'
            ? 'Спасибо за ваш вопрос! Я могу помочь вам с разделами товаров или направить в службу поддержки.'
            : 'Сурооңуз үчүн рахмат! Биздин буюмдарды тандоого же байланыш бөлүмүнө өтүүгө жардам бере алам.';
        followUpAction = [{ label: t.bot.takeToContact, action: 'nav-contact' }];
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: botReplyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: followUpAction,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const lower = inputVal.toLowerCase();
    let matchedAction = 'default';

    if (lower.includes('home') || lower.includes('kitchen') || lower.includes('дом') || lower.includes('үй')) {
      matchedAction = 'home';
    } else if (lower.includes('beauty') || lower.includes('skin') || lower.includes('красота') || lower.includes('сулуулук')) {
      matchedAction = 'beauty';
    } else if (lower.includes('ship') || lower.includes('deliver') || lower.includes('достав') || lower.includes('жеткир')) {
      matchedAction = 'shipping';
    } else if (lower.includes('return') || lower.includes('refund') || lower.includes('возврат') || lower.includes('кайтар')) {
      matchedAction = 'returns';
    } else if (lower.includes('contact') || lower.includes('human') || lower.includes('support') || lower.includes('байланыш')) {
      matchedAction = 'support';
    }

    handleSendPrompt(matchedAction, inputVal);
    setInputVal('');
  };

  const handleOptionClick = (optAction: string) => {
    if (optAction === 'nav-contact') {
      setIsOpen(false);
      onNavigateToContact();
    } else if (optAction === 'nav-home-living') {
      setIsOpen(false);
      onNavigateToSection('home-living');
    } else if (optAction === 'nav-beauty-selfcare') {
      setIsOpen(false);
      onNavigateToSection('beauty-selfcare');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3.5 bg-[#C16A46] hover:bg-[#A54F2E] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C16A46]"
          aria-label="Open MANATAHOME Customer Concierge"
        >
          <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-xs font-semibold pr-1">
            {language === 'EN' ? 'Ask Concierge' : language === 'RU' ? 'Онлайн-помощник' : 'Жардамчы'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-[#EDE2D7] flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-[#FAF7F2] border-b border-[#EAE0D6] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center font-bold text-xs border border-[#F2D7CA]">
                MH
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#2B2623]">
                  {t.bot.title}
                </h3>
                <span className="text-[10px] text-[#4E7D59] font-medium block">
                  {t.bot.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#736B65] hover:text-[#2B2623] hover:bg-white rounded-md transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 overflow-y-auto grow space-y-3 bg-[#FAF8F5]/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C16A46] text-white rounded-br-none shadow-2xs'
                      : 'bg-white text-[#2B2623] border border-[#EBE1D8] rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Follow up action button if provided */}
                {msg.options && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt.action)}
                        className="px-3 py-1.5 bg-[#FAF0EB] hover:bg-[#F2DCD0] text-[#A54F2E] font-semibold text-[11px] rounded-md border border-[#F2D8CD] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-[#A69E96] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Prompt Selection Bar */}
          <div className="p-2.5 bg-white border-t border-[#EAE0D6] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(opt.action, opt.label)}
                className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#FAF0EB] text-[#635B55] hover:text-[#A54F2E] border border-[#E8DFD5] hover:border-[#F2D7CA] text-[10px] rounded-full transition-colors shrink-0 cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Text Input Form */}
          <div className="p-3 bg-white border-t border-[#EDE4DB]">
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t.bot.inputPlaceholder}
                className="grow px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
              />
              <button
                type="submit"
                className="p-2 bg-[#C16A46] hover:bg-[#A54F2E] text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[9px] text-[#A69E96] text-center mt-2 italic">
              {t.bot.disclaimer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
