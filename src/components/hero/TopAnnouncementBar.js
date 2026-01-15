// src/components/public/TopAnnouncementMarquee.jsx
import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";
import { keyframes } from "@mui/material/styles";

import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";

import usePublicSite from "@/hooks/usePublicSite";

// Animación tipo marquee (seamless)
const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export default function TopAnnouncementMarquee({
  height = 34,
  bg = "#E64B7A",
  maxWidth = 1400,
  duration = 18, // segundos (más alto = más lento)
}) {
  const { branding, loading } = usePublicSite();

  // 1) Texto fuente (una sola frase)
  const raw = (branding?.descripcion || "").trim();

  const fallback =
    "Perfumes originales 100% garantizados | Envíos rápidos a todo México | Pagos seguros | Promos exclusivas en línea";

  const text = raw || fallback;

  // 2) Partimos en “frases” para meter íconos dentro
  const segments = React.useMemo(() => {
    return String(text)
      .split(/\||•|\n|\r/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [text]);

  // 3) Íconos que se van alternando por frase
  const iconPool = React.useMemo(
    () => [
      SpaRoundedIcon, // perfumes
      LocalMallRoundedIcon, // shopping
      LocalShippingRoundedIcon, // envíos
      CreditCardRoundedIcon, // pagos
      RedeemRoundedIcon, // regalos
      LocalOfferRoundedIcon, // promos
    ],
    []
  );

  // Si está cargando, no pintes para evitar flash feo
  if (loading && !branding) return null;

  // 4) Construye UNA sola “línea” con icono + frase + separador
  const Line = ({ offset = 0 }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.2}
      sx={{
        px: 2,
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
      }}
    >
      {segments.map((t, i) => {
        const IconCmp = iconPool[(i + offset) % iconPool.length];
        return (
          <Stack
            key={`${t}-${i}-${offset}`}
            direction="row"
            alignItems="center"
            spacing={0.75}
            sx={{ whiteSpace: "nowrap" }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: 999,
                bgcolor: alpha("#fff", 0.14),
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
              }}
            >
              <IconCmp sx={{ fontSize: 13.5, color: "#fff" }} />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: 11.2, sm: 12 },
                fontWeight: 900,
                letterSpacing: 0.2,
                color: "#fff",
              }}
            >
              {t}
            </Typography>

            {/* separador entre frases */}
            <Typography
              sx={{
                color: alpha("#fff", 0.55),
                fontWeight: 900,
                mx: 0.5,
              }}
            >
              ·
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height,
        bgcolor: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${alpha("#fff", 0.08)}`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          maxWidth,
          px: { xs: 0, sm: 1 },
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Track: duplicamos contenido para loop perfecto */}
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: `${marquee} ${duration}s linear infinite`,
            willChange: "transform",
            "&:hover": { animationPlayState: "paused" }, // pausa al hover
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          {/* IMPORTANTE: 2 copias iguales para que al llegar a -50% siga continuo */}
          <Line offset={0} />
          <Line offset={1} />
        </Box>

        {/* Fade sutil en bordes para que se vea pro */}
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg,
              ${bg} 0%,
              transparent 10%,
              transparent 90%,
              ${bg} 100%
            )`,
          }}
        />
      </Box>
    </Box>
  );
}
