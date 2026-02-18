import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
  Fade,
  Slide,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const BRAND = {
  primary: "#0D47A1",
  accent: "#1976D2",
  accentSoft: "#42A5F5",
  dark: "#0B1E34",
  light: "#F4F8FD",
  white: "#FFFFFF",
  grey: "#5F6B7A",
};


export default function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        background: `linear-gradient(180deg, ${BRAND.light}, #ffffff)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">

          {/* INFO */}
          <Grid item xs={12} md={7}>
            <Fade in timeout={900}>
              <Box>

                <Typography
                  variant="overline"
                  sx={{
                    color: BRAND.accent,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  Grupo Intercomp
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: BRAND.dark,
                    mb: 2,
                  }}
                >
                  Tecnología, experiencia y soluciones reales.
                </Typography>

                <Typography
                  sx={{
                    color: BRAND.grey,
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  Somos una empresa con más de 23 años de experiencia brindando
                  servicios profesionales en equipos de cómputo, redes e
                  instalación de puntos de venta. Nos enfocamos en soluciones
                  reales, atención directa y servicio garantizado.
                </Typography>

                {/* HORARIOS */}
                <Stack spacing={1.2} mb={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ScheduleIcon sx={{ color: BRAND.accent }} />
                    <Typography>L–V 10:00 a.m. – 6:30 p.m.</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <ScheduleIcon sx={{ color: BRAND.accent }} />
                    <Typography>Sábados 10:00 a.m. – 5:30 p.m.</Typography>
                  </Stack>

                  <Typography sx={{ color: BRAND.grey }}>
                    Domingos cerrado
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* POLÍTICAS */}
                <Stack spacing={1.5} mb={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalShippingOutlinedIcon sx={{ color: BRAND.accent }} />
                    <Typography>
                      Envíos Tapachula: entrega directa · México: 2–5 días hábiles
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <VerifiedOutlinedIcon sx={{ color: BRAND.accent }} />
                    <Typography>
                      Servicio garantizado · Diagnóstico profesional
                    </Typography>
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    bgcolor: BRAND.accent,
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: BRAND.primary,
                    },
                  }}
                >
                  Contactar por WhatsApp
                </Button>

              </Box>
            </Fade>
          </Grid>

          {/* IMAGEN ESTÁTICA */}
          <Grid item xs={12} md={5}>
            <Slide direction="right" in timeout={900}>
              <Box
                component="img"
                src="/images/intercomp-equipo.jpg" // ← estática
                alt="Servicio técnico Intercomp"
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                }}
              />
            </Slide>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
