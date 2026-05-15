"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Shield, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Estoque", href: "/#veiculos" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Serviços", href: "/#servicos" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contato", href: "/#contato" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-primary/90 backdrop-blur-xl shadow-premium py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="block transition-transform hover:scale-105 active:scale-95">
              <Logo size={isScrolled ? "sm" : "md"} />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-slate-200 hover:text-accent font-medium transition-all relative group text-sm uppercase tracking-widest"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end border-r border-white/10 pr-6">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Fale conosco</span>
              <a href="tel:+5518997251860" className="flex items-center gap-2 text-white hover:text-accent transition-colors font-bold tracking-tight">
                <Phone size={14} className="text-accent" />
                <span>(18) 99725-1860</span>
              </a>
            </div>
            
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium btn-gold !py-2.5 !px-5 text-sm"
            >
              Fale Conosco
              <ArrowRight size={16} />
            </motion.a>
            
            {/* Admin Access Icon */}
            <Link href="/admin/login">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group border border-white/5"
                title="Acesso Administrativo"
              >
                <Shield size={18} className="text-slate-400 group-hover:text-accent transition-colors" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="lg:hidden overflow-hidden bg-secondary/95 backdrop-blur-2xl rounded-3xl mt-4 border border-white/5 shadow-2xl"
            >
              <nav className="flex flex-col gap-2 p-6">
                {navItems.map((item, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-200 hover:text-accent font-medium transition-all py-3 px-4 rounded-xl hover:bg-white/5 flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </motion.a>
                ))}
                
                <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-4">
                  <a
                    href="tel:+5518997251860"
                    className="flex items-center justify-between gap-2 text-white bg-white/5 p-4 rounded-2xl border border-white/5"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">Ligar agora</span>
                      <span className="font-bold">(18) 99725-1860</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                      <Phone size={18} />
                    </div>
                  </a>
                  
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-slate-500 hover:text-accent transition-colors py-2"
                  >
                    <Shield size={16} />
                    <span className="text-xs uppercase tracking-tighter">Área Restrita</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

