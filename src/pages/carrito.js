import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import CartInfo from "../components/cart/cartinfo";
import HeroTwo from "../components/hero/HeroTwo";
// import InfoSitio from "../components/hero/InfoSitio";
// import StoreCatalog from "../components/hero/StoreCatalog";
import FooterOne from "../common/footer/FooterOne";

export default function Carrito() {
  return (
    <>
      <SEO pageTitle={"Carrito de Compras"} />
      <HeaderOne />
 
      {/* <HeroTwo />   */}
     <CartInfo/>

      <FooterOne />
    </>
  );
}
