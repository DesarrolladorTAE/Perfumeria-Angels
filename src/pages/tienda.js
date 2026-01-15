import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "@/components/hero/HeroTwo";
import StoreCatalog from "../components/hero/StoreCatalog";
import FooterOne from "../common/footer/FooterOne";
import TopAnnouncementMarquee from "@/components/hero/TopAnnouncementBar";

export default function TiendaPage({ routeSku = null }) {
  return (
    <>
      <SEO pageTitle={"Tienda"} />
      <HeaderOne />
     
      <TopAnnouncementMarquee/>

       <HeroTwo />

      {/* Catalogo de Productos */}
      <StoreCatalog routeSku={routeSku} />

      <FooterOne />
    </>
  );
}
