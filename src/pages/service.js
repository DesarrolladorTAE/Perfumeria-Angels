import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ServiceThree from "../components/service/ServiceThree";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePage() {
	return (
		<>
			<SEO pageTitle={"Service"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Service"
                currentPage="Service" 
            />
			<ServiceThree />
			<BrandOne />
			<FooterOne />
		</>
	);
}