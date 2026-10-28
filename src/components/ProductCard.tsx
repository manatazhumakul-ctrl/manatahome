import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductIllustration } from './ProductIllustration';

interface ProductCardProps {
  product: Product;
  language: Language;
  currency: Currency;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  currency,
  onQuickView,
  onAddToCart,
  isInCart = false,
}) => {
  const t = TRANSLATIONS[language];
  const price = currency === 'USD' ? `$${product.priceUSD.toFixed(2)}` : `€${product.priceEUR.toFixed(2)}`;

  const getBadge = () => {
    if (product.isBestseller) {
      if (language === 'IT') return 'Più venduto';
      if (language === 'DE') return 'Bestseller';
      if (language === 'RU') return 'Хит';
      if (language === 'KG') return 'Эң популярдуу';
      return 'Bestseller';
    }
    if (product.isNew) {
      if (language === 'IT') return 'Novità';
      if (language === 'DE') return 'Neu';
      if (language === 'RU') return 'Новинка';
      if (language === 'KG') return 'Жаңы';
      return 'New';
    }
    return undefined;
  };

  const prodName = product.name[language] || product.name.EN;
  const prodCat = product.categoryLabel[language] || product.categoryLabel.EN;
  const prodSub = product.subcategory[language] || product.subcategory.EN;
  const prodDesc = product.shortDesc[language] || product.shortDesc.EN;

  return (
    <div className="group relative bg-white rounded-xl border border-[#EDE4DB] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Visual Image Container with 4:3 Aspect Ratio */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF7F2] border-b border-[#F0E6DE]">
        <ProductIllustration
          type={product.illustrationType}
          badge={getBadge()}
        />

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-0 bg-[#2B2623]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="py-2 px-3.5 bg-white text-[#2B2623] text-xs font-semibold rounded-md shadow-sm hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C16A46]" />
            <span>{t.products.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col grow justify-between">
        <div>
          {/* Category & Subcategory Unboxed Metadata */}
          <div className="flex items-center gap-1 text-[11px] text-[#8C837C] uppercase tracking-wider mb-1.5">
            <span className="font-semibold text-[#A54F2E]">{prodCat}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{prodSub}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-[#2B2623] hover:text-[#C16A46] cursor-pointer transition-colors leading-snug line-clamp-2 mb-2"
          >
            {prodName}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#706963] line-clamp-2 leading-relaxed mb-4">
            {prodDesc}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9E958E] block">
              {language === 'EN'
                ? 'Price'
                : language === 'RU'
                ? 'Цена'
                : language === 'KG'
                ? 'Баасы'
                : language === 'IT'
                ? 'Prezzo'
                : 'Preis'}
            </span>
            <span className="text-base font-bold text-[#2B2623] tabular-nums">
              {price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isInCart
                ? 'bg-[#FAF0EB] text-[#A54F2E] border border-[#F2D7CA]'
                : 'bg-[#C16A46] text-white hover:bg-[#A54F2E] shadow-2xs'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isInCart ? t.products.inBag : t.products.addToBag}</span>
          </button>
        </div>

        {/* Sample Notice Footer */}
        <div className="mt-2 text-[10px] text-[#A69E96] italic text-center">
          {language === 'EN'
            ? 'Sample Catalog Specification'
            : language === 'RU'
            ? 'Образец каталога бренда'
            : language === 'KG'
            ? 'Каталогдун үлгү көрсөтмөсү'
            : language === 'IT'
            ? 'Specifiche dimostrative di catalogo'
            : 'Muster-Katalogspezifikation'}
        </div>
      </div>
    </div>
  );
};
