import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import InstitutionBusiness from "../components/service/InstitutionBusiness";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function InstitutionBusinessPage() {
	return (
		<>
			<SEO pageTitle={"Service"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Institution Business"
                currentPage="Institution Business" 
            />
			<InstitutionBusiness />
			<BrandOne />
			<FooterOne />
		</>
	);
}