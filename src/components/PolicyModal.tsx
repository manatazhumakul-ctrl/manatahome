import React from 'react';
import { X, ShieldAlert, FileText } from 'lucide-react';
import { PolicyType, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
  language: Language;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  policyType,
  onClose,
  language,
}) => {
  if (!policyType) return null;

  const t = TRANSLATIONS[language];

  const getPolicyDetails = () => {
    switch (policyType) {
      case 'privacy':
        return {
          title: t.policies.privacyTitle,
          text: t.policies.privacyText,
        };
      case 'terms':
        return {
          title: t.policies.termsTitle,
          text: t.policies.termsText,
        };
      case 'shipping':
        return {
          title: t.policies.shippingTitle,
          text: t.policies.shippingText,
        };
      case 'returns':
        return {
          title: t.policies.returnsTitle,
          text: t.policies.returnsText,
        };
      case 'cookies':
        return {
          title: t.policies.cookiesTitle,
          text: t.policies.cookiesText,
        };
      default:
        return { title: 'Policy', text: '' };
    }
  };

  const policy = getPolicyDetails();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2623]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#EDE4DB] overflow-hidden p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D6]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C16A46]" />
            <h3 className="text-base font-serif font-semibold text-[#2B2623]">
              {policy.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78716A] hover:text-[#2B2623] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="p-3 bg-[#FAF1EC] rounded-lg border border-[#F2D7CA] text-xs text-[#8C3E1F] flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#A54F2E] shrink-0 mt-0.5" />
          <span>{t.policies.templateWarning}</span>
        </div>

        <div className="text-xs sm:text-sm text-[#615A54] leading-relaxed space-y-3 max-h-60 overflow-y-auto pr-2">
          <p>{policy.text}</p>
          <p>
            {language === 'EN'
              ? 'For custom queries, merchant inquiries, or policy verifications, please reach out via our official contact channels.'
              : language === 'RU'
              ? 'По вопросам партнерства и уточнения юридических аспектов вы можете направить запрос через форму обратной связи.'
              : 'Суроолор же юридикалык маалыматтарды тактоо үчүн биздин байланыш бөлүмү аркылуу кайрылсаңыз болот.'}
          </p>
        </div>

        <div className="pt-3 border-t border-[#EAE0D6] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2B2623] hover:bg-[#433B36] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t.policies.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
