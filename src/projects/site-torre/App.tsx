import React, { useState } from 'react';
import { UnitId, Product, CartItem, Reservation, ProductCategory } from './types';
import { UNITS, PRODUCTS, DEMO_RESERVATION } from './data/mockData';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickBookingBar } from './components/QuickBookingBar';
import { AvailabilityModal } from './components/AvailabilityModal';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TripBuilderModal } from './components/TripBuilderModal';
import { QuizModal } from './components/QuizModal';
import { ChecklistModal } from './components/ChecklistModal';
import { RentVsCarryCalculator } from './components/RentVsCarryCalculator';
import { StrollerFinderModal } from './components/StrollerFinderModal';
import { ReadyKitsSection } from './components/ReadyKitsSection';
import { AirportTourExperience } from './components/AirportTourExperience';
import { UnitsSection } from './components/UnitsSection';
import { FamilyTravelMap } from './components/FamilyTravelMap';
import { SanitizationTimeline } from './components/SanitizationTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ProductComparatorDrawer } from './components/ProductComparatorDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerPortal } from './components/CustomerPortal';
import { AdminBackoffice } from './components/AdminBackoffice';
import { FavoritesModal } from './components/FavoritesModal';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MessageSquare, Sparkles, X } from 'lucide-react';

export default function App({ initialUnit }: { initialUnit?: UnitId } = {}) {
  // Global States
  const [isLoading, setIsLoading] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<UnitId>(initialUnit || 'fortaleza');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');

  // Cart & Orders
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS.find((p) => p.id === 'carrinho-yoyo-babyzen')!,
      quantity: 1,
      startDate: '2026-10-10',
      endDate: '2026-10-15',
      days: 5,
      unitId: 'fortaleza',
    },
  ]);
  const [currentReservation, setCurrentReservation] = useState<Reservation>(DEMO_RESERVATION);

  // Favorites & Compare
  const [favorites, setFavorites] = useState<string[]>(['carrinho-yoyo-babyzen', 'berco-graco-pack-play']);
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  // Modals visibility
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [availabilityCategories, setAvailabilityCategories] = useState<ProductCategory[]>(['Carrinhos', 'Bebê Conforto', 'Berços']);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isTripBuilderOpen, setIsTripBuilderOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isStrollerFinderOpen, setIsStrollerFinderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);

  // Recovery banner state
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);

  // Cart Handlers
  const handleAddToCart = (product: Product, days: number = 5, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random()}`,
          product,
          quantity,
          startDate,
          endDate,
          days,
          unitId: currentUnit,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Favorites & Compare
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const toggleCompare = (productId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        alert('Você pode comparar no máximo 3 produtos ao mesmo tempo.');
        return prev;
      }
      const updated = [...prev, productId];
      setIsComparatorOpen(true);
      return updated;
    });
  };

  // Availability Check Trigger
  const handleCheckAvailability = (categories: ProductCategory[]) => {
    setAvailabilityCategories(categories);
    setIsAvailabilityOpen(true);
  };

  // Book Ready Kit / Multiple products from TripBuilder or Quiz
  const handleBookMultipleProducts = (products: Product[], days: number) => {
    const newItems: CartItem[] = products.map((product) => ({
      id: `kit-${product.id}-${Date.now()}-${Math.random()}`,
      product,
      quantity: 1,
      startDate,
      endDate,
      days,
      unitId: currentUnit,
    }));

    setCartItems((prev) => [...prev, ...newItems]);
    setIsCartOpen(true);
  };

  // Navigation scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extend active reservation in Minha Torre
  const handleExtendReservation = (extraDays: number) => {
    setCurrentReservation((prev) => ({
      ...prev,
      days: prev.days + extraDays,
      total: prev.total + 74 * extraDays,
      endDate: '2026-10-18',
    }));
  };

  const handleScheduleReturn = (option: string) => {
    setCurrentReservation((prev) => ({
      ...prev,
      deliveryType: option as any,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-800 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900 relative">
      {/* 1. Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} durationMs={2000} />
      )}

      {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        currentUnit={currentUnit}
        onSelectUnit={setCurrentUnit}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenTripBuilder={() => setIsTripBuilderOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminActive={isAdminOpen}
        onNavigateSection={navigateToSection}
      />

      {/* Cart Recovery Prompt Banner (Simulating smart retention) */}
      {showRecoveryBanner && cartItems.length > 0 && (
        <div className="bg-orange-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between z-30 shadow-md">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Sparkles className="w-4 h-4 text-orange-200" />
            <span>
              Você deixou sua viagem pela metade! Seus {cartItems.length} itens continuam pré-reservados em {UNITS[currentUnit].name}.
            </span>
            <button
              onClick={() => {
                setShowRecoveryBanner(false);
                setIsCheckoutOpen(true);
              }}
              className="ml-3 underline font-bold hover:text-orange-100 cursor-pointer"
            >
              Continuar reserva →
            </button>
          </div>
          <button
            onClick={() => setShowRecoveryBanner(false)}
            className="text-orange-200 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1">
        {/* 3. Hero Section (With prominent interactive Planner Card embedded on the right) */}
        <HeroSection
          unitId={currentUnit}
          onFindProducts={() => navigateToSection('catalog')}
          onHowItWorks={() => navigateToSection('how-it-works')}
          onBookKit={handleBookMultipleProducts}
          onOpenChecklistModal={() => setIsChecklistOpen(true)}
        />

        {/* 4. Streamlined Destination & Availability Bar */}
        <QuickBookingBar
          currentUnit={currentUnit}
          onSelectUnit={setCurrentUnit}
          startDate={startDate}
          endDate={endDate}
          onDateChange={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
          onCheckAvailability={handleCheckAvailability}
        />

        {/* 5. Catálogo Completo com Filtros */}
        <CatalogSection
          currentUnit={currentUnit}
          onSelectUnit={setCurrentUnit}
          startDate={startDate}
          endDate={endDate}
          onAddToCart={(p, d) => handleAddToCart(p, d, 1)}
          onViewProduct={(p) => setSelectedProductForDetail(p)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          comparisonList={comparisonList}
          onToggleCompare={toggleCompare}
        />

        {/* 6. Ready Kits ("Chegue e encontre tudo pronto") */}
        <ReadyKitsSection
          unitId={currentUnit}
          onBookKit={handleBookMultipleProducts}
        />

        {/* 7. Rent vs Carry Calculator */}
        <RentVsCarryCalculator
          unitId={currentUnit}
          onOpenCatalog={() => navigateToSection('catalog')}
        />

        {/* 8. Airport & Tourism Experience */}
        <AirportTourExperience
          currentUnit={currentUnit}
          onSelectUnit={setCurrentUnit}
          onFindProducts={() => navigateToSection('catalog')}
        />

        {/* 9. Interactive Units & Cities Section */}
        <UnitsSection
          currentUnit={currentUnit}
          onSelectUnit={setCurrentUnit}
          onExploreProducts={() => navigateToSection('catalog')}
        />

        {/* 10. Interactive Family Travel Map (Brazil & Heatmap) */}
        <FamilyTravelMap onSelectUnit={setCurrentUnit} />

        {/* 11. Sanitization & Safety Protocol */}
        <SanitizationTimeline />

        {/* 12. Testimonials & Real Moments */}
        <TestimonialsSection />

        {/* 13. Blog & Guides */}
        <BlogSection />

        {/* 14. FAQ Section */}
        <FAQSection unitId={currentUnit} />
      </main>

      {/* Floating Contextual WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        {comparisonList.length > 0 && (
          <button
            onClick={() => setIsComparatorOpen(true)}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Comparar ({comparisonList.length} itens)</span>
          </button>
        )}

        <a
          href={`https://wa.me/${UNITS[currentUnit].whatsapp}?text=${encodeURIComponent(
            `Olá equipe da Torre de Bebel em ${UNITS[currentUnit].name}! Gostaria de tirar uma dúvida sobre aluguel de produtos para meu bebê.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl flex items-center gap-2.5 text-xs font-bold transition-all hover:scale-105 group"
          title="Fale com uma pessoa da nossa equipe no WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp {UNITS[currentUnit].name}</span>
        </a>
      </div>

      {/* 15. Footer */}
      <Footer
        onOpenTripBuilder={() => setIsTripBuilderOpen(true)}
        onNavigateSection={navigateToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      {/* Availability Engine Modal */}
      <AvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        unitId={currentUnit}
        startDate={startDate}
        endDate={endDate}
        categories={availabilityCategories}
        onAddToCart={(p, d) => {
          handleAddToCart(p, d, 1);
          setIsAvailabilityOpen(false);
        }}
        onViewProduct={(p) => {
          setIsAvailabilityOpen(false);
          setSelectedProductForDetail(p);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        unitId={currentUnit}
        defaultStartDate={startDate}
        defaultEndDate={endDate}
        onAddToCart={handleAddToCart}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelectProduct={(p) => setSelectedProductForDetail(p)}
      />

      {/* Trip Builder "Monte sua Viagem" Modal */}
      <TripBuilderModal
        isOpen={isTripBuilderOpen}
        onClose={() => setIsTripBuilderOpen(false)}
        unitId={currentUnit}
        onBookKit={handleBookMultipleProducts}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        unitId={currentUnit}
        onBookSelection={handleBookMultipleProducts}
      />

      {/* Checklist Modal */}
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        unitId={currentUnit}
      />

      {/* Stroller Finder Modal */}
      <StrollerFinderModal
        isOpen={isStrollerFinderOpen}
        onClose={() => setIsStrollerFinderOpen(false)}
        unitId={currentUnit}
        onSelectStroller={(p) => handleAddToCart(p, 5, 1)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          if (cartItems.length > 0) setShowRecoveryBanner(true);
        }}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        unitId={currentUnit}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onAddComplementary={(p, d) => handleAddToCart(p, d, 1)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        unitId={currentUnit}
        startDate={startDate}
        endDate={endDate}
        onConfirmReservation={(res) => {
          setCurrentReservation(res);
          setCartItems([]);
          setShowRecoveryBanner(false);
        }}
        onViewPortal={() => setIsPortalOpen(true)}
      />

      {/* Customer Portal "Minha Torre" */}
      <CustomerPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        reservation={currentReservation}
        onExtendReservation={handleExtendReservation}
        onScheduleReturn={handleScheduleReturn}
      />

      {/* Admin Backoffice Dashboard */}
      <AdminBackoffice
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        unitId={currentUnit}
        onSelectUnit={setCurrentUnit}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteIds={favorites}
        onRemoveFavorite={toggleFavorite}
        unitId={currentUnit}
        onAddToCart={(p, d) => handleAddToCart(p, d, 1)}
      />

      {/* Product Comparator Drawer */}
      <ProductComparatorDrawer
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        productIds={comparisonList}
        onRemoveItem={(id) => setComparisonList((prev) => prev.filter((i) => i !== id))}
        onClear={() => setComparisonList([])}
        unitId={currentUnit}
        onAddToCart={(p, d) => handleAddToCart(p, d, 1)}
      />
    </div>
  );
}
