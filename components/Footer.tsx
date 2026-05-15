"use client";

import { motion } from "framer-motion";
import { Instagram, MessageCircle, MapPin, Phone, Mail, Clock, ArrowRight, Shield } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary overflow-hidden pt-24 pb-12">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <Logo size="md" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Excelência e confiança no mercado automotivo de Presidente Prudente. Sua jornada para o carro ideal começa aqui, com transparência e as melhores condições.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/saab_multimarcas/"
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/5518997251860"
                target="_blank"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:border-green-500 transition-all"
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Navegação</h4>
            <ul className="space-y-4">
              {[
                { label: "Início", href: "/" },
                { label: "Estoque", href: "/estoque" },
                { label: "Sobre", href: "/#sobre" },
                { label: "Serviços", href: "/#servicos" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contato", href: "/#contato" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-400 hover:text-accent text-sm font-light transition-all flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Contato</h4>
            <ul className="space-y-6">
              <li>
                <a href="tel:+5518997251860" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Ligue agora</span>
                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-accent transition-colors">(18) 99725-1860</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:Adm.saabmultimarcas@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">E-mail</span>
                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-accent transition-colors break-all">Adm.saabmultimarcas@gmail.com</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Localização</span>
                  <span className="text-slate-300 text-sm font-light">Av. Joaquim Constantino, 1868 - Pres. Prudente/SP</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Operation Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Horários</h4>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Clock size={18} className="text-accent" />
                <span className="text-white font-bold text-sm">Funcionamento</span>
              </div>
              <div className="space-y-4 text-sm font-light">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400">Seg - Sex</span>
                  <span className="text-white font-bold tracking-tight">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400">Sábado</span>
                  <span className="text-white font-bold tracking-tight">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Domingo</span>
                  <span className="text-slate-600 italic">Fechado</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-slate-500 text-xs font-light">
              &copy; {currentYear} <span className="text-white font-bold">SAAB Multimarcas</span>. Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/5">
             <Shield size={14} className="text-accent" />
             <span className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Procedência Garantida</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black">
              Crafted by{" "}
              <a href="https://www.instagram.com/gustavocortez.dev/" target="_blank" className="text-accent hover:text-white transition-colors">
                Gustavo Cortez
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

