"use client";

import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import { useEffect } from "react";

export default function WhatsAppButton() {
  useEffect(() => {
    // Force green background aggressively
    const forceGreen = () => {
      // Find all possible button elements
      const selectors = [
        '.rww-widget-button',
        'button[class*="rww"]',
        'button[class*="widget"]',
        'div[class*="rww-widget-button"]',
        '[class*="whatsapp"] button'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.setProperty('background-color', '#25D366', 'important');
            element.style.setProperty('background', '#25D366', 'important');
            element.style.setProperty('background-image', 'none', 'important');
            
            // Also apply to children
            const children = element.querySelectorAll('*');
            children.forEach(child => {
              if (child instanceof HTMLElement) {
                child.style.setProperty('background-color', '#25D366', 'important');
                child.style.setProperty('background', '#25D366', 'important');
              }
            });
          }
        });
      });
    };

    // Run immediately
    forceGreen();

    // Run periodically to catch dynamic changes
    const interval = setInterval(forceGreen, 100);

    // Also run on mutations
    const observer = new MutationObserver(forceGreen);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
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
