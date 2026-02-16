"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Shield, Users, CheckCircle } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: <Award className="w-12 h-12" />,
      title: "Veículos Revisados",
      description: "Todos os veículos passam por rigorosa revisão com procedência garantida"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Atendimento Transparente",
      description: "Transparência total em todo o processo, do primeiro contato à entrega"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Avaliação Justa",
      description: "Avaliação justa na troca do seu veículo atual pelo modelo ideal"
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Financiamento Facilitado",
      description: "Diversas opções de financiamento com entrada facilitada"
    }
  ];

  return (
    <section id="sobre" ref={ref} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#0F5FA8] mb-4"
          >
            Por que escolher a <span className="text-[#D4A853]">SAAB Multimarcas</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Revenda especializada em Presidente Prudente com veículos revisados, procedência garantida e atendimento transparente
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
              transition={{ delay: 0.6 + (index * 0.15), duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group"
            >
              <motion.div 
                className="text-[#D4A853] mb-4 flex justify-center"
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#0F5FA8] mb-3 group-hover:text-[#D4A853] transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
