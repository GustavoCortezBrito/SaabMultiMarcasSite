"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedYear) params.set("year", selectedYear);
    
    router.push(`/estoque${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F5FA8]">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm0 3.657l10.485 10.485-1.414 1.414L32 6.485 22.929 15.556l-1.414-1.414L32 3.657z' fill='%23D4A853' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </motion.div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <Logo size="lg" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto font-medium"
          >
            Veículos seminovos, usados e zero km em Presidente Prudente com financiamento facilitado
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.01 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <motion.select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileFocus={{ scale: 1.02 }}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium cursor-pointer transition-all"
              >
                <option value="">Todas as Marcas</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="RAM">RAM</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Honda">Honda</option>
                <option value="Chevrolet">Chevrolet</option>
              </motion.select>
              
              <motion.select 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                whileFocus={{ scale: 1.02 }}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium cursor-pointer transition-all"
              >
                <option>Todos os Modelos</option>
              </motion.select>
              
              <motion.select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileFocus={{ scale: 1.02 }}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium cursor-pointer transition-all"
              >
                <option value="">Todos os Anos</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2015">2015</option>
                <option value="2008">2008</option>
              </motion.select>
              
              <motion.button
                onClick={handleSearch}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#D4A853] text-[#0F5FA8] px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#f4d084] transition-colors cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
                Buscar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
