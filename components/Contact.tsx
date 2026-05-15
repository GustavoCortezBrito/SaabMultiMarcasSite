"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, ExternalLink } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Enviar para FormSubmit
    const form = e.currentTarget;
    const formDataToSend = new FormData(form);
    
    try {
      await fetch("https://formsubmit.co/Adm.saabmultimarcas@gmail.com", {
        method: "POST",
        body: formDataToSend,
      });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }

    // Abrir WhatsApp com a mensagem
    const whatsappMessage = `Olá, meu nome é ${formData.nome} e vim pelo site.%0A%0AEmail: ${formData.email}%0ATelefone: ${formData.telefone}%0A%0AMensagem: ${formData.mensagem}`;
    const whatsappUrl = `https://wa.me/5518997251860?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, "_blank");
    
    // Limpar formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      mensagem: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      label: "Telefone",
      value: "(18) 99725-1860",
      href: "tel:+5518997251860"
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      value: "(18) 99725-1860",
      href: "https://wa.me/5518997251860"
    },
    {
      icon: <Mail size={20} />,
      label: "E-mail",
      value: "Adm.saabmultimarcas@gmail.com",
      href: "mailto:Adm.saabmultimarcas@gmail.com"
    },
    {
      icon: <MapPin size={20} />,
      label: "Endereço",
      value: "Av. Joaquim Constantino, 1868 - Pres. Prudente/SP",
      href: "https://maps.google.com/?q=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP,+19050-220"
    },
    {
      icon: <Clock size={20} />,
      label: "Horário",
      value: "Seg-Sex: 08:00-18:00 | Sáb: 08:00-12:00",
      href: "#"
    }
  ];

  return (
    <section id="contato" ref={ref} className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Entre em <span className="text-gradient-gold">Contato</span>
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para tirar suas dúvidas e ajudar você a conquistar seu próximo veículo.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-24">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-surface border border-slate-100 hover:border-accent group transition-all duration-500 overflow-hidden"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg]">
                  {info.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">{info.label}</span>
                  <span className="text-primary font-bold tracking-tight group-hover:text-accent transition-colors text-sm md:text-base break-words block">{info.value}</span>
                </div>
                <ExternalLink size={14} className="text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 hidden md:block" />
              </motion.a>
            ))}
          </div>
          
          {/* Modern Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 bg-primary p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-premium relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl -z-0" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">Envie uma Mensagem</h3>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 md:gap-6">
                <input type="hidden" name="_subject" value="Nova mensagem do site SAAB Multimarcas" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-black text-slate-500 tracking-widest ml-4">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Como podemos te chamar?"
                    required
                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-black text-slate-500 tracking-widest ml-4">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2 md:col-span-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-black text-slate-500 tracking-widest ml-4">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2 md:col-span-2">
                  <label className="text-[9px] md:text-[10px] uppercase font-black text-slate-500 tracking-widest ml-4">Sua Mensagem</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="No que podemos te ajudar hoje?"
                    rows={4}
                    required
                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 resize-none text-sm md:text-base"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-premium btn-gold w-full !py-4 md:!py-5 text-base md:text-lg"
                  >
                    <Send size={20} />
                    Enviar agora
                  </motion.button>
                  <p className="text-[9px] md:text-[10px] text-slate-500 text-center mt-6 uppercase tracking-widest font-medium">
                    Aprovação de financiamento em até 24 horas
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Premium Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative rounded-[3rem] overflow-hidden shadow-premium border border-slate-100 group"
        >
          <div className="absolute inset-0 bg-primary/20 pointer-events-none z-10 group-hover:opacity-0 transition-opacity duration-700" />
          <iframe
            src="https://www.google.com/maps?q=Av.+Joaquim+Constantino,+1868,+Vila+Formosa,+Presidente+Prudente,+SP,+19050-220&output=embed"
            width="100%"
            height="500"
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2) invert(0)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização SAAB Multimarcas"
          />
          <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
             <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl inline-flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                   <p className="text-xs uppercase font-black text-slate-400 tracking-widest">Onde estamos</p>
                   <p className="font-bold text-primary">Av. Joaquim Constantino, 1868</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

