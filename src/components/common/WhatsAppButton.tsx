import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function WhatsAppButton() {
  const { settings } = useSiteSettings();

  // Remove all non-digits from phone number
  const phoneNumber = settings.footerPhone.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/55${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-soft"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
