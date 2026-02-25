"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import CategoryCards from "@/components/CategoryCards";
import CarbonZeroBanner from "@/components/CarbonZeroBanner";
import TripIdeas from "@/components/TripIdeas";
import FortyYearsBanner from "@/components/FortyYearsBanner";
import EventsSection from "@/components/EventsSection";
import SeasonsSection from "@/components/SeasonsSection";
import FaqSection from "@/components/FaqSection";
import RegionsSection from "@/components/RegionsSection";
import StoriesSection from "@/components/StoriesSection";
import InstagramGrid from "@/components/InstagramGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroSection />
        <CategoryCards />
        <CarbonZeroBanner />
        <TripIdeas />
        <FortyYearsBanner />
        <EventsSection />
        <SeasonsSection />
        <FaqSection />
        <RegionsSection />
        <StoriesSection />
        <InstagramGrid />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
