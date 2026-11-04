import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Editorial page masthead used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-16 pt-36 text-cream lg:pb-24 lg:pt-44">
      {image && (
        <>
          <motion.img
            src={image}
            alt={imageAlt ?? ""}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.28, scale: 1 }}
            transition={{ duration: 1.6, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow flex items-center gap-3 text-teal"
        >
          <span className="hairline w-10" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="text-balance-title mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 lg:text-lg"
        >
          {description}
        </motion.p>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
