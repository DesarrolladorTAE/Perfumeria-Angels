import * as React from "react";
import { Box, Button, Chip, Rating, Stack, Typography, alpha } from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { PALETTE, calcDiscount, moneyMXN, pickCover } from "@/utils/catalogUtils";

export default function DesktopProductRows({ items, onOpen }) {
  return (
    <Stack spacing={1.2} sx={{ mt: 1.2 }}>
      {items.map((p) => {
        const cover = pickCover(p?.image);
        const dc = calcDiscount(p?.price, p?.discount);

        return (
          <Box
            key={p.id}
            onClick={() => onOpen(p?.id)}
            role="button"
            aria-label={`Abrir ${p?.name || "producto"}`}
            sx={{
              display: "grid",
              gridTemplateColumns: "140px 1fr auto",
              gap: 1.4,
              alignItems: "center",
              borderRadius: 3,
              background: alpha(PALETTE.white, 0.92),
              border: `1px solid ${alpha(PALETTE.grey, 0.10)}`,
              boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform .16s ease, box-shadow .16s ease, border-color .16s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 16px 58px rgba(0,0,0,0.08)",
                borderColor: alpha(PALETTE.accent, 0.25),
              },
            }}
          >
            <Box sx={{ height: 110, width: 140, background: "#fff", overflow: "hidden", position: "relative" }}>
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover}
                  alt={p?.name || "Producto"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block", transform: "scale(1.04)" }}
                />
              ) : (
                <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: alpha(PALETTE.grey, 0.65), fontWeight: 900 }}>
                  Sin imagen
                </Box>
              )}

              <Stack direction="row" spacing={0.6} sx={{ position: "absolute", top: 10, left: 10 }}>
                {p?.new ? (
                  <Chip
                    size="small"
                    label="NOVEDAD"
                    sx={{
                      fontWeight: 950,
                      bgcolor: alpha(PALETTE.accent, 0.14),
                      color: PALETTE.accent,
                      border: `1px solid ${alpha(PALETTE.accent, 0.25)}`,
                      backdropFilter: "blur(6px)",
                    }}
                  />
                ) : null}
                {dc.has ? (
                  <Chip size="small" label={`-${dc.pct}%`} sx={{ fontWeight: 950, bgcolor: PALETTE.accent, color: PALETTE.white }} />
                ) : null}
              </Stack>
            </Box>

            <Box sx={{ py: 1.2, pr: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.4 }}>
                <Typography sx={{ fontWeight: 1000, color: PALETTE.grey, letterSpacing: -0.2, lineHeight: 1.1 }}>
                  {p?.name || "Sin nombre"}
                </Typography>

                {Array.isArray(p?.category) && p.category.length ? (
                  <Typography variant="caption" sx={{ ml: "auto", color: alpha(PALETTE.grey, 0.7), fontWeight: 850 }}>
                    {p.category.slice(0, 3).join(", ")}
                    {p.category.length > 3 ? "…" : ""}
                  </Typography>
                ) : null}
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.8 }}>
                <Rating size="small" value={Number(p?.rating || 0)} precision={0.5} readOnly />
                {p?.saleCount ? (
                  <Typography variant="caption" sx={{ color: alpha(PALETTE.grey, 0.7), fontWeight: 800 }}>
                    ({p.saleCount} ventas)
                  </Typography>
                ) : null}

                {dc.has ? (
                  <Typography variant="caption" sx={{ ml: "auto", color: alpha(PALETTE.accent, 0.95), fontWeight: 950 }}>
                    Ahorras {moneyMXN(dc.saved)}
                  </Typography>
                ) : null}
              </Stack>

              <Stack direction="row" alignItems="baseline" spacing={1}>
                {dc.has ? (
                  <Typography sx={{ textDecoration: "line-through", color: alpha(PALETTE.grey, 0.6), fontWeight: 900 }}>
                    {moneyMXN(p?.price)}
                  </Typography>
                ) : null}
                <Typography sx={{ fontWeight: 1000, fontSize: 18, color: PALETTE.grey }}>
                  {moneyMXN(dc.final)}
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ pr: 1.4, py: 1.2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  fontWeight: 950,
                  textTransform: "none",
                  bgcolor: alpha(PALETTE.grey, 0.92),
                  "&:hover": { bgcolor: PALETTE.grey },
                  px: 2.2,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(p?.id);
                }}
              >
                Agregar al carrito
              </Button>
            </Box>
          </Box>
        );
      })}

      {!items.length ? (
        <Box sx={{ mt: 1, p: 2.2, borderRadius: 2.5, background: alpha(PALETTE.white, 0.8), border: `1px dashed ${alpha(PALETTE.grey, 0.25)}` }}>
          <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.75) }}>
            No hay productos en esta sección.
          </Typography>
        </Box>
      ) : null}
    </Stack>
  );
}
