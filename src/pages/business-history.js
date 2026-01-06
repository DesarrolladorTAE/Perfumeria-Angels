import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BusinessHistory from "../components/service/BusinessHistory";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function BusinessHistoryPage() {
	return (
		<>
			<SEO pageTitle={"Business History"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Business History"
                currentPage="Business History" 
            />
			<BusinessHistory />
			<BrandOne />
			<FooterOne />
		</>
	);
}