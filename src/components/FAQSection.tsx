import React, { useState } from 'react';
import { ChevronDown, AlertCircle, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { FAQ_ITEMS } from '../data/faq';

interface FAQSectionProps {
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-01']);
  const t = TRANSLATIONS[language];

  const toggleItem = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-[#EDE6DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-2">
            {t.faq.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623] mb-3 text-balance">
            {t.faq.title}
          </h2>
          <p className="text-sm text-[#706B66]">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Disclaimer on business confirmations */}
        <div className="mb-8 p-3.5 bg-[#FAF1EC] rounded-lg border border-[#F2D7CA] text-xs text-[#8C3E1F] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#A54F2E] shrink-0 mt-0.5" />
          <span>{t.faq.businessNote}</span>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#FAF8F5] rounded-xl border border-[#E9DFD5] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F4ECE3] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#2B2623]">
                    {item.question[language]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C837C] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C16A46]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#665F59] leading-relaxed border-t border-[#EDE2D7] bg-white">
                    <p className="mb-2">{item.answer[language]}</p>
                    {item.ownerConfirmationRequired && (
                      <span className="inline-block text-[11px] font-medium text-[#A54F2E] bg-[#FAF0EB] px-2.5 py-1 rounded-sm border border-[#F2D8CD]">
                        {language === 'EN'
                          ? 'Notice: Subject to final business owner terms upon live launch'
                          : language === 'RU'
                          ? 'Уведомление: Условия подлежат финализации владельцем бренда'
                          : 'Эскертүү: Шарттар бренд жетекчилиги тарабынан расмий бекитилет'}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
