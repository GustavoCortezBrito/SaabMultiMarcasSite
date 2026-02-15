"use client";

import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import { useEffect } from "react";

export default function WhatsAppButton() {
  useEffect(() => {
    // Force green background after component mounts
    const interval = setInterval(() => {
      const button = document.querySelector('.rww-widget-button');
      if (button) {
        (button as HTMLElement).style.backgroundColor = '#25D366';
        (button as HTMLElement).style.background = '#25D366';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <WhatsAppWidget
      phoneNumber="5518997251860"
      companyName="SAAB Multimarcas"
      message="Olá! Gostaria de mais informações sobre os veículos disponíveis."
      sendButton="Enviar"
      placeholder="Digite sua mensagem..."
      replyTimeText="Responde em minutos"
      textReplyTime="Normalmente responde em alguns minutos"
    />
  );
}
