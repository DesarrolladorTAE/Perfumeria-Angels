// pages/tienda/[sku].jsx
import Head from "next/head";
import StoreCatalog from "@/components/hero/StoreCatalog"; // ajusta path real
import PublicStoreService from "@/api/publicStore.service";

function absUrl(req, path) {
  // si estás en Vercel/Proxy, puede venir x-forwarded-proto/host
  const proto = req?.headers["x-forwarded-proto"] || "https";
  const host = req?.headers["x-forwarded-host"] || req?.headers.host;
  return `${proto}://${host}${path}`;
}

export async function getServerSideProps(ctx) {
  const { sku } = ctx.params;

  try {
    // 1) Traer productos para mapear SKU -> ID
    const pRes = await PublicStoreService.getProducts();
    const products = pRes?.data?.products ?? [];

    const match = (products || []).find(
      (p) => String(p?.sku || "").toLowerCase() === String(sku).toLowerCase()
    );

    if (!match?.id) return { notFound: true };

    // 2) Traer detalle por ID
    const dRes = await PublicStoreService.getProductDetail(match.id);
    const product = dRes?.data?.product ?? null;

    if (!product) return { notFound: true };

    // 3) URL absoluta para og:url
    const url = absUrl(ctx.req, `/tienda/${encodeURIComponent(product.sku)}`);

    // 4) Imagen OG (primera imagen o fallback)
    const image =
      (Array.isArray(product.images) && product.images[0]) ||
      (Array.isArray(product.image) && product.image[0]) ||
      product?.image ||
      absUrl(ctx.req, "/og-default.jpg"); // pon una default en /public

    return {
      props: {
        routeSku: product.sku,
        og: {
          title: product.name || "Producto",
          description: product.shortDescription || "Mira este producto",
          url,
          image,
        },
      },
    };
  } catch (e) {
    // si tu API falla, no rompas el sitio: manda OG genérico
    const url = absUrl(ctx.req, `/tienda/${encodeURIComponent(sku)}`);
    return {
      props: {
        routeSku: sku,
        og: {
          title: "Producto",
          description: "Mira este producto",
          url,
          image: absUrl(ctx.req, "/og-default.jpg"),
        },
      },
    };
  }
}

export default function ProductSkuPage({ routeSku, og }) {
  return (
    <>
      <Head>
        <title>{og?.title}</title>
        <meta name="description" content={og?.description} />

        <meta property="og:title" content={og?.title} />
        <meta property="og:description" content={og?.description} />
        <meta property="og:url" content={og?.url} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={og?.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={og?.title} />
        <meta name="twitter:description" content={og?.description} />
        <meta name="twitter:image" content={og?.image} />
      </Head>

      {/* Reusa tu catálogo y abre el dialog por SKU */}
      <StoreCatalog routeSku={routeSku} />
    </>
  );
}
