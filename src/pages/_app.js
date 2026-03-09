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
    const t = setTimeout(() => {
      try {
        animationCreate();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("animationCreate error:", e);
      }
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Opcional: twitter card genérico como fallback.
            El OG dinámico del producto se define en pages/tienda/[sku].jsx */}
        <meta name="twitter:card" content="summary_large_image" />
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
