import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ContactTwo from "../components/contact/ContactTwo";
import ContactOne from "../components/contact/ContactOne";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function ContactPage() {
	return (
		<>
			<SEO pageTitle={"Contact.Page"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Contact.Page"
                currentPage="Contact" 
            />
			<ContactTwo />
			<ContactOne />
			<BrandOne />
			<FooterOne />
		</>
	);
}