import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import LibraryBusiness from "../components/service/LibraryBusiness";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function LibraryBusinessPage() {
	return (
		<>
			<SEO pageTitle={"Library Business"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Library Business"
                currentPage="Library Business" 
            />
			<LibraryBusiness />
			<BrandOne />
			<FooterOne />
		</>
	);
}