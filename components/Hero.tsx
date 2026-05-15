"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedYear) params.set("year", selectedYear);
    
    router.push(`/estoque${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm0 3.657l10.485 10.485-1.414 1.414L32 6.485 22.929 15.556l-1.414-1.414L32 3.657z' fill='%23C5A059' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </motion.div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo with Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.2 }}
            className="mb-8 relative inline-block"
          >
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 -z-10" />
            <Logo size="lg" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Sua próxima conquista está na <span className="text-gradient-gold">SAAB</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Veículos seminovos, usados e zero km com a procedência e confiança que você merece.
          </motion.p>
          
          {/* Premium Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-4xl mx-auto glass-card rounded-2xl p-2 md:p-3"
          >
            <div className="grid md:grid-cols-4 gap-2">
              <div className="relative group">
                <select 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-4 bg-transparent rounded-xl focus:outline-none text-primary font-semibold cursor-pointer transition-all appearance-none"
                >
                  <option value="">Todas as Marcas</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="RAM">RAM</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Honda">Honda</option>
                  <option value="Chevrolet">Chevrolet</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none group-hover:text-accent transition-colors" size={18} />
              </div>
              
              <div className="relative group">
                <select 
                  className="w-full px-4 py-4 bg-transparent rounded-xl focus:outline-none text-primary font-semibold cursor-pointer transition-all appearance-none"
                >
                  <option>Todos os Modelos</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none group-hover:text-accent transition-colors" size={18} />
              </div>
              
              <div className="relative group">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-4 bg-transparent rounded-xl focus:outline-none text-primary font-semibold cursor-pointer transition-all appearance-none"
                >
                  <option value="">Todos os Anos</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2015">2015</option>
                  <option value="2008">2008</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none group-hover:text-accent transition-colors" size={18} />
              </div>
              
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-premium btn-gold"
              >
                <Search size={20} />
                Buscar Veículo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Descubra</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-10 bg-gradient-to-b from-accent to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

