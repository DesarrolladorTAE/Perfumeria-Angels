// pages/tienda/[sku].jsx
import Head from "next/head";
import StoreCatalog from "@/components/hero/StoreCatalog"; // ajusta path real
import PublicStoreService from "@/api/publicStore.service";

function absUrl(req, path) {
  const proto = req?.headers["x-forwarded-proto"] || "https";
  const host = req?.headers["x-forwarded-host"] || req?.headers.host;
  return `${proto}://${host}${path}`;
}

// ✅ formateo MXN simple (server-side)
function moneyMXN(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(n);
}

// ✅ calcula descuento compatible con varios formatos
function calcDiscount(price, discount) {
  const p = Number(price);
  if (!Number.isFinite(p) || p <= 0) return { has: false, final: p };

  const d = Number(discount);

  // sin descuento
  if (!Number.isFinite(d) || d <= 0) return { has: false, final: p };

  // si discount es 0-1 => porcentaje decimal (0.15 = 15%)
  if (d > 0 && d < 1) {
    const final = +(p * (1 - d)).toFixed(2);
    const saved = +(p - final).toFixed(2);
    const pct = Math.round(d * 100);
    return { has: true, final, saved, pct };
  }

  // si discount es 1-100 => porcentaje (15 = 15%)
  if (d >= 1 && d <= 100) {
    const final = +(p * (1 - d / 100)).toFixed(2);
    const saved = +(p - final).toFixed(2);
    const pct = Math.round(d);
    return { has: true, final, saved, pct };
  }

  // si discount es >100 => probablemente monto fijo
  // (o si tu API manda "monto de descuento" directamente)
  if (d > 100) {
    const final = Math.max(0, +(p - d).toFixed(2));
    const saved = +(p - final).toFixed(2);
    const pct = p ? Math.round((saved / p) * 100) : 0;
    return { has: saved > 0, final, saved, pct };
  }

  // fallback: trata como monto
  const final = Math.max(0, +(p - d).toFixed(2));
  const saved = +(p - final).toFixed(2);
  const pct = p ? Math.round((saved / p) * 100) : 0;
  return { has: saved > 0, final, saved, pct };
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
      absUrl(ctx.req, "/og-default.jpg");

    // ✅ 5) Precio y descuento
    const price = Number(product?.price);
    const dc = calcDiscount(price, product?.discount);
    const currency = product?.currency || "MXN";

    // ✅ 6) Title/description con precio (para previews)
    const baseTitle = product.name || "Producto";
    const title =
      Number.isFinite(dc.final) && dc.final > 0
        ? dc.has
          ? `${baseTitle} — ${moneyMXN(dc.final)} (antes ${moneyMXN(price)})`
          : `${baseTitle} — ${moneyMXN(dc.final)}`
        : baseTitle;

    const baseDesc = product.shortDescription || "Mira este producto";
    const description =
      Number.isFinite(dc.final) && dc.final > 0
        ? dc.has
          ? `${baseDesc} | Oferta: ${moneyMXN(dc.final)} (Ahorra ${dc.pct}%)`
          : `${baseDesc} | Precio: ${moneyMXN(dc.final)}`
        : baseDesc;

    return {
      props: {
        routeSku: product.sku,
        og: {
          title,
          description,
          url,
          image,
          currency,
          // precio original y final (por si hay oferta)
          price: Number.isFinite(price) ? price : null,
          finalPrice: Number.isFinite(dc.final) ? dc.final : null,
          hasDiscount: !!dc.has,
        },
      },
    };
  } catch (e) {
    const url = absUrl(ctx.req, `/tienda/${encodeURIComponent(sku)}`);
    return {
      props: {
        routeSku: sku,
        og: {
          title: "Producto",
          description: "Mira este producto",
          url,
          image: absUrl(ctx.req, "/og-default.jpg"),
          currency: "MXN",
          price: null,
          finalPrice: null,
          hasDiscount: false,
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

        {/* ✅ Precio (OG Product) */}
        {og?.finalPrice != null && (
          <>
            {/* Precio normal (si existe) */}
            {og?.price != null && (
              <>
                <meta property="product:price:amount" content={String(og.price)} />
                <meta property="product:price:currency" content={og.currency || "MXN"} />
              </>
            )}

            {/* Precio oferta (si hay descuento) */}
            {og?.hasDiscount && (
              <>
                <meta property="product:sale_price:amount" content={String(og.finalPrice)} />
                <meta property="product:sale_price:currency" content={og.currency || "MXN"} />
              </>
            )}

            {/* Fallback usado por algunas integraciones */}
            <meta property="og:price:amount" content={String(og.finalPrice)} />
            <meta property="og:price:currency" content={og.currency || "MXN"} />
          </>
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={og?.title} />
        <meta name="twitter:description" content={og?.description} />
        <meta name="twitter:image" content={og?.image} />
      </Head>

      <StoreCatalog routeSku={routeSku} />
    </>
  );
}
