import React, { useState } from 'react';
import { Tag, CheckCircle, ArrowRight, Mail, Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface FirstOrderDiscountProps {
  language: Language;
  onApplyDiscountCode: (code: string) => void;
}

export const FirstOrderDiscount: React.FC<FirstOrderDiscountProps> = ({
  language,
  onApplyDiscountCode,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [appliedToCart, setAppliedToCart] = useState(false);

  const discountCode = 'FIRST7';

  const getCopy = (lang: Language) => {
    switch (lang) {
      case 'RU':
        return {
          tag: 'Приветственная скидка 7%',
          headline: 'Ваш первый заказ со скидкой 7%',
          subheadline: 'Присоединяйтесь к нашему сообществу и открывайте продуманные товары для уюта и ежедневного ухода.',
          placeholder: 'Введите адрес эл. почты',
          btn: 'Получить скидку 7%',
          note: 'Действует на ваш первый заказ. Отписаться можно в любой момент.',
          welcome: 'Добро пожаловать в MANATAHOME!',
          subscribed: `Подписка на адрес ${email} подтверждена. Используйте код для получения скидки 7%:`,
          error: 'Пожалуйста, введите корректный адрес эл. почты.',
          applied: 'Применено!',
          applyBtn: 'Применить к заказу',
          copied: 'Скопировано',
          copy: 'Копировать',
        };
      case 'KG':
        return {
          tag: '7% саламдашуу арзандатуусу',
          headline: 'Биринчи буйрутмаңызга 7% арзандатуу',
          subheadline: 'Биздин жамаатка кошулуп, үйдүн кооздугу жана күнүмдүк күтүм үчүн тандалган буюмдар менен таанышыңыз.',
          placeholder: 'Электрондук дарегиңизди жазыңыз',
          btn: '7% арзандатууну алуу',
          note: 'Биринчи сатып алуу үчүн жарактуу. Каалаган убакта жазылууну токтотсо болот.',
          welcome: 'MANATAHOME кош келиңиз!',
          subscribed: `${email} дарегиңиз катталды. 7% арзандатуу үчүн төмөнкү кодду колдонуңуз:`,
          error: 'Туура электрондук почта дарегин жазыңыз.',
          applied: 'Кошулду!',
          applyBtn: 'Себетке кошуу',
          copied: 'Көчүрүлдү',
          copy: 'Көчүрүү',
        };
      case 'IT':
        return {
          tag: 'Offerta di Benvenuto 7%',
          headline: 'Il Tuo Primo Ordine, con il 7% di Sconto',
          subheadline: 'Unisciti alla nostra community e scopri articoli selezionati per una casa armoniosa e per la cura di sé.',
          placeholder: 'Inserisci il tuo indirizzo email',
          btn: 'Ricevi il Tuo 7% di Sconto',
          note: 'Valido sul primo acquisto. Puoi disiscriverti in ogni momento con un clic.',
          welcome: 'Benvenuta in MANATAHOME!',
          subscribed: `Iscrizione confermata per ${email}. Usa il codice sottostante per ottenere il 7% di sconto:`,
          error: 'Inserisci un indirizzo email valido.',
          applied: 'Applicato!',
          applyBtn: 'Applica al Carrello',
          copied: 'Copiato',
          copy: 'Copia',
        };
      case 'DE':
        return {
          tag: '7% Willkommens-Rabatt',
          headline: 'Deine erste Bestellung mit 7% Rabatt',
          subheadline: 'Werde Teil unserer Community und entdecke durchdachte Produkte für dein Zuhause und tägliche Selbstfürsorge.',
          placeholder: 'Deine E-Mail-Adresse eingeben',
          btn: '7% Rabatt sichern',
          note: 'Gültig für deine erste Bestellung. Abmeldung jederzeit mit einem Klick möglich.',
          welcome: 'Willkommen bei MANATAHOME!',
          subscribed: `Anmeldung für ${email} bestätigt. Verwende folgenden Gutscheincode an der Kasse:`,
          error: 'Bitte gib eine gültige E-Mail-Adresse ein.',
          applied: 'Angewendet!',
          applyBtn: 'Im Warenkorb einlösen',
          copied: 'Kopiert',
          copy: 'Kopieren',
        };
      default:
        return {
          tag: '7% Community Welcome Offer',
          headline: 'Your First Order, With 7% Off',
          subheadline: 'Join our community and discover products for a beautiful home and everyday self-care.',
          placeholder: 'Enter your email address',
          btn: 'Get My 7% Discount',
          note: 'Valid on your first purchase. Unsubscribe at any time with one click.',
          welcome: 'Welcome to MANATAHOME!',
          subscribed: `Your subscription for ${email} is registered. Use code below to claim 7% off your order:`,
          error: 'Please enter a valid email address.',
          applied: 'Applied!',
          applyBtn: 'Apply to Bag',
          copied: 'Copied',
          copy: 'Copy',
        };
    }
  };

  const copy = getCopy(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage(copy.error);
      return;
    }

    setErrorMessage('');
    setIsSubscribed(true);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApplyToCart = () => {
    onApplyDiscountCode(discountCode);
    setAppliedToCart(true);
    setTimeout(() => setAppliedToCart(false), 3000);
  };

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#EAE0D6] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#F4E8DF] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle decorative tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E8DCD1] text-xs font-semibold text-[#A54F2E] mb-4 shadow-2xs">
          <Tag className="w-3.5 h-3.5 text-[#C16A46]" />
          <span>{copy.tag}</span>
        </div>

        {/* Headline exact copy from user specification */}
        <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623] mb-3 text-balance">
          {copy.headline}
        </h2>

        <p className="text-sm text-[#665F59] max-w-xl mx-auto mb-8 leading-relaxed">
          {copy.subheadline}
        </p>

        {isSubscribed ? (
          /* Subscribed success voucher view */
          <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 border border-[#E6D8CC] shadow-sm space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#3B6B48] text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>{copy.welcome}</span>
            </div>

            <p className="text-xs text-[#6B635D]">
              {copy.subscribed}
            </p>

            {/* Voucher Box */}
            <div className="flex items-center justify-between p-3.5 bg-[#FAF0EB] rounded-xl border border-[#F2D8CD]">
              <div className="text-left">
                <span className="text-[10px] text-[#A54F2E] font-semibold block uppercase tracking-wider">
                  Promo Code
                </span>
                <span className="text-lg font-mono font-bold text-[#8C3E1F] tracking-widest">
                  {discountCode}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-white text-[#736B65] hover:text-[#2B2623] rounded-md border border-[#DECFC2] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#3B6B48]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? copy.copied : copy.copy}</span>
                </button>

                <button
                  onClick={handleApplyToCart}
                  className="px-3.5 py-1.5 bg-[#C16A46] hover:bg-[#A54F2E] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{appliedToCart ? copy.applied : copy.applyBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#8C837C] italic">
              Notice: To deliver automated promo codes directly via email in live production, connect your Klaviyo or Mailchimp account via API webhook.
            </p>
          </div>
        ) : (
          /* Subscription form */
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative grow">
                <Mail className="w-4 h-4 text-[#A89E96] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={copy.placeholder}
                  className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-[#DECFC2] rounded-lg text-[#2B2623] placeholder-[#9E958E] focus:border-[#C16A46] focus:outline-hidden shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-3 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                {copy.btn}
              </button>
            </form>

            {errorMessage && (
              <p className="text-xs text-[#C16A46] font-medium mt-2 text-left">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-[#8C837C] mt-3">
              {copy.note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
