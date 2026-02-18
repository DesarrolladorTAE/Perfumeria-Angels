import React, { useMemo } from "react";
import Link from "next/link";
import usePublicSite from "@/hooks/usePublicSite";

function toAbs(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://mitiendaenlineamx.com.mx${url.startsWith("/") ? "" : "/"}${url}`;
}

const FooterOne = () => {
  const { store, sitio, socials } = usePublicSite();

  const storeName = store?.name || "Intercomp";

  const logo = useMemo(() => {
    return toAbs(sitio?.logo) || "/assets/images/resources/footer-logo.png";
  }, [sitio?.logo]);

  const description =
    sitio?.descripcion ||
    "La satisfacción de nuestros clientes y su posterior recomendación han hecho que cada día se incremente nuestro mercado activo.";

  // ✅ Redes en orden y solo si existen (igual que HeaderOne)
  const socialLinks = useMemo(() => {
    if (!socials && !sitio) return [];

    const fb = socials?.facebook || sitio?.facebook || null;
    const ig = socials?.instagram || sitio?.instagram || null;
    const tw = socials?.twitter || sitio?.twitter || null;
    const tk = socials?.tiktok || sitio?.tiktok || null;

    return [
      fb && { href: fb, icon: "fab fa-facebook" },
      ig && { href: ig, icon: "fab fa-instagram" },
      tw && { href: tw, icon: "fab fa-twitter" },
      tk && { href: tk, icon: "fab fa-tiktok" },
    ].filter(Boolean);
  }, [socials, sitio]);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__top">
            <div className="row">
              {/* ===== LOGO + DESCRIPCIÓN + REDES ===== */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="footer-widget__column footer-widget__about">
                  <div
                    className="footer-widget__about-logo"
                    style={{
                      // contenedor fijo: no importa el tamaño del logo, aquí se controla
                      width: 180,
                      maxWidth: "100%",
                      height: 70,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      overflow: "hidden",
                    }}
                  >
                    <Link href="/" aria-label="Ir al inicio">
                      <img
                        src={logo}
                        alt={storeName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "left center",
                          display: "block",
                        }}
                      />
                    </Link>
                  </div>

                  <p className="footer-widget__about-text" style={{ marginTop: 14 }}>
                    {description}
                  </p>

                  <div className="footer-widget__social" style={{ marginTop: 14 }}>
                    {socialLinks.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`social-${idx}`}
                      >
                        <i className={s.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== LINKS ===== */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="footer-widget__column footer-widget__links clearfix">
                  <h3 className="footer-widget__title">Enlaces</h3>
                  <ul className="footer-widget__links-list list-unstyled clearfix">
                    <li>
                      <Link href="/">Inicio</Link>
                    </li>
                    <li>
                      <Link href="/shop">Tienda</Link>
                    </li>
                    <li>
                      <Link href="/about">Conócenos</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contáctanos</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ===== MAPA ===== */}
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="footer-widget__column footer-widget__map clearfix">
                  <h3 className="footer-widget__title">Operamos en:</h3>
                  <div className="footer-widget__map-box">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d61089.7222444563!2d-99.906993!3d16.870569!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ca57e549c288d5%3A0xef7b3298099b97cb!2sINTERCOMP!5e0!3m2!1ses-419!2sus!4v1771452112219!5m2!1ses-419!2sus"
                      className="footer-widget-map__one"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== COPYRIGHT ===== */}
          <div className="site-footer__bottom">
            <p className="site-footer__bottom-text">
              © 2026 Copyright by <strong>INTERCOMP</strong> / MiTiendaEnLineaMX
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterOne;
