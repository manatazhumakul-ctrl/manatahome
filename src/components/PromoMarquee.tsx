import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';

interface PromoMarqueeProps {
  language: Language;
}

export const PromoMarquee: React.FC<PromoMarqueeProps> = ({ language }) => {
  const getPhrases = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return [
          { text: 'СКИДКИ И ПРЕДЛОЖЕНИЯ', highlight: true },
          { text: 'MANATAHOME', highlight: false },
          { text: 'ДОМ И УЮТ', highlight: false },
          { text: 'КРАСОТА И УХОД', highlight: false },
          { text: 'СПЕЦИАЛЬНЫЕ УСЛОВИЯ', highlight: true },
          { text: 'ТОВАРЫ НА КАЖДЫЙ ДЕНЬ', highlight: false },
        ];
      case 'KG':
        return [
          { text: 'АРЗАНДАТУУЛАР', highlight: true },
          { text: 'MANATAHOME', highlight: false },
          { text: 'ҮЙ ЖАНА ЖАШОО', highlight: false },
          { text: 'СУЛУУЛУК ЖАНА КҮТҮМ', highlight: false },
          { text: 'ӨЗГӨЧӨ СУНУШТАР', highlight: true },
          { text: 'КҮНҮМДҮК ЫҢГАЙЛУУЛУК', highlight: false },
        ];
      case 'IT':
        return [
          { text: 'OFFERTE ESCLUSIVE', highlight: true },
          { text: 'MANATAHOME', highlight: false },
          { text: 'CASA & COMFORT', highlight: false },
          { text: 'BELLEZZA & CURA DI SÉ', highlight: false },
          { text: 'PROMOZIONI SPECIALI', highlight: true },
          { text: 'ESSENZIALI QUOTIDIANI', highlight: false },
        ];
      case 'DE':
        return [
          { text: 'SPECIAL SALE', highlight: true },
          { text: 'MANATAHOME', highlight: false },
          { text: 'WOHNEN & LEBEN', highlight: false },
          { text: 'SCHÖNHEIT & PFLEGE', highlight: false },
          { text: 'BESONDERE ANGEBOTE', highlight: true },
          { text: 'ALLTAGS-ESSENTIALS', highlight: false },
        ];
      default:
        return [
          { text: 'SALE', highlight: true },
          { text: 'MANATAHOME', highlight: false },
          { text: 'HOME & LIVING', highlight: false },
          { text: 'BEAUTY & SELF-CARE', highlight: false },
          { text: 'SPECIAL OFFERS', highlight: true },
          { text: 'EVERYDAY ESSENTIALS', highlight: false },
        ];
    }
  };

  const phrases = getPhrases(language);

  // Render a block of phrases with subtle terracotta diamond separators
  const renderPhraseGroup = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {phrases.map((item, index) => (
        <React.Fragment key={`${keyPrefix}-${index}`}>
          <span
            className={`text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase whitespace-nowrap transition-colors ${
              item.highlight
                ? 'text-[#C16A46] font-bold'
                : 'text-[#4A433D]'
            }`}
          >
            {item.text}
          </span>
          <span className="mx-4 sm:mx-6 text-[#C16A46]/70 text-xs select-none" aria-hidden="true">
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="w-full bg-[#FAF3EC] border-y border-[#EDE1D4] py-3 overflow-hidden select-none relative pause-on-hover shadow-2xs"
      aria-label="Promotional announcements"
    >
      {/* Subtle edge fade overlays for luxury editorial look */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF3EC] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF3EC] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track with duplicated content for seamless 100% loop */}
      <div className="animate-marquee-track-editorial flex items-center">
        {renderPhraseGroup('track-1')}
        {renderPhraseGroup('track-2')}
        {renderPhraseGroup('track-3')}
        {renderPhraseGroup('track-4')}
      </div>
    </div>
  );
};
