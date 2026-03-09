import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import usePublicSite from "@/hooks/usePublicSite";

function toAbs(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://mitiendaenlineamx.com.mx${url.startsWith("/") ? "" : "/"}${url}`;
}

// Lee el tamaño real de una imagen (client-side)
function useImageSize(src) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!src) return;

    let alive = true;
    const img = new Image();

    img.onload = () => {
      if (!alive) return;
      setSize({ w: img.naturalWidth || 0, h: img.naturalHeight || 0 });
    };

    img.onerror = () => {
      if (!alive) return;
      setSize({ w: 0, h: 0 });
    };

    img.src = src;

    return () => {
      alive = false;
    };
  }, [src]);

  return size;
}

export default function HeroTwo() {
  const { store, sitio, carrusel } = usePublicSite();

  const desktopFallback = useMemo(() => {
    return (
      toAbs(sitio?.img_portada) || "/assets/images/backgrounds/portada.png"
    );
  }, [sitio?.img_portada]);

  const carrusel0 = useMemo(() => {
    const first = carrusel?.[0];
    return toAbs(first) || desktopFallback;
  }, [carrusel, desktopFallback]);

  // Grupo de imágenes para slider
  const heroImgs = useMemo(() => {
    if (!Array.isArray(carrusel)) return [carrusel0];

    const indices = [0, 6, 7, 8, 9];

    const imgs = indices
      .map((i) => carrusel[i])
      .filter(Boolean)
      .map(toAbs);

    return imgs.length ? imgs : [carrusel0];
  }, [carrusel, carrusel0]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [heroImgs.length]);

  const prev = useCallback(() => {
    setIdx((p) => (p - 1 + heroImgs.length) % heroImgs.length);
  }, [heroImgs.length]);

  const next = useCallback(() => {
    setIdx((p) => (p + 1) % heroImgs.length);
  }, [heroImgs.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (heroImgs.length <= 1) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heroImgs.length, prev, next]);

  // Imagen activa para móvil y escritorio
  const activeImg = useMemo(() => {
    return heroImgs[idx] || carrusel0 || desktopFallback;
  }, [heroImgs, idx, carrusel0, desktopFallback]);

  const title = sitio?.titulo_1 || store?.name || "Perfumería";
  const description =
    sitio?.descripcion ||
    "Perfumes originales, asesoría por WhatsApp y envíos a todo México.";

  // Detectar ratio real de la imagen activa
  const { w, h } = useImageSize(activeImg);

  const imageRatio = useMemo(() => {
    if (!w || !h) return null;
    return w / h;
  }, [w, h]);

  const imageAspectRatio = useMemo(() => {
    if (!w || !h) return null;
    return `${w} / ${h}`;
  }, [w, h]);

  const isBannerImage = useMemo(() => {
    if (!imageRatio) return false;
    return imageRatio > 1.25;
  }, [imageRatio]);

  const mobileFit = useMemo(() => {
    let objectFit = "cover";
    let objectPosition = "center 20%";
    let minHeight = 430;

    if (!imageRatio) return { objectFit, objectPosition, minHeight };

    if (imageRatio < 0.85) {
      objectPosition = "center top";
      minHeight = 460;
    } else if (imageRatio <= 1.05) {
      objectPosition = "center center";
      minHeight = 420;
    } else if (imageRatio <= 1.35) {
      objectPosition = "center 30%";
      minHeight = 380;
    } else {
      objectPosition = "center center";
      minHeight = 360;
    }

    return { objectFit, objectPosition, minHeight };
  }, [imageRatio]);

  const heroClass = useMemo(() => {
    return `pa-hero ${isBannerImage ? "pa-hero--banner" : ""}`;
  }, [isBannerImage]);

  const canSlide = heroImgs.length > 1;

  return (
    <>
      <style jsx>{`
        .pa-hero {
          position: relative;
          width: 100%;
          min-height: 520px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .pa-hero__media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          background: #fff;
        }

        .pa-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .navBtn {
          pointer-events: auto;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.12s ease, background 0.12s ease, opacity 0.12s ease;
          opacity: 0.92;
          user-select: none;
        }

        .navBtn:hover {
          transform: translateY(-50%) scale(1.05);
          background: rgba(0, 0, 0, 0.35);
          opacity: 1;
        }

        .navBtn:active {
          transform: translateY(-50%) scale(0.98);
        }

        .navBtn--left {
          left: 12px;
        }

        .navBtn--right {
          right: 12px;
        }

        .navIcon {
          width: 18px;
          height: 18px;
          border-right: 3px solid rgba(255, 255, 255, 0.95);
          border-bottom: 3px solid rgba(255, 255, 255, 0.95);
        }

        .navIcon--left {
          transform: rotate(135deg);
          margin-left: 3px;
        }

        .navIcon--right {
          transform: rotate(-45deg);
          margin-right: 3px;
        }

        .dots {
          pointer-events: auto;
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.45);
        }

        .dot--on {
          background: rgba(255, 255, 255, 0.95);
        }

        .pa-hero__content {
          position: relative;
          width: 100%;
          padding: 80px 0;
          z-index: 2;
        }

        @media (max-width: 991px) {
          .pa-hero:not(.pa-hero--banner) {
            min-height: ${mobileFit.minHeight}px;
          }

          .pa-hero:not(.pa-hero--banner) .pa-hero__media {
            object-fit: ${mobileFit.objectFit};
            object-position: ${mobileFit.objectPosition};
            background: #fff;
          }

          .pa-hero__content {
            padding: 40px 0;
          }

          .navBtn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 991px) {
          .pa-hero--banner {
            min-height: 0 !important;
            height: auto;
            ${imageAspectRatio ? `aspect-ratio: ${imageAspectRatio};` : ""}
            display: block;
          }

          .pa-hero--banner .pa-hero__media {
            object-fit: contain;
            object-position: center center;
            background: transparent;
          }

          .pa-hero--banner .pa-hero__content {
            padding: 0 !important;
            height: 0;
            overflow: hidden;
          }
        }

        .srOnly {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      <section className={heroClass}>
        <img
          className="pa-hero__media"
          src={activeImg}
          alt={title}
          loading="eager"
        />

        {canSlide && (
          <div className="pa-hero__overlay">
            <button
              className="navBtn navBtn--left"
              onClick={prev}
              aria-label="Anterior"
              type="button"
            >
              <span className="srOnly">Anterior</span>
              <span className="navIcon navIcon--left" />
            </button>

            <button
              className="navBtn navBtn--right"
              onClick={next}
              aria-label="Siguiente"
              type="button"
            >
              <span className="srOnly">Siguiente</span>
              <span className="navIcon navIcon--right" />
            </button>

            <div className="dots" aria-label="Indicadores">
              {heroImgs.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === idx ? "dot--on" : ""}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="container">
          <div className="pa-hero__content">
            <div className="pa-hero__inner">
              {/* <h1 className="pa-hero__title">{title}</h1>
              <p className="pa-hero__desc">{description}</p>
              <Link href="/tienda" className="pa-hero__btn">
                Compra ya
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}