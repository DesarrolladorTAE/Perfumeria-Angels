// src/components/hero/InfoSitio.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import usePublicSite from "@/hooks/usePublicSite";

function toAbs(url) {
  if (!url) return "";
  if (String(url).startsWith("http")) return url;
  return `https://mitiendaenlineamx.com.mx${String(url).startsWith("/") ? "" : "/"}${url}`;
}

/** Helper: animaciones al entrar a viewport (sin libs) */
function useInView(opts = { threshold: 0.12 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let alive = true;
    const obs = new IntersectionObserver(([entry]) => {
      if (!alive) return;
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, opts);

    obs.observe(el);
    return () => {
      alive = false;
      obs.disconnect();
    };
  }, [opts]);

  return { ref, inView };
}

function SectionHeader({ title, subtitle, ctaHref = "/service", ctaLabel = "Compra ahora" }) {
  return (
    <div className="pa-secHead">
      <div className="pa-secHead__text">
        <h3 className="pa-h2">{title}</h3>
        {subtitle ? <p className="pa-sub">{subtitle}</p> : null}
      </div>

      <Link href={ctaHref} className="pa-secCta" aria-label={ctaLabel}>
        <span className="pa-secCta__dot" />
        {ctaLabel}
      </Link>
    </div>
  );
}

function SectionMedia({ src, alt, position = "center center" }) {
  if (!src) return null;
  return (
    <div className="pa-media" aria-hidden="true">
      <img className="pa-media__img" src={src} alt={alt || ""} style={{ objectPosition: position }} />
    </div>
  );
}

export default function InfoSitio() {
  const { store, sitio, carrusel } = usePublicSite();

  const titulo = useMemo(() => {
    return sitio?.titulo_1 || store?.name || "Perfumes 100% originales, listos para envío";
  }, [sitio?.titulo_1, store?.name]);

  const descripcion = useMemo(() => {
    return (
      sitio?.descripcion ||
      "Atención humana por WhatsApp, promos VIP y envíos a toda la República. Perfumes árabes y de diseñador en existencia real."
    );
  }, [sitio?.descripcion]);

  // Carrusel: agarramos imágenes por índice (1..4) como pediste
  const car = useMemo(() => {
    const arr = Array.isArray(carrusel) ? carrusel : [];
    return {
      // “número 1” => index 1
      explore: toAbs(arr?.[1]),
      // “número 2” => index 2
      shipping: toAbs(arr?.[2]),
      // “número 3” => index 3
      payments: toAbs(arr?.[3]),
      // “número 4” => index 4
      warranty: toAbs(arr?.[4]),
    };
  }, [carrusel]);

  const { ref: heroRef, inView: heroIn } = useInView();
  const { ref: exploreRef, inView: exploreIn } = useInView();
  const { ref: warrantyRef, inView: warrantyIn } = useInView();
  const { ref: shippingRef, inView: shippingIn } = useInView();
  const { ref: paymentsRef, inView: paymentsIn } = useInView();

  const categories = useMemo(
    () => [
      { icon: "🧴", title: "Perfumes Árabes", desc: "Aromas intensos y elegantes. Tendencia top." },
      { icon: "💎", title: "Perfumes de Diseñador", desc: "Clásicos y nuevos lanzamientos con entrega rápida." },
      { icon: "👩", title: "Perfumes de Dama", desc: "Dulces, frescos, intensos. Te ayudamos a elegir." },
      { icon: "👨", title: "Perfumes de Caballero", desc: "Aromas para diario, oficina o noche." },
      { icon: "🧪", title: "Decants (muestras)", desc: "Prueba antes de comprar tu botella grande." },
      { icon: "📦", title: "Venta a Mayoreo", desc: "Para revendedores: surtido real y rotación alta." },
    ],
    []
  );

  const bullets = useMemo(
    () => [
      {
        title: "Asesoría humana por WhatsApp",
        desc: "Cotiza rápido y elige el perfume ideal. Sin bots fríos.",
        icon: "💬",
      },
      {
        title: "Promos VIP que cambian por campaña",
        desc: "Ofertas exclusivas en grupo VIP: urgencia real y recompra.",
        icon: "🔥",
      },
      {
        title: "Existencia real y envío inmediato",
        desc: "Perfumes árabes y de diseñador listos para salir.",
        icon: "⚡",
      },
    ],
    []
  );

  const shipping = useMemo(
    () => [
      { title: "Envíos a todo México", desc: "Entrega 2 a 5 días hábiles según paquetería.", icon: "🚚" },
      { title: "Tapachula", desc: "Mandadito local: mismo día o día siguiente.", icon: "🏍️" },
      { title: "Entrega/recogida local", desc: "Si estás en Tapachula, coordinamos fácil.", icon: "📍" },
    ],
    []
  );

  const payments = useMemo(
    () => [
      { title: "Transferencia o depósito", icon: "💳" },
      { title: "Efectivo", icon: "💵" },
      { title: "Tarjeta de crédito", icon: "💳", note: "Puede aplicar comisión" },
      { title: "Apartado con anticipo", icon: "📦", note: "En productos seleccionados" },
    ],
    []
  );

  return (
    <>
      <style jsx>{`
        .pa-page {
          background: var(--seacab-white);
          color: var(--seacab-black);
          padding: 44px 0 36px;
        }

        .pa-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }

        /* ===== Sección genérica ===== */
        .pa-section {
          margin-top: 22px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
          background: #fff;
        }

        .pa-section__pad {
          padding: 22px 20px;
        }

        /* ===== Header sección ===== */
        .pa-secHead {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }

        .pa-h2 {
          margin: 0;
          font-family: var(--seacab-font-two);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: -0.2px;
        }

        .pa-sub {
          margin: 6px 0 0;
          color: rgba(var(--seacab-gray-rgb), 1);
          line-height: 1.55;
          font-size: 14px;
          max-width: 70ch;
        }

        .pa-secCta {
          background: rgba(var(--seacab-base-rgb), 0.12);
          color: var(--seacab-base);
          text-decoration: none;
          font-weight: 900;
          padding: 10px 12px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 160ms ease, background 160ms ease;
          white-space: nowrap;
        }

        .pa-secCta:hover {
          transform: translateY(-1px);
          background: rgba(var(--seacab-base-rgb), 0.18);
        }

        .pa-secCta__dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--seacab-base);
          box-shadow: 0 0 0 0 rgba(var(--seacab-base-rgb), 0.40);
          animation: paPulse 1.8s ease-in-out infinite;
        }

        @keyframes paPulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--seacab-base-rgb), 0.38); }
          70% { box-shadow: 0 0 0 10px rgba(var(--seacab-base-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--seacab-base-rgb), 0); }
        }

        /* ===== Media banner (carrusel) ===== */
        .pa-media {
          width: 100%;
          height: 220px;
          background: rgba(var(--seacab-soft-pink-rgb), 0.35);
          position: relative;
          overflow: hidden;
        }

        .pa-media__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 650ms ease;
        }

        .pa-section:hover .pa-media__img {
          transform: scale(1.03);
        }

        /* ===== HERO (promesa principal) ===== */
        .pa-hero {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
          background: linear-gradient(
            180deg,
            rgba(var(--seacab-soft-pink-rgb), 0.55),
            rgba(255, 255, 255, 1)
          );
          padding: 26px 20px;
          position: relative;
        }

        .pa-hero::before {
          content: "";
          position: absolute;
          inset: -120px -120px auto auto;
          width: 260px;
          height: 260px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(var(--seacab-base-rgb), 0.30),
            rgba(var(--seacab-base-rgb), 0.0) 60%
          );
        }

        .pa-heroGrid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          align-items: center;
        }

        .pa-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(var(--seacab-base-rgb), 0.10);
          color: var(--seacab-base);
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.3px;
          width: fit-content;
        }

        .pa-title {
          margin: 14px 0 10px;
          font-family: var(--seacab-font-two);
          font-weight: 900;
          font-size: 38px;
          line-height: 1.08;
          letter-spacing: -0.6px;
        }

        .pa-desc {
          margin: 0;
          font-size: 16.5px;
          line-height: 1.6;
          color: rgba(var(--seacab-gray-rgb), 1);
          max-width: 60ch;
        }

        .pa-actions {
          margin-top: 16px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .pa-btn {
          background: var(--seacab-base);
          color: #fff;
          font-weight: 900;
          letter-spacing: 0.2px;
          padding: 14px 22px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 16px 38px rgba(var(--seacab-base-rgb), 0.35),
            0 8px 18px rgba(0, 0, 0, 0.12);
          animation: paBreath 2.4s ease-in-out infinite;
          transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
        }

        .pa-btn::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -60%;
          width: 55%;
          height: 180%;
          transform: rotate(20deg);
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.35),
            rgba(255, 255, 255, 0)
          );
          opacity: 0;
        }

        .pa-btn:hover {
          animation: none;
          transform: translateY(-2px) scale(1.02);
          filter: saturate(1.05);
          box-shadow: 0 22px 48px rgba(var(--seacab-base-rgb), 0.48),
            0 10px 24px rgba(0, 0, 0, 0.14);
        }

        .pa-btn:hover::before {
          opacity: 1;
          animation: paSheen 900ms ease forwards;
        }

        @keyframes paBreath {
          0%,
          100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-1px) scale(1.02); }
        }

        @keyframes paSheen {
          0% { left: -60%; }
          100% { left: 130%; }
        }

        .pa-badgeBox {
          display: grid;
          gap: 10px;
          align-content: start;
        }

        .pa-badge {
          border-radius: 14px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.06);
        }

        .pa-badgeTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          margin: 0 0 4px;
          font-size: 14px;
        }

        .pa-badgeDesc {
          margin: 0;
          color: rgba(var(--seacab-gray-rgb), 1);
          font-size: 13.5px;
          line-height: 1.5;
        }

        /* ===== Grids / Cards ===== */
        .pa-grid6 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .pa-card {
          border-radius: 16px;
          padding: 16px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 16px 30px rgba(0, 0, 0, 0.05);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .pa-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 44px rgba(0, 0, 0, 0.07);
        }

        .pa-cardIcon {
          font-size: 22px;
        }

        .pa-cardTitle {
          margin: 10px 0 6px;
          font-weight: 900;
          font-size: 15px;
        }

        .pa-cardDesc {
          margin: 0;
          color: rgba(var(--seacab-gray-rgb), 1);
          font-size: 13.5px;
          line-height: 1.55;
        }

        .pa-row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .pa-panel {
          border-radius: 16px;
          padding: 16px;
          background: rgba(var(--seacab-soft-pink-rgb), 0.45);
          border: 1px solid rgba(var(--seacab-base-rgb), 0.15);
        }

        .pa-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .pa-li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .pa-liIcon {
          font-size: 18px;
          margin-top: 2px;
        }

        .pa-liTitle {
          margin: 0;
          font-weight: 900;
          font-size: 14px;
        }

        .pa-liDesc {
          margin: 2px 0 0;
          font-size: 13.5px;
          color: rgba(var(--seacab-gray-rgb), 1);
          line-height: 1.5;
        }

        /* ===== Animaciones entrada ===== */
        .pa-fadeUp {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .pa-fadeUp.on {
          opacity: 1;
          transform: translateY(0);
        }

        .pa-stagger > * {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .pa-stagger.on > * {
          opacity: 1;
          transform: translateY(0);
        }
        .pa-stagger.on > *:nth-child(1) { transition-delay: 60ms; }
        .pa-stagger.on > *:nth-child(2) { transition-delay: 120ms; }
        .pa-stagger.on > *:nth-child(3) { transition-delay: 180ms; }
        .pa-stagger.on > *:nth-child(4) { transition-delay: 240ms; }
        .pa-stagger.on > *:nth-child(5) { transition-delay: 300ms; }
        .pa-stagger.on > *:nth-child(6) { transition-delay: 360ms; }

        /* ===== Responsive ===== */
        @media (max-width: 991px) {
          .pa-heroGrid {
            grid-template-columns: 1fr;
          }
          .pa-title {
            font-size: 30px;
          }
          .pa-grid6 {
            grid-template-columns: repeat(2, 1fr);
          }
          .pa-row2 {
            grid-template-columns: 1fr;
          }
          .pa-media {
            height: 190px;
          }
          .pa-secHead {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 520px) {
          .pa-grid6 {
            grid-template-columns: 1fr;
          }
          .pa-btn {
            width: 100%;
          }
          .pa-media {
            height: 170px;
          }
        }
      `}</style>

      <section className="pa-page">
        <div className="pa-wrap">
          {/* ===== SECCIÓN 1: HERO / PROMESA ===== */}
          <div ref={heroRef} className={`pa-hero pa-fadeUp ${heroIn ? "on" : ""}`}>
            <div className="pa-heroGrid">
              <div>
                <div className="pa-kicker">✅ 100% Originales · 🚚 Envío Nacional · 💬 WhatsApp</div>
                <h2 className="pa-title">{titulo}</h2>
                <p className="pa-desc">{descripcion}</p>

                <div className="pa-actions">
                  <Link href="/service" className="pa-btn">
                    🛍️ Compra ahora
                  </Link>
                </div>
              </div>

              <div className="pa-badgeBox">
                {bullets.map((b, i) => (
                  <div key={i} className="pa-badge">
                    <p className="pa-badgeTitle">
                      <span>{b.icon}</span> {b.title}
                    </p>
                    <p className="pa-badgeDesc">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SECCIÓN 2: EXPLORA ===== */}
          <div ref={exploreRef} className={`pa-section pa-fadeUp ${exploreIn ? "on" : ""}`}>
            <SectionMedia src={car.explore} alt="Explora lo más buscado" position="center 40%" />

            <div className="pa-section__pad">
              <SectionHeader
                title="Explora lo más buscado"
                subtitle="Categorías clave para que el visitante entienda en segundos qué vendes y a dónde entrar."
                ctaHref="/service"
                ctaLabel="Ver catálogo"
              />

              <div className={`pa-grid6 pa-stagger ${exploreIn ? "on" : ""}`}>
                {categories.map((c, i) => (
                  <div key={i} className="pa-card">
                    <div className="pa-cardIcon">{c.icon}</div>
                    <h4 className="pa-cardTitle">{c.title}</h4>
                    <p className="pa-cardDesc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SECCIÓN 3: GARANTÍA Y SOPORTE ===== */}
          <div ref={warrantyRef} className={`pa-section pa-fadeUp ${warrantyIn ? "on" : ""}`}>
            <SectionMedia src={car.warranty} alt="Garantía y soporte" position="center 35%" />

            <div className="pa-section__pad">
              <SectionHeader
                title="Garantía & soporte"
                subtitle="Originalidad asegurada y soporte humano por WhatsApp."
                ctaHref="/service"
                ctaLabel="Compra con confianza"
              />

              <div className="pa-row2">
                <div className="pa-panel">
                  <h4 className="pa-cardTitle" style={{ marginTop: 0 }}>
                    Garantía & reglas claras
                  </h4>
                  <ul className="pa-list">
                    <li className="pa-li">
                      <span className="pa-liIcon">🔒</span>
                      <div>
                        <p className="pa-liTitle">Garantía de autenticidad</p>
                        <p className="pa-liDesc">Productos originales, sellados y verificados.</p>
                      </div>
                    </li>
                    <li className="pa-li">
                      <span className="pa-liIcon">📲</span>
                      <div>
                        <p className="pa-liTitle">Soporte directo por WhatsApp</p>
                        <p className="pa-liDesc">Atención humana en todo momento.</p>
                      </div>
                    </li>
                    <li className="pa-li">
                      <span className="pa-liIcon">ℹ️</span>
                      <div>
                        <p className="pa-liTitle">Sin cambios/devoluciones</p>
                        <p className="pa-liDesc">
                          No aplica por ser producto de uso personal (perfumes).
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="pa-panel">
                  <h4 className="pa-cardTitle" style={{ marginTop: 0 }}>
                    Reseñas reales
                  </h4>
                  <ul className="pa-list">
                    <li className="pa-li">
                      <span className="pa-liIcon">💬</span>
                      <div>
                        <p className="pa-liTitle">WhatsApp & Facebook</p>
                        <p className="pa-liDesc">Recomendaciones directas de clientes.</p>
                      </div>
                    </li>
                    <li className="pa-li">
                      <span className="pa-liIcon">🧾</span>
                      <div>
                        <p className="pa-liTitle">Grupos de ventas</p>
                        <p className="pa-liDesc">Comentarios auténticos en publicaciones.</p>
                      </div>
                    </li>
                    <li className="pa-li">
                      <span className="pa-liIcon">🎨</span>
                      <div>
                        <p className="pa-liTitle">Testimonios visuales</p>
                        <p className="pa-liDesc">
                          Convertimos capturas en tarjetas bonitas cuando quieras.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Link href="/service" className="pa-btn">
                  ✅ Ver perfumes disponibles
                </Link>
              </div>
            </div>
          </div>

          {/* ===== SECCIÓN 4: ENVÍOS ===== */}
          <div ref={shippingRef} className={`pa-section pa-fadeUp ${shippingIn ? "on" : ""}`}>
            <SectionMedia src={car.shipping} alt="Envíos" position="center 35%" />

            <div className="pa-section__pad">
              <SectionHeader
                title="Envíos"
                subtitle="Rápido en Tapachula y envíos nacionales a toda la República."
                ctaHref="/service"
                ctaLabel="Comprar ahora"
              />

              <div className="pa-panel">
                <ul className="pa-list">
                  {shipping.map((s, i) => (
                    <li key={i} className="pa-li">
                      <span className="pa-liIcon">{s.icon}</span>
                      <div>
                        <p className="pa-liTitle">{s.title}</p>
                        <p className="pa-liDesc">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Link href="/service" className="pa-btn">
                  🚚 Ver catálogo para envío
                </Link>
              </div>
            </div>
          </div>

          {/* ===== SECCIÓN 5: MÉTODOS DE PAGO ===== */}
          <div ref={paymentsRef} className={`pa-section pa-fadeUp ${paymentsIn ? "on" : ""}`}>
            <SectionMedia src={car.payments} alt="Métodos de pago" position="center 40%" />

            <div className="pa-section__pad">
              <SectionHeader
                title="Métodos de pago"
                subtitle="Elige el método que te convenga y te guiamos por WhatsApp si lo necesitas."
                ctaHref="/service"
                ctaLabel="Comprar"
              />

              <div className="pa-panel">
                <ul className="pa-list">
                  {payments.map((p, i) => (
                    <li key={i} className="pa-li">
                      <span className="pa-liIcon">{p.icon}</span>
                      <div>
                        <p className="pa-liTitle">
                          {p.title}
                          {p.note ? (
                            <span style={{ color: "rgba(var(--seacab-gray-rgb),1)", fontWeight: 800 }}>
                              {" "}
                              · {p.note}
                            </span>
                          ) : null}
                        </p>
                        <p className="pa-liDesc">
                          Confirmamos el pago y avanzas a la compra sin complicarte la vida.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Link href="/service" className="pa-btn">
                  💳 Comprar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
