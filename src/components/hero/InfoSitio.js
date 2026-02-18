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
  Grid,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";

/** ✅ Paleta Intercomp (azules) */
const BRAND = {
  primary: "#0D47A1",
  accent: "#1976D2",
  accentSoft: "#42A5F5",
  dark: "#0B1E34",
  light: "#F4F8FD",
  white: "#FFFFFF",
  grey: "#5F6B7A",
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
        boxShadow: `0 16px 36px ${alpha(BRAND.accent, 0.28)}, 0 8px 18px rgba(0,0,0,0.12)`,
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
          bgcolor: BRAND.primary,
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
            "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.30), rgba(255,255,255,0))",
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

/** ✅ Imagen: ocupa 100% del contenedor */
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
        background: alpha(BRAND.light, 0.65),
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
        background: alpha(BRAND.white, 0.92),
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
            color: BRAND.dark,
            fontSize: { xs: 15.5, md: 16.5 },
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            color: alpha(BRAND.grey, 0.98),
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
          background: alpha(BRAND.white, 0.90),
          boxShadow: "0 12px 34px rgba(0,0,0,0.05)",
          transition: "transform 180ms ease, box-shadow 180ms ease, background 180ms ease",
          alignItems: "flex-start",
          "&:hover": {
            transform: { md: "translateY(-2px)" },
            boxShadow: "0 18px 46px rgba(0,0,0,0.09)",
            background: alpha(BRAND.light, 0.65),
          },
        },
        "& .MuiListItemIcon-root": {
          minWidth: 44,
          mt: "2px",
          color: BRAND.accent,
        },
        "& .MuiListItemText-primary": {
          fontWeight: 950,
          color: BRAND.dark,
          fontSize: { xs: 15.5, md: 16.5 },
          lineHeight: 1.25,
        },
        "& .MuiListItemText-secondary": {
          color: alpha(BRAND.grey, 0.98),
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

/** Sección 2 columnas */
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
          gridTemplateColumns: { md: hasMedia ? "1fr 1fr" : "1fr" },
          gap: { xs: 2.25, md: 4 },
          alignItems: "center",
        }}
      >
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
                color: BRAND.dark,
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
                  color: alpha(BRAND.grey, 0.98),
                  lineHeight: 1.75,
                  fontSize: { xs: 14.75, md: 16.5 },
                  textAlign: { xs: "center", md: "left" },
                  maxWidth: "none",
                }}
              >
                {subtitle}
              </Typography>
            ) : null}

            <Box sx={{ width: "100%", minWidth: 0 }}>{children}</Box>
          </Stack>
        </Box>

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

/** ✅ Badge de estadísticas (como en tus imágenes) */
function StatsRow() {
  const items = [
    { value: "5,235", label: "Equipos Reparados" },
    { value: "+1,500", label: "Clientes Satisfechos" },
    { value: "23", label: "Años de Experiencia" },
  ];

  return (
    <Grid container spacing={1.5} sx={{ mt: 2 }}>
      {items.map((it) => (
        <Grid key={it.label} item xs={12} sm={4}>
          <Box
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(BRAND.accent, 0.14)}`,
              background: alpha(BRAND.white, 0.92),
              boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: 950, fontSize: { xs: 26, md: 30 }, color: BRAND.dark }}>
              {it.value}
            </Typography>
            <Typography sx={{ color: alpha(BRAND.grey, 0.98), fontWeight: 800 }}>
              {it.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function InfoSitio() {
  const { store, sitio, carrusel } = usePublicSite();

  const storeName = store?.name || "Grupo Intercomp";
  const title = sitio?.titulo_1 || "Intercomp";
  const description =
    sitio?.descripcion ||
    "Servicio profesional en equipos de cómputo. Reparación, redes y soluciones TI para negocio y hogar.";

  // Carrusel (si existe), si no: imágenes estáticas
  const carouselUrls = useMemo(() => {
    const arr = Array.isArray(carrusel) ? carrusel : [];
    return arr.map((x) => toAbs(pickCarouselUrl(x))).filter(Boolean);
  }, [carrusel]);

  // ✅ FALLBACK a estáticas
  const imgSomos = carouselUrls?.[0] || "/images/intercomp-somos.jpg";
  const imgProductos = carouselUrls?.[1] || "/images/intercomp-productos.jpg";
  const imgServicios = carouselUrls?.[2] || "/images/intercomp-servicios.jpg";
  const imgGaleria = carouselUrls?.[3] || "/images/intercomp-galeria.jpg";

  const categorias = useMemo(
    () => [
      "Computadoras y Laptops",
      "Accesorios y Hardware",
      "Impresoras y Consumibles",
      "Redes y Cámaras",
      "Puntos de Venta",
      "Servicio Técnico",
    ],
    []
  );

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: `linear-gradient(180deg, ${alpha(BRAND.light, 0.90)}, ${BRAND.white} 55%)`,
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
              bgcolor: alpha(BRAND.accent, 0.08),
              borderColor: alpha(BRAND.accent, 0.20),
              color: BRAND.dark,
            }}
          />

          <Typography
            sx={{
              fontWeight: 950,
              letterSpacing: -0.9,
              lineHeight: 1.08,
              mb: 1,
              fontSize: { xs: 30, md: 46 },
              color: BRAND.dark,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mx: "auto",
              maxWidth: 900,
              color: alpha(BRAND.grey, 0.98),
              lineHeight: 1.75,
              mb: 2.25,
              fontSize: { xs: 14.75, md: 16.5 },
            }}
          >
            {description}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={1.5}>
            <PulseButton
              startIcon={<WhatsAppIcon />}
              onClick={() => window.open("https://wa.me/527441276538", "_blank")}
            >
              WhatsApp
            </PulseButton>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 2.5,
                fontWeight: 950,
                textTransform: "none",
                px: { xs: 2.6, md: 3 },
                py: { xs: 1.2, md: 1.35 },
                borderColor: alpha(BRAND.accent, 0.40),
                color: BRAND.accent,
                "&:hover": { bgcolor: alpha(BRAND.light, 0.65), borderColor: BRAND.accent },
              }}
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contacto
            </Button>
          </Stack>

          <StatsRow />
        </Box>

        {/* ================= SECCIÓN: SOMOS ================= */}
        <LandingSection
          flip={false}
          anim="slideLeft"
          kicker="Somos"
          title="Soluciones en Tecnologías de la Información."
          subtitle="Empresa con 23 años de experiencia. Servicio profesional para negocio y hogar: mantenimiento y reparación de equipos de cómputo, instalación de puntos de venta, redes de computadoras y periféricos."
          mediaSrc={imgSomos}
          mediaAlt="Grupo Intercomp"
          mediaPos="center 40%"
        >
          <BenefitBox
            icon={<VerifiedOutlinedIcon />}
            title="Atención profesional"
            desc="Diagnóstico claro, trabajo bien hecho y solución en tiempos reales."
          />

          <FeatureList
            items={[
              {
                icon: <SupportAgentOutlinedIcon />,
                title: "Asesoría directa",
                desc: "Te orientamos para elegir la mejor solución (hardware, software o red).",
              },
              {
                icon: <Inventory2OutlinedIcon />,
                title: "Refacciones y consumibles",
                desc: "Accesorios, hardware e impresión según disponibilidad.",
              },
              {
                icon: <LocationOnOutlinedIcon />,
                title: "Servicio local",
                desc: "Atención en Tapachula y coordinación por WhatsApp.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= SECCIÓN: PRODUCTOS / CATEGORÍAS ================= */}
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
          }}
        >
          <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
            <Chip
              icon={<CategoryOutlinedIcon />}
              label="Productos"
              variant="outlined"
              sx={{
                fontWeight: 950,
                bgcolor: alpha(BRAND.accent, 0.08),
                borderColor: alpha(BRAND.accent, 0.20),
              }}
            />
            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: -0.4,
                fontSize: { xs: 22, md: 30 },
                color: BRAND.dark,
              }}
            >
              Las mejores marcas al mejor precio
            </Typography>
            <Typography sx={{ color: alpha(BRAND.grey, 0.98), maxWidth: 860, lineHeight: 1.75 }}>
              Computadoras, accesorios, impresoras y consumibles. Pregunta por WhatsApp y te cotizamos rápido.
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
                  borderColor: alpha(BRAND.accent, 0.22),
                  bgcolor: alpha(BRAND.light, 0.80),
                  color: BRAND.dark,
                  "&:hover": { bgcolor: alpha(BRAND.light, 1) },
                }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 2.25, display: "flex", justifyContent: "center" }}>
            <PulseButton startIcon={<WhatsAppIcon />} onClick={() => window.open("https://wa.me/527441276538", "_blank")}>
              Cotizar por WhatsApp
            </PulseButton>
          </Box>
        </Box>

        {/* ================= SECCIÓN: SERVICIOS ================= */}
        <LandingSection
          flip
          anim="slideRight"
          kicker="Servicios"
          title="Servicio garantizado en máximo 72 horas*"
          subtitle="Solucionamos tu problema con diagnóstico y reparación profesional. (*Depende del daño y disponibilidad de refacciones.)"
          mediaSrc={imgServicios}
          mediaAlt="Nuestros servicios"
          mediaPos="center 45%"
        >
          <BenefitBox
            icon={<LocalOfferOutlinedIcon />}
            title="Servicio real, sin rodeos"
            desc="Te decimos qué tiene tu equipo, cuánto cuesta y el tiempo estimado."
          />

          <FeatureList
            items={[
              {
                icon: <ComputerOutlinedIcon />,
                title: "Reparación de PC",
                desc: "Laptops y escritorio: pantallas, teclados, discos, RAM, mantenimiento y más.",
              },
              {
                icon: <LanOutlinedIcon />,
                title: "Instalación de Redes de Cómputo",
                desc: "Cableado, configuración, mantenimiento y redes estructuradas o inalámbricas.",
              },
              {
                icon: <SupportOutlinedIcon />,
                title: "Asesoría Informática",
                desc: "Soporte y recomendaciones en hardware, software y soluciones para negocio.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= SECCIÓN: GALERÍA ================= */}
        <LandingSection
          flip={false}
          anim="zoomIn"
          kicker="Galería"
          title="Trabajos reales, clientes reales."
          subtitle="Mantenemos un compromiso fuerte con la calidad y nuestros clientes para satisfacer plenamente sus necesidades."
          mediaSrc={imgGaleria}
          mediaAlt="Galería de trabajos"
          mediaPos="center 40%"
        >
          <FeatureList
            items={[
              {
                icon: <VerifiedOutlinedIcon />,
                title: "Calidad",
                desc: "Procesos y diagnóstico con enfoque profesional.",
              },
              {
                icon: <SupportAgentOutlinedIcon />,
                title: "Atención",
                desc: "Comunicación clara: avances y entrega del equipo.",
              },
              {
                icon: <RequestQuoteOutlinedIcon />,
                title: "Cotización rápida",
                desc: "Te decimos opciones y precios por WhatsApp.",
              },
            ]}
          />
        </LandingSection>

        {/* ================= CTA FINAL ================= */}
        <Box
          id="contacto"
          component="section"
          sx={{
            borderRadius: 3.5,
            background: alpha(BRAND.white, 0.92),
            border: `1px solid ${alpha(BRAND.accent, 0.16)}`,
            boxShadow: "0 22px 70px rgba(0,0,0,0.10)",
            px: { xs: 2.25, md: 3.5 },
            py: { xs: 2.75, md: 3.25 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 950,
              letterSpacing: -0.4,
              fontSize: { xs: 22, md: 30 },
              color: BRAND.dark,
              mb: 1,
            }}
          >
            ¿Te cotizamos o revisamos tu equipo?
          </Typography>

          <Typography
            sx={{
              color: alpha(BRAND.grey, 0.98),
              maxWidth: 860,
              mx: "auto",
              lineHeight: 1.75,
              mb: 2.25,
            }}
          >
            Escríbenos por WhatsApp y te damos atención directa.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={1.5}>
            <PulseButton startIcon={<WhatsAppIcon />} onClick={() => window.open("https://wa.me/527441276538", "_blank")}>
              WhatsApp
            </PulseButton>


          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
