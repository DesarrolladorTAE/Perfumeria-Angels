// src/pages/tienda/[sku].js
import Head from "next/head";
import TiendaPage from "../tienda";

const STORE_ID = 244;

export default function TiendaSkuPage({ routeSku, og = null }) {
  const title = og?.title || "Producto | Tienda";
  const desc = og?.description || "Ver producto en la tienda";
  const img = og?.image || "";
  const url = og?.url || "";

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={desc} />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {url ? <meta property="og:url" content={url} /> : null}
        {img ? <meta property="og:image" content={img} /> : null}

        <meta name="twitter:card" content={img ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        {img ? <meta name="twitter:image" content={img} /> : null}
      </Head>

      <TiendaPage routeSku={routeSku} />
    </>
  );
}

// helper fetch con timeout (opcional pero recomendado)
async function safeFetch(url, opts = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function getStaticPaths() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Falta NEXT_PUBLIC_API_BASE_URL en .env");

  const res = await safeFetch(`${base}/public/stores/${STORE_ID}/products`);
  if (!res.ok) {
    // 👇 en vez de reventar build, regresa vacío (o lanza si prefieres)
    return { paths: [], fallback: false };
  }

  const json = await res.json();
  const products = json?.data?.products ?? json?.products ?? [];

  const paths = (products || [])
    .filter((p) => p?.sku)
    .map((p) => ({ params: { sku: String(p.sku) } }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Falta NEXT_PUBLIC_API_BASE_URL en .env");

  const sku = String(ctx.params.sku);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  try {
    // 1) lista para resolver sku -> id
    const pRes = await safeFetch(`${base}/public/stores/${STORE_ID}/products`);
    if (!pRes.ok) {
      // si la API falla, no rompas el build
      return { notFound: true };
    }

    const pJson = await pRes.json();
    const products = pJson?.data?.products ?? pJson?.products ?? [];

    const match = (products || []).find(
      (p) => String(p?.sku || "").toLowerCase() === sku.toLowerCase()
    );

    // si no existe sku en lista -> 404 (no truena export)
    if (!match?.id) {
      return { notFound: true };
    }

    // 2) detalle por id
    const dRes = await safeFetch(`${base}/public/stores/${STORE_ID}/products/${match.id}`);
    if (!dRes.ok) {
      return { notFound: true };
    }

    const dJson = await dRes.json();
    const prod = dJson?.data?.product ?? dJson?.product ?? null;

    if (!prod) {
      return { notFound: true };
    }

    // arma OG
    const title = prod?.name ? `${prod.name} | Tienda` : "Producto | Tienda";
    const description =
      prod?.shortDescription ||
      prod?.fullDescription?.slice?.(0, 160) ||
      "Ver producto en la tienda";

    const image =
      (Array.isArray(prod?.images) && prod.images[0]) ||
      prod?.image ||
      "";

    const url = siteUrl ? `${siteUrl}/tienda/${sku}` : "";

    return {
      props: {
        routeSku: sku,
        og: { title, description, image, url },
      },
    };
  } catch (err) {
    // ✅ evita "TypeError: fetch failed" rompiendo el build
    return { notFound: true };
  }
}
