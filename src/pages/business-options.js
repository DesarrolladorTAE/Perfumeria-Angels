import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BusinessOptions from "../components/service/BusinessOptions";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function BusinessOptionsPage() {
	return (
		<>
			<SEO pageTitle={"Business Options"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Business Options"
                currentPage="Business Options" 
            />
			<BusinessOptions />
			<BrandOne />
			<FooterOne />
		</>
	);
}