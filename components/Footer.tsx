"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0F5FA8] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Logo size="sm" className="mb-4" />
            <p className="text-white text-sm leading-relaxed">
              Revenda de veículos seminovos, usados e zero km em Presidente Prudente. Compra, venda e troca com financiamento facilitado e atendimento transparente.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-[#D4A853] mb-4">Navegação</h4>
            <ul className="space-y-2 text-white text-sm">
              <li><a href="/" className="hover:text-[#D4A853] transition-colors cursor-pointer">Início</a></li>
              <li><a href="/estoque" className="hover:text-[#D4A853] transition-colors cursor-pointer">Estoque</a></li>
              <li><a href="/#sobre" className="hover:text-[#D4A853] transition-colors cursor-pointer">Sobre Nós</a></li>
              <li><a href="/#servicos" className="hover:text-[#D4A853] transition-colors cursor-pointer">Serviços</a></li>
              <li><a href="/#contato" className="hover:text-[#D4A853] transition-colors cursor-pointer">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-[#D4A853] mb-4">Contato</h4>
            <ul className="space-y-2 text-white text-sm mb-4">
              <li>
                <a href="tel:+5518997251860" className="hover:text-[#D4A853] transition-colors">
                  (18) 99725-1860
                </a>
              </li>
              <li>
                <a href="mailto:contato@saabmultimarcas.com.br" className="hover:text-[#D4A853] transition-colors">
                  contato@saabmultimarcas.com.br
                </a>
              </li>
              <li className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP,+19050-220" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#D4A853] transition-colors"
                >
                  Av. Joaquim Constantino, 1868<br />
                  Vila Formosa<br />
                  Pres. Prudente - SP
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[#D4A853] font-semibold">Horário:</span><br />
                Seg-Sex: 08:00-18:00<br />
                Sáb: 08:00-12:00<br />
                Dom: Fechado
              </li>
            </ul>
            
            <h4 className="text-lg font-bold text-[#D4A853] mb-3">Redes Sociais</h4>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://www.instagram.com/saab_multimarcas/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4A853] p-3 rounded-lg hover:bg-[#f4d084] transition-colors"
              >
                <Instagram size={20} className="text-[#0F5FA8]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                href="https://wa.me/5518997251860"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4A853] p-3 rounded-lg hover:bg-[#f4d084] transition-colors"
              >
                <MessageCircle size={20} className="text-[#0F5FA8]" />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white text-sm">
          <p className="mb-2">&copy; 2026 SAAB Multimarcas. Todos os direitos reservados.</p>
          <p className="text-white/70 text-xs">
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/gustavocortez.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A853] hover:text-[#f4d084] transition-colors font-semibold cursor-pointer"
            >
              Gustavo Cortez de Brito
            </a>
            , Dev Web
          </p>
        </div>
      </div>
    </footer>
  );
}
