import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "../components/hero/HeroTwo";
import FooterOne from "../common/footer/FooterOne";
import InfoSitio from "../components/hero/InfoSitio";

export default function HomeTwo() {
	return (
		<>
			<SEO pageTitle={"Perfumeria Angel´s"} />
			<HeaderOne />
      		<HeroTwo />
			<InfoSitio/>

			<FooterOne />
		</>
	);
}