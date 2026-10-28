import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { Language, PolicyType } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenPolicy: (policy: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenPolicy,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EAE0D6] text-xs text-[#6B635D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#E8DED3]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/FullLogo_add69b71.png"
                alt="MANATAHOME"
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#736A63] leading-relaxed max-w-sm">
              {t.footer.aboutBrand}
            </p>
            <div className="text-xs font-semibold text-[#8C3E1F] pt-1">
              {t.brand.slogan}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2623]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home-living')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.homeLiving}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('beauty-selfcare')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.beautySelfCare}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.aboutUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2623]">
              {t.footer.customerCare}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.contactUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {language === 'EN' ? 'Shipping Guidelines' : language === 'RU' ? 'Правила доставки' : 'Жеткирүү эрежелери'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {language === 'EN' ? 'Returns & Exchanges' : language === 'RU' ? 'Возврат и обмен' : 'Кайтаруу шарттары'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2623]">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {language === 'EN' ? 'Privacy Policy' : language === 'RU' ? 'Конфиденциальность' : 'Купуялык саясаты'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {language === 'EN' ? 'Terms & Conditions' : language === 'RU' ? 'Условия использования' : 'Колдонуу шарттары'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('cookies')}
                  className="hover:text-[#C16A46] transition-colors"
                >
                  {language === 'EN' ? 'Cookie Preferences' : language === 'RU' ? 'Настройки Cookies' : 'Cookie жөндөөлөрү'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C837B]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#C16A46]" />
            <span>{t.footer.internationalNote}</span>
          </div>

          <div>
            © {new Date().getFullYear()} {t.brand.name}. {t.footer.allRights}
          </div>
        </div>
      </div>
    </footer>
  );
};
