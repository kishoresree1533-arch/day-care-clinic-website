import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-navy-deep outline-none transition-all placeholder:text-muted-foreground/60 focus:border-teal focus:ring-4 focus:ring-teal/15";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy/70";

/**
 * Appointment enquiry form — composes the enquiry and opens WhatsApp,
 * so the clinic receives it on the number they already use.
 */
export function AppointmentForm({ className }: { className?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", concern: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; date?: string }>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: { name?: string; phone?: string; date?: string } = {};
    if (form.name.trim().length < 2) next.name = "Please share the patient's name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.date) next.date = "Please pick a preferred date.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      "Hello Day Care Clinic, I'd like to book an appointment.",
      "",
      `Patient name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Preferred date: ${form.date}`,
      form.time ? `Preferred time: ${form.time}` : "Preferred time: flexible",
      form.concern ? `Reason for visit: ${form.concern.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(lines), "_blank", "noopener");
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex flex-col items-center rounded-3xl border border-teal/30 bg-teal-mist/60 px-8 py-14 text-center",
          className,
        )}
      >
        <CheckCircle2 className="h-12 w-12 text-teal-deep" />
        <h3 className="mt-4 font-display text-2xl text-navy-deep">Enquiry ready to send</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy/70">
          We've opened WhatsApp with your details filled in — just press send and
          our front desk will confirm your appointment shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-teal-deep underline-offset-4 hover:underline"
        >
          Make another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn("space-y-5", className)} aria-label="Appointment enquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apt-name" className={labelClass}>Patient name</label>
          <input id="apt-name" className={inputClass} placeholder="Full name" value={form.name} onChange={set("name")} maxLength={80} />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="apt-phone" className={labelClass}>Phone number</label>
          <input id="apt-phone" type="tel" className={inputClass} placeholder={site.phoneDisplay} value={form.phone} onChange={set("phone")} maxLength={16} />
          {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apt-date" className={labelClass}>Preferred date</label>
          <input id="apt-date" type="date" className={inputClass} value={form.date} onChange={set("date")} />
          {errors.date && <p className="mt-1.5 text-xs text-destructive">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="apt-time" className={labelClass}>Preferred time</label>
          <select id="apt-time" className={inputClass} value={form.time} onChange={set("time")}>
            <option value="">Flexible / any time</option>
            <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
            <option value="Afternoon (12 PM – 5 PM)">Afternoon (12 PM – 5 PM)</option>
            <option value="Evening (5 PM – 9 PM)">Evening (5 PM – 9 PM)</option>
            <option value="Night (9 PM – 8 AM)">Late night (urgent)</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="apt-concern" className={labelClass}>Reason for visit <span className="normal-case text-muted-foreground">(optional)</span></label>
        <textarea id="apt-concern" rows={3} className={cn(inputClass, "resize-none")} placeholder="Symptoms or concern, in a line or two" value={form.concern} onChange={set("concern")} maxLength={500} />
      </div>
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-navy-deep px-8 py-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy hover:shadow-[0_18px_40px_-16px_oklch(0.3_0.058_252/0.55)]"
      >
        <CalendarCheck className="h-4.5 w-4.5 text-teal transition-transform duration-300 group-hover:scale-110" />
        Send Enquiry via WhatsApp
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <MessageCircle className="h-3.5 w-3.5 text-teal-deep" />
        Your enquiry opens in WhatsApp — nothing is shared with anyone else. For
        emergencies, please call {site.phoneDisplay}.
      </p>
    </form>
  );
}
