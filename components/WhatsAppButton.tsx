'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';

export default function WhatsAppButton() {
  return (
    <FloatingWhatsApp
      phoneNumber="5518997251860"
      accountName="SAAB Multimarcas"
      avatar="/saab-logo.png"
      statusMessage="Normalmente responde em alguns minutos"
      chatMessage="Olá! 🚗 Como podemos ajudá-lo?"
      placeholder="Digite uma mensagem..."
      allowEsc={true}
      allowClickAway={true}
      notification
      notificationDelay={60}
      darkMode={false}
    />
  );
}
