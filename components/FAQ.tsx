"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos diversas formas de pagamento: à vista (dinheiro, PIX, transferência bancária) ou financiamento facilitado com entrada a partir de 20%. Trabalhamos com os principais bancos e financeiras do mercado para oferecer as melhores condições."
    },
    {
      question: "Vocês aceitam veículos como parte do pagamento?",
      answer: "Sim! Fazemos avaliação justa do seu veículo atual e aceitamos como parte do pagamento. Nossa equipe realiza uma análise completa e oferece um valor justo de mercado para facilitar a troca pelo veículo dos seus sonhos."
    },
    {
      question: "Os veículos possuem garantia?",
      answer: "Sim, todos os nossos veículos possuem garantia. Além disso, oferecemos opções de garantia estendida para maior tranquilidade. Todos os veículos passam por revisão completa antes da entrega."
    },
    {
      question: "Como funciona o processo de financiamento?",
      answer: "O processo é simples e rápido! Você escolhe o veículo, nossa equipe analisa sua proposta e enviamos para aprovação nos bancos parceiros. A aprovação pode sair em até 24 horas. Facilitamos todo o processo de documentação."
    },
    {
      question: "Vocês cuidam da documentação e transferência?",
      answer: "Sim! Cuidamos de toda a burocracia para você. Fazemos a transferência do veículo, quitação de débitos (se houver) e entregamos o carro 100% regularizado e pronto para uso. Você não precisa se preocupar com nada."
    },
    {
      question: "Posso fazer test drive antes de comprar?",
      answer: "Com certeza! Incentivamos o test drive para que você conheça bem o veículo antes da compra. Agende sua visita e nossa equipe estará pronta para apresentar todos os detalhes do carro e acompanhar o test drive."
    },
    {
      question: "Qual a procedência dos veículos?",
      answer: "Todos os nossos veículos têm procedência garantida e documentação completa. Fazemos análise criteriosa do histórico, verificamos débitos, multas e realizamos vistoria técnica completa antes de disponibilizar para venda."
    },
    {
      question: "Quanto tempo leva para receber o veículo após a compra?",
      answer: "Após a aprovação do financiamento (se for o caso) e assinatura do contrato, o prazo médio é de 7 a 15 dias úteis para conclusão da documentação e transferência. Veículos à vista podem ser entregues mais rapidamente."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-surface relative overflow-hidden" id="faq">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/10"
          >
            <HelpCircle size={14} className="text-accent" />
            <span>Suporte ao Cliente</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Dúvidas <span className="text-gradient-gold">Frequentes</span>
          </h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Tudo o que você precisa saber sobre sua próxima conquista.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? "bg-white border-accent shadow-premium" 
                  : "bg-white/50 border-slate-100 hover:border-accent/30"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-7 flex items-center justify-between text-left group transition-all"
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${
                  openIndex === index ? "text-accent" : "text-primary group-hover:text-accent"
                }`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  openIndex === index ? "bg-accent text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-accent/10 group-hover:text-accent"
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-light border-t border-slate-50 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center p-12 rounded-[3rem] bg-primary text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
            <p className="text-slate-400 mb-8 font-light">
              Nossa equipe está pronta para te atender agora mesmo via WhatsApp.
            </p>
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium btn-gold inline-flex !px-10 group"
            >
              <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
              Falar com Especialista
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

