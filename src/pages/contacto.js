import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ContactTwo from "../components/contact/ContactTwo";
import ContactOne from "../components/contact/ContactOne";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";
import TopAnnouncementMarquee from "@/components/hero/TopAnnouncementBar";

export default function ContactPage() {
	return (
		<>
			<SEO pageTitle={"Contáctanos"} />
			<HeaderOne />
			{/* <Breadcrumb 
                heading="Contáctanos"
                currentPage="Contáctanos" 
            />
			
			<ContactTwo /> */}
			<TopAnnouncementMarquee/>

			<ContactOne />
			{/* <BrandOne /> */}
			<FooterOne />
		</>
	);
}