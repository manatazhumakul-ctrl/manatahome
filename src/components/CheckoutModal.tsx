import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Shield, Truck, AlertCircle, ShoppingBag } from 'lucide-react';
import { CartItem, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { SHIPPING_CONFIG } from '../config/shipping';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  language,
  currency,
  onClearCart,
}) => {
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    country: 'United States',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    postalCode: '97477',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'klarna'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const subtotal = items.reduce((sum, item) => {
    const price = currency === 'USD' ? item.product.priceUSD : item.product.priceEUR;
    return sum + price * item.quantity;
  }, 0);

  const standardFreeThreshold = currency === 'USD' ? SHIPPING_CONFIG.standardFreeThresholdUSD : SHIPPING_CONFIG.standardFreeThresholdEUR;
  const expressFreeThreshold = currency === 'USD' ? SHIPPING_CONFIG.expressFreeThresholdUSD : SHIPPING_CONFIG.expressFreeThresholdEUR;
  const isFreeStandard = subtotal >= standardFreeThreshold;
  const isFreeExpress = subtotal >= expressFreeThreshold;
  const shippingCost = isFreeStandard ? 0 : (currency === 'USD' ? SHIPPING_CONFIG.standardShippingRateUSD : SHIPPING_CONFIG.standardShippingRateEUR);
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2623]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EDE4DB] overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE0D6] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#C16A46]" />
            <h2 className="text-lg font-serif font-semibold text-[#2B2623]">
              {orderConfirmed ? t.checkout.orderSuccess : t.checkout.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B65] hover:text-[#2B2623] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype notice badge */}
        <div className="bg-[#FAF0EB] px-6 py-2.5 border-b border-[#F2D7CA] text-xs text-[#8C3E1F] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#A54F2E]" />
          <span>{t.checkout.notice}</span>
        </div>

        {orderConfirmed ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#3B6B48] flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-serif text-[#2B2623]">
              {t.checkout.orderSuccess}
            </h3>
            <p className="text-sm text-[#66605B] max-w-md mx-auto">
              {t.checkout.orderSuccessSub}
            </p>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE0D6] max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between font-semibold text-[#2B2623] pb-2 border-b border-[#E8DDD1]">
                <span>{t.checkout.demoOrderNumber}</span>
                <span className="text-[#3B6B48]">Verified Simulation</span>
              </div>
              <div className="flex justify-between text-[#6B635D]">
                <span>Customer:</span>
                <span className="font-medium text-[#2B2623]">{formData.name}</span>
              </div>
              <div className="flex justify-between text-[#6B635D]">
                <span>Destination:</span>
                <span className="font-medium text-[#2B2623]">
                  {formData.city}, {formData.country}
                </span>
              </div>
              <div className="flex justify-between text-[#6B635D]">
                <span>Estimated Delivery:</span>
                <span className="font-medium text-[#2B2623]">3–5 Business Days</span>
              </div>
              <div className="flex justify-between font-bold text-[#2B2623] pt-2 border-t border-[#E8DDD1]">
                <span>Total:</span>
                <span className="tabular-nums">
                  {currency === 'USD' ? '$' : '€'}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C837B] max-w-md mx-auto italic">
              Notice: MANATAHOME live production gateway will integrate Stripe / Shopify / Amazon Pay upon official commercial deployment.
            </p>

            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-[#C16A46] text-white text-xs font-semibold rounded-lg hover:bg-[#A54F2E] transition-colors shadow-sm"
              >
                {t.checkout.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Destination */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A54F2E] mb-3">
                1. {t.checkout.shippingAddress}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#615A54] mb-1 font-medium">{t.contact.fullName}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD3C8] rounded-md text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[#615A54] mb-1 font-medium">{t.contact.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD3C8] rounded-md text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[#615A54] mb-1 font-medium">{t.checkout.country}</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD3C8] rounded-md text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  >
                    <option value="United States">United States</option>
                    <option value="Germany">Germany (Deutschland)</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#615A54] mb-1 font-medium">{t.checkout.city}</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD3C8] rounded-md text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#615A54] mb-1 font-medium">{t.checkout.address}</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD3C8] rounded-md text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Selector Demonstration */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A54F2E] mb-3">
                2. {t.checkout.paymentMethod}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C16A46] bg-[#FAF1EC] font-semibold text-[#8C3E1F]'
                      : 'border-[#DDD2C6] bg-white text-[#5E5752] hover:border-[#B5A89C]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1 text-[#C16A46]" />
                  <span>{t.checkout.cardOption}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'apple'
                      ? 'border-[#C16A46] bg-[#FAF1EC] font-semibold text-[#8C3E1F]'
                      : 'border-[#DDD2C6] bg-white text-[#5E5752] hover:border-[#B5A89C]'
                  }`}
                >
                  <Shield className="w-4 h-4 mb-1 text-[#C16A46]" />
                  <span>{t.checkout.applePay}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'klarna'
                      ? 'border-[#C16A46] bg-[#FAF1EC] font-semibold text-[#8C3E1F]'
                      : 'border-[#DDD2C6] bg-white text-[#5E5752] hover:border-[#B5A89C]'
                  }`}
                >
                  <Truck className="w-4 h-4 mb-1 text-[#C16A46]" />
                  <span>{t.checkout.klarna}</span>
                </button>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#EAE0D6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <div className="text-xs text-[#7A736C]">
                  Subtotal: {currency === 'USD' ? '$' : '€'}{subtotal.toFixed(2)} · Shipping: {shippingCost === 0 ? 'FREE' : `${currency === 'USD' ? '$' : '€'}${shippingCost.toFixed(2)}`}
                </div>
                <div className="text-lg font-bold text-[#2B2623] tabular-nums">
                  Total: {currency === 'USD' ? '$' : '€'}{total.toFixed(2)}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C16A46] hover:bg-[#A54F2E] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? t.checkout.processing : t.checkout.confirmBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
