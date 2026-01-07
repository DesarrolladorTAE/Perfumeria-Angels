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
  primary: "#1b5e20",
  accent: "#2e7d32",
  dark: "#0f1f14",
  light: "#f5f8f6",
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
                  sx={{ color: BRAND.accent, fontWeight: 600 }}
                >
                  Sobre nosotros
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: BRAND.dark,
                    mb: 2,
                  }}
                >
                  Perfumes originales. Atención directa. Sin rodeos.
                </Typography>

                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                  No vendemos promesas ni discursos largos. Ofrecemos perfumes
                  100% originales, sellados y con atención directa por WhatsApp,
                  porque ahí es donde se cierran las ventas de verdad.
                </Typography>

                {/* HORARIOS */}
                <Stack spacing={1.2} mb={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ScheduleIcon fontSize="small" />
                    <Typography>
                      L–V 10:00 a.m. – 6:30 p.m.
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ScheduleIcon fontSize="small" />
                    <Typography>
                      Sábados 10:00 a.m. – 5:30 p.m.
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    Domingos cerrado
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* POLÍTICAS */}
                <Stack spacing={1.5} mb={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocalShippingOutlinedIcon />
                    <Typography>
                      Envíos Tapachula: mandadito · México: paquetería 2–5 días
                      hábiles
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <VerifiedOutlinedIcon />
                    <Typography>
                      Perfumes 100% originales, sellados. No cambios ni
                      devoluciones.
                    </Typography>
                  </Stack>
                </Stack>

            
              </Box>
            </Fade>
          </Grid>

         
        </Grid>
      </Container>
    </Box>
  );
}
