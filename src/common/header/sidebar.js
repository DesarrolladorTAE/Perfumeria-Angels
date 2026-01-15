import Link from "next/link";
import React, { useMemo } from "react";
import MobileMenus from "./mobile-menus";
import usePublicSite from "@/hooks/usePublicSite";

// Limpia el teléfono para usarlo en tel: y wa.me
function normalizePhone(raw) {
  if (!raw) return "";
  return String(raw).replace(/[^\d]/g, "");
}

function buildWhatsappLink(phoneRaw, message) {
  const phone = normalizePhone(phoneRaw);
  if (!phone) return null;

  
  const phoneWithCountry = phone.startsWith("52") ? phone : `52${phone}`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${phoneWithCountry}?text=${text}`;
}

const Sidebar = ({ isActive, setIsActive }) => {
  const { store, sitio, socials, expired } = usePublicSite();

  const storeName = store?.name || "Tienda";
  const phone = store?.phone || "";
  const email = store?.email || "";

  const telHref = useMemo(() => {
    const p = normalizePhone(phone);
    return p ? `tel:${p}` : null;
  }, [phone]);

  const mailHref = useMemo(() => (email ? `mailto:${email}` : null), [email]);

  const whatsappHref = useMemo(() => {
    return buildWhatsappLink(
      phone,
      "Hola, quiero hacer una cotización de un perfume 🧴"
    );
  }, [phone]);

  // Redes en orden: FB -> IG -> TW -> TikTok. Solo si vienen.
  const socialLinks = useMemo(() => {
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

  const logoSrc = sitio?.logo || "/assets/images/resources/footer-logo.png";

  return (
    <>
      <div className="tt-offcanvas-wrapper">
        <div className={`tt-offcanvas ${isActive ? "opened" : ""}`}>
          <div className="tt-offcanvas-close" onClick={() => setIsActive(false)}>
            <span>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="logo-box">
            <Link href="/" aria-label="logo image" onClick={() => setIsActive(false)}>
              <img src={logoSrc} width="155" alt={storeName} />
            </Link>
          </div>

          <div className="mobile-nav__container"></div>

          <div className="tt-mobile-menu mean-container d-xl-none">
            <div className="mean-bar">
              <MobileMenus />
            </div>
          </div>

          <div className="mobile-nav__container"></div>

          {/* Botón WhatsApp */}
          {whatsappHref && !expired && (
            <div style={{ padding: "0 20px 15px" }}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="thm-btn"
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
                onClick={() => setIsActive(false)}
              >
                <i className="fab fa-whatsapp" />
                Realiza una cotización
              </a>
            </div>
          )}

          <ul className="mobile-nav__contact list-unstyled">
            {mailHref && (
              <li>
                <i className="fa fa-envelope"></i>
                <a href={mailHref}>{email}</a>
              </li>
            )}

            {telHref && (
              <li>
                <i className="fa fa-phone-alt"></i>
                <a href={telHref}>Llama a {phone}</a>
              </li>
            )}
          </ul>

          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={s.icon}
                  aria-label={`social-${idx}`}
                  onClick={() => setIsActive(false)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`body-overlay ${isActive ? "opened" : ""}`}
        onClick={() => setIsActive(false)}
      ></div>
    </>
  );
};

export default Sidebar;
 