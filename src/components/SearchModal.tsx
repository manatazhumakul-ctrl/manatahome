import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, Language, Currency } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductIllustration } from './ProductIllustration';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Actual product search using real SAMPLE_PRODUCTS data across all 5 languages
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    return SAMPLE_PRODUCTS.filter((product) => {
      // Check names across all available languages
      const nameMatch = Object.values(product.name).some((val) =>
        typeof val === 'string' && val.toLowerCase().includes(query)
      );

      // Check categories & subcategories across all languages
      const catMatch =
        product.category.toLowerCase().includes(query) ||
        Object.values(product.categoryLabel).some((val) =>
          typeof val === 'string' && val.toLowerCase().includes(query)
        ) ||
        Object.values(product.subcategory).some((val) =>
          typeof val === 'string' && val.toLowerCase().includes(query)
        );

      // Check short and full descriptions
      const descMatch =
        (product.shortDesc[language] && product.shortDesc[language].toLowerCase().includes(query)) ||
        (product.fullDesc[language] && product.fullDesc[language].toLowerCase().includes(query)) ||
        (product.shortDesc.EN && product.shortDesc.EN.toLowerCase().includes(query));

      // Check features
      const currentFeatures = product.features[language] || product.features.EN || [];
      const featureMatch = currentFeatures.some((feat) =>
        feat.toLowerCase().includes(query)
      );

      // Check brand name
      const brandMatch = 'manatahome'.includes(query);

      return nameMatch || catMatch || descMatch || featureMatch || brandMatch;
    });
  }, [searchTerm, language]);

  if (!isOpen) return null;

  const getPopularKeywords = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return [
          { label: 'Диффузор', query: 'диффузор' },
          { label: 'Баночки', query: 'баночки' },
          { label: 'Кварцевый роллер', query: 'роллер' },
          { label: 'Органайзер', query: 'органайзер' },
          { label: 'Тюрбан', query: 'тюрбан' },
          { label: 'Фартук', query: 'фартук' },
        ];
      case 'KG':
        return [
          { label: 'Диффузор', query: 'диффузор' },
          { label: 'Банкалар', query: 'банка' },
          { label: 'Роллер', query: 'роллер' },
          { label: 'Органайзер', query: 'органайзер' },
          { label: 'Тюрбан', query: 'тюрбан' },
          { label: 'Фартук', query: 'фартук' },
        ];
      case 'IT':
        return [
          { label: 'Diffusore', query: 'diffusore' },
          { label: 'Barattoli', query: 'barattoli' },
          { label: 'Rullo di Quarzo', query: 'quarzo' },
          { label: 'Organizer', query: 'organizer' },
          { label: 'Turbante', query: 'turbante' },
          { label: 'Grembiule in Lino', query: 'lino' },
        ];
      case 'DE':
        return [
          { label: 'Diffusor', query: 'diffusor' },
          { label: 'Gewürzgläser', query: 'gläser' },
          { label: 'Rosenquarz', query: 'rosenquarz' },
          { label: 'Organizer', query: 'organizer' },
          { label: 'Haarturban', query: 'turban' },
          { label: 'Leinenschürze', query: 'schürze' },
        ];
      default:
        return [
          { label: 'Diffuser', query: 'diffuser' },
          { label: 'Glass Jars', query: 'jars' },
          { label: 'Rose Quartz Roller', query: 'roller' },
          { label: 'Kitchen Caddy', query: 'caddy' },
          { label: 'Hair Wrap', query: 'turban' },
          { label: 'Linen Apron', query: 'apron' },
        ];
    }
  };

  const popularKeywords = getPopularKeywords(language);

  const getUiText = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return {
          placeholder: 'Поиск по названию, категории или ключевым словам...',
          popular: 'Популярное:',
          initialPrompt: 'Введите запрос для поиска товаров для дома, кухни и заботы о себе.',
          foundCount: 'найдено товаров',
          noFoundTitle: `Ничего не найдено по запросу «${searchTerm}»`,
          noFoundSub: 'Попробуйте изменить запрос, например: «диффузор», «баночки», «роллер», «кухня» или «лен».',
          clearBtn: 'Сбросить поиск',
          viewBtn: 'Открыть',
        };
      case 'KG':
        return {
          placeholder: 'Аты, бөлүмү же ачкыч сөздөрү боюнча издөө...',
          popular: 'Көп изделген:',
          initialPrompt: 'Үй жана сулуулук буюмдарын издөө үчүн сөз жазыңыз.',
          foundCount: 'товар табылды',
          noFoundTitle: `«${searchTerm}» боюнча эч нерсе табылган жок`,
          noFoundSub: 'Башка сөздөрдү колдонуп көрүңүз, мисалы: «диффузор», «банка», «роллер» же «ашкана».',
          clearBtn: 'Тазалоо',
          viewBtn: 'Көрүү',
        };
      case 'IT':
        return {
          placeholder: 'Cerca per nome prodotto, categoria o parola chiave...',
          popular: 'Popolari:',
          initialPrompt: 'Digita per esplorare le collezioni Casa & Comfort e Bellezza & Cura di Sé.',
          foundCount: 'prodotti trovati',
          noFoundTitle: `Nessun prodotto trovato per "${searchTerm}"`,
          noFoundSub: 'Prova con termini più generici come "diffusore", "barattoli", "quarzo", "organizer" o "lino".',
          clearBtn: 'Cancella ricerca',
          viewBtn: 'Visualizza',
        };
      case 'DE':
        return {
          placeholder: 'Suche nach Produktname, Kollektion oder Stichwort...',
          popular: 'Beliebt:',
          initialPrompt: 'Gib einen Suchbegriff ein, um unsere Wohn- und Pflegekollektionen zu durchstöbern.',
          foundCount: 'passende Produkte gefunden',
          noFoundTitle: `Keine Produkte für „${searchTerm}“ gefunden`,
          noFoundSub: 'Versuche es mit Begriffen wie „Diffusor“, „Gläser“, „Rosenquarz“, „Organizer“ oder „Leinen“.',
          clearBtn: 'Suche zurücksetzen',
          viewBtn: 'Ansehen',
        };
      default:
        return {
          placeholder: 'Search products by name, category, or keyword...',
          popular: 'Popular:',
          initialPrompt: 'Type to search through our curated Home & Living and Beauty & Self-Care collections.',
          foundCount: 'matching products found',
          noFoundTitle: `No products found for "${searchTerm}"`,
          noFoundSub: 'Try searching with general keywords such as "diffuser", "jars", "roller", "caddy", or "turban".',
          clearBtn: 'Clear Search',
          viewBtn: 'View',
        };
    }
  };

  const ui = getUiText(language);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2B2623]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EDE4DB] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE0D6] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#C16A46] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={ui.placeholder}
            className="w-full bg-transparent text-sm sm:text-base text-[#2B2623] placeholder-[#948B83] focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#948B83] hover:text-[#2B2623] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-[#736B65] hover:text-[#2B2623] rounded-md transition-colors border border-[#DDD3C7] bg-white cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-3 bg-[#FAF7F2] border-b border-[#EDE2D7] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#8A8179] font-medium shrink-0">
            {ui.popular}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {popularKeywords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(item.query)}
                className="px-2.5 py-1 bg-white hover:bg-[#FAF0EB] text-[#554D47] hover:text-[#C16A46] rounded-full border border-[#E4D9CE] hover:border-[#F2D7CA] text-[11px] font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {searchTerm.trim() === '' ? (
            /* Prompt state */
            <div className="text-center py-10 px-4 text-[#8C837C]">
              <Search className="w-10 h-10 mx-auto text-[#D5C7BC] mb-3" />
              <p className="text-xs sm:text-sm">
                {ui.initialPrompt}
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            /* Match state */
            <div className="space-y-3">
              <div className="text-xs font-medium text-[#7A726C] px-1 pb-1">
                {filteredProducts.length} {ui.foundCount}
              </div>

              {filteredProducts.map((product) => {
                const price =
                  currency === 'USD'
                    ? `$${product.priceUSD.toFixed(2)}`
                    : `€${product.priceEUR.toFixed(2)}`;

                const prodName = product.name[language] || product.name.EN;
                const prodCat = product.categoryLabel[language] || product.categoryLabel.EN;
                const prodSub = product.subcategory[language] || product.subcategory.EN;
                const prodDesc = product.shortDesc[language] || product.shortDesc.EN;

                return (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl border border-[#EDE2D7] hover:border-[#C16A46] bg-white hover:bg-[#FAF8F5] transition-all flex items-center justify-between gap-4 group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Product Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#ECE0D6] bg-[#FAF7F2]">
                        <ProductIllustration
                          type={product.illustrationType}
                          className="w-full h-full"
                        />
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#A54F2E] tracking-wider block">
                          {prodCat} · {prodSub}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#2B2623] truncate group-hover:text-[#C16A46] transition-colors">
                          {prodName}
                        </h4>
                        <p className="text-[11px] text-[#736B65] line-clamp-1">
                          {prodDesc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-[#2B2623] tabular-nums block">
                        {price}
                      </span>
                      <span className="text-[10px] font-semibold text-[#C16A46] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{ui.viewBtn}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* No results state */
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-[#2B2623] mb-1">
                {ui.noFoundTitle}
              </h3>
              <p className="text-xs text-[#7A726C] max-w-sm mx-auto mb-4">
                {ui.noFoundSub}
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#F2ECE5] text-[#2B2623] text-xs font-semibold rounded-lg border border-[#DDD3C7] transition-colors cursor-pointer"
              >
                {ui.clearBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
