import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import FocusEmergency from "../components/service/FocusEmergency";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function FocusEmergencyPage() {
	return (
		<>
			<SEO pageTitle={"Focus Emergency"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Focus Emergency"
                currentPage="Focus Emergency" 
            />
			<FocusEmergency />
			<BrandOne />
			<FooterOne />
		</>
	);
}