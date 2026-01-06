import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BlogDetails from "../components/blog/BlogDetails";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function BlogDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Blog Grid"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Blog Grid"
                currentPage="Blog Grid" 
            />
			<BlogDetails />
			<BrandOne />
			<FooterOne />
		</>
	);
}