// src/components/hero/InfoSitio.jsx
import * as React from "react";
import Link from "next/link";
import { useMemo } from "react";
import usePublicSite from "@/hooks/usePublicSite";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

/** Paleta (la tuya) */
const BRAND = {
  accent: "#E94B7C", // fucsia
  soft: "#F8D8E0", // soft pink
  grey: "#5A5A5A", // warm grey
  white: "#FFFFFF", // white
};

/** Convierte a URL absoluta si viene relativa */
function toAbs(url) {
  if (!url) return "";
  const s = String(url);
  if (s.startsWith("http")) return s;
  return `https://mitiendaenlineamx.com.mx${s.startsWith("/") ? "" : "/"}${s}`;
}

/** Lee una URL del carrusel aunque venga como string u objeto */
function pickCarouselUrl(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.url || item.src || item.image || item.imagen || item.path || item.file || "";
}

/** Botón con palpitación + sheen */
function PulseButton({ sx, ...props }) {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: 2.5,
        fontWeight: 950,
        textTransform: "none",
        px: { xs: 2.6, md: 3 },
        py: { xs: 1.2, md: 1.35 },
        bgcolor: BRAND.accent,
        color: BRAND.white,
        boxShadow: `0 16px 36px ${alpha(BRAND.accent, 0.33)}, 0 8px 18px rgba(0,0,0,0.12)`,
        position: "relative",
        overflow: "hidden",
        transition: "transform 180ms ease, filter 180ms ease",
        "@keyframes pulseSoft": {
          "0%,100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-1px) scale(1.02)" },
        },
        animation: "pulseSoft 2.2s ease-in-out infinite",
        "&:hover": {
          animation: "none",
          bgcolor: BRAND.accent,
          transform: "translateY(-2px) scale(1.03)",
          filter: "saturate(1.05)",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: "-45%",
          left: "-60%",
          width: "55%",
          height: "190%",
          transform: "rotate(20deg)",
          background:
            "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))",
          opacity: 0,
        },
        "&:hover:after": {
          opacity: 1,
          animation: "sheen 900ms ease forwards",
        },
        "@keyframes sheen": {
          "0%": { left: "-60%" },
          "100%": { left: "130%" },
        },
        ...(sx || {}),
      }}
    />
  );
}

/** ✅ Imagen: ocupa 100% del contenedor (sin maxWidth) */
function LandingMedia({ src, alt, position = "center 40%" }) {
  if (!src) return null;

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: { xs: "16 / 10", md: "4 / 3" },
        borderRadius: { xs: 3, md: 3.5 },
        overflow: "hidden",
        border: `1px solid ${alpha(BRAND.accent, 0.18)}`,
        background: alpha(BRAND.soft, 0.55),
        boxShadow: "0 22px 65px rgba(0,0,0,0.14)",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
        sx={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          objectPosition: position,
          transition: "transform 700ms ease",
          ".pa-landingSection:hover &": { transform: "scale(1.03)" },
        }}
      />
    </Box>
  );
}

/** Recuadro tipo “beneficio” */
function BenefitBox({ icon, title, desc }) {
  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: 3,
        border: `1px solid ${alpha(BRAND.accent, 0.14)}`,
        background: alpha(BRAND.white, 0.88),
        boxShadow: "0 18px 55px rgba(0,0,0,0.06)",
        p: { xs: 2, md: 2.25 },
        display: "flex",
        gap: 1.5,
        alignItems: "flex-start",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2.25,
          display: "grid",
          placeItems: "center",
          color: BRAND.accent,
          background: alpha(BRAND.accent, 0.10),
          border: `1px solid ${alpha(BRAND.accent, 0.18)}`,
          flex: "0 0 auto",
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 950,
            color: "#222",
            fontSize: { xs: 15.5, md: 16.5 },
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            color: alpha(BRAND.grey, 0.95),
            fontSize: { xs: 13.75, md: 14.5 },
            lineHeight: 1.6,
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

/** Lista de puntos */
function FeatureList({ items = [] }) {
  return (
    <List
      dense
      disablePadding
      sx={{
        mt: 1.25,
        display: "grid",
        gap: 0.8,
        "& .MuiListItem-root": {
          borderRadius: 2.75,
          px: { xs: 1, md: 1.25 },
          py: { xs: 0.95, md: 1.05 },
          border: `1px solid ${alpha(BRAND.accent, 0.12)}`,
          background: alpha(BRAND.white, 0.86),
          boxShadow: "0 12px 34px rgba(0,0,0,0.05)",
          transition: "transform 180ms ease, box-shadow 180ms ease, background 180ms ease",
          alignItems: "flex-start",
          "&:hover": {
            transform: { md: "translateY(-2px)" },
            boxShadow: "0 18px 46px rgba(0,0,0,0.09)",
            background: alpha(BRAND.soft, 0.55),
          },
        },
        "& .MuiListItemIcon-root": {
          minWidth: 44,
          mt: "2px",
          color: BRAND.accent,
        },
        "& .MuiListItemText-primary": {
          fontWeight: 950,
          color: "#222",
          fontSize: { xs: 15.5, md: 16.5 },
          lineHeight: 1.25,
        },
        "& .MuiListItemText-secondary": {
          color: alpha(BRAND.grey, 0.95),
          fontSize: { xs: 13.75, md: 14.5 },
          lineHeight: 1.55,
          mt: 0.25,
        },
      }}
    >
      {items.map((it, idx) => (
        <ListItem key={idx}>
          <ListItemIcon>{it.icon}</ListItemIcon>
          <ListItemText primary={it.title} secondary={it.desc} />
        </ListItem>
      ))}
    </List>
  );
}

/**
 * ✅ LandingSection FIX DEFINITIVO:
 * - md+: 2 columnas 50/50 con CSS Grid (siempre lado a lado)
 * - xs: columna con INFO primero y luego IMAGEN
 * - flip: intercambia columnas en escritorio (no afecta móvil)
 */
function LandingSection({
  flip = false,
  kicker,
  title,
  subtitle,
  mediaSrc,
  mediaAlt,
  mediaPos,
  anim = "fadeUp",
  children,
}) {
  const hasMedia = Boolean(mediaSrc);

  return (
    <Box
      className="pa-landingSection"
      component="section"
      sx={{
        borderRadius: 3.5,
        background: alpha(BRAND.white, 0.92),
        border: `1px solid ${alpha(BRAND.accent, 0.16)}`,
        boxShadow: "0 22px 70px rgba(0,0,0,0.08)",
        p: { xs: 2.25, md: 3.25 },
        overflow: "hidden",
        position: "relative",
        mb: 3,

        animation: {
          fadeUp: "paFadeUp 700ms ease both",
          slideLeft: "paSlideLeft 750ms ease both",
          slideRight: "paSlideRight 750ms ease both",
          zoomIn: "paZoomIn 650ms ease both",
          pop: "paPop 800ms cubic-bezier(.2,.9,.2,1) both",
        }[anim],

        "@keyframes paFadeUp": {
          from: { opacity: 0, transform: "translateY(14px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "@keyframes paSlideLeft": {
          from: { opacity: 0, transform: "translateX(-18px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "@keyframes paSlideRight": {
          from: { opacity: 0, transform: "translateX(18px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "@keyframes paZoomIn": {
          from: { opacity: 0, transform: "scale(0.975)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "@keyframes paPop": {
          from: { opacity: 0, transform: "translateY(10px) scale(0.985)" },
          to: { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },

        "&:before": {
          content: '""',
          position: "absolute",
          inset: "-140px -140px auto auto",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(BRAND.accent, 0.14)}, transparent 60%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", md: "grid" },
          flexDirection: { xs: "column", md: "unset" },
          gridTemplateColumns: { md: hasMedia ? "1fr 1fr" : "1fr" }, // ✅ 50/50 real
          gap: { xs: 2.25, md: 4 },
          alignItems: "center",
        }}
      >
        {/* INFO (siempre primero en móvil) */}
        <Box
          sx={{
            order: { xs: 1, md: flip ? 2 : 1 },
            minWidth: 0,
            pr: { md: flip ? 0 : 1.25 },
            pl: { md: flip ? 1.25 : 0 },
          }}
        >
          <Stack spacing={1.25} sx={{ minWidth: 0 }}>
            {kicker ? (
              <Typography
                sx={{
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: BRAND.accent,
                  fontSize: 12,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {kicker}
              </Typography>
            ) : null}

            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: -0.6,
                color: "#111",
                lineHeight: 1.08,
                fontSize: { xs: 28, sm: 34, md: 44 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {title}
            </Typography>

            {subtitle ? (
              <Typography
                sx={{
                  color: alpha(BRAND.grey, 0.95),
                  lineHeight: 1.75,
                  fontSize: { xs: 14.75, md: 16.5 },
                  textAlign: { xs: "center", md: "left" },
                  maxWidth: "none", // ✅ no restringir el 50%
                }}
              >
                {subtitle}
              </Typography>
            ) : null}

            <Box sx={{ width: "100%", minWidth: 0 }}>{children}</Box>
          </Stack>
        </Box>

        {/* IMAGEN (abajo en móvil) */}
        {hasMedia ? (
          <Box
            sx={{
              order: { xs: 2, md: flip ? 1 : 2 },
              width: "100%",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LandingMedia src={mediaSrc} alt={mediaAlt} position={mediaPos} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default function InfoSitio() {
  const { store, sitio, carrusel } = usePublicSite();

  const storeName = store?.name || "Perfumería Ángeles";
  const title = sitio?.titulo_1 || "Perfumes 100% originales";
  const description =
    sitio?.descripcion ||
    "Compra fácil por WhatsApp, promos VIP y envíos a todo México. Sin complicarte.";

  // ✅ Carrusel: MISMA LÓGICA (index-based)
  const carouselUrls = useMemo(() => {
    const arr = Array.isArray(carrusel) ? carrusel : [];
    return arr.map((x) => toAbs(pickCarouselUrl(x))).filter(Boolean);
  }, [carrusel]);

  // índices como ya lo traías (1..4)
  const imgExplora = carouselUrls?.[1] || "";
  const imgEnvios = carouselUrls?.[2] || "";
  const imgPagos = carouselUrls?.[3] || "";
  const imgGarantia = carouselUrls?.[4] || "";

  const categorias = useMemo(
    () => [
      "Perfumes Árabes",
      "Perfumes de Diseñador",
      "Perfumes de Dama",
      "Perfumes de Caballero",
      "Decants (muestras)",
      "Venta a Mayoreo",
    ],
    []
  );

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: `linear-gradient(180deg, ${alpha(BRAND.soft, 0.55)}, ${BRAND.white} 55%)`,
      }}
    >
      <Container maxWidth="lg">
        {/* ================= HERO ================= */}
        <Box
          sx={{
            borderRadius: 3.5,
            background: alpha(BRAND.white, 0.92),
            border: `1px solid ${alpha(BRAND.accent, 0.18)}`,
            boxShadow: "0 22px 70px rgba(0,0,0,0.10)",
            px: { xs: 2.25, md: 3.5 },
            py: { xs: 3, md: 3.75 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            mb: 3,
            "&:before": {
              content: '""',
              position: "absolute",
              inset: "-140px -140px auto auto",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(BRAND.accent, 0.16)}, transparent 60%)`,
              pointerEvents: "none",
            },
          }}
        >
          <Chip
            label={storeName}
            variant="outlined"
            sx={{
              mb: 1.5,
              px: 0.5,
              fontWeight: 950,
              bgcolor: alpha(BRAND.accent, 0.10),
              borderColor: alpha(BRAND.accent, 0.20),
              color: "#222",
            }}
          />

          <Typography
            sx={{
              fontWeight: 950,
              letterSpacing: -0.9,
              lineHeight: 1.08,
              mb: 1,
              fontSize: { xs: 30, md: 46 },
              color: "#111",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mx: "auto",
              maxWidth: 900,
              color: alpha(BRAND.grey, 0.95),
              lineHeight: 1.75,
              mb: 2.25,
              fontSize: { xs: 14.75, md: 16.5 },
            }}
          >
            {description}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={1.5}>
            <PulseButton component={Link} href="/tienda" endIcon={<ArrowForwardIosRoundedIcon />}>
              Ir al catálogo
            </PulseButton>
          </Stack>
        </Box>

        {/* ================= SECCIÓN 1 ================= */}
        <LandingSection
          flip={false}
          anim="slideLeft"
          kicker="Somos"
          title="Compra seguro, rápido y sin vueltas."
          subtitle="Asesoría humana por WhatsApp, promociones VIP y productos listos para envío. Aquí vienes a elegir y salir oliendo bien, no a sufrir."
          mediaSrc={imgExplora}
          mediaAlt="Explora"
          mediaPos="center 35%"
        >
          <BenefitBox
            icon={<LocalOfferOutlinedIcon />}
            title="Promos VIP reales"
            desc="Promociones por temporada y mejores precios para recompra. Nada de “descuento fantasma”."
          />

          <FeatureList
            items={[
              {
                icon: <WhatsAppIcon />,
                title: "Atención por WhatsApp (humano)",
                desc: "Te guiamos para elegir, cotizar y cerrar la compra sin complicarte.",
              },
              {
                icon: <Inventory2OutlinedIcon />,
                title: "Existencia lista para salir",
                desc: "Inventario disponible para envío rápido (sin historias raras).",
              },
              {
                icon: <VerifiedOutlinedIcon />,
                title: "Confianza",
                desc: "Productos originales, sellados y verificados.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= SECCIÓN 2: CATEGORÍAS ================= */}
        <Box
          component="section"
          sx={{
            borderRadius: 3.5,
            background: alpha(BRAND.white, 0.92),
            border: `1px solid ${alpha(BRAND.accent, 0.16)}`,
            boxShadow: "0 22px 70px rgba(0,0,0,0.08)",
            px: { xs: 2.25, md: 3.25 },
            py: { xs: 2.5, md: 3 },
            mb: 3,
            animation: "paFadeUp 700ms ease both",
            "@keyframes paFadeUp": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
            <Chip
              icon={<CategoryOutlinedIcon />}
              label="Categorías"
              variant="outlined"
              sx={{
                fontWeight: 950,
                bgcolor: alpha(BRAND.accent, 0.10),
                borderColor: alpha(BRAND.accent, 0.20),
              }}
            />
            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: -0.4,
                fontSize: { xs: 22, md: 30 },
                color: "#111",
              }}
            >
              Explora lo más buscado
            </Typography>
            <Typography sx={{ color: alpha(BRAND.grey, 0.95), maxWidth: 860, lineHeight: 1.75 }}>
              Elige una categoría y entra directo al catálogo. Rápido, claro, sin perder tiempo.
            </Typography>
          </Stack>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {categorias.map((c) => (
              <Chip
                key={c}
                label={c}
                variant="outlined"
                sx={{
                  fontWeight: 900,
                  borderColor: alpha(BRAND.accent, 0.25),
                  bgcolor: alpha(BRAND.soft, 0.45),
                  color: "#222",
                  "&:hover": { bgcolor: alpha(BRAND.soft, 0.75) },
                }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 2.25, display: "flex", justifyContent: "center" }}>
            <PulseButton component={Link} href="/tienda" endIcon={<ArrowForwardIosRoundedIcon />}>
              Entrar al catálogo
            </PulseButton>
          </Box>
        </Box>

        {/* ================= SECCIÓN 3: ENVÍOS ================= */}
        <LandingSection
          flip
          anim="slideRight"
          kicker="Envíos"
          title="Envíos a todo México."
          subtitle="Cobertura nacional y opciones locales. Te decimos costos y tiempos por WhatsApp y listo."
          mediaSrc={imgEnvios}
          mediaAlt="Envíos"
          mediaPos="center 45%"
        >
          <BenefitBox
            icon={<LocalShippingOutlinedIcon />}
            title="Logística clara"
            desc="Te compartimos tiempos estimados y opciones según tu zona. Sin misterio."
          />

          <FeatureList
            items={[
              {
                icon: <LocalShippingOutlinedIcon />,
                title: "República Mexicana",
                desc: "Entrega estimada: 2 a 5 días hábiles (según paquetería).",
              },
              {
                icon: <LocationOnOutlinedIcon />,
                title: "Tapachula",
                desc: "Entrega local mismo día o al siguiente (según zona y horario).",
              },
              {
                icon: <RequestQuoteOutlinedIcon />,
                title: "Entrega / Recogida",
                desc: "Coordinación directa por WhatsApp.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= SECCIÓN 4: PAGOS ================= */}
        <LandingSection
          flip={false}
          anim="zoomIn"
          kicker="Pagos"
          title="Paga como te convenga."
          subtitle="Opciones simples y directas. Menos fricción, más perfume."
          mediaSrc={imgPagos}
          mediaAlt="Pagos"
          mediaPos="center 40%"
        >
          <BenefitBox
            icon={<PaymentsOutlinedIcon />}
            title="Métodos claros"
            desc="Te confirmamos el método, el total y listo. Sin sorpresas."
          />

          <FeatureList
            items={[
              {
                icon: <AccountBalanceOutlinedIcon />,
                title: "Transferencia o depósito",
                desc: "Rápido, directo y sin vueltas.",
              },
              {
                icon: <PaymentsOutlinedIcon />,
                title: "Efectivo",
                desc: "Ideal para entrega local o acuerdos directos.",
              },
              {
                icon: <CreditCardOutlinedIcon />,
                title: "Tarjeta / Apartado",
                desc: "Tarjeta puede aplicar comisión. Apartado con anticipo en productos seleccionados.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= SECCIÓN 5: GARANTÍA ================= */}
        <LandingSection
          flip
          anim="pop"
          kicker="Confianza"
          title="Autenticidad y soporte."
          subtitle="Productos originales y atención real. Políticas claras desde el inicio."
          mediaSrc={imgGarantia}
          mediaAlt="Garantía"
          mediaPos="center 35%"
        >
          <BenefitBox
            icon={<VerifiedOutlinedIcon />}
            title="Compra con confianza"
            desc="Sellados y verificados. Te orientamos antes de comprar para evitar dudas."
          />

          <FeatureList
            items={[
              {
                icon: <VerifiedOutlinedIcon />,
                title: "Autenticidad garantizada",
                desc: "Productos originales, sellados y verificados.",
              },
              {
                icon: <SupportAgentOutlinedIcon />,
                title: "Soporte por WhatsApp",
                desc: "Te ayudamos antes, durante y después de tu compra.",
              },
              {
                icon: <BlockOutlinedIcon />,
                title: "Sin devoluciones",
                desc: "Por tratarse de producto de uso personal. Te orientamos antes de comprar.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= CTA FINAL ================= */}
        <Box
          component="section"
          sx={{
            borderRadius: 3.5,
            background: alpha(BRAND.white, 0.92),
            border: `1px solid ${alpha(BRAND.accent, 0.16)}`,
            boxShadow: "0 22px 70px rgba(0,0,0,0.10)",
            px: { xs: 2.25, md: 3.5 },
            py: { xs: 2.75, md: 3.25 },
            textAlign: "center",
            animation: "paFadeUp 700ms ease both",
            "@keyframes paFadeUp": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        >
          <Typography
            sx={{
              fontWeight: 950,
              letterSpacing: -0.4,
              fontSize: { xs: 22, md: 30 },
              color: "#111",
              mb: 1,
            }}
          >
            ¿Listo para elegir tu aroma?
          </Typography>

          <Typography
            sx={{
              color: alpha(BRAND.grey, 0.95),
              maxWidth: 860,
              mx: "auto",
              lineHeight: 1.75,
              mb: 2.25,
            }}
          >
            Entra al catálogo y compra en minutos. Si quieres recomendación, te atendemos por WhatsApp.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={1.5}>
            <PulseButton component={Link} href="/tienda" endIcon={<ArrowForwardIosRoundedIcon />}>
              Ir al catálogo
            </PulseButton>
{/* 
            <Button
              variant="outlined"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderRadius: 2.5,
                fontWeight: 950,
                textTransform: "none",
                px: { xs: 2.6, md: 3 },
                py: { xs: 1.2, md: 1.35 },
                borderColor: alpha(BRAND.accent, 0.45),
                color: BRAND.accent,
                "&:hover": {
                  borderColor: BRAND.accent,
                  bgcolor: alpha(BRAND.soft, 0.55),
                },
              }}
            >
              Hablar por WhatsApp
            </Button> */}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
