import * as React from "react";
import { Box, Button, Chip, Rating, Stack, Typography, alpha } from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import { PALETTE, calcDiscount, moneyMXN, pickCover } from "@/utils/catalogUtils";

export default function ProductCard({ p, onOpen }) {
  const cover = pickCover(p?.image);
  const dc = calcDiscount(p?.price, p?.discount);

  // Compacto para 2 columnas
  const CARD_H = { xs: 292, sm: 310, md: 360 };
  const MEDIA_H = { xs: 132, sm: 145, md: 190 };
  const TITLE_LINES = 2;

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
      onClick={() => onOpen?.(p?.id)}
    >
      {/* ===== BADGES (NEW primero, luego descuento) ===== */}
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
      <Box
        sx={{
          height: MEDIA_H,
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
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
          {/* {p?.saleCount && (
            <Typography sx={{ fontSize: 11, fontWeight: 800, color: alpha("#111", 0.55) }}>
              ({p.saleCount})
            </Typography>
          )} */}
        </Stack>

        {/* Precio */}
        <Stack direction="row" alignItems="baseline" spacing={0.9} sx={{ mt: 0.8 }}>
          {dc.has && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#E53935",
                fontWeight: 900,
                fontSize: 11.5,
              }}
            >
              {moneyMXN(p?.price)}
            </Typography>
          )}

          <Typography sx={{ color: "#111", fontWeight: 950, fontSize: 13.5 }}>
            {moneyMXN(dc.final)}
          </Typography>
        </Stack>

        {/* Botón */}
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
            onOpen?.(p?.id);
          }}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Box>
  );
}
