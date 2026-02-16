"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Gauge, ArrowRight } from "lucide-react";
import { vehicleAPI, Vehicle } from "@/lib/api";

export default function VehicleGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await vehicleAPI.getAll();
      setVehicles(data.slice(0, 6)); // Show only first 6
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  return (
    <section id="veiculos" ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#0F5FA8] mb-4"
          >
            Veículos em <span className="text-[#D4A853]">Destaque</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Seminovos, usados e zero km com procedência garantida
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6 + (index * 0.15), duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
            >
              {/* Image Placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-[#0F5FA8] to-[#0a4580] flex items-center justify-center overflow-hidden">
                <motion.div 
                  className="text-white text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-3xl font-bold">{vehicle.brand}</p>
                  <p className="text-lg">{vehicle.model}</p>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-[#D4A853] opacity-0 group-hover:opacity-20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0F5FA8] mb-4">
                  {vehicle.brand} {vehicle.model}
                </h3>

                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={18} />
                    <span className="text-sm">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge size={18} />
                    <span className="text-sm">{vehicle.km} km</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-[#D4A853]">
                    {vehicle.price}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0F5FA8] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a4580] transition-colors cursor-pointer"
                  >
                    Ver mais
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/estoque"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[#D4A853] to-[#f4d084] text-[#0F5FA8] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-shadow cursor-pointer"
          >
            Ver Estoque Completo
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
