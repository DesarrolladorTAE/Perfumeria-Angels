import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ProjectDetails from "../components/project/ProjectDetails";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function ProjectDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Projects Page"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Projects Page"
                currentPage="Projects" 
            />
			<ProjectDetails />
			<BrandOne />
			<FooterOne />
		</>
	);
}