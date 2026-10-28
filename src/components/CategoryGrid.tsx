import React from 'react';
import { ArrowRight, Sparkles, Home, Sparkle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductIllustration } from './ProductIllustration';

interface CategoryGridProps {
  language: Language;
  onSelectCategory: (category: 'home-living' | 'beauty-selfcare') => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ language, onSelectCategory }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-2">
            {t.categories.title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623] mb-3">
            {language === 'EN'
              ? 'Two Core Worlds, One Harmonious Living Concept'
              : language === 'RU'
              ? 'Два ключевых направления, одна концепция гармонии'
              : 'Эки негизги багыт, бирдиктүү жашоо концепциясы'}
          </h2>
          <p className="text-sm sm:text-base text-[#706B66]">
            {t.categories.subtitle}
          </p>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Collection 1: Home & Living */}
          <div className="group relative bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E9DFD5] hover:border-[#C16A46]/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#A54F2E]">
                  <Home className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t.categories.homeLivingTag}
                  </span>
                </div>
                <span className="text-xs text-[#8A817A] font-medium">
                  4 {t.categories.itemsCount}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#2B2623] mb-3">
                {language === 'EN'
                  ? 'Practical Home Essentials & Organization'
                  : language === 'RU'
                  ? 'Практичный порядок и уютные детали для дома'
                  : 'Үйдү иреттөө жана жайлуулук буюмдары'}
              </h3>
              <p className="text-sm text-[#66605B] leading-relaxed mb-6">
                {t.categories.homeLivingDesc}
              </p>

              {/* Sub-pills/highlights with unboxed text */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#7A7169] mb-6">
                <span>· {language === 'EN' ? 'Kitchen Essentials' : language === 'RU' ? 'Кухонный порядок' : 'Ашкана буюмдары'}</span>
                <span>· {language === 'EN' ? 'Pantry Glass Jars' : language === 'RU' ? 'Баночки для специй' : 'Айнек банкалар'}</span>
                <span>· {language === 'EN' ? 'Linen Storage Trays' : language === 'RU' ? 'Льняные лотки' : 'Зыгыр лотоктор'}</span>
                <span>· {language === 'EN' ? 'Aroma Diffusers' : language === 'RU' ? 'Аромадиффузоры' : 'Аромадиффузорлор'}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="aspect-16/10 rounded-xl overflow-hidden mb-6 border border-[#ECE0D6] bg-white">
                <ProductIllustration type="glass-jars" />
              </div>

              <button
                onClick={() => onSelectCategory('home-living')}
                className="w-full py-3 px-4 bg-white hover:bg-[#C16A46] text-[#2B2623] hover:text-white font-medium text-sm rounded-lg border border-[#D9CEC4] hover:border-[#C16A46] transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>{t.categories.viewCollection} — {t.categories.homeLivingTag}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Collection 2: Beauty & Self-Care */}
          <div className="group relative bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E9DFD5] hover:border-[#C16A46]/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#A54F2E]">
                  <Sparkle className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t.categories.beautyTag}
                  </span>
                </div>
                <span className="text-xs text-[#8A817A] font-medium">
                  4 {t.categories.itemsCount}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#2B2623] mb-3">
                {language === 'EN'
                  ? 'Gentle Beauty Tools & Daily Rituals'
                  : language === 'RU'
                  ? 'Деликатные инструменты красоты и ежедневный уход'
                  : 'Бетке кам көрүү жана жеке күтүм каражаттары'}
              </h3>
              <p className="text-sm text-[#66605B] leading-relaxed mb-6">
                {t.categories.beautyDesc}
              </p>

              {/* Sub-highlights */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#7A7169] mb-6">
                <span>· {language === 'EN' ? 'Rose Quartz Rollers' : language === 'RU' ? 'Кварцевые роллеры' : 'Кварц роллерлери'}</span>
                <span>· {language === 'EN' ? 'Microfiber Hair Wraps' : language === 'RU' ? 'Тюрбаны для волос' : 'Чач тюрбандары'}</span>
                <span>· {language === 'EN' ? 'Rotating Organizers' : language === 'RU' ? 'Органайзеры для столика' : 'Косметика текчелери'}</span>
                <span>· {language === 'EN' ? 'Pure Linen Aprons' : language === 'RU' ? 'Льняные фартуки' : 'Зыгыр фартуктар'}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="aspect-16/10 rounded-xl overflow-hidden mb-6 border border-[#ECE0D6] bg-white">
                <ProductIllustration type="roller" />
              </div>

              <button
                onClick={() => onSelectCategory('beauty-selfcare')}
                className="w-full py-3 px-4 bg-white hover:bg-[#C16A46] text-[#2B2623] hover:text-white font-medium text-sm rounded-lg border border-[#D9CEC4] hover:border-[#C16A46] transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>{t.categories.viewCollection} — {t.categories.beautyTag}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
