import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import TeamDetails from "../components/team/TeamDetails";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function TeamDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Team Details"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Team Details"
                currentPage="Team Details" 
            />
			<TeamDetails />
			<BrandOne />
			<FooterOne />
		</>
	);
}