"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#004c97] via-[#003366] to-[#004c97] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm0 3.657l10.485 10.485-1.414 1.414L32 6.485 22.929 15.556l-1.414-1.414L32 3.657z' fill='%23D4A853' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <Logo size="md" className="mb-6" />
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Revenda de veículos seminovos, usados e zero km em Presidente Prudente com financiamento facilitado e atendimento transparente.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/saab_multimarcas/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-[#ddb963] transition-all group cursor-pointer"
              >
                <Instagram size={20} className="text-white group-hover:text-[#004c97] transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5518997251860"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-[#25D366] transition-all group cursor-pointer"
              >
                <MessageCircle size={20} className="text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Links Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-xl font-bold text-[#ddb963] mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#ddb963] rounded-full" />
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "/" },
                { label: "Estoque", href: "/estoque" },
                { label: "Sobre Nós", href: "/#sobre" },
                { label: "Serviços", href: "/#servicos" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contato", href: "/#contato" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-[#ddb963] transition-colors text-sm flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ddb963] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-xl font-bold text-[#ddb963] mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#ddb963] rounded-full" />
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+5518997251860" 
                  className="text-white/80 hover:text-[#ddb963] transition-colors text-sm flex items-start gap-3 group cursor-pointer"
                >
                  <Phone size={18} className="text-[#ddb963] mt-0.5 flex-shrink-0" />
                  <span>(18) 99725-1860</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Adm.saabmultimarcas@gmail.com" 
                  className="text-white/80 hover:text-[#ddb963] transition-colors text-sm flex items-start gap-3 group cursor-pointer"
                >
                  <Mail size={18} className="text-[#ddb963] mt-0.5 flex-shrink-0" />
                  <span>Adm.saabmultimarcas@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP,+19050-220" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#ddb963] transition-colors text-sm flex items-start gap-3 group cursor-pointer"
                >
                  <MapPin size={18} className="text-[#ddb963] mt-0.5 flex-shrink-0" />
                  <span>
                    Av. Joaquim Constantino, 1868<br />
                    Vila Formosa<br />
                    Pres. Prudente - SP
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Horário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-xl font-bold text-[#ddb963] mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#ddb963] rounded-full" />
              Horário
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#ddb963] mt-0.5 flex-shrink-0" />
                <div className="text-white/80">
                  <p className="font-semibold text-white mb-2">Funcionamento:</p>
                  <p>Segunda a Sexta<br /><span className="text-[#ddb963]">08:00 - 18:00</span></p>
                  <p className="mt-2">Sábado<br /><span className="text-[#ddb963]">08:00 - 12:00</span></p>
                  <p className="mt-2">Domingo<br /><span className="text-white/50">Fechado</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/70 text-sm">
              &copy; 2026 SAAB Multimarcas. Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-xs">
              Desenvolvido por{" "}
              <a
                href="https://www.instagram.com/gustavocortez.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ddb963] hover:text-[#e8c77d] transition-colors font-semibold cursor-pointer"
              >
                Gustavo Cortez de Brito
              </a>
              , Dev Web
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
