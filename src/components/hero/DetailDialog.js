import * as React from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Rating,
  Snackbar,
  Alert,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import { PALETTE, calcDiscount, moneyMXN } from "@/utils/catalogUtils";
import { useCart } from "@/context/CartContext";


export default function DetailDialog({
  open,
  onClose,
  detailLoading,
  detailErr,
  detail,
  activeImg,
  setActiveImg,
  onAddToCart,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { add } = useCart();


  // ✅ feedback de compartir/copiar
  const [toast, setToast] = React.useState({ open: false, msg: "", severity: "success" });
  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  React.useEffect(() => {
    if (!open) return;
    setActiveImg?.(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail?.id, open]);

  const ui = {
    radius: 3,
    pad: { xs: 1.4, sm: 1.8, md: 2.2 },
    textMuted: { fontWeight: 800, color: alpha(PALETTE.grey, 0.72) },
  };

  // ✅ Link share para sitio estático (sin rebuild por SKU)
  const buildShareUrl = React.useCallback(() => {
    const sku = detail?.sku;
    if (!sku) return null;
    if (typeof window === "undefined") return null;

    // ✅ ojo: sin slash extra antes del ?
    return `${window.location.origin}/tienda?sku=${encodeURIComponent(sku)}`;
  }, [detail?.sku]);

  const handleShare = React.useCallback(async () => {
    try {
      const url = buildShareUrl();
      if (!url) {
        setToast({ open: true, msg: "No pude generar el link (falta SKU).", severity: "warning" });
        return;
      }

      const title = detail?.name || "Producto";
      const text = detail?.shortDescription || "Mira este producto";

      // ✅ Web Share API (móvil)
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }

      // ✅ fallback: copiar
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setToast({ open: true, msg: "Link copiado ✅", severity: "success" });
        return;
      }

      // ✅ fallback viejo
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setToast({ open: true, msg: "Link copiado ✅", severity: "success" });
    } catch (e) {
      setToast({
        open: true,
        msg: "No se pudo compartir. Intenta copiar el link.",
        severity: "error",
      });
    }
  }, [buildShareUrl, detail?.name, detail?.shortDescription]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 3 : ui.radius,
            overflow: "hidden",
            border: `1px solid ${alpha(PALETTE.grey, 0.14)}`,
            width: isMobile ? "calc(100% - 16px)" : "100%",
            maxWidth: isMobile ? "520px" : "900px",
            m: isMobile ? 1 : 2,
            maxHeight: isMobile ? "calc(100vh - 16px)" : "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: alpha(PALETTE.soft, 0.7),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            py: 1.2,
          }}
        >
          <Typography sx={{ fontWeight: 1000, color: PALETTE.grey, fontSize: 15 }}>
            {detail?.name || "Detalle del producto"}
          </Typography>

          <IconButton onClick={onClose} aria-label="Cerrar" size="small">
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            p: ui.pad,
            overflowY: "auto",
          }}
        >
          {detailLoading ? (
            <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
              <CircularProgress />
              <Typography sx={{ mt: 1, fontWeight: 800, color: alpha(PALETTE.grey, 0.8) }}>
                Cargando detalle…
              </Typography>
            </Box>
          ) : detailErr ? (
            <Box sx={{ p: 2, borderRadius: 2, border: `1px solid ${alpha(PALETTE.accent, 0.25)}` }}>
              <Typography sx={{ fontWeight: 900, color: PALETTE.accent }}>{detailErr}</Typography>
            </Box>
          ) : !detail ? (
            <Typography sx={{ color: alpha(PALETTE.grey, 0.7), fontWeight: 800 }}>
              Sin información del producto.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {/* IMÁGENES */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 260, sm: 320, md: 420 },
                    borderRadius: 2.6,
                    border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
                    background: alpha(PALETTE.soft, 0.45),
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Array.isArray(detail.images) && detail.images.length ? (
                    <img
                      src={detail.images[activeImg] || detail.images[0]}
                      alt={detail.name}
                      loading="lazy"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  ) : (
                    <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.6) }}>
                      Sin imágenes
                    </Typography>
                  )}
                </Box>

                {Array.isArray(detail.images) && detail.images.length > 1 ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      mt: 1.2,
                      overflowX: "auto",
                      pb: 0.5,
                      scrollSnapType: "x mandatory",
                      "&::-webkit-scrollbar": { display: "none" },
                    }}
                  >
                    {detail.images.map((src, idx) => {
                      const active = idx === activeImg;
                      return (
                        <Box
                          key={src + idx}
                          onClick={() => setActiveImg(idx)}
                          role="button"
                          aria-label={`Ver imagen ${idx + 1}`}
                          sx={{
                            width: 64,
                            height: 64,
                            scrollSnapAlign: "start",
                            borderRadius: 2,
                            border: `2px solid ${active ? PALETTE.accent : alpha(PALETTE.grey, 0.15)
                              }`,
                            backgroundColor: PALETTE.white,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flex: "0 0 auto",
                          }}
                        >
                          <img
                            src={src}
                            alt={`${detail.name} mini`}
                            loading="lazy"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                              display: "block",
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Stack>
                ) : null}
              </Grid>

              {/* INFO */}
              <Grid item xs={12} md={6}>
                {(() => {
                  const dc = calcDiscount(detail.price, detail.discount);
                  return (
                    <Stack spacing={1.1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating value={Number(detail.rating || 0)} precision={0.5} readOnly />
                        {detail.saleCount ? (
                          <Typography variant="body2" sx={ui.textMuted}>
                            ({detail.saleCount} ventas)
                          </Typography>
                        ) : null}

                        {detail.new ? (
                          <Chip
                            size="small"
                            label="NOVEDAD"
                            sx={{
                              ml: "auto",
                              fontWeight: 900,
                              bgcolor: alpha(PALETTE.accent, 0.12),
                              color: PALETTE.accent,
                              border: `1px solid ${alpha(PALETTE.accent, 0.25)}`,
                            }}
                          />
                        ) : (
                          <Box sx={{ ml: "auto" }} />
                        )}
                      </Stack>

                      <Divider sx={{ borderColor: alpha(PALETTE.grey, 0.12) }} />

                      <Stack direction="row" alignItems="baseline" spacing={1}>
                        {dc.has ? (
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              color: alpha(PALETTE.grey, 0.58),
                              fontWeight: 850,
                            }}
                          >
                            {moneyMXN(detail.price)}
                          </Typography>
                        ) : null}

                        <Typography sx={{ fontWeight: 1000, fontSize: 22, color: PALETTE.grey }}>
                          {moneyMXN(dc.final)}
                        </Typography>

                        {dc.has ? (
                          <Chip
                            size="small"
                            icon={<LocalOfferRoundedIcon sx={{ fontSize: 16 }} />}
                            label={`AHORRA ${moneyMXN(dc.saved)} (${dc.pct}%)`}
                            sx={{
                              fontWeight: 950,
                              bgcolor: PALETTE.accent,
                              color: PALETTE.white,
                              "& .MuiChip-icon": { color: PALETTE.white },
                            }}
                          />
                        ) : null}
                      </Stack>

                      {detail.shortDescription ? (
                        <>
                          <Typography sx={{ fontWeight: 900, color: PALETTE.grey, fontSize: 14 }}>
                            Descripción corta
                          </Typography>
                          <Typography sx={{ color: alpha(PALETTE.grey, 0.85), fontWeight: 700 }}>
                            {detail.shortDescription}
                          </Typography>
                        </>
                      ) : null}

                      {detail.fullDescription ? (
                        <>
                          <Divider sx={{ my: 1.1, borderColor: alpha(PALETTE.grey, 0.12) }} />
                          <Typography sx={{ fontWeight: 900, color: PALETTE.grey, fontSize: 14 }}>
                            Descripción completa
                          </Typography>
                          <Typography sx={{ color: alpha(PALETTE.grey, 0.78), lineHeight: 1.55 }}>
                            {detail.fullDescription}
                          </Typography>
                        </>
                      ) : null}

                      {Array.isArray(detail.categories) && detail.categories.length ? (
                        <>
                          <Divider sx={{ borderColor: alpha(PALETTE.grey, 0.12) }} />
                          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            {detail.categories.map((c) => (
                              <Chip
                                key={c.id}
                                size="small"
                                label={c.name}
                                sx={{
                                  fontWeight: 900,
                                  bgcolor: alpha(PALETTE.grey, 0.06),
                                  color: PALETTE.grey,
                                  border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
                                }}
                              />
                            ))}
                          </Stack>
                        </>
                      ) : null}

                      {typeof detail.stock === "number" ? (
                        <Typography sx={ui.textMuted}>Stock: {detail.stock}</Typography>
                      ) : null}
                    </Stack>
                  );
                })()}
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: ui.pad,
            background: PALETTE.white,
            borderTop: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth={isMobile}
            sx={{
              borderRadius: 2,
              fontWeight: 900,
              textTransform: "none",
              borderColor: alpha(PALETTE.grey, 0.25),
              color: PALETTE.grey,
            }}
          >
            Cerrar
          </Button>

          {/* ✅ Compartir (móvil: share sheet, desktop: copia) */}
          <Button
            onClick={handleShare}
            variant="outlined"
            fullWidth={isMobile}
            startIcon={<ShareRoundedIcon />}
            disabled={!detail || detailLoading || !!detailErr || !detail?.sku}
            sx={{
              borderRadius: 2,
              fontWeight: 900,
              textTransform: "none",
              borderColor: alpha(PALETTE.grey, 0.25),
              color: PALETTE.grey,
            }}
          >
            Compartir
          </Button>

          <Button
            variant="contained"
            startIcon={<AddShoppingCartRoundedIcon />}
            disabled={!detail || detailLoading || !!detailErr}
            fullWidth={isMobile}
            sx={{
              borderRadius: 2,
              fontWeight: 950,
              textTransform: "none",
              bgcolor: PALETTE.accent,
              "&:hover": { bgcolor: alpha(PALETTE.accent, 0.92) },
            }}
            onClick={() => {
              if (!detail) return;

              add(detail, 1); // ✅ agrega al carrito (usa tu contexto con localStorage)
              setToast({ open: true, msg: "Agregado al carrito ✅", severity: "success" });

              onClose?.();
            }}

          >
            Agregar al carrito
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Toast feedback */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeToast} severity={toast.severity} sx={{ fontWeight: 800 }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
