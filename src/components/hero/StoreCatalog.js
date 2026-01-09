"use client";

import * as React from "react";
import PublicStoreService from "@/api/publicStore.service";

import {
    Box,
    CircularProgress,
    Container,
    Divider,
    Fade,
    Grid,
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

export default function StoreCatalog() {
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
    const [tab, setTab] = React.useState("todos"); // ✅ por key

    // ✅ paginación
    const [page, setPage] = React.useState(1);

    // modal detalle
    const [open, setOpen] = React.useState(false);
    const [detailLoading, setDetailLoading] = React.useState(false);
    const [detailErr, setDetailErr] = React.useState(null);
    const [detail, setDetail] = React.useState(null);
    const [activeImg, setActiveImg] = React.useState(0);

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
        return baseFiltered; // "todos"
    }, [tab, destacados, novedades, descuentos, baseFiltered]);


    // ✅ cuando cambian filtros/tab, vuelve a página 1 (porque si no te quedas en página 7 con 0 items)
    React.useEffect(() => {
        setPage(1);
    }, [tab, q, catName]);

    // ✅ calcula páginas
    const total = tabItems.length;
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

    // ✅ si por algo page queda fuera (ej: cambió el total), ajusta
    React.useEffect(() => {
        if (page > pageCount) setPage(pageCount);
    }, [page, pageCount]);

    const pageItems = React.useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return tabItems.slice(start, start + PAGE_SIZE);
    }, [tabItems, page]);

    const openDetail = React.useCallback(async (productId) => {
        if (!productId) return;
        setOpen(true);
        setDetail(null);
        setActiveImg(0);
        setDetailLoading(true);
        setDetailErr(null);

        try {
            const res = await PublicStoreService.getProductDetail(productId);
            const prod = res?.data?.product ?? null;
            setDetail(prod);
        } catch (e) {
            setDetailErr(e?.message || "No se pudo cargar el detalle");
        } finally {
            setDetailLoading(false);
        }
    }, []);

    const closeDetail = React.useCallback(() => {
        setOpen(false);
        setDetail(null);
        setDetailErr(null);
        setActiveImg(0);
    }, []);

    const pageBg = `linear-gradient(180deg, ${alpha(PALETTE.soft, 0.8)} 0%, ${PALETTE.white} 55%, ${PALETTE.white} 100%)`;

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
                            {/* ✅ paginación (móvil y escritorio) */}


                            {isDesktop ? (
                                <DesktopProductRows items={pageItems} onOpen={openDetail} />
                            ) : (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "repeat(2, minmax(0, 1fr))", // ✅ 2 columnas SIEMPRE
                                            sm: "repeat(3, minmax(0, 1fr))",
                                        },
                                        gap: 1.2,
                                        alignItems: "stretch",
                                        "& > *": { minWidth: 0 },
                                    }}
                                >
                                    {pageItems.map((p) => (
                                        <Box key={p.id} sx={{ minWidth: 0 }}>
                                            <ProductCard p={p} onOpen={openDetail} />
                                        </Box>
                                    ))}

                                    {!pageItems.length ? (
                                        <Box
                                            sx={{
                                                gridColumn: "1 / -1", // ✅ ocupa todo el ancho
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


                            {/* ✅ paginación (móvil y escritorio) */}
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
