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
  maxWidth = "100%",
  duration = 18, // segundos (más alto = más lento)
}) {
  const { branding, loading } = usePublicSite();

  // 1) Texto fuente
  const raw = (branding?.descripcion || "").trim();

  const fallback =
    "Perfumes originales 100% garantizados | Envíos rápidos a todo México | Pagos seguros | Promos exclusivas en línea";

  const text = raw || fallback;

  // 2) Frases
  const segments = React.useMemo(() => {
    return String(text)
      .split(/\||•|\n|\r/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [text]);

  // 3) Pool de íconos
  const iconPool = React.useMemo(
    () => [
      SpaRoundedIcon,
      LocalMallRoundedIcon,
      LocalShippingRoundedIcon,
      CreditCardRoundedIcon,
      RedeemRoundedIcon,
      LocalOfferRoundedIcon,
    ],
    []
  );

  if (loading && !branding) return null;

  // 4) Línea que sí ocupa ancho completo
  const Line = ({ offset = 0 }) => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.2}
      sx={{
        px: { xs: 2, md: 3 },
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
        minWidth: "100vw",
        justifyContent: { xs: "flex-start", md: "space-around" },
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
            sx={{
              whiteSpace: "nowrap",
              flex: "0 0 auto",
            }}
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
                fontSize: { xs: 11.2, sm: 12, md: 12.5, lg: 13 },
                fontWeight: 900,
                letterSpacing: 0.2,
                color: "#fff",
              }}
            >
              {t}
            </Typography>

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
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth,
          px: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Track: ahora sí ocupa todo el ancho */}
        <Box
          sx={{
            display: "flex",
            width: "200%",
            animation: `${marquee} ${duration}s linear infinite`,
            willChange: "transform",
            "&:hover": { animationPlayState: "paused" },
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          <Line offset={0} />
          <Line offset={0} />
        </Box>

        {/* Fade sutil en bordes */}
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg,
              ${bg} 0%,
              transparent 6%,
              transparent 94%,
              ${bg} 100%
            )`,
          }}
        />
      </Box>
    </Box>
  );
}