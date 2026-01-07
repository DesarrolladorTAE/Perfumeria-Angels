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
    return toAbs(sitio?.img_portada) || "/assets/images/backgrounds/main-slider-bg.jpg";
  }, [sitio?.img_portada]);

  // ✅ Mobile: carrusel[0] (ej 480x700 o 480x500), si no existe usa portada
  const mobileImg = useMemo(() => {
    const first = carrusel?.[0];
    return toAbs(first) || desktopImg;
  }, [carrusel, desktopImg]);

  const title = sitio?.titulo_1 || store?.name || "Perfumería";
  const description =
    sitio?.descripcion ||
    "Perfumes originales, asesoría por WhatsApp y envíos a todo México.";

  // Detectar ratio real del móvil (480x500, 800x670, etc.)
  const { w: mw, h: mh } = useImageSize(mobileImg);
  const mobileRatio = useMemo(() => {
    if (!mw || !mh) return null;
    return mw / mh; // >1 = horizontal, <1 = vertical
  }, [mw, mh]);

  // Ajustes finos para móviles según ratio:
  // - 480x500 => ratio ~0.96 (casi cuadrada)
  // - 800x670 => ratio ~1.19 (horizontal moderada)
  // - 480x700 => ratio ~0.68 (vertical)
  const mobileFit = useMemo(() => {
    // defaults
    let objectPosition = "center 20%";
    let minHeight = 430;

    if (mobileRatio == null) {
      return { objectPosition, minHeight };
    }

    // Vertical (ej 480x700): mejor top para no cortar “parte importante”
    if (mobileRatio < 0.85) {
      objectPosition = "center top";
      minHeight = 460;
    }
    // Casi cuadrada (480x500): centrado para no cortar demasiado arriba/abajo
    else if (mobileRatio >= 0.85 && mobileRatio <= 1.05) {
      objectPosition = "center center";
      minHeight = 420;
    }
    // Horizontal moderada (800x670): centrar un poco arriba para conservar composición
    else if (mobileRatio > 1.05 && mobileRatio <= 1.35) {
      objectPosition = "center 30%";
      minHeight = 380;
    }
    // Muy horizontal: centrar
    else {
      objectPosition = "center center";
      minHeight = 360;
    }

    return { objectPosition, minHeight };
  }, [mobileRatio]);

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

        /* ✅ MOBILE */
        @media (max-width: 991px) {
          .pa-hero {
            min-height: ${mobileFit.minHeight}px; /* 👈 ajusta según ratio */
          }

          .pa-hero__media {
            object-fit: cover; /* llena hero */
            object-position: ${mobileFit.objectPosition}; /* 👈 recorte inteligente */
          }

          .pa-hero__content {
            padding: 52px 0;
          }

          .pa-hero__title {
            font-size: 34px;
          }

          .pa-hero__desc {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .pa-hero {
            min-height: ${Math.max(340, mobileFit.minHeight - 40)}px;
          }
        }
      `}</style>

      <section className="pa-hero">
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
              {/* <h1 className="pa-hero__title">{title}</h1>
              <p className="pa-hero__desc">{description}</p> */}
              <Link href="/tienda" className="pa-hero__btn">
                Compra ya
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
