import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { HeroCinematic } from './components/hero/HeroCinematic';
import { FindMyLocker } from './components/booking/FindMyLocker';
import { TimeCalculator } from './components/experiences/TimeCalculator';
import { TravelPlanner } from './components/experiences/TravelPlanner';
import { BeforeAfterSlider } from './components/experiences/BeforeAfterSlider';
import { HowItWorksSteps } from './components/experiences/HowItWorksSteps';
import { HubsDirectory } from './components/hubs/HubsDirectory';
import { Locker360Visualizer } from './components/lockers/Locker360Visualizer';
import { SecuritySection } from './components/safety/SecuritySection';
import { StopCaseAssist } from './components/assist/StopCaseAssist';
import { BusinessPartnerSection } from './components/b2b/BusinessPartnerSection';
import { ReviewsSection } from './components/social/ReviewsSection';
import { InteractiveFAQ } from './components/faq/InteractiveFAQ';
import { CitySeoSection } from './components/seo/CitySeoSection';
import { Footer } from './components/layout/Footer';

// Modals
import { BookingModal } from './components/booking/BookingModal';
import { SizeRecommender } from './components/booking/SizeRecommender';
import { HubDetailModal } from './components/hubs/HubDetailModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

import { HubCityId } from './types';

export default function App({ initialHubId }: { initialHubId?: HubCityId } = {}) {
  return (
    <BookingProvider initialHubId={initialHubId}>
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
        <Navbar />

        <main className="flex-1 space-y-4">
          {/* 1. Cinematic Hero with Luggage Locker Animation & Weight Freedom Microinteraction */}
          <HeroCinematic />

          {/* 2. Primary Find My Locker Search Bar */}
          <FindMyLocker />

          {/* 3. Time Freedom Calculator */}
          <TimeCalculator />

          {/* 4. Travel Planner & City Places Indications */}
          <TravelPlanner />

          {/* 5. Before & After Interactive Comparison Slider */}
          <BeforeAfterSlider />

          {/* 6. How it works in 10 seconds */}
          <HowItWorksSteps />

          {/* 9. Hubs Directory & Interactive Freedom Route Map */}
          <HubsDirectory />

          {/* 10. Locker 360° Visualizer & Availability Matrix */}
          <Locker360Visualizer />

          {/* 11. Security Infrastructure & StopCase Plus */}
          <SecuritySection />

          {/* 12. StopCase Assist Scenario Diagnosis */}
          <StopCaseAssist />

          {/* 13. B2B Corporate Solutions & Partner Dashboard */}
          <BusinessPartnerSection />

          {/* 14. Social Proof & Traveler Reviews */}
          <ReviewsSection />

          {/* 15. Interactive FAQ & Help Center */}
          <InteractiveFAQ />

          {/* 16. City Local SEO & Travel Guides */}
          <CitySeoSection />
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <BookingModal />
        <SizeRecommender />
        <HubDetailModal />
        <AdminDashboardModal />
      </div>
    </BookingProvider>
  );
}
