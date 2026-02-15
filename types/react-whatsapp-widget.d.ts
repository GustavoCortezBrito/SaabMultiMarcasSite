declare module 'react-whatsapp-widget' {
  import { FC } from 'react';

  interface WhatsAppWidgetProps {
    phoneNumber: string;
    companyName?: string;
    message?: string;
    sendButton?: string;
    placeholder?: string;
    replyTimeText?: string;
    textReplyTime?: string;
  }

  export const WhatsAppWidget: FC<WhatsAppWidgetProps>;
}
