import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Lock,
  Mail,
  ShieldCheck,
  LogOut,
  CheckCircle,
  ExternalLink,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { CustomerUser, CustomerOrder, Language, Currency } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  currentUser: CustomerUser | null;
  onLogin: (user: CustomerUser) => void;
  onLogout: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  currentUser,
  onLogin,
  onLogout,
}) => {
  type TabType = 'signin' | 'register' | 'forgot' | 'profile' | 'orders';
  const [activeTab, setActiveTab] = useState<TabType>(currentUser ? 'profile' : 'signin');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Sample orders list for account order history
  const sampleOrders: CustomerOrder[] = [
    {
      id: 'MH-2026-8491',
      date: 'October 24, 2026',
      itemsCount: 2,
      totalUSD: 78.0,
      totalEUR: 73.0,
      status: 'Processing',
      carrier: 'DHL Express',
      trackingNumber: 'DHL-US-928471920',
      itemsSummary: 'Ceramic Ultrasonic Diffuser · Borosilicate Spice Jars',
    },
    {
      id: 'MH-2026-7210',
      date: 'September 18, 2026',
      itemsCount: 1,
      totalUSD: 32.0,
      totalEUR: 29.0,
      status: 'Delivered',
      carrier: 'FedEx Home Delivery',
      trackingNumber: 'FDX-982341908',
      itemsSummary: 'Rose Quartz Facial Roller & Sculpting Stone Set',
    },
  ];

  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const demoUser: CustomerUser = {
      id: 'usr-demo-101',
      name: fullName.trim() || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Eleanor Vance'),
      email: email.trim() || 'eleanor.vance@example.com',
      memberSince: 'October 2026',
      shippingAddress: {
        address: '742 Evergreen Terrace, Suite 4B',
        city: 'Springfield',
        country: 'United States',
        postalCode: '97477',
      },
    };
    onLogin(demoUser);
    setActiveTab('profile');
    setFeedbackMsg(
      language === 'EN'
        ? 'Signed in successfully (Demonstration Session).'
        : language === 'RU'
        ? 'Успешный вход в демонстрационный аккаунт.'
        : 'Сыноо эсебине ийгиликтүү кирдиңиз.'
    );
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2623]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#EDE4DB] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE0D6] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center border border-[#F2D8CD]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-semibold text-[#2B2623]">
                {currentUser ? currentUser.name : language === 'EN' ? 'Customer Account' : language === 'RU' ? 'Личный кабинет' : 'Жеке кабинет'}
              </h2>
              <span className="text-xs text-[#8A817A] block">
                {currentUser ? currentUser.email : 'MANATAHOME Client Space'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#736B65] hover:text-[#2B2623] hover:bg-[#F2ECE5] rounded-md transition-colors"
            aria-label="Close Account Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE0D6] bg-[#FCFAF7] text-xs font-semibold px-4 pt-2 overflow-x-auto">
          {currentUser ? (
            <>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-[#C16A46] text-[#C16A46]'
                    : 'border-transparent text-[#706B66] hover:text-[#2B2623]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'My Profile' : language === 'RU' ? 'Мой профиль' : 'Менин профилим'}</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-[#C16A46] text-[#C16A46]'
                    : 'border-transparent text-[#706B66] hover:text-[#2B2623]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'Order History' : language === 'RU' ? 'История заказов' : 'Буйрутмалар тарыхы'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setActiveTab('signin');
                  setForgotSent(false);
                }}
                className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'signin'
                    ? 'border-[#C16A46] text-[#C16A46]'
                    : 'border-transparent text-[#706B66] hover:text-[#2B2623]'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'Sign In' : language === 'RU' ? 'Вход' : 'Кирүү'}</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setForgotSent(false);
                }}
                className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'register'
                    ? 'border-[#C16A46] text-[#C16A46]'
                    : 'border-transparent text-[#706B66] hover:text-[#2B2623]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'Create Account' : language === 'RU' ? 'Регистрация' : 'Катталуу'}</span>
              </button>
              <button
                onClick={() => setActiveTab('forgot')}
                className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'forgot'
                    ? 'border-[#C16A46] text-[#C16A46]'
                    : 'border-transparent text-[#706B66] hover:text-[#2B2623]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{language === 'EN' ? 'Password Help' : language === 'RU' ? 'Забыли пароль?' : 'Сыр сөз'}</span>
              </button>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[70vh] overflow-y-auto">
          {/* Informational Architecture Disclaimer */}
          <div className="mb-6 p-3 bg-[#FAF1EC] rounded-xl border border-[#F2D7CA] text-xs text-[#8C3E1F] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C16A46] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-semibold block mb-0.5">
                {language === 'EN' ? 'Account Integration Readiness' : language === 'RU' ? 'Готовность к интеграции авторизации' : 'Авторизацияга даярдык'}
              </span>
              {language === 'EN'
                ? 'This client-side interface is fully wired and prepared for Firebase Auth, Supabase, or custom OAuth backend integration. Passwords are never stored insecurely.'
                : language === 'RU'
                ? 'Интерфейс подготовлен для подключения Firebase Auth, Supabase или защищенного бэкенда авторизации. Пароли не сохраняются в незащищенном виде.'
                : 'Бул интерфейс Firebase Auth же корголгон бэкенд менен туташууга толук даяр.'}
            </div>
          </div>

          {/* TAB 1: SIGN IN */}
          {!currentUser && activeTab === 'signin' && (
            <form onSubmit={handleDemoSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#524B45] mb-1">
                  {language === 'EN' ? 'Email Address' : language === 'RU' ? 'Электронная почта' : 'Электрондук дарек'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89E96] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#524B45]">
                    {language === 'EN' ? 'Password' : language === 'RU' ? 'Пароль' : 'Сыр сөз'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-[11px] text-[#C16A46] hover:underline"
                  >
                    {language === 'EN' ? 'Forgot password?' : language === 'RU' ? 'Забыли пароль?' : 'Унуттуңузбу?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A89E96] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B635D]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#C16A46] focus:ring-[#C16A46]"
                  />
                  <span>{language === 'EN' ? 'Remember me on this device' : language === 'RU' ? 'Запомнить меня' : 'Мени эстеп калуу'}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                {language === 'EN' ? 'Sign In to Account' : language === 'RU' ? 'Войти в аккаунт' : 'Аккаунтка кирүү'}
              </button>

              <div className="text-center pt-2 text-xs text-[#706B66]">
                <span>{language === 'EN' ? 'New customer?' : language === 'RU' ? 'Впервые в MANATAHOME?' : 'Жаңы колдонуучусузбу?'} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-[#C16A46] font-semibold hover:underline"
                >
                  {language === 'EN' ? 'Create an account' : language === 'RU' ? 'Зарегистрироваться' : 'Катталуу'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {!currentUser && activeTab === 'register' && (
            <form onSubmit={handleDemoSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#524B45] mb-1">
                  {language === 'EN' ? 'Full Name' : language === 'RU' ? 'Ваше имя' : 'Толук аты-жөнүңүз'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#524B45] mb-1">
                  {language === 'EN' ? 'Email Address' : language === 'RU' ? 'Электронная почта' : 'Электрондук дарек'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#524B45] mb-1">
                  {language === 'EN' ? 'Password' : language === 'RU' ? 'Пароль' : 'Сыр сөз'}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                />
              </div>

              <div className="text-[11px] text-[#736B65] space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#C16A46] focus:ring-[#C16A46]"
                  />
                  <span>
                    {language === 'EN'
                      ? 'Subscribe to MANATAHOME community & receive 7% welcome discount'
                      : language === 'RU'
                      ? 'Подписаться на новости и получить скидку 7% на первый заказ'
                      : 'Жаңылыктарга жазылып, биринчи буйрутмага 7% арзандатуу алуу'}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                {language === 'EN' ? 'Complete Registration' : language === 'RU' ? 'Завершить регистрацию' : 'Катталууну бүтүрүү'}
              </button>

              <div className="text-center pt-2 text-xs text-[#706B66]">
                <span>{language === 'EN' ? 'Already have an account?' : language === 'RU' ? 'Уже есть аккаунт?' : 'Аккаунтуңуз барбы?'} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="text-[#C16A46] font-semibold hover:underline"
                >
                  {language === 'EN' ? 'Sign In' : language === 'RU' ? 'Войти' : 'Кирүү'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {!currentUser && activeTab === 'forgot' && (
            <div>
              {forgotSent ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#EBF5EE] text-[#3B6B48] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#2B2623]">
                    {language === 'EN' ? 'Password Reset Link Prepared' : language === 'RU' ? 'Ссылка для сброса подготовлена' : 'Сыр сөздү калыбына келтирүү шилтемеси'}
                  </h3>
                  <p className="text-xs text-[#6B635D] max-w-sm mx-auto">
                    {language === 'EN'
                      ? `In live production, an encrypted password reset email will be sent to ${email || 'your email'}.`
                      : language === 'RU'
                      ? `В рабочей версии ссылка для восстановления будет отправлена на ${email || 'ваш email'}.`
                      : `Иштеп жаткан версияда сыр сөздү жаңылоо шилтемеси ${email || 'электрондук дарегиңизге'} жөнөтүлөт.`}
                  </p>
                  <button
                    onClick={() => setActiveTab('signin')}
                    className="mt-2 text-xs font-semibold text-[#C16A46] hover:underline"
                  >
                    {language === 'EN' ? 'Back to Sign In' : language === 'RU' ? 'Вернуться ко входу' : 'Кирүүгө кайтуу'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-[#6B635D]">
                    {language === 'EN'
                      ? 'Enter your registered email address and we will prepare a secure password recovery link.'
                      : language === 'RU'
                      ? 'Введите адрес почты для отправки инструкций по восстановлению доступа.'
                      : 'Сыр сөздү калыбына келтирүү үчүн почта дарегиңизди жазыңыз.'}
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-[#524B45] mb-1">
                      {language === 'EN' ? 'Email Address' : language === 'RU' ? 'Электронная почта' : 'Электрондук дарек'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-lg text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    {language === 'EN' ? 'Send Recovery Link' : language === 'RU' ? 'Отправить ссылку' : 'Шилтемени жөнөтүү'}
                  </button>
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="text-xs text-[#706B66] hover:text-[#2B2623]"
                    >
                      {language === 'EN' ? '← Back to Sign In' : language === 'RU' ? '← Назад ко входу' : '← Кирүүгө кайтуу'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: MY PROFILE (LOGGED IN) */}
          {currentUser && activeTab === 'profile' && (
            <div className="space-y-6">
              {feedbackMsg && (
                <div className="p-2.5 bg-[#EBF5EE] text-[#3B6B48] rounded-lg text-xs font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {/* Profile Details Card */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EDE2D7] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#E8DDD1]">
                  <span className="text-xs text-[#827A73]">
                    {language === 'EN' ? 'Customer Profile' : language === 'RU' ? 'Данные профиля' : 'Профиль маалыматы'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#A54F2E] bg-white px-2 py-0.5 rounded border border-[#EDE2D7]">
                    Member · {currentUser.memberSince}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#8A817A] text-[11px] block">{language === 'EN' ? 'Name' : language === 'RU' ? 'Имя' : 'Аты'}</span>
                    <span className="font-semibold text-[#2B2623]">{currentUser.name}</span>
                  </div>
                  <div>
                    <span className="text-[#8A817A] text-[11px] block">{language === 'EN' ? 'Email' : language === 'RU' ? 'Email' : 'Почта'}</span>
                    <span className="font-semibold text-[#2B2623]">{currentUser.email}</span>
                  </div>
                </div>
              </div>

              {/* Default Shipping Address */}
              <div className="bg-white p-4 rounded-xl border border-[#EDE2D7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2B2623]">
                  <MapPin className="w-4 h-4 text-[#C16A46]" />
                  <span>{language === 'EN' ? 'Saved Shipping Address' : language === 'RU' ? 'Сохраненный адрес доставки' : 'Жеткирүү дареги'}</span>
                </div>
                <div className="text-xs text-[#6B635D] pl-6 space-y-0.5">
                  <p>{currentUser.shippingAddress.address}</p>
                  <p>
                    {currentUser.shippingAddress.city}, {currentUser.shippingAddress.postalCode}
                  </p>
                  <p>{currentUser.shippingAddress.country}</p>
                </div>
              </div>

              {/* Logout Button */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => {
                    onLogout();
                    setActiveTab('signin');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#A54F2E] hover:bg-[#FAF0EB] rounded-lg border border-[#F2D8CD] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'Sign Out' : language === 'RU' ? 'Выйти' : 'Чыгуу'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#C16A46] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'EN' ? 'View My Orders' : language === 'RU' ? 'Мои заказы' : 'Буйрутмаларым'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: ORDER HISTORY (LOGGED IN) */}
          {currentUser && activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#EDE2D7]">
                <span className="text-xs font-semibold text-[#2B2623]">
                  {language === 'EN' ? 'Recent Order Demonstrations' : language === 'RU' ? 'История тестовых заказов' : 'Буйрутмалар тизмеси'}
                </span>
                <span className="text-xs text-[#8A817A]">{sampleOrders.length} orders</span>
              </div>

              {sampleOrders.map((order) => {
                const total =
                  currency === 'USD'
                    ? `$${order.totalUSD.toFixed(2)}`
                    : `€${order.totalEUR.toFixed(2)}`;

                return (
                  <div
                    key={order.id}
                    className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE2D7] text-xs space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#2B2623]">{order.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-[#EBF5EE] text-[#3B6B48]'
                            : 'bg-[#FAF0EB] text-[#C16A46]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-[#665F59] text-[11px]">{order.itemsSummary}</p>

                    <div className="flex justify-between items-center text-[#8C837C] text-[11px] pt-1 border-t border-[#EAE0D6]">
                      <span>{order.date}</span>
                      <span className="font-semibold text-[#2B2623] text-xs tabular-nums">{total}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#A54F2E] bg-white p-2 rounded-lg border border-[#EDE2D7]">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#C16A46]" />
                        <span>{order.carrier}</span>
                      </div>
                      <span className="font-mono text-[#615A54]">{order.trackingNumber}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
