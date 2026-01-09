import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "@/components/hero/HeroTwo";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import Tienda from "../components/hero/Tienda";
import StoreCatalog from "../components/hero/StoreCatalog";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePage() {
	return (
		<>
			<SEO pageTitle={"Tienda"} />
			<HeaderOne />
			{/* <Breadcrumb 
                heading="Service"
                currentPage="Service" 
            /> */}
			<HeroTwo />

			{/* Catalogo de Productos  */}
			<StoreCatalog />


			{/* <Tienda />  */}
			<FooterOne />
		</>
	);
}