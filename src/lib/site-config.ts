/**
 * Single source of truth for clinic contact details.
 * Update the phone / WhatsApp number here when the real one is confirmed —
 * every call button, form and floating action reads from this file.
 */
export const site = {
  name: "Day Care Clinic",
  fullName: "Day Care Clinic, Kovilpalayam",
  tagline: "Care, around the clock.",
  addressLine1: "Sathy Road, Kovilpalayam",
  addressLine2: "Coimbatore – 641107, Tamil Nadu",
  hours: "Open 24 hours, every day",
  // PLACEHOLDER — replace with the clinic's real number.
  phoneDisplay: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsappNumber: "919000000000",
};

export const mapsQuery = `Day Care Clinic, Sathy Road, Kovilpalayam, Coimbatore 641107`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  mapsQuery,
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  mapsQuery,
)}`;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/treatments", label: "Treatments" },
  { to: "/facilities", label: "Facilities" },
  { to: "/doctors", label: "Doctors & Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;
