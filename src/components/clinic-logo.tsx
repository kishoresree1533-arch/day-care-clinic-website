import { cn } from "@/lib/utils";

/** Clinic logo mark: a heart-and-pulse emblem in a teal field. */
export function ClinicMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn("h-10 w-10", className)} aria-hidden="true">
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" className="fill-teal-mist" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5" />
      <path
        d="M24 36c-6.6-4.6-11-9-11-13.6C13 18.6 15.8 16 19.2 16c2 0 3.8 1 4.8 2.6 1-1.6 2.8-2.6 4.8-2.6C32.2 16 35 18.6 35 22.4c0 4.6-4.4 9-11 13.6Z"
        className="fill-teal-deep"
      />
      <path
        d="M15 25h5.2l2-4.4 3 8 2.4-5h5.4"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ClinicLogo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <ClinicMark className={invert ? "h-10 w-10 text-teal-soft" : undefined} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-semibold tracking-tight",
            invert ? "text-cream" : "text-navy-deep",
          )}
        >
          Day Care Clinic
        </span>
        <span
          className={cn(
            "eyebrow mt-1 text-[0.58rem]",
            invert ? "text-teal" : "text-teal-deep",
          )}
        >
          Kovilpalayam · Coimbatore
        </span>
      </span>
    </span>
  );
}
