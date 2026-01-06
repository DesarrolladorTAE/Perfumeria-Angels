import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ProjectOne from "../components/project/ProjectOne";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function ProjectPage() {
	return (
		<>
			<SEO pageTitle={"Projects Page"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Projects Page"
                currentPage="Projects" 
            />
			<ProjectOne />
			<BrandOne />
			<FooterOne />
		</>
	);
}