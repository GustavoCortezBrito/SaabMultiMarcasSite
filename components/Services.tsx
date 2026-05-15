"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Car, FileCheck, CreditCard, Wrench, Handshake, Clock, ShieldCheck } from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Venda de Veículos",
      description: "Amplo estoque de seminovos e zero km com garantia de qualidade SAAB."
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Compra e Troca",
      description: "A melhor avaliação do seu usado na troca pelo seu próximo sonho."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Financiamento",
      description: "Aprovação rápida com as melhores taxas do mercado financeiro."
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Documentação",
      description: "Processo ágil e transparente em toda a parte burocrática do seu veículo."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Revisão Premium",
      description: "Checklist rigoroso em todos os itens de segurança e mecânica."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Pós-Venda",
      description: "Suporte contínuo e compromisso real com a sua satisfação total."
    }
  ];

  return (
    <section id="servicos" ref={ref} className="py-20 md:py-24 px-6 bg-primary relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Nossos <span className="text-gradient-gold">Serviços</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Soluções completas para você realizar o melhor negócio com segurança e agilidade.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 md:mb-8 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

