import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface NewsletterProps {
  language: Language;
}

export const Newsletter: React.FC<NewsletterProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-[#FAF0EB] border-b border-[#F0DDD1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-10 h-10 rounded-full bg-white text-[#C16A46] flex items-center justify-center mx-auto mb-4 shadow-2xs border border-[#F2D7CA]">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="text-xl sm:text-2xl font-serif text-[#2B2623] mb-2 text-balance">
          {t.newsletter.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#736A63] max-w-lg mx-auto mb-6">
          {t.newsletter.subtitle}
        </p>

        {isSubscribed ? (
          <div className="p-4 bg-white/90 rounded-xl border border-[#E8D4C8] text-[#3B6B48] text-xs font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{t.newsletter.subscribedMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="grow px-4 py-3 text-xs bg-white border border-[#DECFC3] rounded-lg text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              {t.newsletter.subscribeBtn}
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#8C837C] mt-3">
          {t.newsletter.privacyNote}
        </p>
      </div>
    </section>
  );
};
