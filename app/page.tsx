"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleGrid from "@/components/VehicleGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import MapLocation from "@/components/MapLocation";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loading key="loading" />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <main className="min-h-screen bg-white">
          <Hero />
          <VehicleGrid />
          <About />
          <Services />
          <FAQ />
          <Contact />
          <MapLocation />
          <Footer />
        </main>
        <WhatsAppButton />
      </motion.div>
    </>
  );
}
