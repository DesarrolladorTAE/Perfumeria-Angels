import * as React from "react";
import { useRouter } from "next/router";
import PublicStoreService from "@/api/publicStore.service";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Rating,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";

import { PALETTE, calcDiscount, moneyMXN, pickCover } from "@/utils/catalogUtils";
import CatalogHeader from "./CatalogHeader";
import ProductCard from "./ProductCard";
import DesktopProductRows from "./DesktopProductRows";
import DetailDialog from "./DetailDialog";
import PaginationBar from "./PaginationBar";

const PAGE_SIZE = 16;

/** ✅ Card mini para Novedades: MISMO look que ProductCard, pero CTA "Mostrar detalles" */
function NovedadMiniCard({ p, onOpen }) {
  const cover = pickCover(p?.image);
  const dc = calcDiscount(p?.price, p?.discount);

  // igual que ProductCard (compacto)
  const CARD_H = { xs: 292, sm: 310, md: 360 };
  const MEDIA_H = { xs: 132, sm: 145, md: 190 };
  const TITLE_LINES = 2;

  const handleOpen = React.useCallback(() => {
    if (!p?.sku) return;
    onOpen?.(p);
  }, [onOpen, p]);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        height: CARD_H,
        borderRadius: 2,
        bgcolor: "#fff",
        border: "1px solid rgba(0,0,0,0.10)",
        boxShadow: "0 8px 26px rgba(0,0,0,0.10)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow .15s ease, transform .15s ease",
        "&:hover": {
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          transform: "translateY(-1px)",
        },
      }}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
    >
      {/* ===== BADGES (NEW + DESCUENTO) ===== */}
      {(p?.new || dc.has) && (
        <Stack
          spacing={0.4}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
          }}
        >
          {p?.new && (
            <Chip
              size="small"
              icon={<NewReleasesRoundedIcon sx={{ fontSize: 14 }} />}
              label="NUEVO"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 900,
                bgcolor: "#2E7D32",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
                "& .MuiChip-label": { px: 0.7 },
              }}
            />
          )}

          {dc.has && (
            <Chip
              size="small"
              icon={<LocalOfferRoundedIcon sx={{ fontSize: 14 }} />}
              label={`AHORRA ${Math.round(dc.pct)}%`}
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 900,
                bgcolor: "#E53935",
                color: "#fff",
                "& .MuiChip-icon": { color: "#fff" },
                "& .MuiChip-label": { px: 0.7 },
              }}
            />
          )}
        </Stack>
      )}

      {/* ===== MEDIA ===== */}
      <Box sx={{ height: MEDIA_H, bgcolor: "#fff", overflow: "hidden" }}>
        {cover ? (
          <img
            src={cover}
            alt={p?.name || "Producto"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "8px",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: alpha(PALETTE.grey, 0.6),
              fontWeight: 800,
            }}
          >
            Sin imagen
          </Box>
        )}
      </Box>

      {/* ===== CONTENT ===== */}
      <Box
        sx={{
          flex: 1,
          px: 1.1,
          pt: 0.9,
          pb: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Título */}
        <Typography
          sx={{
            fontWeight: 900,
            color: "#111",
            fontSize: 12,
            lineHeight: 1.15,
            display: "-webkit-box",
            WebkitLineClamp: TITLE_LINES,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: `calc(${TITLE_LINES} * 1.15em)`,
          }}
        >
          {p?.name || "Sin nombre"}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mt: 0.55 }}>
          <Rating size="small" value={Number(p?.rating || 0)} precision={0.5} readOnly />
        </Stack>

        {/* Precio */}
        <Stack direction="row" alignItems="baseline" spacing={0.9} sx={{ mt: 0.8 }}>
          {dc.has && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#E53935",
                fontWeight: 900,
                fontSize: 13.5,
              }}
            >
              {moneyMXN(p?.price)}
            </Typography>
          )}

          <Typography sx={{ color: "#111", fontWeight: 950, fontSize: 20.5 }}>
            {moneyMXN(dc.final)}
          </Typography>
        </Stack>

        {/* CTA: solo detalles */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: "auto",
            borderRadius: 1.4,
            fontWeight: 950,
            bgcolor: "#111",
            color: "#fff",
            textTransform: "uppercase",
            fontSize: 11.5,
            py: 0.95,
            boxShadow: "none",
            "&:hover": { bgcolor: "#000" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          Mostrar detalles
        </Button>
      </Box>
    </Box>
  );
}

function NovedadesStrip({ items, onOpen, onGoAll }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          px: 0.2,
        }}
      >
        <Typography sx={{ fontWeight: 950, fontSize: 22 }}>
          Novedades
        </Typography>

        <Button
          onClick={onGoAll}
          sx={{
            textTransform: "none",
            fontWeight: 900,
            color: alpha(PALETTE.accent, 0.75),
            px: 1,
            "&:hover": { background: alpha(PALETTE.accent, 0.08) },
          }}
        >
          Ver todos
        </Button>
      </Box>

      <Box
        sx={{
          mt: 1.4,
          display: "grid",
          gridTemplateColumns: {
            xs: items.length === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.2, // igual que tu grid mobile
          alignItems: "stretch",
          "& > *": { minWidth: 0 },
        }}
      >
        {items.map((p) => (
          <Box key={p?.id ?? p?.sku} sx={{ minWidth: 0 }}>
            <NovedadMiniCard p={p} onOpen={onOpen} />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2.6, opacity: 0.55 }} />
    </Box>
  );
}

export default function StoreCatalog({ routeSku = null }) {
  const router = useRouter();

  const skuFromQuery =
    router.isReady && typeof router.query?.sku === "string" ? router.query.sku : null;

  const activeSku = routeSku || skuFromQuery;

  const [cats, setCats] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [q, setQ] = React.useState("");
  const [catName, setCatName] = React.useState("Todas");
  const [tab, setTab] = React.useState("todos");
  const [page, setPage] = React.useState(1);

  const [detailLoading, setDetailLoading] = React.useState(false);
  const [detailErr, setDetailErr] = React.useState(null);
  const [detail, setDetail] = React.useState(null);
  const [activeImg, setActiveImg] = React.useState(0);

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

  // ✅ SOLO mostrar Novedades si hay 1 o 2 items
  const novedadesTop = React.useMemo(() => {
    const arr = Array.isArray(novedades) ? novedades : [];
    return arr.slice(0, 2);
  }, [novedades]);

  const showNovedades = novedadesTop.length >= 1 && novedadesTop.length <= 2;

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

  React.useEffect(() => {
    if (!router.isReady) return;

    if (!activeSku) {
      setDetail(null);
      setDetailErr(null);
      setDetailLoading(false);
      setActiveImg(0);
      return;
    }

    if (loading) return;

    const match = (products || []).find(
      (p) => String(p?.sku || "").toLowerCase() === String(activeSku).toLowerCase()
    );

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

  const openProduct = React.useCallback(
    (p) => {
      if (!p?.sku) return;
      router.push(`/tienda?sku=${encodeURIComponent(p.sku)}`, undefined, { shallow: true });
    },
    [router]
  );

  const closeDetail = React.useCallback(() => {
    router.push("/tienda", undefined, { shallow: true });
  }, [router]);

  // ✅ "Ver todos" SOLO en Novedades => ir a Destacados (y scroll)
  const goFromNovedadesToNovedad = React.useCallback(() => {
    setTab("novedad"); // ✅ ahora sí manda a Novedad
    setPage(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);


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
              {/* ✅ Novedades tipo “Home”, solo en "todos" y si hay 1–2 */}
              {tab === "todos" && showNovedades ? (
                <NovedadesStrip
                  items={novedadesTop}
                  onOpen={openProduct}
                  onGoAll={goFromNovedadesToNovedad}
                />

              ) : null}

              {isDesktop ? (
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
