"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600 blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <Logo size="lg" />
            <motion.div 
              className="absolute -inset-4 border border-accent/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Custom Loader */}
        <div className="relative w-48 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(197,160,89,0.5)]"
            initial={{ width: "0%", left: "0%" }}
            animate={{ 
              width: ["0%", "50%", "0%"],
              left: ["0%", "25%", "100%"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.4em]">Iniciando Experiência SAAB</span>
          <div className="flex justify-center items-center gap-1 mt-2">
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 1] }}
               className="w-1 h-1 bg-accent rounded-full"
             />
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, times: [0, 0.2, 1] }}
               className="w-1 h-1 bg-accent rounded-full"
             />
             <motion.span 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, times: [0, 0.2, 1] }}
               className="w-1 h-1 bg-accent rounded-full"
             />
          </div>
        </motion.div>
      </div>

      {/* Background Text */}
      <div className="absolute bottom-12 left-12 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-8xl font-black text-white italic tracking-tighter">PREMIUM</h2>
      </div>
    </motion.div>
  );
}

