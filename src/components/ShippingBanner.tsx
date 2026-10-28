import React from 'react';
import { Truck, Sparkles } from 'lucide-react';
import { Language, Currency } from '../types';
import { SHIPPING_CONFIG } from '../config/shipping';

interface ShippingBannerProps {
  language: Language;
  currency: Currency;
  onOpenCart?: () => void;
}

export const ShippingBanner: React.FC<ShippingBannerProps> = ({
  language,
  currency,
  onOpenCart,
}) => {
  const standardThreshold =
    currency === 'USD'
      ? `$${SHIPPING_CONFIG.standardFreeThresholdUSD}`
      : `€${SHIPPING_CONFIG.standardFreeThresholdEUR}`;
  const expressThreshold =
    currency === 'USD'
      ? `$${SHIPPING_CONFIG.expressFreeThresholdUSD}`
      : `€${SHIPPING_CONFIG.expressFreeThresholdEUR}`;

  const getTickerMessages = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return [
          { text: `БЕСПЛАТНАЯ СТАНДАРТНАЯ ДОСТАВКА ОТ ${standardThreshold}`, icon: 'truck', highlight: true },
          { text: `БЕСПЛАТНАЯ ЭКСПРЕСС-ДОСТАВКА ОТ ${expressThreshold}`, icon: 'sparkles', highlight: true },
          { text: 'ДОБРО ПОЖАЛОВАТЬ В MANATAHOME', icon: 'dot', highlight: false },
          { text: 'ОТКРОЙТЕ ТОВАРЫ ДЛЯ ВАШЕГО ДОМА И УЮТА', icon: 'dot', highlight: false },
        ];
      case 'KG':
        return [
          { text: `АКЫСЫЗ СТАНДАРТТЫК ЖЕТКИРҮҮ ${standardThreshold} ЖОГОРУ`, icon: 'truck', highlight: true },
          { text: `АКЫСЫЗ ЭКСПРЕСС ЖЕТКИРҮҮ ${expressThreshold} ЖОГОРУ`, icon: 'sparkles', highlight: true },
          { text: 'MANATAHOME БРЕНДИНЕ КОШ КЕЛИҢИЗДЕР', icon: 'dot', highlight: false },
          { text: 'КҮНҮМДҮК ЫҢГАЙЛУУ ЖАШОО БУЮМДАРЫ', icon: 'dot', highlight: false },
        ];
      case 'IT':
        return [
          { text: `SPEDIZIONE STANDARD GRATUITA SU ORDINI SUPERIORI A ${standardThreshold}`, icon: 'truck', highlight: true },
          { text: `SPEDIZIONE EXPRESS GRATUITA SU ORDINI SUPERIORI A ${expressThreshold}`, icon: 'sparkles', highlight: true },
          { text: 'BENVENUTI SU MANATAHOME', icon: 'dot', highlight: false },
          { text: 'SCOPRI I TUOI ESSENZIALI PER OGNI GIORNO', icon: 'dot', highlight: false },
        ];
      case 'DE':
        return [
          { text: `KOSTENLOSER STANDARDVERSAND AB ${standardThreshold}`, icon: 'truck', highlight: true },
          { text: `KOSTENLOSER EXPRESSVERSAND AB ${expressThreshold}`, icon: 'sparkles', highlight: true },
          { text: 'WILLKOMMEN BEI MANATAHOME', icon: 'dot', highlight: false },
          { text: 'ENTDECKE DEINE TÄGLICHEN ESSENTIALS', icon: 'dot', highlight: false },
        ];
      default:
        return [
          { text: `FREE STANDARD SHIPPING ON ORDERS OVER ${standardThreshold}`, icon: 'truck', highlight: true },
          { text: `FREE EXPRESS SHIPPING ON ORDERS OVER ${expressThreshold}`, icon: 'sparkles', highlight: true },
          { text: 'WELCOME TO MANATAHOME', icon: 'dot', highlight: false },
          { text: 'DISCOVER YOUR EVERYDAY ESSENTIALS', icon: 'dot', highlight: false },
        ];
    }
  };

  const messages = getTickerMessages(language);

  const renderMessageSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {messages.map((item, idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          className="flex items-center gap-2 mx-4 sm:mx-8 whitespace-nowrap cursor-pointer hover:opacity-85 transition-opacity"
          onClick={onOpenCart}
          title={item.text}
        >
          {item.icon === 'truck' && (
            <Truck className="w-3.5 h-3.5 text-[#C16A46] shrink-0" aria-hidden="true" />
          )}
          {item.icon === 'sparkles' && (
            <Sparkles className="w-3.5 h-3.5 text-[#C16A46] shrink-0" aria-hidden="true" />
          )}
          <span
            className={`text-[11px] sm:text-xs tracking-wider uppercase ${
              item.highlight
                ? 'font-bold text-[#783216]'
                : 'font-medium text-[#8C3E1F]'
            }`}
          >
            {item.text}
          </span>
          <span className="ml-4 sm:ml-8 text-[#C68D77] select-none text-xs font-serif" aria-hidden="true">
            ·
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="bg-[#FAF0EB] text-[#8C3E1F] py-2 border-b border-[#F2DCD0] font-medium tracking-wide overflow-hidden select-none relative w-full pause-on-hover"
      role="region"
      aria-label="Shipping Announcements"
    >
      {/* Subtle edge fades to make marquee seamless */}
      <div className="absolute inset-y-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-[#FAF0EB] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-6 sm:w-12 bg-gradient-to-l from-[#FAF0EB] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track with 4 sets of messages for infinite seamless looping */}
      <div className="animate-marquee-track flex items-center">
        {renderMessageSet('banner-1')}
        {renderMessageSet('banner-2')}
        {renderMessageSet('banner-3')}
        {renderMessageSet('banner-4')}
      </div>
    </div>
  );
};
