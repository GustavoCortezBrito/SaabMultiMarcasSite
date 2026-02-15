"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F5FA8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm0 3.657l10.485 10.485-1.414 1.414L32 6.485 22.929 15.556l-1.414-1.414L32 3.657z' fill='%23D4A853' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Logo size="lg" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto font-medium"
          >
            Veículos seminovos, usados e zero km em Presidente Prudente com financiamento facilitado
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium">
                <option>Todas as Marcas</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Chevrolet</option>
                <option>Fiat</option>
                <option>Ford</option>
                <option>Honda</option>
                <option>Hyundai</option>
                <option>Jeep</option>
                <option>Mercedes-Benz</option>
                <option>Nissan</option>
                <option>Porsche</option>
                <option>Renault</option>
                <option>Toyota</option>
                <option>Volkswagen</option>
              </select>
              
              <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium">
                <option>Todos os Modelos</option>
              </select>
              
              <select className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none text-gray-700 font-medium">
                <option>Ano</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
              </select>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#D4A853] text-[#0F5FA8] px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#f4d084] transition-colors cursor-pointer"
              >
                <Search size={20} />
                Buscar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
