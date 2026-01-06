import Head from "next/head";

const SEO = ({ pageTitle }) => (
    <>
        <Head>
            <title>
                {pageTitle && `${pageTitle}`}
            </title>

        </Head>
    </>
);

export default SEO;