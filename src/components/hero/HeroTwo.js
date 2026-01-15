import React, { useEffect, useMemo, useState } from "react";
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

  const desktopImg = useMemo(() => {
    return (
      toAbs(sitio?.img_portada) || "/assets/imags/backgrounds/main-slider-bg.jpg"
    );
  }, [sitio?.img_portada]);

  // ✅ Mobile: carrusel[0], si no existe usa portada
  const mobileImg = useMemo(() => {
    const first = carrusel?.[0];
    return toAbs(first) || desktopImg;
  }, [carrusel, desktopImg]);

  const title = sitio?.titulo_1 || store?.name || "Perfumería";
  const description =
    sitio?.descripcion ||
    "Perfumes originales, asesoría por WhatsApp y envíos a todo México.";

  // Detectar ratio real del móvil
  const { w: mw, h: mh } = useImageSize(mobileImg);

  const mobileRatio = useMemo(() => {
    if (!mw || !mh) return null;
    return mw / mh;
  }, [mw, mh]);

  // ✅ aspect-ratio en formato CSS: "1536 / 691"
  const mobileAspectRatio = useMemo(() => {
    if (!mw || !mh) return null;
    return `${mw} / ${mh}`;
  }, [mw, mh]);

  // ✅ Detecta flyer/banner (muy horizontal) => NO recortar en móvil
  const isBannerImage = useMemo(() => {
    if (!mobileRatio) return false;
    return mobileRatio > 1.25; // flyers/promos tipo anuncio
  }, [mobileRatio]);

  // Ajustes para móviles según ratio (cuando NO es banner)
  const mobileFit = useMemo(() => {
    let objectFit = "cover";
    let objectPosition = "center 20%";
    let minHeight = 430;

    if (!mobileRatio) {
      return { objectFit, objectPosition, minHeight };
    }

    if (mobileRatio < 0.85) {
      objectPosition = "center top";
      minHeight = 460;
    } else if (mobileRatio <= 1.05) {
      objectPosition = "center center";
      minHeight = 420;
    } else if (mobileRatio <= 1.35) {
      objectPosition = "center 30%";
      minHeight = 380;
    } else {
      objectPosition = "center center";
      minHeight = 360;
    }

    return { objectFit, objectPosition, minHeight };
  }, [mobileRatio]);

  const heroClass = useMemo(() => {
    return `pa-hero ${isBannerImage ? "pa-hero--banner" : ""}`;
  }, [isBannerImage]);

  return (
    <>
      <style jsx>{`
        .pa-hero {
          position: relative;
          width: 100%;
          min-height: 520px; /* desktop base */
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .pa-hero__media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain; /* desktop: no pierde nada */
          object-position: center center;
          background: #fff;
        }

        .pa-hero__content {
          position: relative;
          width: 100%;
          padding: 80px 0;
          z-index: 2;
        }

        .pa-hero__inner {
          max-width: 640px;
        }

        .pa-hero__title {
          margin: 0 0 14px;
          font-size: 56px;
          line-height: 1.08;
          font-weight: 800;
          color: #111;
        }

        .pa-hero__desc {
          margin: 0 0 26px;
          font-size: 18px;
          line-height: 1.5;
          color: #444;
          max-width: 560px;
        }

        .pa-hero__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 22px;
          border-radius: 10px;
          background: var(--seacab-base);
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .pa-hero__btn:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        /* ✅ MOBILE GENERAL (NO banner) */
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
        }

        /* ✅ MOBILE BANNER (SIN ESPACIOS BLANCOS) */
        @media (max-width: 991px) {
          .pa-hero--banner {
            /* 🔥 IMPORTANTÍSIMO: matar el min-height que te deja el hueco */
            min-height: 0 !important;
            height: auto;

            /* Ajustar al tamaño real del banner */
            ${mobileAspectRatio ? `aspect-ratio: ${mobileAspectRatio};` : ""}

            /* ya no queremos centrar con flex porque eso “se siente” como espacio */
            display: block;
          }

          .pa-hero--banner .pa-hero__media {
            object-fit: contain; /* banner completo */
            object-position: center center;
            background: transparent; /* si quieres blanco, pon #fff */
          }

          /* si no estás mostrando textos, esto QUITA el padding que infla el alto */
          .pa-hero--banner .pa-hero__content {
            padding: 0 !important;
            height: 0;       /* no aporta altura */
            overflow: hidden;
          }
        }
      `}</style>

      <section className={heroClass}>
        <picture>
          <source media="(max-width: 991px)" srcSet={mobileImg} />
          <img
            className="pa-hero__media"
            src={desktopImg}
            alt={title}
            loading="eager"
          />
        </picture>

        <div className="container">
          <div className="pa-hero__content">
            <div className="pa-hero__inner">
              {/* Si luego quieres mostrar texto y botón, descomenta: */}
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
