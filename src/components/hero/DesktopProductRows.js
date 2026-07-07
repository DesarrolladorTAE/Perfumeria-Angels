import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Rating,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import {
  PALETTE,
  calcDiscount,
  moneyMXN,
  pickCover,
} from "@/utils/catalogUtils";

export default function DesktopProductGrid({ items, onOpen }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 2,
        mt: 1.6,
      }}
    >
      {items.map((p) => {
        const cover = pickCover(p?.image);
        const dc = calcDiscount(p?.price, p?.discount);

        const promo = p?.promotion;
        const hasBulkPromo =
          promo?.type === "bulk" && Number(promo?.min_qty || 0) > 0;
        const promoPrice = Number(promo?.price || 0);

        return (
          <Box
            key={p.id}
            onClick={() => onOpen(p)}
            role="button"
            sx={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: 1.6,
              p: 1.4,
              borderRadius: 3,
              background: PALETTE.white,
              border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
              boxShadow: "0 12px 38px rgba(0,0,0,0.06)",
              cursor: "pointer",
              transition: "all .18s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 18px 48px rgba(0,0,0,0.1)",
                borderColor: alpha(PALETTE.accent, 0.25),
              },
            }}
          >
            {/* IMAGEN */}
            <Box
              sx={{
                width: "100%",
                height: 160,
                borderRadius: 2,
                background: "#fff",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cover ? (
                <img
                  src={cover}
                  alt={p?.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Typography
                  sx={{ fontWeight: 800, color: alpha(PALETTE.grey, 0.6) }}
                >
                  Sin imagen
                </Typography>
              )}
            </Box>

            {/* INFO */}
            <Stack spacing={0.6}>
              {/* nombre */}
              <Typography
                sx={{
                  fontWeight: 1000,
                  color: PALETTE.grey,
                  lineHeight: 1.15,
                }}
              >
                {p?.name}
              </Typography>

              {/* rating */}
              <Stack direction="row" spacing={0.6} alignItems="center">
                <Rating
                  size="small"
                  value={Number(p?.rating || 0)}
                  precision={0.5}
                  readOnly
                />
                {p?.saleCount ? (
                  <Typography
                    sx={{ fontSize: 12, color: alpha(PALETTE.grey, 0.7) }}
                  >
                    ({p.saleCount})
                  </Typography>
                ) : null}
              </Stack>

              {/* precio */}
              <Stack direction="row" spacing={1} alignItems="baseline">
                {dc.has && (
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: alpha(PALETTE.grey, 0.55),
                      fontWeight: 900,
                    }}
                  >
                    {moneyMXN(p.price)}
                  </Typography>
                )}

                <Typography
                  sx={{
                    fontWeight: 1000,
                    fontSize: 20,
                    color: PALETTE.grey,
                  }}
                >
                  {moneyMXN(dc.final)}
                </Typography>

                {dc.has && (
                  <Chip
                    size="small"
                    icon={<LocalOfferRoundedIcon />}
                    label={`-${dc.pct}%`}
                    sx={{
                      bgcolor: PALETTE.accent,
                      color: PALETTE.white,
                      fontWeight: 900,
                      "& .MuiChip-icon": { color: PALETTE.white },
                    }}
                  />
                )}
              </Stack>
              {hasBulkPromo && (
                <Box
                  sx={{
                    mt: 0.7,
                    px: 1,
                    py: 0.8,
                    borderRadius: 1.5,
                    bgcolor: "rgba(46,125,50,0.10)",
                    border: "1px solid rgba(46,125,50,0.25)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: "#2E7D32",
                    }}
                  >
                    {promo.name}
                  </Typography>

                  {promoPrice > 0 && (
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#333",
                        mt: 0.2,
                      }}
                    >
                      Precio especial: {moneyMXN(promoPrice)}
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#555",
                    }}
                  >
                    Desde {promo.min_qty} piezas
                  </Typography>
                </Box>
              )}

              {/* botón */}
              <Box sx={{ mt: "auto" }}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 950,
                    bgcolor: PALETTE.grey,
                    textTransform: "none",
                    px: 2.4,
                    "&:hover": { bgcolor: "#000" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(p);
                  }}
                >
                  Ver detalle
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
