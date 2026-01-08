import React, { useMemo, useState } from "react";
import Link from "next/link";
import NavMenu from "./NavMenu";
import Sidebar from "./sidebar";
import usePublicSite from "@/hooks/usePublicSite";

// Limpia el teléfono para usarlo en tel: y wa.me
function normalizePhone(raw) {
  if (!raw) return "";
  // deja solo dígitos
  return String(raw).replace(/[^\d]/g, "");
}

function buildWhatsappLink(phoneRaw, message) {
  const phone = normalizePhone(phoneRaw);

  // Si no tiene 52, se lo agregamos (MX)
  // Nota: si tu backend ya manda +52, normalizePhone lo deja como 52xxxxxxxxxx
  const phoneWithCountry = phone.startsWith("52") ? phone : `52${phone}`;
  const text = encodeURIComponent(message);

  return `https://wa.me/${phoneWithCountry}?text=${text}`;
}

const HeaderOne = () => {
  const [isActive, setIsActive] = useState(false);

  const { loading, expired, store, sitio, socials } = usePublicSite();

  const phone = store?.phone || "";
  const email = store?.email || "";
  const storeName = store?.name || "Tienda";

  const telHref = useMemo(() => {
    const p = normalizePhone(phone);
    return p ? `tel:${p}` : null;
  }, [phone]);

  const mailHref = useMemo(() => {
    return email ? `mailto:${email}` : null;
  }, [email]);

  const whatsappHref = useMemo(() => {
    if (!phone) return null;

    return buildWhatsappLink(
      phone,
      "Hola, quiero hacer una cotización de un perfume que vi en su tienda."
    );
  }, [phone]);

  // Redes en orden y solo si existen
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
      <header className="main-header clearfix">
        <div className="main-header__top clearfix">
          <div className="container clearfix">
            <div className="main-header__top-inner clearfix">
              <div className="main-header__top-left">
                <ul className="list-unstyled main-header__top-address">
                  {/* Teléfono */}
                  {telHref && (
                    <li>
                      <div className="icon">
                        <span className="icon-telephone" />
                      </div>
                      <div className="text">
                        <p>
                          <a href={telHref}>
                            Llama a&nbsp;<span>{phone}</span>
                          </a>
                        </p>
                      </div>
                    </li>
                  )}

                  {/* Email */}
                  {mailHref && (
                    <li>
                      <div className="icon">
                        <span className="icon-envelope" />
                      </div>
                      <div className="text">
                        <p>
                          <a href={mailHref}>{email}</a>
                        </p>
                      </div>
                    </li>
                  )}

                  {/* Nombre de la tienda */}
                  <li>
                    <div className="icon">
                      <span className="icon-location" />
                    </div>
                    <div className="text">
                      <p>{storeName}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="main-header__top-right">
                <div className="main-header__top-right-social">
                  {socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`social-${idx}`}
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="main-menu clearfix">
          <div className="container clearfix">
            <div className="main-menu-wrapper clearfix">
              <div className="main-menu-wrapper__left">
                <div className="main-menu-wrapper__logo">
                  <Link href="/">
                    <img
                      src={sitio?.logo || "/assets/imags/resources/logo-1.png"}
                      alt={storeName}
                      style={{ height: 44, width: "auto" }}
                    />
                  </Link>
                </div>
              </div>

              <div className="main-menu-wrapper__right">
                <div className="main-menu-wrapper__main-menu">
                  <a
                    onClick={() => setIsActive(true)}
                    className="mobile-nav__toggler"
                    role="button"
                    tabIndex={0}
                  >
                    <i className="fa fa-bars" />
                  </a>

                  <NavMenu />
                </div>

                {/* Botón WhatsApp */}
                {whatsappHref && !expired && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="thm-btn main-header__btn main-header__btn--whatsapp"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <i className="fab fa-whatsapp" />
                    Realiza una cotización
                  </a>

                )}

                {/* Fallback */}
                {(!whatsappHref || expired) && (
                  <Link href="/contact" className="thm-btn main-header__btn">
                    Contáctanos
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Sidebar isActive={isActive} setIsActive={setIsActive} />
      <div className="body-overlay" />
    </>
  );
};

export default HeaderOne;
