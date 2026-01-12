import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "../components/hero/HeroTwo";
import InfoSitio from "../components/hero/InfoSitio";
import StoreCatalog from "../components/hero/StoreCatalog";
import FooterOne from "../common/footer/FooterOne";

export default function Home() {
  return (
    <>
      <SEO pageTitle={"Perfumería Angel´s"} />
      <HeaderOne />
 
      <HeroTwo />  
      {/* 👇 TIENDA EN HOME */}
      <StoreCatalog />
      <InfoSitio />

   

      <FooterOne />
    </>
  );
}
