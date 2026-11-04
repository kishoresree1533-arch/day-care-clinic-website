import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { navLinks, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/85 py-2.5 shadow-[0_10px_40px_-24px_oklch(0.3_0.058_252/0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" aria-label="Day Care Clinic — home" className="shrink-0">
            <ClinicLogo />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={cn(
                  "link-underline text-[0.83rem] font-semibold tracking-wide transition-colors",
                  isActive(l.to) ? "text-teal-deep" : "text-navy/80 hover:text-navy-deep",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phoneHref}
              className="group flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-[0.83rem] font-semibold text-navy transition-colors hover:border-teal hover:text-teal-deep"
            >
              <Phone className="h-3.5 w-3.5 text-teal-deep transition-transform duration-300 group-hover:-rotate-12" />
              {site.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2.5 text-[0.83rem] font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy hover:shadow-[0_14px_30px_-12px_oklch(0.3_0.058_252/0.5)]"
            >
              <CalendarCheck className="h-4 w-4 text-teal transition-transform duration-300 group-hover:scale-110" />
              Book Appointment
            </Link>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 text-navy xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-background pt-24 xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-10" aria-label="Mobile">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <Link
                    to={l.to}
                    className={cn(
                      "block border-b border-border/60 py-4 font-display text-2xl",
                      isActive(l.to) ? "text-teal-deep" : "text-navy-deep",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full border border-border py-3.5 font-semibold text-navy"
              >
                <Phone className="h-4 w-4 text-teal-deep" /> Call {site.phoneDisplay}
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded-full bg-navy-deep py-3.5 font-semibold text-primary-foreground"
              >
                <CalendarCheck className="h-4 w-4 text-teal" /> Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
