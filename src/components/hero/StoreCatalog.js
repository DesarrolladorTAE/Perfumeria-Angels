import * as React from "react";
import { useRouter } from "next/router";
import PublicStoreService from "@/api/publicStore.service";

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";

import { PALETTE } from "@/utils/catalogUtils";
import CatalogHeader from "./CatalogHeader";
import ProductCard from "./ProductCard";
import DesktopProductRows from "./DesktopProductRows";
import DetailDialog from "./DetailDialog";
import PaginationBar from "./PaginationBar";

const PAGE_SIZE = 16;

export default function StoreCatalog({ routeSku = null }) {
  const router = useRouter();

  // ✅ Pages Router: espera a que el router esté listo (evita parpadeos/undefined)
  const skuFromQuery =
    router.isReady && typeof router.query?.sku === "string" ? router.query.sku : null;

  // ✅ Prioriza la prop (SSR/SSG) y luego el query (cliente)
  const activeSku = routeSku || skuFromQuery;

  const [cats, setCats] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // filtros
  const [q, setQ] = React.useState("");
  const [catName, setCatName] = React.useState("Todas");

  // tabs secciones
  const [tab, setTab] = React.useState("todos");

  // paginación
  const [page, setPage] = React.useState(1);

  // modal detalle (estado)
  const [detailLoading, setDetailLoading] = React.useState(false);
  const [detailErr, setDetailErr] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  const [activeImg, setActiveImg] = React.useState(0);

  // ✅ Abrimos modal SOLO cuando el router ya está listo (evita open=true antes de tiempo)
  const open = Boolean(activeSku) && router.isReady;

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [cRes, pRes] = await Promise.all([
        PublicStoreService.getCategories(),
        PublicStoreService.getProducts(),
      ]);

      const cData = cRes?.data?.categories ?? [];
      const pData = pRes?.data?.products ?? [];

      setCats(Array.isArray(cData) ? cData : []);
      setProducts(Array.isArray(pData) ? pData : []);
    } catch (e) {
      setErr(e?.message || "Error cargando catálogo");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const catOptions = React.useMemo(() => {
    const namesFromEndpoint = (cats || []).map((c) => c?.name).filter(Boolean);
    return ["Todas", ...namesFromEndpoint];
  }, [cats]);

  const baseFiltered = React.useMemo(() => {
    const qq = String(q || "").trim().toLowerCase();

    return (products || []).filter((p) => {
      const name = String(p?.name || "").toLowerCase();
      const sku = String(p?.sku || "").toLowerCase();

      const matchQ = !qq || name.includes(qq) || sku.includes(qq);

      const pcats = Array.isArray(p?.category) ? p.category : [];
      const matchCat = catName === "Todas" || pcats.includes(catName);

      return matchQ && matchCat;
    });
  }, [products, q, catName]);

  const novedades = React.useMemo(
    () => baseFiltered.filter((p) => Boolean(p?.new)),
    [baseFiltered]
  );

  const destacados = React.useMemo(
    () => baseFiltered.filter((p) => Number(p?.rating || 0) === 5),
    [baseFiltered]
  );

  const descuentos = React.useMemo(
    () => baseFiltered.filter((p) => Number(p?.discount || 0) > 0),
    [baseFiltered]
  );

  const tabs = React.useMemo(
    () => [
      { key: "destacados", label: "Destacados", icon: <StarRoundedIcon /> },
      { key: "novedad", label: "Novedad", icon: <AutoAwesomeRoundedIcon /> },
      { key: "ofertas", label: "Ofertas", icon: <LocalFireDepartmentRoundedIcon /> },
      { key: "todos", label: "Todo", icon: <AllInclusiveRoundedIcon /> },
    ],
    []
  );

  const tabItems = React.useMemo(() => {
    if (tab === "destacados") return destacados;
    if (tab === "novedad") return novedades;
    if (tab === "ofertas") return descuentos;
    return baseFiltered;
  }, [tab, destacados, novedades, descuentos, baseFiltered]);

  React.useEffect(() => {
    setPage(1);
  }, [tab, q, catName]);

  const total = tabItems.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pageItems = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return tabItems.slice(start, start + PAGE_SIZE);
  }, [tabItems, page]);

  // ✅ Abre modal por ruta: carga detalle cuando hay SKU
  React.useEffect(() => {
    // evita correr antes de que router esté listo
    if (!router.isReady) return;

    if (!activeSku) {
      setDetail(null);
      setDetailErr(null);
      setDetailLoading(false);
      setActiveImg(0);
      return;
    }

    // esperamos a tener products para resolver SKU -> ID
    if (loading) return;

    const match = (products || []).find(
      (p) => String(p?.sku || "").toLowerCase() === String(activeSku).toLowerCase()
    );

    // si no existe el SKU, regresamos a /tienda
    if (!match?.id) {
      router.push("/tienda", undefined, { shallow: true });
      return;
    }

    let alive = true;

    (async () => {
      setDetail(null);
      setActiveImg(0);
      setDetailLoading(true);
      setDetailErr(null);

      try {
        const res = await PublicStoreService.getProductDetail(match.id);
        const prod = res?.data?.product ?? null;
        if (!alive) return;
        setDetail(prod);
      } catch (e) {
        if (!alive) return;
        setDetailErr(e?.message || "No se pudo cargar el detalle");
      } finally {
        if (!alive) return;
        setDetailLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [activeSku, loading, products, router.isReady, router]);

  // ✅ abrir por click: navegar a /tienda/SKU
const openProduct = React.useCallback(
  (p) => {
    if (!p?.sku) return;
    router.push(`/tienda?sku=${encodeURIComponent(p.sku)}`, undefined, { shallow: true });
  },
  [router]
);


  // ✅ cerrar: volver a /tienda
const closeDetail = React.useCallback(() => {
  router.push("/tienda", undefined, { shallow: true });
}, [router]);


  const pageBg = `linear-gradient(180deg, ${alpha(PALETTE.white, 0.8)} 0%, ${PALETTE.white} 55%, ${PALETTE.white} 100%)`;

  return (
    <Box sx={{ minHeight: "100vh", background: pageBg, pb: 5 }}>
      <Container maxWidth="lg" sx={{ pt: 2.5, px: { xs: 1.2, sm: 2 } }}>
        <CatalogHeader
          q={q}
          setQ={setQ}
          catOptions={catOptions}
          catName={catName}
          setCatName={setCatName}
          tab={tab}
          setTab={setTab}
          tabs={tabs}
          tabItemsCount={total}
          onReload={load}
        />

        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1, fontWeight: 800, color: alpha(PALETTE.grey, 0.8) }}>
              Cargando productos…
            </Typography>
          </Box>
        ) : err ? (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              border: `1px solid ${alpha(PALETTE.accent, 0.25)}`,
              background: alpha(PALETTE.white, 0.75),
            }}
          >
            <Typography sx={{ fontWeight: 900, color: PALETTE.accent }}>{err}</Typography>
          </Box>
        ) : (
          <Fade in timeout={220} key={`${tab}-${catName}-${q}-${page}`}>
            <Box sx={{ mt: 2 }}>
              {isDesktop ? (
                // ✅ DesktopProductRows debe llamar onOpen(p)
                <DesktopProductRows items={pageItems} onOpen={openProduct} />
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, minmax(0, 1fr))",
                      sm: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 1.2,
                    alignItems: "stretch",
                    "& > *": { minWidth: 0 },
                  }}
                >
                  {pageItems.map((p) => (
                    <Box key={p.id} sx={{ minWidth: 0 }}>
                      {/* ✅ ProductCard debe llamar onOpen(p) */}
                      <ProductCard p={p} onOpen={openProduct} />
                    </Box>
                  ))}

                  {!pageItems.length ? (
                    <Box
                      sx={{
                        gridColumn: "1 / -1",
                        mt: 1,
                        p: 2.2,
                        borderRadius: 2.5,
                        background: alpha(PALETTE.white, 0.8),
                        border: `1px dashed ${alpha(PALETTE.grey, 0.25)}`,
                      }}
                    >
                      <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.75) }}>
                        No hay productos con esos filtros.
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              )}

              <PaginationBar
                page={page}
                pageCount={pageCount}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={(v) => setPage(v)}
              />

              <Divider sx={{ my: 2.6, opacity: 0.55 }} />
            </Box>
          </Fade>
        )}
      </Container>

      <DetailDialog
        open={open}
        onClose={closeDetail}
        detailLoading={detailLoading}
        detailErr={detailErr}
        detail={detail}
        activeImg={activeImg}
        setActiveImg={setActiveImg}
      />
    </Box>
  );
}
