import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  Avatar,
  TextField,
  Paper,
  Chip,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useCart } from "@/context/CartContext";
import { moneyMXN } from "@/utils/catalogUtils";
import usePublicSite from "@/hooks/usePublicSite";

// ---------- helpers ----------
const onlyDigits = (v) => String(v || "").replace(/\D/g, "");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

function pickStoreWhatsAppNumber({ store, sitio, owner }) {
  const candidates = [
    sitio?.whatsapp,
    sitio?.telefono,
    sitio?.phone,
    store?.whatsapp,
    store?.phone,
    store?.telefono,
    store?.phone_number,
    owner?.whatsapp,
    owner?.phone,
    owner?.telefono,
  ].filter(Boolean);

  return onlyDigits(candidates[0] || "");
}

function buildWhatsAppMessage({ storeName, customerName, customerEmail, items, totals, calcFinalPrice }) {
  const lines = [];
  lines.push(` *Nuevo pedido*`);
  // if (storeName) lines.push(` Tienda: *${storeName}*`);
  lines.push("");
  lines.push(` Cliente: *${customerName || "-"}*`);
  lines.push(` Correo: ${customerEmail || "-"}`);
  lines.push("");
  lines.push(` *Productos*`);
  lines.push("--------------------------------------------------");

  items.forEach((it, idx) => {
    const unit = calcFinalPrice(it);
    const qty = Number(it.qty || 1);
    const lineTotal = unit * qty;
    const name = String(it.name || "Producto").trim();

    lines.push(`${idx + 1}) ${name}`);
    lines.push(`   • Cantidad: ${qty}`);
    lines.push(`   • Precio: ${moneyMXN(unit)} c/u`);
    lines.push(`   • Importe: *${moneyMXN(lineTotal)}*`);
    lines.push("");
  });

  lines.push("--------------------------------------------------");
  lines.push(`Subtotal: ${moneyMXN(totals.subtotal)}`);
  lines.push(`Descuento: -${moneyMXN(totals.savings)}`);
  lines.push(`*Total: ${moneyMXN(totals.total)}*`);
  lines.push("");
  lines.push("¿Me confirmas disponibilidad y forma de pago?");
  // lines.push("Gracias");

  return lines.join("\n");
}

// ---------- animations ----------
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const softPulse = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-1px); }
  100% { transform: translateY(0); }
`;

export default function CartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { items, inc, dec, remove, clear, totals, calcFinalPrice } = useCart();
  const { store, sitio, owner, branding } = usePublicSite();

  // paleta (tu sitio: rosa + negro)
  const BRAND = React.useMemo(
    () => ({
      pink: "#E64B7A",
      pink2: "#FF6FA3",
      black: "#0B0F1A",
      text: "#0B0F1A",
      subtext: alpha("#0B0F1A", 0.65),
      stroke: alpha("#0B0F1A", 0.10),
      card: "#FFFFFF",
      bg: "#FFFFFF",
    }),
    []
  );

  const storeName = branding?.titulo || store?.name || "Mi tienda";
  const waNumber = React.useMemo(() => pickStoreWhatsAppNumber({ store, sitio, owner }), [store, sitio, owner]);

  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  const nameOk = customerName.trim().length >= 3;
  const emailOk = isEmail(customerEmail);
  const canSend = items.length > 0 && nameOk && emailOk && !!waNumber;

  const message = React.useMemo(() => {
    return buildWhatsAppMessage({
      storeName,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      items,
      totals,
      calcFinalPrice,
    });
  }, [storeName, customerName, customerEmail, items, totals, calcFinalPrice]);

  const handleSendWhatsApp = () => {
    setTouched(true);
    if (!canSend) return;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: BRAND.bg, pb: isMobile ? 12 : 4 }}>
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3 } }}>
        {/* Header (responsive) */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.25, sm: 2 },
            borderRadius: 4,
            background: `linear-gradient(90deg, ${BRAND.black} 0%, ${alpha(BRAND.black, 0.92)} 100%)`,
            color: "#fff",
            border: `1px solid ${alpha("#fff", 0.10)}`,
            animation: `${fadeUp} .35s ease-out`,
            overflow: "hidden",
          }}
        >
          <Stack spacing={{ xs: 1.1, sm: 0 }}>
            {/* Fila 1 (xs): icon + title */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
              sx={{ minWidth: 0 }}
            >
              <Stack direction="row" spacing={1.1} alignItems="center" sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    width: { xs: 38, sm: 42 },
                    height: { xs: 38, sm: 42 },
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pink2} 100%)`,
                    boxShadow: `0 12px 30px ${alpha(BRAND.pink, 0.35)}`,
                  }}
                >
                  <LocalMallRoundedIcon sx={{ color: "#fff", fontSize: { xs: 20, sm: 22 } }} />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 950,
                    lineHeight: 1.05,
                    color: "#fff",
                    fontSize: { xs: 16, sm: 20 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Tu carrito
                </Typography>
              </Stack>

              {/* En desktop se queda a la derecha como lo tenías */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Chip
                  label={`${items.length} item${items.length === 1 ? "" : "s"}`}
                  sx={{
                    height: 30,
                    borderRadius: 3,
                    color: "#fff",
                    border: `1px solid ${alpha("#fff", 0.14)}`,
                    backgroundColor: alpha("#fff", 0.06),
                    fontWeight: 900,
                  }}
                />

                <Tooltip title="Vaciar carrito">
                  <span>
                    <Button
                      onClick={clear}
                      startIcon={<CleaningServicesRoundedIcon />}
                      disabled={items.length === 0}
                      sx={{
                        borderRadius: 3,
                        px: 1.6,
                        fontWeight: 900,
                        textTransform: "none",
                        color: "#fff",
                        border: `1px solid ${alpha("#fff", 0.14)}`,
                        background: alpha("#fff", 0.06),
                        "&:hover": { background: alpha("#fff", 0.10) },
                      }}
                    >
                      Limpiar
                    </Button>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>

            {/* Fila 2 (solo móvil): chip + botón full width */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <Chip
                label={`${items.length} item${items.length === 1 ? "" : "s"}`}
                sx={{
                  height: 28,
                  borderRadius: 999,
                  color: "#fff",
                  border: `1px solid ${alpha("#fff", 0.16)}`,
                  backgroundColor: alpha("#fff", 0.08),
                  fontWeight: 900,
                }}
              />

              <Button
                fullWidth
                onClick={clear}
                startIcon={<CleaningServicesRoundedIcon />}
                disabled={items.length === 0}
                sx={{
                  borderRadius: 999,
                  py: 0.9,
                  fontWeight: 900,
                  textTransform: "none",
                  color: "#fff",
                  border: `1px solid ${alpha("#fff", 0.16)}`,
                  background: alpha("#fff", 0.08),
                  "&:hover": { background: alpha("#fff", 0.12) },
                  "&.Mui-disabled": { opacity: 0.5, color: "#fff" },
                }}
              >
                Limpiar
              </Button>
            </Stack>
          </Stack>
        </Paper>


        <Divider sx={{ my: 2.2, borderColor: BRAND.stroke }} />

        {/* Empty */}
        {items.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              background: "#fff",
              border: `1px solid ${BRAND.stroke}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              animation: `${fadeUp} .35s ease-out`,
            }}
          >
            <Typography sx={{ fontWeight: 950, mb: 0.5, color: BRAND.text }}>No hay productos aún</Typography>
            <Typography sx={{ color: BRAND.subtext }}>Agrega productos desde el catálogo.</Typography>
          </Paper>
        ) : (
          <Stack spacing={1.6} sx={{ animation: `${fadeUp} .35s ease-out` }}>
            {/* Items */}
            {items.map((it) => {
              const unit = calcFinalPrice(it);
              const hasDiscount = Number(it.price || 0) !== unit;

              return (
                <Card
                  key={it.id}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    background: "#fff",
                    border: `1px solid ${BRAND.stroke}`,
                    boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: { xs: 1.35, sm: 2 } }}>
                    <Stack spacing={1.1}>
                      {/* Row 1: Imagen + Info */}
                      <Stack
                        direction="row"
                        spacing={1.2}
                        alignItems="center"
                        sx={{ minWidth: 0 }}
                      >
                        <Avatar
                          src={it.image || undefined}
                          variant="rounded"
                          sx={{
                            width: { xs: 52, sm: 62 },
                            height: { xs: 52, sm: 62 },
                            borderRadius: 3,
                            flexShrink: 0,
                            border: `1px solid ${alpha(BRAND.black, 0.10)}`,
                            background: alpha(BRAND.black, 0.03),
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontWeight: 950,
                              color: BRAND.text,
                              fontSize: { xs: 14, sm: 16 },
                              lineHeight: 1.15,
                            }}
                            noWrap
                          >
                            {it.name}
                          </Typography>

                          {/* Precio + oferta (que wrapee bien en xs) */}
                          <Stack
                            direction="row"
                            spacing={0.8}
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{ mt: 0.35 }}
                          >
                            {Number(it.price || 0) !== calcFinalPrice(it) && (
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                  opacity: 0.55,
                                  fontSize: 12,
                                  color: BRAND.text,
                                }}
                              >
                                {moneyMXN(it.price)}
                              </Typography>
                            )}

                            <Typography sx={{ fontWeight: 950, color: BRAND.text }}>
                              {moneyMXN(calcFinalPrice(it))}
                            </Typography>

                            <Typography sx={{ color: BRAND.subtext, fontSize: 12 }}>
                              c/u
                            </Typography>

                            {Number(it.price || 0) !== calcFinalPrice(it) && (
                              <Chip
                                size="small"
                                label="Oferta"
                                sx={{
                                  height: 22,
                                  borderRadius: 2,
                                  fontWeight: 900,
                                  color: "#fff",
                                  background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pink2} 100%)`,
                                }}
                              />
                            )}
                          </Stack>

                          {it.stock != null && (
                            <Typography sx={{ color: BRAND.subtext, fontSize: 12, mt: 0.25 }}>
                              Stock: {it.stock}
                            </Typography>
                          )}
                        </Box>
                      </Stack>

                      {/* Row 2: Controles (en móvil abajo para que no se encimen) */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={0.7}>
                          <IconButton
                            onClick={() => dec(it.id, 1)}
                            sx={{
                              borderRadius: 3,
                              border: `1px solid ${alpha(BRAND.black, 0.12)}`,
                              color: BRAND.text,
                              background: alpha(BRAND.black, 0.02),
                              "&:hover": { background: alpha(BRAND.black, 0.05) },
                            }}
                          >
                            <RemoveRoundedIcon />
                          </IconButton>

                          <Typography sx={{ width: 28, textAlign: "center", fontWeight: 950, color: BRAND.text }}>
                            {it.qty}
                          </Typography>

                          <IconButton
                            onClick={() => inc(it.id, 1)}
                            disabled={it.stock != null && it.qty >= it.stock}
                            sx={{
                              borderRadius: 3,
                              border: `1px solid ${alpha(BRAND.black, 0.12)}`,
                              color: BRAND.text,
                              background: alpha(BRAND.black, 0.02),
                              "&:hover": { background: alpha(BRAND.black, 0.05) },
                              "&.Mui-disabled": { opacity: 0.45 },
                            }}
                          >
                            <AddRoundedIcon />
                          </IconButton>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography sx={{ fontSize: 12, color: BRAND.subtext }}>
                            Importe
                          </Typography>
                          <Typography sx={{ fontWeight: 950, color: BRAND.text }}>
                            {moneyMXN(calcFinalPrice(it) * (it.qty || 1))}
                          </Typography>

                          <IconButton
                            onClick={() => remove(it.id)}
                            sx={{
                              borderRadius: 3,
                              color: BRAND.text,
                              background: alpha(BRAND.black, 0.02),
                              "&:hover": { background: alpha(BRAND.pink, 0.10) },
                            }}
                          >
                            <DeleteOutlineRoundedIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

              );
            })}

            {/* Form + Summary */}
            <Stack direction={{ xs: "column", md: "row" }} spacing={1.6} alignItems="stretch">
              {/* Customer form */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1.2,
                  p: { xs: 1.6, sm: 2 },
                  borderRadius: 4,
                  background: "#fff",
                  border: `1px solid ${BRAND.stroke}`,
                  boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
                }}
              >
                <Typography sx={{ fontWeight: 950, mb: 1.2, color: BRAND.text }}>
                  Datos para Armar tu pedido
                </Typography>

                <Stack spacing={1.1}>
                  <TextField
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="Ej. Pedro Garcia"
                    label="Nombre"
                    fullWidth
                    InputProps={{
                      startAdornment: <PersonRoundedIcon sx={{ mr: 1, opacity: 0.7 }} />,
                    }}
                    error={touched && !nameOk}
                    helperText={touched && !nameOk ? "Escribe al menos 3 caracteres." : " "}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: 3, background: "#fff" },
                      "& .MuiInputLabel-root": { color: alpha(BRAND.black, 0.65) },
                      "& .MuiFormHelperText-root": { color: alpha(BRAND.black, 0.60) },
                    }}
                  />

                  <TextField
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="tucorreo@gmail.com"
                    label="Correo electrónico"
                    fullWidth
                    InputProps={{
                      startAdornment: <EmailRoundedIcon sx={{ mr: 1, opacity: 0.7 }} />,
                    }}
                    error={touched && !emailOk}
                    helperText={touched && !emailOk ? "Escribe un correo válido." : " "}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: 3, background: "#fff" },
                      "& .MuiInputLabel-root": { color: alpha(BRAND.black, 0.65) },
                      "& .MuiFormHelperText-root": { color: alpha(BRAND.black, 0.60) },
                    }}
                  />

                  {!waNumber && (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.2,
                        borderRadius: 3,
                        border: `1px solid ${alpha(BRAND.pink, 0.40)}`,
                        background: alpha(BRAND.pink, 0.06),
                      }}
                    >
                      <Typography sx={{ fontWeight: 900, color: BRAND.text, fontSize: 13 }}>
                        ⚠️ No encontré el número de WhatsApp de la tienda.
                      </Typography>
                      <Typography sx={{ color: BRAND.subtext, fontSize: 12 }}>
                        Agrega un campo como <b>sitio.whatsapp</b> o <b>store.whatsapp</b>.
                      </Typography>
                    </Paper>
                  )}
                </Stack>
              </Paper>

              {/* Summary (desktop) */}
              <Paper
                elevation={0}
                sx={{
                  flex: 0.8,
                  p: { xs: 1.6, sm: 2 },
                  borderRadius: 4,
                  background: "#fff",
                  border: `1px solid ${BRAND.stroke}`,
                  boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
                  position: { md: "sticky" },
                  top: { md: 16 },
                  alignSelf: { md: "flex-start" },
                }}
              >
                <Typography sx={{ fontWeight: 950, mb: 1.2, color: BRAND.text }}>Resumen</Typography>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: BRAND.subtext }}>Subtotal</Typography>
                    <Typography sx={{ fontWeight: 950, color: BRAND.text }}>{moneyMXN(totals.subtotal)}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: BRAND.subtext }}>Descuento</Typography>
                    <Typography sx={{ fontWeight: 950, color: BRAND.text }}>
                      - {moneyMXN(totals.savings)}
                    </Typography>
                  </Stack>

                  <Divider sx={{ borderColor: BRAND.stroke }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography sx={{ fontWeight: 950, color: BRAND.text }}>Total</Typography>
                    <Typography sx={{ fontWeight: 950, fontSize: 20, color: BRAND.text }}>
                      {moneyMXN(totals.total)}
                    </Typography>
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleSendWhatsApp}
                    disabled={!canSend}
                    sx={{
                      mt: 1,
                      borderRadius: 3,
                      py: 1.25,
                      fontWeight: 950,
                      textTransform: "none",
                      background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pink2} 100%)`,
                      boxShadow: `0 18px 45px ${alpha(BRAND.pink, 0.22)}`,
                      animation: canSend ? `${softPulse} 1.6s ease-in-out infinite` : "none",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${BRAND.pink2} 0%, ${BRAND.pink} 100%)`,
                      },
                      "&.Mui-disabled": { opacity: 0.55, color: "#fff" },
                    }}
                  >
                    Armar pedido
                  </Button>

                  <Typography sx={{ color: BRAND.subtext, fontSize: 12, mt: 0.5 }}>
                    Se abrirá WhatsApp con tu pedido listo para enviar.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        )}
      </Container>

      {/* Sticky bar (mobile) */}
      {/* {items.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            borderTop: `1px solid ${alpha(BRAND.black, 0.10)}`,
            background: "#fff",
            px: 2,
            py: 1.4,
            boxShadow: "0 -14px 30px rgba(0,0,0,0.08)",
            display: { xs: "block", md: "none" },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 950, fontSize: 13, color: BRAND.subtext }}>
                Total
              </Typography>
              <Typography sx={{ fontWeight: 950, fontSize: 18, color: BRAND.text }} noWrap>
                {moneyMXN(totals.total)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={handleSendWhatsApp}
              disabled={!canSend}
              sx={{
                borderRadius: 999,
                px: 2.2,
                py: 1.15,
                fontWeight: 950,
                textTransform: "none",
                background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pink2} 100%)`,
                boxShadow: `0 18px 45px ${alpha(BRAND.pink, 0.22)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${BRAND.pink2} 0%, ${BRAND.pink} 100%)`,
                },
                "&.Mui-disabled": { opacity: 0.55, color: "#fff" },
              }}
            >
              Armar pedido
            </Button>
          </Stack>
        </Paper>
      )} */}
    </Box>
  );
}
