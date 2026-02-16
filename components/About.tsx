"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Shield, Users, CheckCircle, X } from "lucide-react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            className="text-4xl md:text-5xl font-bold text-[#004c97] mb-4"
          >
            Por que escolher a <span className="text-[#ddb963]">SAAB Multimarcas</span>?
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

        {/* Fotos da Fachada */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage("/saab-fachada.jpeg")}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
          >
            <Image
              src="/saab-fachada.jpeg"
              alt="Fachada SAAB Multimarcas"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-semibold">
                Clique para ampliar
              </span>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage("/saab-fachada2.jpeg")}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
          >
            <Image
              src="/saab-fachada2.jpeg"
              alt="Fachada SAAB Multimarcas 2"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-semibold">
                Clique para ampliar
              </span>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
              transition={{ delay: 0.8 + (index * 0.15), duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group"
            >
              <motion.div 
                className="text-[#ddb963] mb-4 flex justify-center"
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[#004c97] mb-3 group-hover:text-[#ddb963] transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Imagem */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[80vh] cursor-default"
            >
              <Image
                src={selectedImage}
                alt="Fachada SAAB Multimarcas"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
