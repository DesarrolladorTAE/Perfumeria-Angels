import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import AboutTwo from "../components/about/AboutTwo";
import CounterOne from "../components/counter/CounterOne";
import TeamOne from "../components/team/TeamOne";
import ServiceOne from "../components/service/ServiceOne";
import BrandOne from "../components/brand/BrandOne";
import ContactTwo from "../components/contact/ContactTwo";
import VideoOne from "../components/video/VideoOne";
import BlogThree from "../components/blog/BlogThree";
import FooterOne from "../common/footer/FooterOne";

export default function AboutPage() {
	return (
		<>
			<SEO pageTitle={"About"} />
			<HeaderOne />
			<Breadcrumb 
                heading="About Us"
                currentPage="About" 
            />
			<AboutTwo />
			<CounterOne />
			<TeamOne />
			<ServiceOne />
			<BrandOne />
			<ContactTwo />
			<VideoOne />
			<BlogThree />
			<FooterOne />
		</>
	);
}