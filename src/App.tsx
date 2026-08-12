import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BurgerScrollExperience } from './components/BurgerScrollExperience';
import { MenuSection } from './components/MenuSection';
import { FeaturedFoodSection } from './components/FeaturedFoodSection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 selection:bg-orange-500 selection:text-white flex flex-col font-body-clean">
      {/* 1. Navbar */}
      <Navbar />

      <main className="grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Burger Story / Scroll Experience - THE STACK */}
        <BurgerScrollExperience />

        {/* 4. Menu Section */}
        <MenuSection />

        {/* 5. Featured Food Section */}
        <FeaturedFoodSection />

        {/* 6. Story Section */}
        <StorySection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
