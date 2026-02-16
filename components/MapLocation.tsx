"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock } from "lucide-react";

export default function MapLocation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F5FA8] mb-4">
            Nossa <span className="text-[#D4A853]">Localização</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Visite nossa loja em Presidente Prudente - SP
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informações */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#0F5FA8] p-3 rounded-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F5FA8] mb-2">Endereço</h3>
                  <p className="text-gray-700">
                    Av. Joaquim Constantino, 1868<br />
                    Vila Formosa<br />
                    Presidente Prudente - SP<br />
                    CEP: 19050-220
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F5FA8] mb-2">Telefone</h3>
                  <a 
                    href="tel:+5518997251860" 
                    className="text-gray-700 hover:text-[#D4A853] transition-colors"
                  >
                    (18) 99725-1860
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#0F5FA8] p-3 rounded-lg">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F5FA8] mb-2">Horário de Funcionamento</h3>
                  <div className="text-gray-700 space-y-1">
                    <p><span className="font-semibold">Segunda a Sexta:</span> 08:00 - 18:00</p>
                    <p><span className="font-semibold">Sábado:</span> 08:00 - 12:00</p>
                    <p><span className="font-semibold">Domingo:</span> Fechado</p>
                  </div>
                </div>
              </div>

              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP,+19050-220"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-[#D4A853] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#c49843] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Como Chegar
              </motion.a>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.8947234567!2d-51.4089!3d-22.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA3JzI0LjIiUyA1McKwMjQnMzIuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr&q=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização SAAB Multimarcas"
            />
          </motion.div>
        </div>

        {/* Google Business Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=SAAB+Multimarcas+Presidente+Prudente"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0F5FA8] hover:text-[#D4A853] transition-colors font-semibold"
          >
            Ver fotos e avaliações no Google Maps
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
