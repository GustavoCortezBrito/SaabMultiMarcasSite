"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
    <section ref={ref} className="py-20 px-4 bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
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
            Perguntas <span className="text-[#ddb963]">Frequentes</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            Tire suas dúvidas sobre compra, financiamento e documentação
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.6 + (index * 0.08), duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#ddb963] transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="font-bold text-[#004c97] text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-[#ddb963]" size={24} />
                </motion.div>
              </button>
              
              <motion.div
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div 
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  className="px-6 pb-5 text-gray-700 leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <motion.a
            href="#contato"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#ddb963] text-[#004c97] px-8 py-3 rounded-lg font-bold hover:bg-[#e8c77d] transition-colors cursor-pointer"
          >
            Entre em Contato
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
