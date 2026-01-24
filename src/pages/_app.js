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
        <meta property="og:title" content="Perfumería Angels" />
        <meta property="og:description" content="Compra perfumes y fragancias en línea." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mitiendaenlineamx.com.mx/storage/sitios/244/logo/y10uBNdCLuzUGpvJ5uKACxUutelAgUTo9X8pkQxU.png" />
        <meta property="og:url" content="https://perfumeria-angels.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Perfumería Angels" />
        <meta name="twitter:description" content="Compra perfumes y fragancias en línea." />
        <meta name="twitter:image" content="https://mitiendaenlineamx.com.mx/storage/sitios/244/logo/y10uBNdCLuzUGpvJ5uKACxUutelAgUTo9X8pkQxU.png" />
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
