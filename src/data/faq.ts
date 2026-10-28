import { Language } from '../types';

export interface FAQItem {
  id: string;
  category: 'general' | 'ordering' | 'shipping' | 'returns' | 'support';
  question: Record<Language, string> | Record<string, string>;
  answer: Record<Language, string> | Record<string, string>;
  ownerConfirmationRequired?: boolean;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'general',
    question: {
      EN: 'How do I find the right products for my home and daily routine?',
      RU: 'Как выбрать подходящие товары для дома и ежедневного ухода?',
      KG: 'Үйүм жана күнүмдүк күтүмүм үчүн керектүү буюмдарды кантип табам?',
      IT: 'Come trovo i prodotti giusti per la mia casa e la routine quotidiana?',
      DE: 'Wie finde ich die passenden Produkte für mein Zuhause und meinen Alltag?',
    },
    answer: {
      EN: 'You can explore our curated categories: "Home & Living" for kitchen, organization, and lifestyle accessories, or "Beauty & Self-Care" for gentle skincare tools and daily comfort essentials. You can also filter products by category or use our interactive Virtual Concierge in the lower-right corner to ask questions.',
      RU: 'Вы можете ознакомиться с нашими разделами: «Дом и Уют» для кухни, организации пространства и интерьера или «Красота и Уход» для деликатных аксессуаров заботы о себе. Также доступна удобная фильтрация и виртуальный онлайн-помощник в правом нижнем углу.',
      KG: 'Биздин бөлүмдөрдү карап чыга аласыз: ашкана, үйдү иреттөө жана жайлуулук үчүн "Үй жана Жашоо", же бетке кам көрүү жана жеке күтүм үчүн "Сулуулук жана Күтүм". Ошондой эле оң жактагы онлайн-жардамчыга кайрылсаңыз болот.',
      IT: 'Puoi esplorare le nostre categorie curate: "Casa & Comfort" per cucina, organizzazione e accessori per l\'ambiente, oppure "Bellezza & Cura di Sé" per strumenti dedicati al viso e benessere personale. Puoi anche filtrare i prodotti o interagire con il nostro Concierge virtuale.',
      DE: 'Entdecke unsere kuratierten Kollektionen: „Wohnen & Leben“ für Küche, Organisation und Ambiente oder „Schönheit & Pflege“ für sanfte Gesichtspflege-Tools und Wohlfühl-Rituale. Du kannst Produkte filtern oder dich von unserem virtuellen Concierge beraten lassen.',
    },
  },
  {
    id: 'faq-02',
    category: 'ordering',
    question: {
      EN: 'How does the ordering process work on MANATAHOME?',
      RU: 'Как устроен процесс оформления заказа в MANATAHOME?',
      KG: 'MANATAHOME сайтында буйрутма берүү кандайча жүргүзүлөт?',
      IT: 'Come funziona la procedura d\'ordine su MANATAHOME?',
      DE: 'Wie läuft der Bestellprozess bei MANATAHOME ab?',
    },
    answer: {
      EN: 'Browse our catalog and click "Add to Bag" on any item you love. Open your shopping bag to review quantities, apply promotional codes, and proceed to checkout. Note: During this initial brand launch phase, our online store features a working front-end demonstration. Secure live payment processing and Amazon direct fulfillment links will be activated with our upcoming batch launch.',
      RU: 'Выберите понравившийся товар и нажмите «В корзину». В корзине можно изменить количество и перейти к оформлению. Обратите внимание: на этапе первого запуска работает интерактивная демонстрация оформления, а прием реальных платежей и прямые ссылки на Amazon будут подключены с выходом основной партии.',
      KG: 'Каалаган товарды тандап, "Себетке салуу" баскычын басыңыз. Себетте буюмдардын санын тактап, буйрутманы тариздөөгө өтсөңүз болот. Эскертүү: учурда сайттын тааныштыруу этабы иштеп жатат, реалдуу төлөмдөр жана Amazon шилтемелери жакында ишке кирет.',
      IT: 'Sfoglia il nostro catalogo e seleziona "Aggiungi al Carrello". Apri il carrello per verificare le quantità, inserire coupon sconto e proseguire con il checkout. Nota: durante questa fase di anteprima del brand, il negozio offre una dimostrazione interattiva completa prima dell\'attivazione dei pagamenti reali.',
      DE: 'Stöbere im Katalog und klicke auf „In den Warenkorb“. Überprüfe deinen Warenkorb, wende Rabattcodes an und gehe zur Kasse. Hinweis: In dieser Startphase bietet unser Shop eine vollständige interaktive Vorschau vor Anbindung der Live-Zahlungen.',
    },
  },
  {
    id: 'faq-03',
    category: 'shipping',
    question: {
      EN: 'Which regions do you ship to, and what are delivery times?',
      RU: 'В какие страны осуществляется доставка и каковы сроки?',
      KG: 'Кайсы өлкөлөргө жеткирүү бар жана канча убакытты алат?',
      IT: 'In quali regioni spedite e quali sono i tempi di consegna?',
      DE: 'In welche Regionen liefern Sie und wie lange dauert der Versand?',
    },
    answer: {
      EN: 'MANATAHOME is built primarily for customers across the United States and European Union, with international expansion planned. Standard delivery is estimated at 3–7 business days within the US and EU once fulfillment is active. [Notice: Exact regional shipping carriers, international transit times, and threshold for free shipping are subject to final business owner confirmation].',
      RU: 'MANATAHOME ориентирован на рынки США и стран Европейского Союза с перспективой расширения на весь мир. Стандартные сроки доставки составляют 3–7 рабочих дней после запуска отгрузок. [Примечание: Конкретные службы доставки, международные сроки и порог бесплатной доставки подлежат утверждению владельцем бизнеса].',
      KG: 'MANATAHOME негизинен АКШ жана Европа Биримдигинин кардарларына багытталган, кийинчерээк башка өлкөлөргө да жеткирилет. Болжолдуу жеткирүү мөөнөтү 3–7 жумушчу күн. [Эскертүү: Жеткирүү кызматтары жана так мөөнөттөр бренд жетекчилиги тарабынан бекитилет].',
      IT: 'MANATAHOME è pensato per clienti negli Stati Uniti e nell\'Unione Europea, con piani di ulteriore espansione. La spedizione standard richiede 3–7 giorni lavorativi all\'avvio delle spedizioni effettive. [Nota: vettori precisi e soglie di spedizione gratuita saranno confermati ufficialmente].',
      DE: 'MANATAHOME richtet sich primär an Kunden in der Europäischen Union und den USA. Der Standardversand dauert nach Verkaufsstart voraussichtlich 3–7 Werktage. [Hinweis: Genaue Versandpartner und Freigrenzen werden vor dem Start final bestätigt].',
    },
    ownerConfirmationRequired: true,
  },
  {
    id: 'faq-04',
    category: 'returns',
    question: {
      EN: 'What is your return and refund policy?',
      RU: 'Какова политика возврата товаров и средств?',
      KG: 'Товарды кайтаруу жана акчаны кайтарып алуу тартиби кандай?',
      IT: 'Qual è la vostra politica di reso e rimborso?',
      DE: 'Wie sehen Ihre Rückgabe- und Erstattungsrichtlinien aus?',
    },
    answer: {
      EN: 'We take pride in high quality and customer happiness. We plan a standard 30-day window for unopened, unused items in their original packaging. [Notice: The exact return timeframe, return shipping label handling, and inspection criteria are currently being finalized and require official business owner confirmation].',
      RU: 'Мы стремимся к безупречному качеству. Запланирован 30-дневный период возврата для неиспользованных товаров в оригинальной упаковке. [Примечание: Точные правила, оплата обратной пересылки и регламент проверки возвратов сейчас финализируются и требуют утверждения владельцем бренда].',
      KG: 'Биз сапатка жана кардардын канааттануусуна өзгөчө маани беребиз. Ачылбаган жана колдонулбаган товарларды 30 күндүн ичинде кайтаруу мүмкүнчүлүгү каралууда. [Эскертүү: Кайтаруунун толук эрежелери жана чыгымдары бренд ээси тарабынан такталат].',
      IT: 'Puntiamo alla massima soddisfazione dei nostri clienti. È prevista una finestra standard di 30 giorni per articoli non utilizzati nella confezione originale. [Nota: i dettagli operativi delle etichette di reso sono in fase di conferma definitiva].',
      DE: 'Wir legen größten Wert auf Kundenzufriedenheit. Vorgesehen ist ein 30-tägiges Rückgaberecht für unbenutzte Artikel in der Originalverpackung. [Hinweis: Genaue Rücksende-Konditionen werden vor Markteinführung final festgelegt].',
    },
    ownerConfirmationRequired: true,
  },
  {
    id: 'faq-05',
    category: 'support',
    question: {
      EN: 'How can I contact customer support?',
      RU: 'Как связаться со службой поддержки клиентов?',
      KG: 'Кардарларды колдоо кызматына кантип байланышса болот?',
      IT: 'Come posso contattare l\'assistenza clienti?',
      DE: 'Wie kann ich den Kundenservice kontaktieren?',
    },
    answer: {
      EN: 'You can reach us through our Contact Us page form anytime. Alternatively, our interactive Virtual Concierge widget in the bottom-right corner is ready to guide you 24/7 with immediate answers on products, care tips, and navigation.',
      RU: 'Вы можете отправить сообщение через форму на странице «Контакты» в любое время. Также наш виртуальный помощник в правом нижнем углу готов круглосуточно ответить на вопросы о категориях и навигации по сайту.',
      KG: 'Биздин "Байланыш" барагындагы кайрылуу формасы аркылуу каалаган убакта жазсаңыз болот. Ошондой эле оң бурчтагы онлайн-жардамчы күнү-түнү суроолоруңузга жооп берүүгө даяр.',
      IT: 'Puoi contattarci in qualsiasi momento tramite il modulo nella pagina Contatti. In alternativa, il nostro assistente virtuale nell\'angolo in basso a destra è attivo 24 ore su 24 per guidarti tra prodotti e consigli di cura.',
      DE: 'Du kannst uns jederzeit über das Formular auf unserer Kontaktseite erreichen. Unser interaktiver Concierge unten rechts steht dir zudem rund um die Uhr für Fragen zu Produkten und Kollektionen zur Seite.',
    },
  },
];
