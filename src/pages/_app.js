import React, { useEffect } from "react";
import Head from "next/head";
import { FaAngleUp } from "react-icons/fa";
import dynamic from "next/dynamic";

import { animationCreate } from "../../utils/utils";
import { CartProvider } from "@/context/CartContext";

const CartBubble = dynamic(() => import("@/components/cart/cartBubble"), { ssr: false });
const ScrollToTop = dynamic(() => import("react-scroll-to-top"), { ssr: false });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // ✅ Solo en cliente
    const t = setTimeout(() => {
      try {
        animationCreate();
      } catch (e) {
        // evita romper la app si la animación falla
        // eslint-disable-next-line no-console
        console.warn("animationCreate error:", e);
      }
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ✅ Head global (opcional): OG genérico para la tienda.
          Para OG dinámico por producto, va en pages/tienda/[sku].jsx */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OG/Twitter genéricos (cámbialos a tu dominio/imagen reales) */}
        <meta property="og:title" content="Intercomp" />
        <meta property="og:description" content="Servicio Profesional En Equipos de Computo." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mitiendaenlineamx.com.mx/storage/sitios/19/logo/gI5QwltdHwof4eyjtVpDwMW0N5krQluzYSaMr73e.png" />
        <meta property="og:url" content="https://grupointercomp.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Intercomp" />
        <meta name="twitter:description" content="Servicio Profesional En Equipos de Computo" />
        <meta name="twitter:image" content="https://mitiendaenlineamx.com.mx/storage/sitios/19/logo/gI5QwltdHwof4eyjtVpDwMW0N5krQluzYSaMr73e.png" />
      </Head>

      <CartProvider>
        <div className="page-wrapper">
          <Component {...pageProps} />
        </div>

        <CartBubble />
      </CartProvider>

      <ScrollToTop className="scroll-to-top" smooth component={<FaAngleUp />} />
    </>
  );
}

export default MyApp;
