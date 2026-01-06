import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ErrorContent from "../components/error/ErrorContent";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function ErrorPage() {
	return (
		<>
			<SEO pageTitle={"404 Page"} />
			<HeaderOne />
			<Breadcrumb 
                heading="404 Page"
                currentPage="404" 
            />
			<ErrorContent />
			<BrandOne />
			<FooterOne />
		</>
	);
}