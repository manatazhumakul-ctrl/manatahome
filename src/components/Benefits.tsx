import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface BenefitsProps {
  language: Language;
}

export const Benefits: React.FC<BenefitsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const cards = [
    {
      icon: Sparkles,
      title: t.benefits.b1Title,
      desc: t.benefits.b1Desc,
    },
    {
      icon: Clock,
      title: t.benefits.b2Title,
      desc: t.benefits.b2Desc,
    },
    {
      icon: ShieldCheck,
      title: t.benefits.b3Title,
      desc: t.benefits.b3Desc,
    },
    {
      icon: HeartHandshake,
      title: t.benefits.b4Title,
      desc: t.benefits.b4Desc,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-2">
            {t.benefits.tagline}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623] mb-3 text-balance">
            {t.benefits.title}
          </h2>
          <p className="text-sm text-[#706B66]">
            {language === 'EN'
              ? 'Rooted in timeless aesthetics, honest materials, and practical joy.'
              : language === 'RU'
              ? 'Основано на вневременной эстетике, честных материалах и практичной радости.'
              : 'Убакыт өтсө да баасын жоготпогон кооздук жана табигый сапатка негизделген.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#EAE1D7] shadow-2xs hover:shadow-sm hover:border-[#C16A46]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#2B2623] mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#6B635D] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4EFEA] flex items-center justify-between text-[11px] text-[#A39990]">
                  <span>MANATAHOME Standard</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
