import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, Globe, Search, User, ChevronDown, Check } from 'lucide-react';
import { Language, Currency, CustomerUser } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ShippingBanner } from './ShippingBanner';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  currentUser: CustomerUser | null;
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'EN', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'RU', label: 'Russian', nativeLabel: 'Русский', flag: '🇷🇺' },
  { code: 'KG', label: 'Kyrgyz', nativeLabel: 'Кыргызча', flag: '🇰🇬' },
  { code: 'IT', label: 'Italian', nativeLabel: 'Italiano', flag: '🇮🇹' },
  { code: 'DE', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  cartItemCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'home-living', label: t.nav.homeLiving },
    { id: 'beauty-selfcare', label: t.nav.beautySelfCare },
    { id: 'about', label: t.nav.aboutUs },
    { id: 'contact', label: t.nav.contactUs },
    { id: 'faq', label: t.nav.faq },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EDE6DF] transition-all">
      {/* Animated Horizontal Continuous Shipping Announcement Bar */}
      <ShippingBanner
        language={language}
        currency={currency}
        onOpenCart={onOpenCart}
      />

      {/* Main Header Bar adhering to 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Official Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C16A46] rounded-md transition-opacity hover:opacity-90 shrink-0 cursor-pointer"
          aria-label="MANATAHOME - Home"
        >
          <img
            src="/assets/aistudio/FullLogo_add69b71.png"
            alt="MANATAHOME Logo"
            className="h-11 sm:h-12 w-auto object-contain"
          />
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#5C5550]">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#C16A46] font-semibold'
                    : 'hover:text-[#2B2623]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C16A46] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search, Customer Account, Currency, Compact Language Dropdown, Shopping Bag */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Functional Product Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Products"
            title={language === 'EN' ? 'Search products' : language === 'RU' ? 'Поиск товаров' : language === 'KG' ? 'Товар издөө' : language === 'IT' ? 'Cerca prodotti' : 'Produkte suchen'}
            className="flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg border border-[#DECFC2] bg-white text-[#4A433E] hover:border-[#C16A46] hover:text-[#C16A46] transition-colors shadow-2xs cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Customer Account / Profile Button */}
          <button
            onClick={onOpenAccount}
            aria-label="Customer Account"
            title={currentUser ? `Account: ${currentUser.name}` : (language === 'EN' ? 'Sign In / Account' : language === 'RU' ? 'Вход / Кабинет' : language === 'KG' ? 'Кирүү / Кабинет' : language === 'IT' ? 'Accedi / Account' : 'Anmelden / Konto')}
            className={`relative flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg border transition-colors shadow-2xs cursor-pointer ${
              currentUser
                ? 'border-[#C16A46] bg-[#FAF0EB] text-[#A54F2E]'
                : 'border-[#DECFC2] bg-white text-[#4A433E] hover:border-[#C16A46] hover:text-[#C16A46]'
            }`}
          >
            <User className="w-4 h-4" />
            {currentUser && (
              <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 rounded-full bg-[#3B6B48]" />
            )}
          </button>

          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center text-xs font-medium border border-[#E4D9CF] rounded-md overflow-hidden bg-white">
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-2 py-1.5 transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#C16A46] text-white font-semibold'
                  : 'text-[#6B645E] hover:text-[#2B2623]'
              }`}
              title="US Dollar"
            >
              $ USD
            </button>
            <button
              onClick={() => onCurrencyChange('EUR')}
              className={`px-2 py-1.5 transition-colors cursor-pointer ${
                currency === 'EUR'
                  ? 'bg-[#C16A46] text-white font-semibold'
                  : 'text-[#6B645E] hover:text-[#2B2623]'
              }`}
              title="Euro"
            >
              € EUR
            </button>
          </div>

          {/* Compact 5-Language Dropdown Selector (EN | RU | KG | IT | DE) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setLangDropdownOpen(false);
              }}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`Current language: ${currentLang.nativeLabel}. Click to switch language.`}
              title={`Language: ${currentLang.nativeLabel}`}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-[#DECFC2] bg-white text-xs font-semibold text-[#4A433E] hover:border-[#C16A46] hover:text-[#C16A46] transition-all shadow-2xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C16A46]"
            >
              <span className="text-sm leading-none" aria-hidden="true">
                {currentLang.flag}
              </span>
              <span className="font-bold tracking-wide">{currentLang.code}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8C7F75] transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180 text-[#C16A46]' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Floating Dropdown Menu */}
            {langDropdownOpen && (
              <div
                role="listbox"
                aria-label="Language selection"
                className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-[#EDE2D7] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#9E938B] border-b border-[#F4EFEB]">
                  {language === 'EN'
                    ? 'Language'
                    : language === 'RU'
                    ? 'Язык'
                    : language === 'KG'
                    ? 'Тил тандоо'
                    : language === 'IT'
                    ? 'Lingua'
                    : 'Sprache'}
                </div>
                {LANGUAGES.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF0EB] text-[#A54F2E] font-bold'
                          : 'text-[#4A433E] hover:bg-[#FAF7F2] hover:text-[#2B2623]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none" aria-hidden="true">
                          {lang.flag}
                        </span>
                        <div>
                          <span className="block font-medium">{lang.nativeLabel}</span>
                          <span className="text-[10px] text-[#8F857D] font-normal">
                            {lang.code} · {lang.label}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#C16A46] shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label={`${t.nav.cartTooltip} (${cartItemCount} items)`}
            title={t.nav.cartTooltip}
            className="relative flex items-center justify-center w-9 sm:w-10 h-9 sm:h-10 rounded-lg border border-[#DECFC2] bg-white text-[#2B2623] hover:border-[#C16A46] hover:text-[#C16A46] transition-colors shadow-2xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C16A46] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A4440] hover:text-[#2B2623] focus:outline-hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8DDD1] px-5 sm:px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobile Fast Actions: Search & Account */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EAE0D5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#DDD2C6] rounded-lg text-xs font-semibold text-[#524A45]"
            >
              <Search className="w-3.5 h-3.5 text-[#C16A46]" />
              <span>
                {language === 'EN'
                  ? 'Search'
                  : language === 'RU'
                  ? 'Поиск'
                  : language === 'KG'
                  ? 'Издөө'
                  : language === 'IT'
                  ? 'Cerca'
                  : 'Suchen'}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#DDD2C6] rounded-lg text-xs font-semibold text-[#524A45]"
            >
              <User className="w-3.5 h-3.5 text-[#C16A46]" />
              <span>
                {currentUser
                  ? currentUser.name
                  : language === 'EN'
                  ? 'Account'
                  : language === 'RU'
                  ? 'Кабинет'
                  : language === 'KG'
                  ? 'Кабинет'
                  : language === 'IT'
                  ? 'Account'
                  : 'Konto'}
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base py-2 transition-colors cursor-pointer ${
                  currentTab === link.id
                    ? 'text-[#C16A46] font-semibold pl-2 border-l-2 border-[#C16A46]'
                    : 'text-[#554E49] hover:text-[#2B2623]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Selector list */}
          <div className="pt-3 border-t border-[#EAE0D5]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A817A] mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C16A46]" />
              <span>
                {language === 'EN'
                  ? 'Select Language'
                  : language === 'RU'
                  ? 'Выберите язык'
                  : language === 'KG'
                  ? 'Тил тандоо'
                  : language === 'IT'
                  ? 'Seleziona Lingua'
                  : 'Sprache wählen'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-[#C16A46] text-white border-[#C16A46]'
                        : 'bg-white text-[#524B45] border-[#DDD2C6] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Currency toggle */}
          <div className="pt-3 border-t border-[#EAE0D5] flex items-center justify-between text-xs text-[#706B66]">
            <span>
              {language === 'EN'
                ? 'Currency:'
                : language === 'RU'
                ? 'Валюта:'
                : language === 'KG'
                ? 'Валюта:'
                : language === 'IT'
                ? 'Valuta:'
                : 'Währung:'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-3 py-1 rounded border text-xs font-semibold cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#C16A46] text-white border-[#C16A46]'
                    : 'bg-white text-[#554E49] border-[#DED2C6]'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => onCurrencyChange('EUR')}
                className={`px-3 py-1 rounded border text-xs font-semibold cursor-pointer ${
                  currency === 'EUR'
                    ? 'bg-[#C16A46] text-white border-[#C16A46]'
                    : 'bg-white text-[#554E49] border-[#DED2C6]'
                }`}
              >
                € EUR
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
