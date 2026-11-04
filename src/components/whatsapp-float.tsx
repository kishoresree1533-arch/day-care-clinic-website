import { site, whatsappLink } from "@/lib/site-config";

/** Floating WhatsApp action, present on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hello Day Care Clinic, I have a question.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 shadow-[0_16px_36px_-10px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-110 lg:bottom-8 lg:right-8"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.8-5c-.6-1-1-2-.8-2.9.1-.5.6-1.2 1.1-1.5h.9c.3 0 .5.2.7.7l.8 1.8c.1.3 0 .5-.2.7l-.5.6c-.2.2-.2.4-.1.6a8 8 0 0 0 3.4 3c.3.1.5.1.7-.1l.7-.8c.2-.3.4-.3.7-.2l1.8.9c.3.1.5.3.5.6 0 .2 0 .4-.1.5Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-deep px-4 py-2 text-xs font-semibold text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Chat with us · Open 24/7
      </span>
      <span className="sr-only">WhatsApp {site.phoneDisplay}</span>
    </a>
  );
}
