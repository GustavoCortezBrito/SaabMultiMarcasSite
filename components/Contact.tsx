"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
      await fetch("https://formsubmit.co/gustavocortezdebrito@gmail.com", {
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

  return (
    <section id="contato" ref={ref} className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F5FA8] mb-4">
            Entre em <span className="text-[#D4A853]">Contato</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Encontre o carro ideal com segurança, agilidade e confiança
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#0F5FA8] mb-8">Fale Conosco</h3>
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <a href="tel:+5518997251860" className="text-[#0F5FA8] font-semibold hover:text-[#D4A853] transition-colors cursor-pointer">
                    (18) 99725-1860
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <a href="https://wa.me/5518997251860" target="_blank" rel="noopener noreferrer" className="text-[#0F5FA8] font-semibold hover:text-[#D4A853] transition-colors cursor-pointer">
                    (18) 99725-1860
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-mail</p>
                  <a href="mailto:contato@saabmultimarcas.com.br" className="text-[#0F5FA8] font-semibold hover:text-[#D4A853] transition-colors cursor-pointer">
                    contato@saabmultimarcas.com.br
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <a 
                    href="https://maps.google.com/?q=Av.+Joaquim+Constantino,+1868+-+Vila+Formosa,+Pres.+Prudente+-+SP,+19050-220" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0F5FA8] font-semibold hover:text-[#D4A853] transition-colors cursor-pointer"
                  >
                    Av. Joaquim Constantino, 1868<br />
                    Vila Formosa - Pres. Prudente/SP
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-[#D4A853] p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Horário</p>
                  <span className="text-[#0F5FA8] font-semibold">
                    Seg-Sex: 08:00-18:00<br />
                    Sáb: 08:00-12:00
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#0F5FA8] mb-6">Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="Nova mensagem do site SAAB Multimarcas" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_autoresponse" value="Obrigado pelo contato! Em breve retornaremos." />
              
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu Nome"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none transition-colors"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu E-mail"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none transition-colors"
              />
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Seu Telefone"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none transition-colors"
              />
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Sua Mensagem"
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none transition-colors resize-none"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#D4A853] to-[#f4d084] text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Enviar para Email e WhatsApp
              </motion.button>
              <p className="text-xs text-gray-500 text-center">
                Ao enviar, você receberá um email de confirmação e será redirecionado para o WhatsApp
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
