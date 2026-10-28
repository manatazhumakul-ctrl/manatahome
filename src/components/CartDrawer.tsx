import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle, Truck, Sparkles } from 'lucide-react';
import { CartItem, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductIllustration } from './ProductIllustration';
import { SHIPPING_CONFIG } from '../config/shipping';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  language: Language;
  currency: Currency;
  onProceedToCheckout: () => void;
  onStartShopping: () => void;
  appliedPromoCode?: string;
  onApplyPromoCode?: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  language,
  currency,
  onProceedToCheckout,
  onStartShopping,
  appliedPromoCode = '',
  onApplyPromoCode,
}) => {
  const [couponCode, setCouponCode] = useState(appliedPromoCode);
  const [discountPercent, setDiscountPercent] = useState<number>(() => {
    if (appliedPromoCode.toUpperCase() === 'FIRST7') return 7;
    if (appliedPromoCode.toUpperCase() === 'WELCOME10' || appliedPromoCode.toUpperCase() === 'MANATA') return 10;
    return 0;
  });
  const [couponError, setCouponError] = useState('');

  // Keep synced if appliedPromoCode changes externally
  useEffect(() => {
    if (appliedPromoCode) {
      setCouponCode(appliedPromoCode);
      if (appliedPromoCode.toUpperCase() === 'FIRST7') {
        setDiscountPercent(7);
      } else if (appliedPromoCode.toUpperCase() === 'WELCOME10' || appliedPromoCode.toUpperCase() === 'MANATA') {
        setDiscountPercent(10);
      }
    }
  }, [appliedPromoCode]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Calculate Subtotal
  const rawSubtotal = items.reduce((sum, item) => {
    const itemPrice = currency === 'USD' ? item.product.priceUSD : item.product.priceEUR;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = discountPercent > 0 ? (rawSubtotal * discountPercent) / 100 : 0;
  const finalSubtotal = rawSubtotal - discountAmount;

  // Configurable thresholds from SHIPPING_CONFIG: $150 Standard, $250 Express
  const standardThreshold =
    currency === 'USD'
      ? SHIPPING_CONFIG.standardFreeThresholdUSD
      : SHIPPING_CONFIG.standardFreeThresholdEUR;

  const expressThreshold =
    currency === 'USD'
      ? SHIPPING_CONFIG.expressFreeThresholdUSD
      : SHIPPING_CONFIG.expressFreeThresholdEUR;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'FIRST7') {
      setDiscountPercent(7);
      setCouponError('');
      onApplyPromoCode?.(clean);
    } else if (clean === 'WELCOME10' || clean === 'MANATA') {
      setDiscountPercent(10);
      setCouponError('');
      onApplyPromoCode?.(clean);
    } else {
      setCouponError(
        language === 'EN'
          ? 'Invalid code. Try "FIRST7" (7% off) or "WELCOME10"'
          : language === 'RU'
          ? 'Неверный промокод. Попробуйте "FIRST7" (7%) или "WELCOME10"'
          : 'Жараксыз код. "FIRST7" (7%) же "WELCOME10" колдонуңуз'
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2623]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EDE4DB] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE0D6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C16A46]" />
              <h2 className="text-lg font-serif font-semibold text-[#2B2623]">
                {t.cart.title}
              </h2>
              <span className="text-xs text-[#827871] font-medium">
                ({items.reduce((acc, it) => acc + it.quantity, 0)})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#706B66] hover:text-[#2B2623] hover:bg-[#F4ECE3] rounded-md transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Connected Shipping Promotion Bar ($150 Standard / $250 Express) */}
          <div className="bg-[#FAF0EB] px-6 py-3 border-b border-[#F2DCD0] text-xs text-[#8C3E1F]">
            {finalSubtotal < standardThreshold ? (
              /* Tier 1: Working toward Free Standard Shipping ($150) */
              <div>
                <div className="flex items-center justify-between">
                  <span>
                    {language === 'EN'
                      ? `Add ${currency === 'USD' ? '$' : '€'}${(standardThreshold - finalSubtotal).toFixed(2)} more for FREE Standard Shipping`
                      : language === 'RU'
                      ? `Добавьте еще ${currency === 'USD' ? '$' : '€'}${(standardThreshold - finalSubtotal).toFixed(2)} для бесплатной стандартной доставки`
                      : `Акысыз жеткирүү үчүн дагы ${currency === 'USD' ? '$' : '€'}${(standardThreshold - finalSubtotal).toFixed(2)} кошуңуз`}
                  </span>
                  <span className="font-bold text-[11px] tabular-nums">
                    {Math.round((finalSubtotal / standardThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-[#E8D4C8] rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-[#C16A46] h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (finalSubtotal / standardThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : finalSubtotal < expressThreshold ? (
              /* Tier 2: Free Standard Shipping unlocked, working toward Express ($250) */
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-[#3B6B48] mb-1">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {language === 'EN'
                      ? 'FREE Standard Shipping Unlocked!'
                      : language === 'RU'
                      ? 'Бесплатная стандартная доставка активирована!'
                      : 'Акысыз стандарттык жеткирүү ачылды!'}
                  </span>
                </div>
                <div className="text-[11px] text-[#8C3E1F]">
                  <span>
                    {language === 'EN'
                      ? `Add ${currency === 'USD' ? '$' : '€'}${(expressThreshold - finalSubtotal).toFixed(2)} more for FREE Express Shipping`
                      : language === 'RU'
                      ? `Добавьте еще ${currency === 'USD' ? '$' : '€'}${(expressThreshold - finalSubtotal).toFixed(2)} для бесплатной экспресс-доставки`
                      : `Экспресс жеткирүү үчүн дагы ${currency === 'USD' ? '$' : '€'}${(expressThreshold - finalSubtotal).toFixed(2)} кошуңуз`}
                  </span>
                </div>
                <div className="w-full bg-[#E8D4C8] rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#C16A46] h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, ((finalSubtotal - standardThreshold) / (expressThreshold - standardThreshold)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              /* Tier 3: Free Express Shipping qualified */
              <div className="flex items-center gap-2 font-semibold text-[#3B6B48]">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'EN'
                    ? 'Qualified for FREE EXPRESS SHIPPING ($250+ Tier)!'
                    : language === 'RU'
                    ? 'Вам доступна бесплатная экспресс-доставка (от $250)!'
                    : 'Сизге акысыз экспресс жеткирүү берилди ($250+)!'}
                </span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto grow space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EAE1] text-[#9E948C] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-medium text-[#2B2623] mb-1">
                  {t.cart.empty}
                </h3>
                <p className="text-xs text-[#7A736D] max-w-xs mx-auto mb-6">
                  {t.cart.emptySub}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="px-5 py-2.5 bg-[#C16A46] text-white text-xs font-semibold rounded-lg hover:bg-[#A54F2E] transition-colors cursor-pointer"
                >
                  {t.cart.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice =
                  currency === 'USD'
                    ? item.product.priceUSD
                    : item.product.priceEUR;
                const totalLinePrice = itemPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-[#EDE3DA] shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FAF7F2] border border-[#F0E6DE]">
                      <ProductIllustration
                        type={item.product.illustrationType}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between grow">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-[#A54F2E] font-semibold uppercase tracking-wider block">
                            {item.product.categoryLabel[language]}
                          </span>
                          <h4 className="text-xs font-semibold text-[#2B2623] line-clamp-1">
                            {item.product.name[language]}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#9C948D] hover:text-[#A54F2E] transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#DECFC2] rounded-md overflow-hidden bg-[#FAF8F5]">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2 py-0.5 text-xs font-bold text-[#635C57] hover:bg-[#F2ECE5] cursor-pointer"
                          >
                            −
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums text-[#2B2623]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 text-xs font-bold text-[#635C57] hover:bg-[#F2ECE5] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-[#2B2623] tabular-nums">
                          {currency === 'USD' ? '$' : '€'}
                          {totalLinePrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE0D6] space-y-4">
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative grow">
                  <Tag className="w-3.5 h-3.5 text-[#A39991] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. FIRST7, WELCOME10)"
                    disabled={discountPercent > 0}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD2C6] rounded-md text-[#2B2623] focus:outline-hidden focus:border-[#C16A46]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={discountPercent > 0}
                  className="px-3 py-2 text-xs font-semibold bg-[#2B2623] text-white rounded-md hover:bg-[#433B36] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {discountPercent > 0 ? '✓' : t.cart.applyCoupon}
                </button>
              </form>

              {discountPercent > 0 && (
                <div className="text-[11px] text-[#4E7D59] font-medium flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Discount code {couponCode} applied: {discountPercent}% off</span>
                  </div>
                  <button
                    onClick={() => {
                      setDiscountPercent(0);
                      setCouponCode('');
                    }}
                    className="text-[10px] text-[#8C837C] hover:text-[#C16A46] underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-[#C16A46] font-medium">
                  {couponError}
                </div>
              )}

              {/* Subtotal line */}
              <div className="space-y-1.5 text-xs">
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#706B66]">
                    <span>Standard Total</span>
                    <span className="tabular-nums">
                      {currency === 'USD' ? '$' : '€'}
                      {rawSubtotal.toFixed(2)}
                    </span>
                  </div>
                )}
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#4E7D59]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">
                      -{currency === 'USD' ? '$' : '€'}
                      {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2B2623] pt-1">
                  <span>{t.cart.subtotal}</span>
                  <span className="tabular-nums">
                    {currency === 'USD' ? '$' : '€'}
                    {finalSubtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C837B]">
                  {t.cart.shippingNotice}
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#C16A46] hover:bg-[#A54F2E] text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
