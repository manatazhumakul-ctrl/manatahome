import React from 'react';
import { Sparkles, Home, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface BrandStoryProps {
  language: Language;
  onExploreProducts: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ language, onExploreProducts }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-[#EDE6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative bg-[#FAF7F2] rounded-2xl p-8 sm:p-10 border border-[#E9DFD4] shadow-sm text-center">
              {/* Official Brand Logo */}
              <div className="w-48 sm:w-56 mx-auto mb-8 bg-white p-6 rounded-2xl shadow-xs border border-[#EDE2D7]">
                <img
                  src="/assets/aistudio/FullLogo_add69b71.png"
                  alt="MANATAHOME Official Brand Logo"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              {/* Quote Block */}
              <blockquote className="space-y-3">
                <p className="font-serif italic text-lg sm:text-xl text-[#2B2623] leading-snug">
                  {t.about.quote}
                </p>
                <footer className="text-xs uppercase tracking-wider text-[#A54F2E] font-semibold">
                  {t.about.quoteAuthor}
                </footer>
              </blockquote>

              {/* Key Trust Stats without fake scorecard pills */}
              <div className="mt-8 pt-8 border-t border-[#EAE0D5] grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-[#2B2623] tabular-nums">{t.about.stat1Number}</div>
                  <div className="text-[10px] text-[#78716A] leading-tight mt-1">{t.about.stat1Label}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#2B2623] tabular-nums">{t.about.stat2Number}</div>
                  <div className="text-[10px] text-[#78716A] leading-tight mt-1">{t.about.stat2Label}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#2B2623] tabular-nums">{t.about.stat3Number}</div>
                  <div className="text-[10px] text-[#78716A] leading-tight mt-1">{t.about.stat3Label}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Prose */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-3">
              {t.about.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2B2623] mb-6 leading-tight text-balance">
              {t.about.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#615A54] leading-relaxed mb-8">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            {/* Core Commitments Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#EFE5DB] mb-8">
              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-[#C16A46] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2B2623]">
                    {language === 'EN' ? 'Comfort & Calm Spaces' : language === 'RU' ? 'Пространство спокойствия' : 'Тынчтык жана бейпилдик'}
                  </h4>
                  <p className="text-xs text-[#7A736C]">
                    {language === 'EN' ? 'Elevating daily routines through clutter-free living.' : language === 'RU' ? 'Освобождение от визуального шума и хаоса.' : 'Ашыкча чаржайыттыктан арылып, үйдү тыкан кармоо.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#C16A46] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2B2623]">
                    {language === 'EN' ? 'Dedicated to Self-Care' : language === 'RU' ? 'Забота о себе каждый день' : 'Күндөлүк жеке күтүм'}
                  </h4>
                  <p className="text-xs text-[#7A736C]">
                    {language === 'EN' ? 'Mindful beauty accessories for restorative rituals.' : language === 'RU' ? 'Мягкие бьюти-инструменты для отдыха.' : 'Көңүлгө тынчтык тартуулоочу сулуулук буюмдары.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onExploreProducts}
              className="px-6 py-3 bg-[#2B2623] hover:bg-[#433B36] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {t.brand.exploreBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
