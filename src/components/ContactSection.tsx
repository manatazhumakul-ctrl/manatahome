import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-2">
            {t.contact.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623] mb-3 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-sm text-[#706B66]">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Contact Channels & Map Architecture Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-[#EAE0D6] shadow-2xs space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A54F2E]">
                {language === 'EN' ? 'Direct Channels' : language === 'RU' ? 'Каналы связи' : 'Байланыш каналдары'}
              </h3>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#8A8179] block text-[11px] font-medium">{t.contact.officialEmailLabel}</span>
                  <span className="font-semibold text-[#2B2623]">{t.contact.officialEmailPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#8A8179] block text-[11px] font-medium">{t.contact.hoursLabel}</span>
                  <span className="font-semibold text-[#2B2623]">{t.contact.hoursValue}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] text-[#C16A46] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#8A8179] block text-[11px] font-medium">
                    {language === 'EN' ? 'Service Geography' : language === 'RU' ? 'География обслуживания' : 'Тейлөө аймактары'}
                  </span>
                  <span className="font-semibold text-[#2B2623]">
                    {language === 'EN' ? 'United States & European Union' : language === 'RU' ? 'США и страны Европейского Союза' : 'АКШ жана Европа Биримдиги'}
                  </span>
                </div>
              </div>
            </div>

            {/* Architecture readiness for future Google Maps embed (without fictional pins) */}
            <div className="bg-[#F6EFEA] rounded-xl p-5 border border-[#E9DDD1] text-xs text-[#706760] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-[#8C3E1F]">
                <MapPin className="w-4 h-4 text-[#C16A46]" />
                <span>
                  {language === 'EN' ? 'Digital-First Brand & Store Locator Readiness' : language === 'RU' ? 'Онлайн-бренд и готовность к интеграции карт' : 'Онлайн-бренд жана картага даярдык'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {t.contact.mapNotice}
              </p>
              <div className="pt-2 border-t border-[#EBDDD0] text-[11px] text-[#857B74] space-y-1">
                <span className="font-medium text-[#2B2623] block">
                  {language === 'EN' ? 'Integration Architecture Note:' : language === 'RU' ? 'Техническое примечание к интеграции:' : 'Техникалык эскертме:'}
                </span>
                <p>
                  {language === 'EN'
                    ? 'When a verified retail showroom or warehouse location is confirmed, a standard Google Maps iframe embed (via Google Maps Share & Embed, requiring no custom API key) and Apple Maps link can be activated here.'
                    : language === 'RU'
                    ? 'При открытии подтвержденного шоурума или склада здесь активируется стандартный Google Maps iframe (без обязательного платного API-ключа) и ссылка на Apple Maps.'
                    : 'Расмий шоурум ачылганда акысыз Google Maps iframe жана Apple Maps шилтемесин бул жерге кошууга болот.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-[#EAE0D6] shadow-2xs">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EBF5EE] text-[#3B6B48] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#2B2623]">
                  {t.contact.successMsg}
                </h3>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-[#C16A46] hover:underline cursor-pointer"
                >
                  {language === 'EN' ? 'Send another inquiry' : language === 'RU' ? 'Отправить еще сообщение' : 'Дагы кат жөнөтүү'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#524B45] mb-1">
                      {t.contact.fullName} <span className="text-[#C16A46]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.fullNamePlaceholder}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-md text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#524B45] mb-1">
                      {t.contact.email} <span className="text-[#C16A46]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-md text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#524B45] mb-1">
                    {t.contact.subject} <span className="text-[#C16A46]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact.subjectPlaceholder}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-md text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#524B45] mb-1">
                    {t.contact.message} <span className="text-[#C16A46]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD3C7] rounded-md text-xs text-[#2B2623] focus:border-[#C16A46] focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#C16A46] hover:bg-[#A54F2E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
