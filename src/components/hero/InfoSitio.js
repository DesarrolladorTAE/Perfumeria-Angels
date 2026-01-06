// src/components/hero/InfoSitio.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import usePublicSite from "@/hooks/usePublicSite";

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

export default function InfoSitio() {
  const { store, sitio } = usePublicSite();

  const titulo = useMemo(() => {
    return (
      sitio?.titulo_1 ||
      store?.name ||
      "Perfumes 100% originales, listos para envío"
    );
  }, [sitio?.titulo_1, store?.name]);

  const descripcion = useMemo(() => {
    return (
      sitio?.descripcion ||
      "Atención humana por WhatsApp, promos VIP y envíos a toda la República. Perfumes árabes y de diseñador en existencia real."
    );
  }, [sitio?.descripcion]);

  const { ref: heroRef, inView: heroIn } = useInView();
  const { ref: cardsRef, inView: cardsIn } = useInView();
  const { ref: trustRef, inView: trustIn } = useInView();
  const { ref: shipRef, inView: shipIn } = useInView();

  const categories = useMemo(
    () => [
      { icon: "🧴", title: "Perfumes Árabes", desc: "Tendencia top, aromas intensos y elegantes." },
      { icon: "💎", title: "Perfumes de Diseñador", desc: "Clásicos y nuevos lanzamientos con entrega rápida." },
      { icon: "👩", title: "Perfumes de Dama", desc: "Dulces, frescos, intensos. Te ayudamos a elegir." },
      { icon: "👨", title: "Perfumes de Caballero", desc: "Aromas para diario, oficina o noche." },
    //   { icon: "🧪", title: "Decants (muestras)", desc: "Prueba antes de comprar tu botella grande." },
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
        /* ====== ESTILOS ÚNICOS (sin conflictos) ====== */
        .pa-info {
          position: relative;
          background: var(--seacab-white);
          color: var(--seacab-black);
          padding: 54px 0 30px;
        }

        .pa-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .pa-hero {
          position: relative;
          border-radius: 18px;
          padding: 32px 24px;
          background: linear-gradient(
            180deg,
            rgba(var(--seacab-soft-pink-rgb), 0.55),
            rgba(255, 255, 255, 1)
          );
          box-shadow: 0 20px 60px rgba(0,0,0,0.06);
          overflow: hidden;
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
          filter: blur(2px);
        }

        .pa-heroGrid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 22px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .pa-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(var(--seacab-base-rgb), 0.10);
          color: var(--seacab-base);
          font-weight: 800;
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
          max-width: 58ch;
        }

        .pa-actions {
          margin-top: 18px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* ===== Botón “respiración” fucsia ===== */
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
            0 8px 18px rgba(0,0,0,0.12);
          transform: translateY(0) scale(1);
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
            rgba(255,255,255,0),
            rgba(255,255,255,0.35),
            rgba(255,255,255,0)
          );
          opacity: 0;
        }

        .pa-btn:hover {
          animation: none;
          transform: translateY(-2px) scale(1.02);
          filter: saturate(1.05);
          box-shadow: 0 22px 48px rgba(var(--seacab-base-rgb), 0.48),
            0 10px 24px rgba(0,0,0,0.14);
        }

        .pa-btn:hover::before {
          opacity: 1;
          animation: paSheen 900ms ease forwards;
        }

        .pa-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .pa-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(var(--seacab-base-rgb), 0.25),
            0 16px 38px rgba(var(--seacab-base-rgb), 0.35);
        }

        @keyframes paBreath {
          0%, 100% { transform: translateY(0) scale(1); }
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
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 14px 28px rgba(0,0,0,0.06);
        }

        .pa-badgeTitle {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          color: var(--seacab-black);
          margin: 0 0 4px;
          font-size: 14px;
        }

        .pa-badgeDesc {
          margin: 0;
          color: rgba(var(--seacab-gray-rgb), 1);
          font-size: 13.5px;
          line-height: 1.5;
        }

        /* ===== Secciones ===== */
        .pa-section {
          margin-top: 26px;
        }

        .pa-h2 {
          margin: 0 0 14px;
          font-family: var(--seacab-font-two);
          font-weight: 900;
          font-size: 22px;
          letter-spacing: -0.2px;
        }

        .pa-grid6 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .pa-card {
          border-radius: 16px;
          padding: 16px 16px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 16px 30px rgba(0,0,0,0.05);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .pa-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 44px rgba(0,0,0,0.07);
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
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .pa-liIcon {
          font-size: 18px;
          margin-top: 2px;
        }

        .pa-liText {
          margin: 0;
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

        /* ===== Animaciones de entrada ===== */
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
        }

        @media (max-width: 520px) {
          .pa-grid6 {
            grid-template-columns: 1fr;
          }
          .pa-hero {
            padding: 26px 16px;
          }
          .pa-btn {
            width: 100%;
          }
        }
      `}</style>

      <section className="pa-info">
        <div className="pa-wrap">
          {/* ===== HERO INFO ===== */}
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

          {/* ===== CATEGORÍAS ===== */}
          <div ref={cardsRef} className="pa-section">
            <h3 className="pa-h2">Explora lo más buscado</h3>
            <div className={`pa-grid6 pa-stagger ${cardsIn ? "on" : ""}`}>
              {categories.map((c, i) => (
                <div key={i} className="pa-card">
                  <div className="pa-cardIcon">{c.icon}</div>
                  <h4 className="pa-cardTitle">{c.title}</h4>
                  <p className="pa-cardDesc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== CONFIANZA / GARANTÍA / RESEÑAS ===== */}
          <div ref={trustRef} className="pa-section">
            <div className={`pa-row2 pa-stagger ${trustIn ? "on" : ""}`}>
              <div className="pa-panel">
                <h3 className="pa-h2" style={{ marginBottom: 10 }}>
                  Garantía & Soporte
                </h3>
                <ul className="pa-list">
                  <li className="pa-li">
                    <span className="pa-liIcon">🔒</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">Garantía de autenticidad</p>
                      <p className="pa-liDesc">
                        Productos originales, sellados y verificados.
                      </p>
                    </div>
                  </li>
                  <li className="pa-li">
                    <span className="pa-liIcon">📲</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">Soporte directo por WhatsApp</p>
                      <p className="pa-liDesc">Atención humana en todo momento.</p>
                    </div>
                  </li>
                  <li className="pa-li">
                    <span className="pa-liIcon">ℹ️</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">Política de cambios</p>
                      <p className="pa-liDesc">
                        No hay cambios ni devoluciones por ser producto de uso personal (perfumes).
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pa-panel">
                <h3 className="pa-h2" style={{ marginBottom: 10 }}>
                  Reseñas reales
                </h3>
                <ul className="pa-list">
                  <li className="pa-li">
                    <span className="pa-liIcon">💬</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">WhatsApp & Facebook</p>
                      <p className="pa-liDesc">
                        Recomendaciones directas de clientes y comentarios reales.
                      </p>
                    </div>
                  </li>
                  <li className="pa-li">
                    <span className="pa-liIcon">🧾</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">Grupos de ventas</p>
                      <p className="pa-liDesc">
                        Opiniones auténticas en publicaciones y comunidades.
                      </p>
                    </div>
                  </li>
                  <li className="pa-li">
                    <span className="pa-liIcon">🎨</span>
                    <div className="pa-liText">
                      <p className="pa-liTitle">Testimonios visuales</p>
                      <p className="pa-liDesc">
                        Se pueden convertir capturas y mensajes en testimonios bonitos para el sitio.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ===== ENVÍOS Y PAGOS ===== */}
          <div ref={shipRef} className="pa-section">
            <h3 className="pa-h2">Envíos & Pagos</h3>

            <div className={`pa-row2 pa-stagger ${shipIn ? "on" : ""}`}>
              <div className="pa-panel">
                <h4 className="pa-cardTitle" style={{ marginTop: 0 }}>
                  Cobertura y tiempos
                </h4>
                <ul className="pa-list">
                  {shipping.map((s, i) => (
                    <li key={i} className="pa-li">
                      <span className="pa-liIcon">{s.icon}</span>
                      <div className="pa-liText">
                        <p className="pa-liTitle">{s.title}</p>
                        <p className="pa-liDesc">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pa-panel">
                <h4 className="pa-cardTitle" style={{ marginTop: 0 }}>
                  Métodos de pago
                </h4>
                <ul className="pa-list">
                  {payments.map((p, i) => (
                    <li key={i} className="pa-li">
                      <span className="pa-liIcon">{p.icon}</span>
                      <div className="pa-liText">
                        <p className="pa-liTitle">
                          {p.title}
                          {p.note ? (
                            <span style={{ color: "rgba(var(--seacab-gray-rgb),1)", fontWeight: 700 }}>
                              {" "}
                              · {p.note}
                            </span>
                          ) : null}
                        </p>
                        <p className="pa-liDesc">
                          Confirmamos el método por WhatsApp y te apoyamos con la compra.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA extra */}
            <div style={{ textAlign: "center", marginTop: 18 }}>
              <Link href="/service" className="pa-btn">
                🚀 Ver catálogo y comprar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
