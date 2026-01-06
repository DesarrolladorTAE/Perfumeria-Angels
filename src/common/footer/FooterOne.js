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

  const storeName = store?.name || "Perfumería Ángeles";

  const logo = useMemo(() => {
    return toAbs(sitio?.logo) || "/assets/images/resources/footer-logo.png";
  }, [sitio?.logo]);

  const description =
    sitio?.descripcion ||
    "Perfumes originales con envíos a todo México y atención personalizada por WhatsApp.";

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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61688.26478970453!2d-92.27796175!3d14.9082877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858e0f395e71c1b1%3A0x5d28b9b800b8228b!2sTapachula%2C%20Chis.!5e0!3m2!1ses-419!2smx!4v1767737947656!5m2!1ses-419!2smx"
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
              © 2026 Copyright by <strong>Perfumería Ángel´s</strong> / MiTiendaEnLineaMX
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterOne;
