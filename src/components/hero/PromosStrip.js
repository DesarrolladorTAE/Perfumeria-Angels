import * as React from "react";
import { Box, Button, Divider, Typography, alpha } from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import PromoMiniCard from "./PromoMiniCard";
import { PALETTE } from "@/utils/catalogUtils";

export default function PromosStrip({ items = [], onOpen, onGoAll }) {
  if (!Array.isArray(items) || !items.length) return null;

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