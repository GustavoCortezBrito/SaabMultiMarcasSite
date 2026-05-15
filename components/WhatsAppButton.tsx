'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

export default function WhatsAppButton() {
  return (
    <FloatingWhatsApp
      phoneNumber="5518997251860"
      accountName="SAAB Multimarcas"
      avatar="/saab-logo.png"
      statusMessage="Online"
      chatMessage="Olá! 🚗 Seja bem-vindo à SAAB Multimarcas. Como podemos te ajudar a encontrar seu próximo carro hoje?"
      placeholder="Escreva sua mensagem..."
      allowEsc={true}
      allowClickAway={true}
      notification
      notificationDelay={30}
      darkMode={true}
    />
  );
}

