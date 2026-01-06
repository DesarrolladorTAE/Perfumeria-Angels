import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BlogGrid from "../components/blog/BlogGrid";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function BlogGridPage() {
	return (
		<>
			<SEO pageTitle={"Blog Grid"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Blog Grid"
                currentPage="Blog Grid" 
            />
			<BlogGrid />
			<BrandOne />
			<FooterOne />
		</>
	);
}