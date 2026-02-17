"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Shield } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#004c97] shadow-lg py-2"
          : "bg-[#004c97]/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#" className="block">
              <Logo size="sm" />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="text-white hover:text-[#ddb963] font-medium transition-colors relative group"
              >
                {item.name}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-[#ddb963]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-white border-r border-white/30 pr-4">
              <a href="tel:+5518997251860" className="flex items-center gap-2 hover:text-[#ddb963] transition-colors">
                <Phone size={16} />
                <span>(18) 99725-1860</span>
              </a>
            </div>
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#ddb963] text-[#004c97] px-6 py-2.5 rounded-lg font-bold hover:bg-[#e8c77d] transition-colors cursor-pointer"
            >
              Fale Conosco
            </motion.a>
            
            {/* Admin Access Icon */}
            <Link href="/admin/login">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                title="Acesso Administrativo"
              >
                <Shield size={20} className="text-white/60 group-hover:text-[#ddb963] transition-colors" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-4 py-6 border-t border-white/20 mt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#ddb963] font-medium transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
              <a
                href="tel:+5518997251860"
                className="flex items-center gap-2 text-white hover:text-[#ddb963] transition-colors"
              >
                <Phone size={18} />
                <span>(18) 99725-1860</span>
              </a>
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#ddb963] text-[#004c97] px-6 py-3 rounded-lg font-bold text-center hover:bg-[#e8c77d] transition-colors cursor-pointer"
              >
                Fale Conosco
              </a>
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-white/60 hover:text-[#ddb963] transition-colors py-2"
              >
                <Shield size={18} />
                <span className="text-sm">Acesso Admin</span>
              </Link>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
