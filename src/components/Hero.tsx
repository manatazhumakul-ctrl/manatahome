import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductIllustration } from './ProductIllustration';

interface HeroProps {
  language: Language;
  onExplore: () => void;
  onDiscoverStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExplore, onDiscoverStory }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#EDE6DF] bg-gradient-to-b from-[#FAF8F5] via-[#FCFBF8] to-[#F5ECE5]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Quiet Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A54F2E] mb-4">
              <span>{t.brand.slogan}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#877E77] font-medium tracking-normal normal-case">
                US & EU Curated Living
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2B2623] tracking-tight leading-[1.18] mb-6 text-balance">
              {t.brand.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#615A54] leading-relaxed max-w-xl mb-8">
              {t.brand.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 bg-[#C16A46] text-white font-medium text-sm rounded-lg hover:bg-[#A54F2E] transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C16A46]"
              >
                <span>{t.brand.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onDiscoverStory}
                className="px-6 py-3.5 bg-white text-[#4A433E] font-medium text-sm rounded-lg border border-[#D9CFC5] hover:border-[#C16A46] hover:text-[#C16A46] transition-all shadow-2xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C16A46]"
              >
                <span>{t.brand.storyBtn}</span>
              </button>
            </div>

            {/* Trust Markers without pills */}
            <div className="pt-6 border-t border-[#EAE1D7] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#6B645E]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C16A46] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#2B2623]">
                    {language === 'EN' ? 'Thoughtful Materials' : language === 'RU' ? 'Натуральные материалы' : 'Табигый материалдар'}
                  </div>
                  <div className="text-[11px] text-[#7A726C]">
                    {language === 'EN' ? 'Ceramic, quartz, glass & linen' : language === 'RU' ? 'Керамика, кварц, стекло и лен' : 'Керамика, кварц, айнек, зыгыр'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C16A46] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#2B2623]">
                    {language === 'EN' ? 'Everyday Comfort' : language === 'RU' ? 'Комфорт каждый день' : 'Күнүмдүк ыңгайлуулук'}
                  </div>
                  <div className="text-[11px] text-[#7A726C]">
                    {language === 'EN' ? 'Tailored for women & families' : language === 'RU' ? 'Для женщин, мам и уюта' : 'Айымдар жана энелер үчүн'}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C16A46] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#2B2623]">
                    {language === 'EN' ? 'US & Europe Focused' : language === 'RU' ? 'США и страны Европы' : 'АКШ жана Европага багытталган'}
                  </div>
                  <div className="text-[11px] text-[#7A726C]">
                    {language === 'EN' ? 'Global lifestyle standards' : language === 'RU' ? 'Международный стандарт' : 'Эл аралык стандарттар'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Feature Showcase Card */}
              <div className="bg-white rounded-2xl p-4 shadow-[0_16px_40px_rgba(112,107,102,0.12)] border border-[#EBE2D8]">
                <div className="aspect-4/3 w-full rounded-xl overflow-hidden relative">
                  <ProductIllustration type="diffuser" />
                </div>
                <div className="mt-4 px-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A462B] font-medium">
                      {language === 'EN' ? 'Home & Living Signature' : language === 'RU' ? 'Флагман раздела Дом' : 'Үй бөлүмүнүн флагманы'}
                    </span>
                    <h3 className="text-base font-semibold text-[#2B2623]">
                      {language === 'EN' ? 'Ceramic Ultrasonic Diffuser' : language === 'RU' ? 'Керамический аромадиффузор' : 'Керамикалык аромадиффузор'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7A726C] block">
                      {language === 'EN' ? 'Terracotta Edition' : language === 'RU' ? 'Терракотовая серия' : 'Терракота топтому'}
                    </span>
                    <span className="text-sm font-semibold text-[#A54F2E] tabular-nums">
                      $46.00 / €42.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Overlapping Complementary Card: Beauty & Self-Care Showcase */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-48 sm:w-56 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-[0_12px_32px_rgba(193,106,70,0.15)] border border-[#F0E4D9]">
                <div className="h-28 rounded-lg overflow-hidden relative mb-2">
                  <ProductIllustration type="roller" />
                </div>
                <div className="text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#A54F2E] font-medium">
                    {language === 'EN' ? 'Self-Care Ritual' : language === 'RU' ? 'Бьюти-ритуал' : 'Сулуулук күтүмү'}
                  </span>
                  <div className="font-medium text-[#2B2623] truncate">
                    {language === 'EN' ? 'Natural Rose Quartz Roller' : language === 'RU' ? 'Роллер из розового кварца' : 'Роза кварцы роллери'}
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -top-3 -right-3 bg-[#FAF0EB] text-[#8C3E1F] text-xs font-semibold px-3 py-1 rounded-full border border-[#F2DFD4] shadow-xs">
                {t.brand.slogan}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
