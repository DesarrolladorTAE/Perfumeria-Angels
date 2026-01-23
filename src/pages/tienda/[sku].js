// pages/tienda/[sku].jsx
import Head from "next/head";

export async function getServerSideProps(ctx) {
  const { sku } = ctx.params;

  // Cambia esto a tu API real:
  const res = await fetch(`${process.env.API_URL}/products/${encodeURIComponent(sku)}`);
  if (!res.ok) return { notFound: true };

  const product = await res.json();

  return { props: { product } };
}

export default function ProductSharePage({ product }) {
  const url = `https://tudominio.com/tienda/${encodeURIComponent(product.sku)}`;
  const img = product.images?.[0] || "https://tudominio.com/og-default.jpg";

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.shortDescription || ""} />

        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.shortDescription || ""} />
        <meta property="og:image" content={img} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="product" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.shortDescription || ""} />
        <meta name="twitter:image" content={img} />
      </Head>

      {/* Puedes redirigir a tu tienda real si quieres */}
      <main style={{ padding: 24 }}>
        <h1>{product.name}</h1>
        <p>{product.shortDescription}</p>
      </main>
    </>
  );
}
