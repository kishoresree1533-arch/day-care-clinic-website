import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { mapsDirectionsUrl, navLinks, site, whatsappLink } from "@/lib/site-config";

const serviceLinks = [
  { to: "/services", label: "General Consultations" },
  { to: "/services", label: "Pediatric Care" },
  { to: "/services", label: "Diagnostics & Laboratory" },
  { to: "/services", label: "In-house Pharmacy" },
  { to: "/treatments", label: "Day Care Procedures" },
  { to: "/facilities", label: "Facilities" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:px-8 lg:py-20">
        <div>
          <ClinicLogo invert />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
            Accessible, round-the-clock family healthcare on Sathy Road —
            walk-in consultations, day care treatments and diagnostics under one
            calm roof.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal">
            <Clock className="h-3.5 w-3.5" /> OPEN 24/7 · ALL DAYS
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-teal">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="transition-colors hover:text-teal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-teal">Popular services</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-teal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-teal">Reach us</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </span>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 transition-colors hover:text-teal">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Hello, I'd like to enquire about the Day Care Clinic.")}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 transition-colors hover:text-teal"
              >
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 fill-teal" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.8-5c-.6-1-1-2-.8-2.9.1-.5.6-1.2 1.1-1.5h.9c.3 0 .5.2.7.7l.8 1.8c.1.3 0 .5-.2.7l-.5.6c-.2.2-.2.4-.1.6a8 8 0 0 0 3.4 3c.3.1.5.1.7-.1l.7-.8c.2-.3.4-.3.7-.2l1.8.9c.3.1.5.3.5.6 0 .2 0 .4-.1.5Z" />
                </svg>
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-teal underline-offset-4 hover:underline"
              >
                Get directions on Google Maps →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/50 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}, Kovilpalayam, Coimbatore. All rights reserved.</p>
          <p className="text-cream/40">In a medical emergency, please call or walk in — we are open 24/7.</p>
        </div>
      </div>
    </footer>
  );
}
