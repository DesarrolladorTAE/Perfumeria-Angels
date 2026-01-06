import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import PricingOne from "../components/pricing/PricingOne";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function PricingPage() {
	return (
		<>
			<SEO pageTitle={"Pricing .Page"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Pricing .Page"
                currentPage="Pricing" 
            />
			<PricingOne />
			<BrandOne />
			<FooterOne />
		</>
	);
}