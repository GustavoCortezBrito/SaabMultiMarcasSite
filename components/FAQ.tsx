"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F5FA8] mb-4">
            Perguntas <span className="text-[#D4A853]">Frequentes</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Tire suas dúvidas sobre compra, financiamento e documentação
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#D4A853] transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="font-bold text-[#0F5FA8] text-lg pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="text-[#D4A853]" size={24} />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#D4A853] text-[#0F5FA8] px-8 py-3 rounded-lg font-bold hover:bg-[#f4d084] transition-colors cursor-pointer"
          >
            Entre em Contato
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
