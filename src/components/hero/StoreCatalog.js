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
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

import { PALETTE, calcDiscount, moneyMXN, pickCover } from "@/utils/catalogUtils";
import CatalogHeader from "./CatalogHeader";
import ProductCard from "./ProductCard";
import DesktopProductRows from "./DesktopProductRows";
import DetailDialog from "./DetailDialog";
import PaginationBar from "./PaginationBar";

const PAGE_SIZE = 16;
const DEFAULT_BRANCH_ID = 220;
const PROMO_OPTION = "__PROMOCIONES__";

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function toSlug(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getCategoryFromQuery(rawCat, options = []) {
  if (!rawCat || !options.length) return null;

  const querySlug = toSlug(rawCat);

  const found = options.find((name) => {
    if (!name || name === "Todas") return false;
    return toSlug(name) === querySlug || normalizeText(name) === normalizeText(rawCat);
  });

  return found || null;
}

function NovedadMiniCard({ p, onOpen }) {
  const cover = pickCover(p?.image);
  const dc = calcDiscount(p?.price, p?.discount);

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

        <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mt: 0.55 }}>
          <Rating size="small" value={Number(p?.rating || 0)} precision={0.5} readOnly />
        </Stack>

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

function PromoMiniCard({ promo, onOpen }) {
  const handleOpen = React.useCallback(() => {
    if (!promo?.slug) return;
    onOpen?.(promo);
  }, [onOpen, promo]);

  const promoImage = String(promo?.image || "").trim();

  return (
    <Box
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
      sx={{
        width: "100%",
        minWidth: 0,
        height: { xs: 290, sm: 310, md: 340 },
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "#111",
        border: `1px solid ${alpha(PALETTE.accent, 0.25)}`,
        boxShadow: "0 10px 28px rgba(0,0,0,0.20)",
        transition: "transform .15s ease, box-shadow .15s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 14px 34px rgba(0,0,0,0.24)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={0.6}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 3,
        }}
      >
        <Chip
          size="small"
          icon={<LocalOfferRoundedIcon sx={{ fontSize: 14 }} />}
          label="PROMO"
          sx={{
            height: 22,
            fontSize: 10,
            fontWeight: 900,
            bgcolor: PALETTE.accent,
            color: "#fff",
            "& .MuiChip-icon": { color: "#fff" },
          }}
        />
      </Stack>

      <Box
        sx={{
          height: { xs: 140, sm: 150, md: 175 },
          width: "100%",
          bgcolor: "#0b0b0b",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
        }}
      >
        {promoImage ? (
          <Box
            component="img"
            src={promoImage}
            alt={promo?.name || "Promoción"}
            onError={(e) => {
              console.error("No cargó imagen promo:", promoImage);
              e.currentTarget.style.display = "none";
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
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
              color: alpha("#fff", 0.65),
              fontWeight: 800,
            }}
          >
            Sin imagen
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.18) 100%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 1.4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(180deg, #161616 0%, #0b0b0b 100%)",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 1000,
            fontSize: { xs: 16, md: 19 },
            lineHeight: 1.1,
          }}
        >
          {promo?.name || "Promoción"}
        </Typography>

        <Typography
          sx={{
            mt: 0.6,
            color: alpha("#fff", 0.88),
            fontWeight: 700,
            fontSize: 12.5,
            minHeight: 40,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {promo?.description || "Aprovecha esta promoción especial"}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={<BoltRoundedIcon />}
          sx={{
            mt: 1.2,
            borderRadius: 1.5,
            fontWeight: 950,
            bgcolor: PALETTE.accent,
            color: "#fff",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: alpha(PALETTE.accent, 0.92),
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          Ver promoción
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
          gap: 1.2,
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

function PromosStrip({ items, onOpen, onGoAll }) {
  if (!items?.length) return null;

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
        <Typography
          sx={{
            fontWeight: 950,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          <LocalOfferRoundedIcon sx={{ color: PALETTE.accent }} />
          Promociones
        </Typography>

        <Button
          onClick={onGoAll}
          sx={{
            textTransform: "none",
            fontWeight: 900,
            color: alpha(PALETTE.accent, 0.82),
            px: 1,
            "&:hover": { background: alpha(PALETTE.accent, 0.08) },
          }}
        >
          Ver todas
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
          gap: 1.2,
          alignItems: "stretch",
          "& > *": { minWidth: 0 },
        }}
      >
        {items.map((promo) => (
          <Box key={promo?.id ?? promo?.slug} sx={{ minWidth: 0 }}>
            <PromoMiniCard promo={promo} onOpen={onOpen} />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2.6, opacity: 0.55 }} />
    </Box>
  );
}

export default function StoreCatalog({
  routeSku = null,
  storeSlug = "perfumeria-angels",
  branchId = DEFAULT_BRANCH_ID,
}) {
  const router = useRouter();

  const skuFromQuery =
    router.isReady && typeof router.query?.sku === "string" ? router.query.sku : null;

  const catFromQuery =
    router.isReady && typeof router.query?.cat === "string" ? router.query.cat : null;

  const activeSku = routeSku || skuFromQuery;

  const [cats, setCats] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [promos, setPromos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);

  const [defaultLanding, setDefaultLanding] = React.useState(null);
  const [defaultLandingApplied, setDefaultLandingApplied] = React.useState(false);

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
      const [cRes, pRes, promoRes] = await Promise.all([
        PublicStoreService.getCategories(),
        PublicStoreService.getProducts(),
        PublicStoreService.getPromotions(branchId),
      ]);

      const cData = cRes?.data?.categories ?? [];
      const pData = pRes?.data?.products ?? [];
      const promoData = promoRes?.data?.data ?? [];

      setCats(Array.isArray(cData) ? cData : []);
      setProducts(Array.isArray(pData) ? pData : []);
      setPromos(Array.isArray(promoData) ? promoData : []);
    } catch (e) {
      setErr(e?.message || "Error cargando catálogo");
    } finally {
      setLoading(false);
    }
  }, [branchId]);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    if (!router.isReady) return;
    if (!storeSlug) return;

    let alive = true;

    (async () => {
      try {
        const res = await PublicStoreService.getLandingCategory(storeSlug, branchId, PAGE_SIZE);
        const data = res?.data ?? null;

        if (!alive) return;

        if (data?.ok && data?.mode === "category" && data?.category?.name) {
          setDefaultLanding({
            mode: "category",
            category: data.category,
          });
        } else {
          setDefaultLanding({
            mode: "default",
            category: null,
          });
        }
      } catch (e) {
        if (!alive) return;
        setDefaultLanding({
          mode: "default",
          category: null,
        });
      } finally {
        if (!alive) return;
        setDefaultLandingApplied(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [router.isReady, storeSlug, branchId]);

  const catOptions = React.useMemo(() => {
    const namesFromEndpoint = (cats || []).map((c) => c?.name).filter(Boolean);
    return ["Todas", ...namesFromEndpoint];
  }, [cats]);

  React.useEffect(() => {
    if (!router.isReady) return;
    if (!catOptions.length) return;
    if (!defaultLandingApplied) return;

    if (catFromQuery) {
      const matchedCategory = getCategoryFromQuery(catFromQuery, catOptions);
      setCatName(matchedCategory || "Todas");
      return;
    }

    if (defaultLanding?.mode === "category" && defaultLanding?.category?.name) {
      const matchedDefault = getCategoryFromQuery(defaultLanding.category.name, catOptions);

      if (matchedDefault) {
        setCatName((prev) => (prev !== matchedDefault ? matchedDefault : prev));
        return;
      }
    }

    setCatName("Todas");
  }, [router.isReady, catFromQuery, catOptions, defaultLanding, defaultLandingApplied]);

  const baseFiltered = React.useMemo(() => {
    if (catName === PROMO_OPTION) return [];

    const qq = String(q || "").trim().toLowerCase();

    return (products || []).filter((p) => {
      const name = String(p?.name || "").toLowerCase();
      const sku = String(p?.sku || "").toLowerCase();

      const matchQ = !qq || name.includes(qq) || sku.includes(qq);

      const pcats = Array.isArray(p?.category) ? p.category : [];
      const matchCat =
        catName === "Todas" ||
        pcats.some((cat) => normalizeText(cat) === normalizeText(catName));

      return matchQ && matchCat;
    });
  }, [products, q, catName]);

  const promoItems = React.useMemo(() => {
    const qq = String(q || "").trim().toLowerCase();

    return (promos || []).filter((promo) => {
      const name = String(promo?.name || "").toLowerCase();
      const desc = String(promo?.description || "").toLowerCase();
      return !qq || name.includes(qq) || desc.includes(qq);
    });
  }, [promos, q]);

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

  const novedadesTop = React.useMemo(() => {
    const arr = Array.isArray(novedades) ? novedades : [];
    return arr.slice(0, 2);
  }, [novedades]);

  const promosTop = React.useMemo(() => {
    const arr = Array.isArray(promos) ? promos : [];
    return arr.slice(0, 2);
  }, [promos]);

  const showNovedades = novedadesTop.length >= 1 && novedadesTop.length <= 2;
  const showPromosTop = promosTop.length > 0;

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
    if (catName === PROMO_OPTION) return promoItems;
    if (tab === "destacados") return destacados;
    if (tab === "novedad") return novedades;
    if (tab === "ofertas") return descuentos;
    return baseFiltered;
  }, [catName, promoItems, tab, destacados, novedades, descuentos, baseFiltered]);

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
      router.push(`/tienda/${encodeURIComponent(p.sku)}`, undefined, { shallow: true });
    },
    [router]
  );

  const openPromo = React.useCallback(
    (promo) => {
      if (!promo?.slug) return;
      router.push(`/promociones/${encodeURIComponent(promo.slug)}`);
    },
    [router]
  );

  const closeDetail = React.useCallback(() => {
    const nextQuery = {};

    if (catName && catName !== "Todas" && catName !== PROMO_OPTION) {
      nextQuery.cat = toSlug(catName);
    }

    router.push(
      {
        pathname: "/tienda",
        query: nextQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [router, catName]);

  const goFromNovedadesToNovedad = React.useCallback(() => {
    setTab("novedad");
    setPage(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const goToPromos = React.useCallback(() => {
    setCatName(PROMO_OPTION);
    setPage(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSetCatName = React.useCallback(
    (nextCat) => {
      setCatName(nextCat);
      setPage(1);

      if (!router.isReady) return;

      const nextQuery = { ...router.query };

      if (!nextCat || nextCat === "Todas" || nextCat === PROMO_OPTION) {
        delete nextQuery.cat;
      } else {
        nextQuery.cat = toSlug(nextCat);
      }

      router.replace(
        {
          pathname: router.pathname,
          query: nextQuery,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const pageBg = `linear-gradient(180deg, ${alpha(PALETTE.white, 0.8)} 0%, ${PALETTE.white} 55%, ${PALETTE.white} 100%)`;

  return (
    <Box sx={{ minHeight: "100vh", background: pageBg, pb: 5 }}>
      <Container maxWidth="lg" sx={{ pt: 2.5, px: { xs: 1.2, sm: 2 } }}>
        <CatalogHeader
          q={q}
          setQ={setQ}
          catOptions={catOptions}
          catName={catName}
          setCatName={handleSetCatName}
          tab={tab}
          setTab={setTab}
          tabs={tabs}
          tabItemsCount={total}
          onReload={load}
          promoOptionValue={PROMO_OPTION}
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
              {!catFromQuery &&
                defaultLanding?.mode === "category" &&
                defaultLanding?.category?.name &&
                catName !== "Todas" &&
                catName !== PROMO_OPTION ? (
                <Box
                  sx={{
                    mb: 2,
                    p: { xs: 1.4, md: 1.8 },
                    borderRadius: 2.2,
                    background: `linear-gradient(135deg, ${alpha(PALETTE.accent, 0.14)} 0%, ${alpha("#000", 0.04)} 100%)`,
                    border: `1px solid ${alpha(PALETTE.accent, 0.18)}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 1000,
                      color: "#111",
                      fontSize: { xs: 16, md: 20 },
                      lineHeight: 1.15,
                    }}
                  >
                    Conoce ahora nuestra categoría:{" "}
                    <Box component="span" sx={{ color: PALETTE.accent }}>
                      {defaultLanding.category.name}
                    </Box>
                  </Typography>
                </Box>
              ) : null}

              {tab === "todos" && catName !== PROMO_OPTION && showPromosTop ? (
                <PromosStrip
                  items={promosTop}
                  onOpen={openPromo}
                  onGoAll={goToPromos}
                />
              ) : null}

              {tab === "todos" && catName !== PROMO_OPTION && showNovedades ? (
                <NovedadesStrip
                  items={novedadesTop}
                  onOpen={openProduct}
                  onGoAll={goFromNovedadesToNovedad}
                />
              ) : null}

              {isDesktop ? (
                <>
                  {pageItems.length ? (
                    catName === PROMO_OPTION ? (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                          gap: 1.4,
                        }}
                      >
                        {pageItems.map((promo) => (
                          <PromoMiniCard
                            key={promo.id ?? promo.slug}
                            promo={promo}
                            onOpen={openPromo}
                          />
                        ))}
                      </Box>
                    ) : (
                      <DesktopProductRows items={pageItems} onOpen={openProduct} />
                    )
                  ) : (
                    <Box
                      sx={{
                        mt: 1,
                        p: 2.2,
                        borderRadius: 2.5,
                        background: alpha(PALETTE.white, 0.8),
                        border: `1px dashed ${alpha(PALETTE.grey, 0.25)}`,
                      }}
                    >
                      <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.75) }}>
                        {catName === PROMO_OPTION
                          ? "No hay promociones disponibles."
                          : "No hay productos con esos filtros."}
                      </Typography>
                    </Box>
                  )}
                </>
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
                  {pageItems.map((item) => (
                    <Box key={item.id ?? item.slug} sx={{ minWidth: 0 }}>
                      {catName === PROMO_OPTION ? (
                        <PromoMiniCard promo={item} onOpen={openPromo} />
                      ) : (
                        <ProductCard p={item} onOpen={openProduct} />
                      )}
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
                        {catName === PROMO_OPTION
                          ? "No hay promociones disponibles."
                          : "No hay productos con esos filtros."}
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