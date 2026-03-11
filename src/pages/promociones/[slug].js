import { useRouter } from "next/router";
import * as React from "react";
import PublicStoreService from "@/api/publicStore.service";

import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import HeroTwo from "@/components/hero/HeroTwo";
import FooterOne from "../../common/footer/FooterOne";
import TopAnnouncementMarquee from "@/components/hero/TopAnnouncementBar";

import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Chip,
  Button,
  Divider,
  Grid,
  alpha,
} from "@mui/material";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";

function InfoCard({ title, icon, children }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        background: alpha("#000", 0.02),
        border: "1px solid rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography sx={{ fontWeight: 900, color: "#111" }}>{title}</Typography>
      </Stack>

      <Box sx={{ mt: 1.2 }}>{children}</Box>
    </Box>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 2.2 },
        borderRadius: 3,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography sx={{ fontSize: 18, fontWeight: 1000, color: "#111" }}>
          {title}
        </Typography>
      </Stack>

      <Box sx={{ mt: 1.4 }}>{children}</Box>
    </Box>
  );
}

function SmallPill({ children, tone = "default" }) {
  const styles =
    tone === "include"
      ? {
          bgcolor: alpha("#2e7d32", 0.12),
          color: "#1b5e20",
          border: "1px solid rgba(46,125,50,0.20)",
        }
      : tone === "exclude"
      ? {
          bgcolor: alpha("#e53935", 0.10),
          color: "#b71c1c",
          border: "1px solid rgba(229,57,53,0.20)",
        }
      : {
          bgcolor: alpha("#111", 0.04),
          color: "#333",
          border: "1px solid rgba(0,0,0,0.08)",
        };

  return (
    <Chip
      label={children}
      size="small"
      sx={{
        fontWeight: 900,
        ...styles,
      }}
    />
  );
}

function getDiscountLabel(promo) {
  if (promo?.special_price) {
    return `Precio especial: $${promo.special_price}`;
  }

  if (promo?.discount_type === "percentage") {
    return `${promo.discount_value}% de descuento`;
  }

  if (promo?.discount_type === "fixed") {
    return `$${promo.discount_value} de descuento`;
  }

  return "Promoción activa";
}

function getRuleEntityName(rule) {
  if (rule?.scope_label) return rule.scope_label;

  if (rule?.scope_entity?.name) return rule.scope_entity.name;
  if (rule?.scope_entity?.title) return rule.scope_entity.title;
  if (rule?.scope_entity?.sku) return rule.scope_entity.sku;

  if (rule?.scope_type === "variant_attribute") {
    return `${rule?.attr_name || "atributo"}: ${rule?.attr_value || "-"}`;
  }

  return `ID ${rule?.scope_id ?? "-"}`;
}

function getRuleScopeText(rule) {
  switch (rule?.scope_type) {
    case "product":
      return "Producto";
    case "variant":
      return "Variante";
    case "category":
      return "Categoría";
    case "variant_attribute":
      return "Atributo de variante";
    default:
      return "Regla";
  }
}

export default function PromotionDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [promo, setPromo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!slug) return;

    let alive = true;

    (async () => {
      try {
        const res = await PublicStoreService.getPromotionDetail(slug);
        const data = res?.data?.data ?? null;

        if (!alive) return;
        setPromo(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "No se pudo cargar la promoción");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  const formatDate = React.useCallback((value) => {
    if (!value) return "No disponible";
    try {
      return new Date(value).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return value;
    }
  }, []);

  const rules = Array.isArray(promo?.rules) ? promo.rules : [];
  const bulkTiers = Array.isArray(promo?.bulk_tiers)
    ? promo.bulk_tiers
    : Array.isArray(promo?.bulkTiers)
    ? promo.bulkTiers
    : [];
  const bxgy = Array.isArray(promo?.bxgy) ? promo.bxgy : [];
  const comboItems = Array.isArray(promo?.combo_items)
    ? promo.combo_items
    : Array.isArray(promo?.comboItems)
    ? promo.comboItems
    : [];

  return (
    <>
      <SEO pageTitle={promo?.name ? `Promoción - ${promo.name}` : "Promoción"} />
      <HeaderOne />
      <TopAnnouncementMarquee />
      <HeroTwo />

      <Box
        sx={{
          minHeight: "60vh",
          py: { xs: 4, md: 6 },
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,1) 100%)",
        }}
      >
        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center", minHeight: "40vh" }}>
            <Stack spacing={1.4} alignItems="center">
              <CircularProgress />
              <Typography sx={{ fontWeight: 800, color: "#555" }}>
                Cargando promoción…
              </Typography>
            </Stack>
          </Box>
        ) : error || !promo ? (
          <Container maxWidth="md">
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
              }}
            >
              <Typography sx={{ fontSize: 24, fontWeight: 900, color: "#111" }}>
                No se encontró la promoción
              </Typography>

              <Typography sx={{ mt: 1, color: "#666", lineHeight: 1.6 }}>
                La promoción que intentas abrir no está disponible o ya no existe.
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => router.push("/tienda")}
              >
                Volver al catálogo
              </Button>
            </Box>
          </Container>
        ) : (
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => router.push("/tienda")}
                sx={{
                  width: "fit-content",
                  fontWeight: 900,
                  textTransform: "none",
                }}
              >
                Volver al catálogo
              </Button>

              <Box
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    minHeight: { xs: 240, md: 360 },
                    position: "relative",
                    backgroundColor: "#111",
                    backgroundImage: promo?.image
                      ? `linear-gradient(180deg, ${alpha("#000", 0.18)} 0%, ${alpha("#000", 0.52)} 100%), url("${promo.image}")`
                      : "linear-gradient(135deg, #111 0%, #000 100%)",
                    backgroundSize: promo?.image ? "contain" : "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      p: { xs: 2, md: 3 },
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                  >
                    <Stack spacing={1.2}>
                      <Chip
                        icon={<LocalOfferRoundedIcon />}
                        label={promo?.is_active ? "Promoción activa" : "Promoción"}
                        sx={{
                          width: "fit-content",
                          bgcolor: "#ff4f8b",
                          color: "#fff",
                          fontWeight: 900,
                          "& .MuiChip-icon": { color: "#fff" },
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 1000,
                          fontSize: { xs: 28, md: 40 },
                          lineHeight: 1.05,
                          textShadow: "0 4px 18px rgba(0,0,0,0.28)",
                        }}
                      >
                        {promo.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: alpha("#fff", 0.92),
                          fontSize: { xs: 14, md: 16 },
                          fontWeight: 700,
                          maxWidth: 820,
                          lineHeight: 1.6,
                          textShadow: "0 3px 14px rgba(0,0,0,0.22)",
                        }}
                      >
                        {promo.description}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack spacing={2.2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          title="Beneficio"
                          icon={<BoltRoundedIcon sx={{ color: "#ff4f8b" }} />}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: 22, md: 28 },
                              fontWeight: 1000,
                              color: "#111",
                            }}
                          >
                            {getDiscountLabel(promo)}
                          </Typography>
                        </InfoCard>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <InfoCard
                          title="Vigencia"
                          icon={<CalendarMonthRoundedIcon sx={{ color: "#ff4f8b" }} />}
                        >
                          <Typography sx={{ color: "#444", fontWeight: 700 }}>
                            Inicio: {formatDate(promo.starts_at)}
                          </Typography>

                          <Typography sx={{ mt: 0.6, color: "#444", fontWeight: 700 }}>
                            Fin: {formatDate(promo.ends_at)}
                          </Typography>
                        </InfoCard>
                      </Grid>
                    </Grid>

                    <Divider />

                    <SectionCard
                      title="Reglas de aplicación"
                      icon={<SellRoundedIcon sx={{ color: "#ff4f8b" }} />}
                    >
                      {rules.length ? (
                        <Stack spacing={1.2}>
                          {rules.map((rule) => (
                            <Box
                              key={rule.id}
                              sx={{
                                p: 1.4,
                                borderRadius: 2,
                                border: "1px solid rgba(0,0,0,0.07)",
                                background: alpha("#000", 0.015),
                              }}
                            >
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                alignItems={{ xs: "flex-start", sm: "center" }}
                              >
                                <SmallPill tone={rule?.mode === "include" ? "include" : "exclude"}>
                                  {rule?.mode === "include" ? "Incluye" : "Excluye"}
                                </SmallPill>

                                <SmallPill>{getRuleScopeText(rule)}</SmallPill>
                              </Stack>

                              <Typography
                                sx={{
                                  mt: 1,
                                  fontWeight: 900,
                                  color: "#111",
                                }}
                              >
                                {getRuleEntityName(rule)}
                              </Typography>

                              {rule?.scope_type === "variant_attribute" ? (
                                <Typography sx={{ mt: 0.6, color: "#666" }}>
                                  Atributo: <strong>{rule?.attr_name}</strong> ={" "}
                                  <strong>{rule?.attr_value}</strong>
                                </Typography>
                              ) : null}
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Typography sx={{ color: "#666" }}>
                          Esta promoción no tiene reglas visibles configuradas.
                        </Typography>
                      )}
                    </SectionCard>

                    {bulkTiers.length ? (
                      <SectionCard
                        title="Escalonado por volumen"
                        icon={<LayersRoundedIcon sx={{ color: "#ff4f8b" }} />}
                      >
                        <Stack spacing={1.2}>
                          {bulkTiers.map((tier) => (
                            <Box
                              key={tier.id}
                              sx={{
                                p: 1.4,
                                borderRadius: 2,
                                border: "1px solid rgba(0,0,0,0.07)",
                                background: alpha("#000", 0.015),
                              }}
                            >
                              <Typography sx={{ fontWeight: 900, color: "#111" }}>
                                Desde {tier.min_qty || tier.quantity || 0} piezas
                              </Typography>

                              <Typography sx={{ mt: 0.5, color: "#555" }}>
                                {tier.discount_type === "percentage"
                                  ? `${tier.discount_value}% de descuento`
                                  : tier.discount_type === "fixed"
                                  ? `$${tier.discount_value} de descuento`
                                  : tier.special_price
                                  ? `Precio especial: $${tier.special_price}`
                                  : "Beneficio escalonado"}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </SectionCard>
                    ) : null}

                    {bxgy.length ? (
                      <SectionCard
                        title="Compra X y recibe Y"
                        icon={<Inventory2RoundedIcon sx={{ color: "#ff4f8b" }} />}
                      >
                        <Stack spacing={1.2}>
                          {bxgy.map((item) => (
                            <Box
                              key={item.id}
                              sx={{
                                p: 1.4,
                                borderRadius: 2,
                                border: "1px solid rgba(0,0,0,0.07)",
                                background: alpha("#000", 0.015),
                              }}
                            >
                              <Typography sx={{ fontWeight: 900, color: "#111" }}>
                                Compra {item.buy_qty || item.buy_quantity || 0} y recibe{" "}
                                {item.get_qty || item.get_quantity || 0}
                              </Typography>

                              {item?.free_product?.name ? (
                                <Typography sx={{ mt: 0.5, color: "#555" }}>
                                  Producto regalo: {item.free_product.name}
                                </Typography>
                              ) : null}
                            </Box>
                          ))}
                        </Stack>
                      </SectionCard>
                    ) : null}

                    {comboItems.length ? (
                      <SectionCard
                        title="Productos del combo"
                        icon={<CategoryRoundedIcon sx={{ color: "#ff4f8b" }} />}
                      >
                        <Stack spacing={1.2}>
                          {comboItems.map((item) => (
                            <Box
                              key={item.id}
                              sx={{
                                p: 1.4,
                                borderRadius: 2,
                                border: "1px solid rgba(0,0,0,0.07)",
                                background: alpha("#000", 0.015),
                              }}
                            >
                              <Typography sx={{ fontWeight: 900, color: "#111" }}>
                                {item?.product?.name ||
                                  item?.name ||
                                  `Producto del combo #${item.id}`}
                              </Typography>

                              {item?.qty ? (
                                <Typography sx={{ mt: 0.5, color: "#555" }}>
                                  Cantidad: {item.qty}
                                </Typography>
                              ) : null}
                            </Box>
                          ))}
                        </Stack>
                      </SectionCard>
                    ) : null}

                    <SectionCard
                      title="Resumen"
                      icon={<LocalOfferRoundedIcon sx={{ color: "#ff4f8b" }} />}
                    >
                      <Typography sx={{ color: "#555", lineHeight: 1.8, fontSize: 15.5 }}>
                        {promo.description}
                      </Typography>
                    </SectionCard>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                      sx={{ pt: 1 }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<LocalOfferRoundedIcon />}
                        onClick={() => router.push("/tienda")}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 950,
                          textTransform: "none",
                          px: 2.4,
                          py: 1.2,
                          bgcolor: "#ff4f8b",
                          "&:hover": { bgcolor: "#eb3f7d" },
                        }}
                      >
                        Ver catálogo
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<ArrowBackRoundedIcon />}
                        onClick={() => router.back()}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 950,
                          textTransform: "none",
                          px: 2.4,
                          py: 1.2,
                        }}
                      >
                        Regresar
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Container>
        )}
      </Box>

      <FooterOne />
    </>
  );
}