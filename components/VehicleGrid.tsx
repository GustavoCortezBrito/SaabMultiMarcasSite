"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Gauge, ArrowRight, Star } from "lucide-react";
import { vehicleAPI, Vehicle } from "@/lib/api";

export default function VehicleGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
    <section id="veiculos" ref={ref} className="py-24 px-6 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -z-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20"
          >
            <Star size={12} className="fill-accent" />
            <span>Destaques da Semana</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Veículos em <span className="text-gradient-gold">Destaque</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A melhor seleção de seminovos, usados e zero km com procedência garantida e condições exclusivas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-slate-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-700 ease-out" />
                
                {/* Overlay with dynamic patterns */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: '16px 16px'
                }} />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div 
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    whileHover={{ scale: 1 }}
                    className="text-white"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-2">{vehicle.brand}</span>
                    <h4 className="text-3xl font-black tracking-tight">{vehicle.model}</h4>
                  </motion.div>
                </div>

                {/* Badges */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                    {vehicle.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 group/info">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/info:bg-accent/10 group-hover/info:text-accent transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Ano</span>
                      <span className="text-sm font-bold text-primary">{vehicle.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 group/info">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/info:bg-accent/10 group-hover/info:text-accent transition-colors">
                      <Gauge size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">KM</span>
                      <span className="text-sm font-bold text-primary">{vehicle.km.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Valor</span>
                    <p className="text-2xl font-black text-primary group-hover:text-accent transition-colors">
                      {vehicle.price}
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-accent transition-all shadow-lg hover:shadow-accent/40"
                  >
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/estoque"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium btn-gold inline-flex !px-10 !py-5 text-lg group"
          >
            Ver Estoque Completo
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

