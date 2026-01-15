import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "@/components/hero/HeroTwo";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import AboutTwo from "../components/about/AboutTwo";
import TopAnnouncementMarquee from "@/components/hero/TopAnnouncementBar";

import FooterOne from "../common/footer/FooterOne";

export default function AboutPage() {
	return (
		<>
			<SEO pageTitle={"Sobre Nosotros"} />
			<HeaderOne />
			{/* <Breadcrumb 
                heading="Sobre Nosotros"
                currentPage="Sobre Nosotros" 
            /> */}

			<TopAnnouncementMarquee/>

			<HeroTwo/>
			<AboutTwo />
			<FooterOne />
		</>
	);
}