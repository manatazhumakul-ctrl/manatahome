import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, ShieldAlert, Video, Image as ImageIcon, Play } from 'lucide-react';
import { Product, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductIllustration } from './ProductIllustration';

interface ProductModalProps {
  product: Product | null;
  language: Language;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  language,
  currency,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'photo' | 'video'>('photo');

  // Reset to photo on product change
  useEffect(() => {
    setActiveMedia('photo');
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const t = TRANSLATIONS[language];
  const price = currency === 'USD' ? `$${product.priceUSD.toFixed(2)}` : `€${product.priceEUR.toFixed(2)}`;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const prodName = product.name[language] || product.name.EN;
  const prodCat = product.categoryLabel[language] || product.categoryLabel.EN;
  const prodSub = product.subcategory[language] || product.subcategory.EN;
  const prodFullDesc = product.fullDesc[language] || product.fullDesc.EN;
  const prodNotice = product.sampleNotice[language] || product.sampleNotice.EN;
  const prodFeatures = product.features[language] || product.features.EN || [];
  const prodSpecs = product.specs[language] || product.specs.EN || [];
  const prodVideoTitle = product.videoTitle ? (product.videoTitle[language] || product.videoTitle.EN) : undefined;

  const getModalLabels = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return {
          taxes: 'Налоги включены для США и ЕС',
          details: 'Особенности модели',
          specs: 'Характеристики',
          qty: 'Количество',
          added: 'Добавлено в корзину!',
          videoTab: 'Видео',
          photoTab: 'Фото',
        };
      case 'KG':
        return {
          taxes: 'АКШ жана Европа үчүн салыктары кошулган',
          details: 'Өзгөчөлүктөрү',
          specs: 'Мүнөздөмөсү',
          qty: 'Саны',
          added: 'Себетке кошулду!',
          videoTab: 'Видео',
          photoTab: 'Сүрөт',
        };
      case 'IT':
        return {
          taxes: 'Imposte incluse per US & UE',
          details: 'Dettagli Curati',
          specs: 'Specifiche Tecniche',
          qty: 'Quantità',
          added: 'Aggiunto al Carrello!',
          videoTab: 'Video',
          photoTab: 'Foto',
        };
      case 'DE':
        return {
          taxes: 'Inkl. Steuern für USA & EU',
          details: 'Durchdachte Details',
          specs: 'Spezifikationen',
          qty: 'Menge',
          added: 'In den Warenkorb gelegt!',
          videoTab: 'Video',
          photoTab: 'Foto',
        };
      default:
        return {
          taxes: 'Taxes included for US & EU',
          details: 'Thoughtful Details',
          specs: 'Specifications',
          qty: 'Quantity',
          added: 'Added to Bag!',
          videoTab: 'Video',
          photoTab: 'Photo',
        };
    }
  };

  const labels = getModalLabels(language);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2623]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#EDE4DB] overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#524B45] hover:text-[#2B2623] flex items-center justify-center shadow-xs border border-[#E8DFD5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Media Container (Illustration or Video) */}
        <div className="md:w-1/2 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFE5DB]">
          <div>
            {/* Media Mode Switcher (Photo / Video Demo) if product has video */}
            {product.hasVideo && product.videoUrl && (
              <div className="flex items-center justify-center gap-1.5 p-1 bg-white rounded-lg border border-[#E8DCD1] mb-4 shadow-2xs max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => setActiveMedia('photo')}
                  className={`flex-1 py-1 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeMedia === 'photo'
                      ? 'bg-[#C16A46] text-white shadow-2xs'
                      : 'text-[#665F59] hover:text-[#2B2623]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{labels.photoTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`flex-1 py-1 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeMedia === 'video'
                      ? 'bg-[#C16A46] text-white shadow-2xs'
                      : 'text-[#665F59] hover:text-[#2B2623]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{labels.videoTab}</span>
                  {product.videoDuration && (
                    <span className="text-[10px] opacity-80">({product.videoDuration})</span>
                  )}
                </button>
              </div>
            )}

            {/* Media Display Area */}
            <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-white shadow-sm border border-[#EFE5DB] relative flex items-center justify-center">
              {activeMedia === 'video' && product.videoUrl ? (
                /* Video Player Mode */
                <div className="relative w-full h-full bg-[#1F1C1A] flex items-center justify-center">
                  <video
                    src={product.videoUrl}
                    controls
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 text-[#E08966]" />
                    <span>Demo</span>
                  </div>
                </div>
              ) : (
                /* Illustration / Photo View */
                <ProductIllustration type={product.illustrationType} />
              )}
            </div>

            {/* Video Caption if video mode active */}
            {activeMedia === 'video' && prodVideoTitle && (
              <div className="mt-2 text-center text-xs text-[#6B635D] font-medium">
                {prodVideoTitle}
              </div>
            )}
          </div>

          <div className="mt-4 p-2.5 bg-white/80 rounded-lg border border-[#EDE2D7] text-center">
            <span className="text-[11px] text-[#857B74] block font-medium">
              {t.brand.name} · {t.brand.slogan}
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs text-[#8F867F] uppercase tracking-wider mb-2">
              <span className="font-semibold text-[#A54F2E]">{prodCat}</span>
              <span aria-hidden="true">·</span>
              <span>{prodSub}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif text-[#2B2623] mb-3 leading-snug">
              {prodName}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-[#2B2623] tabular-nums">
                {price}
              </span>
              <span className="text-xs text-[#8A817A]">
                {labels.taxes}
              </span>
            </div>

            {/* Full Prose Description */}
            <p className="text-sm text-[#615A54] leading-relaxed mb-6">
              {prodFullDesc}
            </p>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-2.5">
                {labels.details}
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5C554F]">
                {prodFeatures.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C16A46] mt-0.5">·</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications */}
            <div className="mb-6 bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EDE2D7]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-2">
                {labels.specs}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {prodSpecs.map((spec: { label: string; value: string }, idx: number) => (
                  <div key={idx}>
                    <span className="text-[#877E77] block text-[11px]">{spec.label}</span>
                    <span className="font-medium text-[#2B2623]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Notice Disclosure */}
            <div className="mb-6 flex items-start gap-2 text-[11px] text-[#8C837C] bg-[#FAF1EC] p-2.5 rounded-md border border-[#F2D7CA]">
              <ShieldAlert className="w-4 h-4 text-[#A54F2E] shrink-0 mt-0.5" />
              <span>{prodNotice}</span>
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="pt-4 border-t border-[#EDE5DC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#59524D]">
                {labels.qty}
              </span>
              <div className="flex items-center border border-[#DECFC2] rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-[#59524D] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="px-3 py-1.5 text-xs font-semibold tabular-nums text-[#2B2623]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-semibold text-[#59524D] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-[#4E7D59] text-white shadow-sm'
                  : 'bg-[#C16A46] hover:bg-[#A54F2E] text-white shadow-sm hover:shadow-md'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{labels.added}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.products.addToBag}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
