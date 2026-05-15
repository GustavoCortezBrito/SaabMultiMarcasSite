"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Shield, Users, CheckCircle, X, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Veículos Revisados",
      description: "Rigoroso controle de qualidade e procedência em cada veículo do estoque."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparência Total",
      description: "Negociações claras e honestas, do primeiro contato até o pós-venda."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Avaliação Justa",
      description: "Valorizamos seu usado com as melhores taxas do mercado de Presidente Prudente."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Crédito Facilitado",
      description: "Parcerias com os principais bancos para garantir a melhor parcela para você."
    }
  ];

  return (
    <section id="sobre" ref={ref} className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Por que a <span className="text-gradient-gold">SAAB</span>?
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Mais que uma revenda, somos seu parceiro na conquista do seu próximo veículo. Qualidade, confiança e transparência em cada detalhe.
          </p>
        </motion.div>

        {/* Fotos da Fachada */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[
            { src: "/saab-fachada.jpeg", label: "Nossa Loja" },
            { src: "/saab-fachada2.jpeg", label: "Showroom Premium" }
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (idx * 0.2) }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(img.src)}
              className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-premium cursor-pointer group"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="flex items-center justify-between">
                  <span className="text-white text-xl font-bold">{img.label}</span>
                  <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-surface p-10 rounded-[2.5rem] border border-slate-100 transition-all duration-300 group hover:shadow-premium"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
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
            className="fixed inset-0 bg-primary/95 z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="absolute top-8 right-8 bg-white/10 hover:bg-accent text-white p-4 rounded-2xl transition-all"
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image
                src={selectedImage}
                alt="Galeria SAAB"
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

