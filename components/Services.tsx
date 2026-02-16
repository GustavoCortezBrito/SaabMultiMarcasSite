"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Car, FileCheck, CreditCard, Wrench, Handshake, Clock } from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const services = [
    {
      icon: <Car className="w-10 h-10" />,
      title: "Venda de Veículos",
      description: "Seminovos, usados e zero km com procedência garantida e ótimo custo-benefício"
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: "Compra e Troca",
      description: "Compramos seu veículo ou facilitamos a troca com avaliação justa e transparente"
    },
    {
      icon: <CreditCard className="w-10 h-10" />,
      title: "Financiamento Facilitado",
      description: "Diversas opções de financiamento automotivo com entrada facilitada e aprovação rápida"
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: "Documentação Completa",
      description: "Cuidamos de toda a burocracia e documentação com total transparência"
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Veículos Revisados",
      description: "Todos os veículos passam por revisão completa antes da entrega"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Suporte Completo",
      description: "Acompanhamento durante todo o processo de compra com segurança e agilidade"
    }
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 px-4 bg-white">
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
            Nossos <span className="text-[#D4A853]">Serviços</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Compra, venda e troca com financiamento facilitado
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-[#D4A853] hover:shadow-lg transition-all group"
            >
              <motion.div 
                className="text-[#D4A853] mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#0F5FA8] mb-3 group-hover:text-[#D4A853] transition-colors">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
