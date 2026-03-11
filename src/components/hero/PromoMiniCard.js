import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { PALETTE } from "@/utils/catalogUtils";

export default function PromoMiniCard({ promo, onOpen }) {
  const handleOpen = React.useCallback(() => {
    if (!promo?.slug) return;
    onOpen?.(promo);
  }, [onOpen, promo]);

  const promoImage = String(promo?.image || "").trim();

  console.log("promo.image =>", promo?.image);

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

      {/* Imagen real */}
      <Box
        sx={{
          height: { xs: 140, sm: 150, md: 175 },
          width: "100%",
          bgcolor: "#000",
          overflow: "hidden",
          position: "relative",
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
              objectFit: "cover",
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
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 100%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Contenido */}
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