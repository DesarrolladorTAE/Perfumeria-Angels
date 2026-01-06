import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroTwo from "../components/hero/HeroTwo";
import FooterOne from "../common/footer/FooterOne";
import AboutTwo from "../components/about/AboutTwo";
import CounterOne from "../components/counter/CounterOne";
import ServiceTwo from "../components/service/ServiceTwo";
import ProjectOne from "../components/project/ProjectOne";
import TeamTwo from "../components/team/TeamTwo";
import BrandOne from "../components/brand/BrandOne";
import ContactTwo from "../components/contact/ContactTwo";
import VideoOne from "../components/video/VideoOne";
import PricingOne from "../components/pricing/PricingOne";
import BlogTwo from "../components/blog/BlogTwo";

export default function HomeTwo() {
	return (
		<>
			<SEO pageTitle={"Home Two"} />
			<HeaderOne />
      		<HeroTwo />
			<AboutTwo />
			<CounterOne />
			<ServiceTwo />
			<ProjectOne />
			<TeamTwo />
			<BrandOne />
			<ContactTwo />
			<VideoOne />
			<PricingOne />
			<BlogTwo />
			<FooterOne />
		</>
	);
}