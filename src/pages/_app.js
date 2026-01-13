import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FaAngleUp } from "react-icons/fa";
import dynamic from "next/dynamic";

import { animationCreate } from "../../utils/utils";
import { CartProvider } from "@/context/CartContext";

const CartBubble = dynamic(() => import("@/components/cart/cartBubble"), { ssr: false });
const ScrollToTop = dynamic(() => import("react-scroll-to-top"), { ssr: false });

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const t = setTimeout(() => {
      // ✅ solo en cliente
      animationCreate();
    }, 500);

    return () => clearTimeout(t);
  }, []);

  // ✅ evita hydration mismatch: SSR renderiza nada (o un loader), cliente renderiza todo
  if (!mounted) {
    return (
      <>
        <Head />
        <div className="page-wrapper" />
      </>
    );
  }

  return (
    <>
      <Head />

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
