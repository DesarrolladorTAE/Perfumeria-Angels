import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BusinessGrocery from "../components/service/BusinessGrocery";
import BrandOne from "../components/brand/BrandOne";
import FooterOne from "../common/footer/FooterOne";

export default function BusinessGroceryPage() {
	return (
		<>
			<SEO pageTitle={"Business Grocery"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Business Grocery"
                currentPage="Business Grocery" 
            />
			<BusinessGrocery />
			<BrandOne />
			<FooterOne />
		</>
	);
}