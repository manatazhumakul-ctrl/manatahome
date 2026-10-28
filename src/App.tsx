/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Language,
  Currency,
  Product,
  CartItem,
  PolicyType,
  MainCategory,
  CustomerUser,
} from './types';
import { TRANSLATIONS } from './i18n/translations';
import { SAMPLE_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Benefits } from './components/Benefits';
import { BrandStory } from './components/BrandStory';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Newsletter } from './components/Newsletter';
import { PolicyModal } from './components/PolicyModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { FirstOrderDiscount } from './components/FirstOrderDiscount';
import { PromoMarquee } from './components/PromoMarquee';
import { Footer } from './components/Footer';
import { ArrowUpDown, Home, Sparkle } from 'lucide-react';

export default function App() {
  // Persistent language & currency settings
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('manata_lang') as Language;
    return saved && ['EN', 'RU', 'KG', 'IT', 'DE'].includes(saved) ? saved : 'EN';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('manata_curr');
    return saved === 'EUR' ? 'EUR' : 'USD';
  });

  // Current navigation view: 'home' | 'home-living' | 'beauty-selfcare' | 'about' | 'contact' | 'faq'
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Customer Account Session
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('manata_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Shopping cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('manata_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Promo Code (e.g. FIRST7)
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>(() => {
    return localStorage.getItem('manata_promo') || '';
  });

  // Overlays & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null);

  // Catalog filters & sorting
  const [categoryFilter, setCategoryFilter] = useState<MainCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('manata_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('manata_curr', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('manata_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('manata_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('manata_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (appliedPromoCode) {
      localStorage.setItem('manata_promo', appliedPromoCode);
    } else {
      localStorage.removeItem('manata_promo');
    }
  }, [appliedPromoCode]);

  const t = TRANSLATIONS[language];

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyDiscountCode = (code: string) => {
    setAppliedPromoCode(code);
    setIsCartOpen(true);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.quantity, 0);
  }, [cartItems]);

  // Tab navigation handler
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered and Sorted products for view
  const displayedProducts = useMemo(() => {
    let prods = [...SAMPLE_PRODUCTS];

    if (currentTab === 'home-living') {
      prods = prods.filter((p) => p.category === 'home-living');
    } else if (currentTab === 'beauty-selfcare') {
      prods = prods.filter((p) => p.category === 'beauty-selfcare');
    } else if (categoryFilter !== 'all') {
      prods = prods.filter((p) => p.category === categoryFilter);
    }

    if (sortBy === 'price-low') {
      prods.sort((a, b) =>
        currency === 'USD' ? a.priceUSD - b.priceUSD : a.priceEUR - b.priceEUR
      );
    } else if (sortBy === 'price-high') {
      prods.sort((a, b) =>
        currency === 'USD' ? b.priceUSD - a.priceUSD : b.priceEUR - a.priceEUR
      );
    } else if (sortBy === 'name') {
      prods.sort((a, b) => {
        const nameA = a.name[language] || a.name.EN || '';
        const nameB = b.name[language] || b.name.EN || '';
        return nameA.localeCompare(nameB);
      });
    }

    return prods;
  }, [currentTab, categoryFilter, sortBy, currency, language]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2623] flex flex-col justify-between selection:bg-[#C16A46]/20 selection:text-[#8C3E1F]">
      {/* Top Bar Navigation with Search & Customer Account Triggers */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        currentUser={currentUser}
      />

      <main className="grow">
        {/* VIEW 1: HOME PAGE */}
        {currentTab === 'home' && (
          <>
            <Hero
              language={language}
              onExplore={() => {
                const catalogEl = document.getElementById('featured-catalog');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onDiscoverStory={() => handleNavigate('about')}
            />

            <CategoryGrid
              language={language}
              onSelectCategory={(cat) => handleNavigate(cat)}
            />

            {/* Featured Catalog Section */}
            <section id="featured-catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EAE0D6]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C16A46] block mb-2">
                    {t.products.featuredTitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2623]">
                    {t.products.featuredSubtitle}
                  </h2>
                </div>

                {/* Filter and Sort bar */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-1 p-1 bg-[#F1E8DF] rounded-lg border border-[#E5DAD0] text-xs">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                        categoryFilter === 'all'
                          ? 'bg-white text-[#2B2623] shadow-2xs font-semibold'
                          : 'text-[#69615B] hover:text-[#2B2623]'
                      }`}
                    >
                      {t.products.filterAll}
                    </button>
                    <button
                      onClick={() => setCategoryFilter('home-living')}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                        categoryFilter === 'home-living'
                          ? 'bg-white text-[#C16A46] shadow-2xs font-semibold'
                          : 'text-[#69615B] hover:text-[#2B2623]'
                      }`}
                    >
                      {t.products.filterHome}
                    </button>
                    <button
                      onClick={() => setCategoryFilter('beauty-selfcare')}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                        categoryFilter === 'beauty-selfcare'
                          ? 'bg-white text-[#C16A46] shadow-2xs font-semibold'
                          : 'text-[#69615B] hover:text-[#2B2623]'
                      }`}
                    >
                      {t.products.filterBeauty}
                    </button>
                  </div>

                  {/* Sort dropdown */}
                  <div className="flex items-center gap-1.5 bg-white border border-[#DDD2C6] rounded-lg px-2.5 py-1 text-xs text-[#524A45]">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#C16A46]" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent border-none text-xs text-[#2B2623] focus:outline-hidden cursor-pointer"
                    >
                      <option value="featured">{t.products.sortFeatured}</option>
                      <option value="price-low">{t.products.sortPriceLow}</option>
                      <option value="price-high">{t.products.sortPriceHigh}</option>
                      <option value="name">{t.products.sortName}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    currency={currency}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    isInCart={cartItems.some((it) => it.product.id === product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Second Editorial Promotional Marquee (upper-middle area near 7% discount section) */}
            <PromoMarquee language={language} />

            {/* First-Order 7% Discount Subscription section */}
            <FirstOrderDiscount
              language={language}
              onApplyDiscountCode={handleApplyDiscountCode}
            />

            <Benefits language={language} />

            <BrandStory
              language={language}
              onExploreProducts={() => {
                const catalogEl = document.getElementById('featured-catalog');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            <FAQSection language={language} />

            <Newsletter language={language} />
          </>
        )}

        {/* VIEW 2: HOME & LIVING DEDICATED SECTION */}
        {currentTab === 'home-living' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header banner */}
            <div className="mb-12 p-8 sm:p-12 bg-white rounded-2xl border border-[#EDE2D7] shadow-2xs">
              <div className="flex items-center gap-2 text-[#A54F2E] mb-3">
                <Home className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {t.categories.homeLivingTag}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2623] mb-4">
                {language === 'EN'
                  ? 'Practical Home Essentials & Organization'
                  : language === 'RU'
                  ? 'Практичный порядок и уютные детали для дома'
                  : language === 'KG'
                  ? 'Үйдү иреттөө жана жайлуулук буюмдары'
                  : language === 'IT'
                  ? 'Organizzazione Pratica ed Essenziali per la Casa'
                  : 'Praktische Wohn-Essentials & Organisation'}
              </h1>
              <p className="text-sm sm:text-base text-[#69615B] max-w-2xl leading-relaxed">
                {t.categories.homeLivingDesc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#8A8179]">
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Kitchen Essentials
                </span>
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Home Organization
                </span>
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Practical Household Items
                </span>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  currency={currency}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  isInCart={cartItems.some((it) => it.product.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: BEAUTY & SELF-CARE DEDICATED SECTION */}
        {currentTab === 'beauty-selfcare' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header banner */}
            <div className="mb-12 p-8 sm:p-12 bg-white rounded-2xl border border-[#EDE2D7] shadow-2xs">
              <div className="flex items-center gap-2 text-[#A54F2E] mb-3">
                <Sparkle className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {t.categories.beautyTag}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#2B2623] mb-4">
                {language === 'EN'
                  ? 'Beauty, Comfort & Mindful Self-Care'
                  : language === 'RU'
                  ? 'Красота, комфорт и ежедневная забота о себе'
                  : language === 'KG'
                  ? 'Сулуулук, ыңгайлуулук жана жеке күтүм'
                  : language === 'IT'
                  ? 'Bellezza, Benessere & Cura Consapevole di Sé'
                  : 'Schönheit, Komfort & Achtsame Selbstfürsorge'}
              </h1>
              <p className="text-sm sm:text-base text-[#69615B] max-w-2xl leading-relaxed">
                {t.categories.beautyDesc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#8A8179]">
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Skincare Accessories
                </span>
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Beauty Tools
                </span>
                <span className="bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#E9DFD5]">
                  ✓ Everyday Self-Care Rituals
                </span>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  currency={currency}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  isInCart={cartItems.some((it) => it.product.id === product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: ABOUT US FULL VIEW */}
        {currentTab === 'about' && (
          <div>
            <BrandStory
              language={language}
              onExploreProducts={() => handleNavigate('home')}
            />
            <Benefits language={language} />
          </div>
        )}

        {/* VIEW 5: CONTACT US FULL VIEW */}
        {currentTab === 'contact' && (
          <ContactSection language={language} />
        )}

        {/* VIEW 6: FAQ FULL VIEW */}
        {currentTab === 'faq' && (
          <div className="py-6">
            <FAQSection language={language} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenPolicy={(policy) => setSelectedPolicy(policy)}
      />

      {/* Floating Customer Support Chatbot Widget */}
      <ChatbotWidget
        language={language}
        onNavigateToContact={() => handleNavigate('contact')}
        onNavigateToSection={(sectionId) => handleNavigate(sectionId)}
      />

      {/* Slide-over Shopping Cart Drawer with Promo & Connected Shipping Tiers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        language={language}
        currency={currency}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onStartShopping={() => {
          setIsCartOpen(false);
          handleNavigate('home');
        }}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={(code) => setAppliedPromoCode(code)}
      />

      {/* Checkout Demonstration Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        language={language}
        currency={currency}
        onClearCart={handleClearCart}
      />

      {/* Product Quick-View Modal (with Photo/Video view toggle) */}
      <ProductModal
        product={selectedProduct}
        language={language}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => {
          handleAddToCart(p, qty);
          setSelectedProduct(null);
        }}
      />

      {/* Legal & Policy Modal */}
      <PolicyModal
        policyType={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        language={language}
      />

      {/* Functional Product Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        currency={currency}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Customer Account / Profile Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        language={language}
        currency={currency}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />
    </div>
  );
}
