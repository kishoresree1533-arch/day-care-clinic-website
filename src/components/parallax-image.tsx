import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial parallax image: the photo drifts gently as the block scrolls.
 * Uses GSAP ScrollTrigger, loaded lazily in the browser only (SSR-safe).
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  drift = 9,
  width,
  height,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  drift?: number;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let tween: { kill: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapRef.current || !imgRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      tween = gsap.fromTo(
        imgRef.current,
        { yPercent: -drift },
        {
          yPercent: drift,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    })();

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [drift]);

  return (
    <div ref={wrapRef} className={cn("overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={cn("h-[118%] w-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
}
