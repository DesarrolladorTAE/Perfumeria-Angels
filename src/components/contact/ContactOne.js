// src/components/contact/ContactOne.jsx
import * as React from "react";
import { useMemo, useState } from "react";
import axios from "axios";
import usePublicSite from "@/hooks/usePublicSite";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  alpha,
  Dialog,
  IconButton,
  Divider,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const API_URL = "https://telorecargo.com/api/enviar-documentos-whatsapp";

/** Paleta (la tuya) */
const BRAND = {
  accent: "#E94B7C",
  soft: "#F8D8E0",
  grey: "#5A5A5A",
  white: "#FFFFFF",
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
  return (
    item.url ||
    item.src ||
    item.image ||
    item.imagen ||
    item.path ||
    item.file ||
    ""
  );
}

const normalizePhone = (raw) => {
  if (!raw) return "";
  return String(raw).replace(/[^\d+]/g, "");
};

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

/** ✅ Imagen “pro” */
function LandingMedia({ src, alt, position = "center 40%" }) {
  const [ok, setOk] = useState(true);

  React.useEffect(() => setOk(true), [src]);

  return (
    <Box
      sx={{
        width: { xs: 280, md: 480 },
        height: { xs: 300, md: 500 }, // ✅ alto fijo
        borderRadius: { xs: 3, md: 3.5 },
        overflow: "hidden",
        border: `1px solid ${alpha(BRAND.accent, 0.18)}`,
        background: alpha(BRAND.soft, 0.55),
        boxShadow: "0 22px 65px rgba(0,0,0,0.14)",
        position: "relative",
      }}
    >
      {/* fallback */}
      {!src || !ok ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${alpha(
              BRAND.accent,
              0.22
            )} 0%, ${alpha(BRAND.soft, 0.65)} 55%, ${alpha(
              BRAND.white,
              0.9
            )} 100%)`,
          }}
        />
      ) : null}

      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          onLoad={() => setOk(true)}
          onError={() => setOk(false)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover", // ✅ recorta sin deformar
            objectPosition: position,
          }}
        />
      ) : null}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}


function LandingSection({
  kicker,
  title,
  subtitle,
  mediaSrc,
  mediaAlt,
  mediaPos,
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
        "&:before": {
          content: '""',
          position: "absolute",
          inset: "-140px -140px auto auto",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            BRAND.accent,
            0.14
          )}, transparent 60%)`,
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
        {/* INFO */}
        <Box sx={{ order: { xs: 1, md: 1 }, minWidth: 0, pr: { md: 1.25 } }}>
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
                }}
              >
                {subtitle}
              </Typography>
            ) : null}

            <Box sx={{ width: "100%", minWidth: 0 }}>{children}</Box>
          </Stack>
        </Box>

        {/* MEDIA */}
        {hasMedia ? (
          <Box
            sx={{
              order: { xs: 2, md: 2 },
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

/** ✅ Modal bonito (Confirm + Alert) */
function StyledModal({
  open,
  onClose,
  kind = "confirm", // "confirm" | "success" | "error"
  title,
  message,
  details,
  primaryText,
  secondaryText,
  onPrimary,
  onSecondary,
  loading,
}) {
  const icon =
    kind === "success" ? (
      <CheckCircleRoundedIcon />
    ) : kind === "error" ? (
      <ErrorRoundedIcon />
    ) : (
      <HelpRoundedIcon />
    );

  const iconBg =
    kind === "success"
      ? alpha("#2e7d32", 0.12)
      : kind === "error"
      ? alpha("#d32f2f", 0.12)
      : alpha(BRAND.accent, 0.14);

  const iconColor =
    kind === "success" ? "#2e7d32" : kind === "error" ? "#d32f2f" : BRAND.accent;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3.25,
          overflow: "hidden",
          background: `linear-gradient(180deg, ${alpha(
            BRAND.soft,
            0.6
          )}, ${alpha(BRAND.white, 0.95)} 55%)`,
          border: `1px solid ${alpha(BRAND.accent, 0.18)}`,
          boxShadow: "0 28px 90px rgba(0,0,0,0.20)",
        },
      }}
    >
      {/* header */}
      <Box sx={{ p: 2, position: "relative" }}>
        <IconButton
          onClick={loading ? undefined : onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: alpha(BRAND.grey, 0.9),
            bgcolor: alpha(BRAND.white, 0.6),
            border: `1px solid ${alpha(BRAND.accent, 0.14)}`,
            "&:hover": { bgcolor: alpha(BRAND.white, 0.9) },
          }}
          aria-label="Cerrar"
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>

        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              bgcolor: iconBg,
              color: iconColor,
              border: `1px solid ${alpha(iconColor, 0.2)}`,
            }}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: -0.3,
                color: "#111",
                lineHeight: 1.1,
                fontSize: 18,
              }}
            >
              {title}
            </Typography>
            {message ? (
              <Typography
                sx={{
                  mt: 0.4,
                  color: alpha(BRAND.grey, 0.95),
                  fontSize: 13.8,
                  lineHeight: 1.6,
                }}
              >
                {message}
              </Typography>
            ) : null}
          </Box>
        </Stack>

        {details ? (
          <Box
            sx={{
              mt: 1.6,
              p: 1.3,
              borderRadius: 2.25,
              bgcolor: alpha(BRAND.white, 0.82),
              border: `1px dashed ${alpha(BRAND.accent, 0.24)}`,
              color: alpha(BRAND.grey, 0.95),
              fontSize: 12.9,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
            }}
          >
            {details}
          </Box>
        ) : null}
      </Box>

      <Divider sx={{ borderColor: alpha(BRAND.accent, 0.14) }} />

      {/* actions */}
      <Box sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.2}
          justifyContent="flex-end"
        >
          {secondaryText ? (
            <Button
              onClick={onSecondary || onClose}
              disabled={loading}
              sx={{
                borderRadius: 999,
                fontWeight: 900,
                textTransform: "none",
                px: 2.4,
                py: 1.2,
                border: `1px solid ${alpha(BRAND.accent, 0.24)}`,
                color: alpha(BRAND.grey, 0.95),
                bgcolor: alpha(BRAND.white, 0.7),
                "&:hover": { bgcolor: alpha(BRAND.white, 0.95) },
              }}
            >
              {secondaryText}
            </Button>
          ) : null}

          {primaryText ? (
            <PulseButton
              onClick={onPrimary}
              disabled={loading}
              startIcon={kind === "confirm" ? <WhatsAppIcon /> : undefined}
              endIcon={kind === "confirm" ? <SendRoundedIcon /> : undefined}
              sx={{ borderRadius: 999, px: 2.6, py: 1.2 }}
            >
              {loading ? "Enviando..." : primaryText}
            </PulseButton>
          ) : null}
        </Stack>
      </Box>
    </Dialog>
  );
}

export default function ContactOne() {
  const { carrusel, owner, store } = usePublicSite();
  const [loading, setLoading] = useState(false);

  // ✅ Modal state
  const [modal, setModal] = useState({
    open: false,
    kind: "confirm", // confirm | success | error
    title: "",
    message: "",
    details: "",
    primaryText: "",
    secondaryText: "",
    onPrimary: null,
    onSecondary: null,
  });

  const closeModal = () =>
    setModal((m) => ({
      ...m,
      open: false,
      onPrimary: null,
      onSecondary: null,
    }));

  // ✅ MISMA LÓGICA: 7 → 0, normalizada
  const bgImg = useMemo(() => {
    const raw =
      carrusel?.[5]?.url ||
      carrusel?.[5] ||
      carrusel?.[0]?.url ||
      carrusel?.[0] ||
      "";
    return toAbs(pickCarouselUrl(raw));
  }, [carrusel]);

  // ✅ MISMO destino
  const destination = normalizePhone(owner?.phone || store?.phone || "");

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.4,
      backgroundColor: alpha(BRAND.white, 0.86),
      "& fieldset": { borderColor: alpha(BRAND.accent, 0.16) },
      "&:hover fieldset": { borderColor: alpha(BRAND.accent, 0.45) },
      "&.Mui-focused fieldset": { borderColor: BRAND.accent, borderWidth: 2 },
    },
    "& .MuiInputLabel-root": {
      color: alpha(BRAND.grey, 0.85),
      "&.Mui-focused": { color: BRAND.accent },
    },
    "& input::placeholder": {
      color: alpha(BRAND.grey, 0.65),
      opacity: 1,
    },
  };

  // ✅ helper: abre confirm modal y ejecuta callback si aceptan
  const openConfirm = ({ title, message, details, onConfirm }) => {
    setModal({
      open: true,
      kind: "confirm",
      title,
      message,
      details: details || "",
      primaryText: "Enviar Solicitud",
      secondaryText: "Cancelar",
      onPrimary: async () => {
        // NO cierres aquí: deja que se vea "Enviando..." si quieres
        await onConfirm?.();
      },
      onSecondary: closeModal,
    });
  };

  const openSuccess = ({ title, message }) => {
    setModal({
      open: true,
      kind: "success",
      title,
      message,
      details: "",
      primaryText: "Cerrar",
      secondaryText: "",
      onPrimary: () => closeModal(),
      onSecondary: null,
    });
  };

  const openError = ({ title, message, details }) => {
    setModal({
      open: true,
      kind: "error",
      title,
      message,
      details: details || "",
      primaryText: "Cerrar",
      secondaryText: "",
      onPrimary: () => closeModal(),
      onSecondary: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const f = e.currentTarget;

    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const phone = normalizePhone(f.phone.value);
    const subject = f.subject.value.trim();

    const message = [
      "🧴 *Nueva solicitud - Perfumes*",
      "",
      `👤 Nombre: ${name}`,
      `📞 Teléfono: ${phone}`,
      `📧 Email: ${email}`,
      `📝 Asunto: ${subject}`,
      "",
      "— Enviado desde la tienda online",
    ].join("\n");

    // ✅ En vez de window.confirm, abrimos modal confirm
    openConfirm({
      title: "Enviar solicitud por WhatsApp",
      message:
        "Tu mensaje se enviará para atención inmediata. ¿Deseas continuar?",
      details: `Destino: ${destination || "—"}\n\nMensaje:\n${message}`,
      onConfirm: async () => {
        try {
          setLoading(true);

          const res = await axios.post(API_URL, {
            phone: destination,
            message,
          });

          if (!res?.data || res.data?.success === false) {
            throw new Error("API sin éxito");
          }

          // cerramos confirm y abrimos éxito
          closeModal();
          openSuccess({
            title: "Mensaje enviado",
            message: "Se envió correctamente. Te contactaremos pronto.",
          });

          f.reset();
        } catch (err) {
          console.error(err);

          closeModal();
          openError({
            title: "No se pudo enviar",
            message: "Ocurrió un error al enviar el mensaje. Intenta nuevamente.",
            details:
              err?.response?.data
                ? JSON.stringify(err.response.data, null, 2)
                : String(err?.message || err),
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: `linear-gradient(180deg, ${alpha(
          BRAND.soft,
          0.55
        )}, ${BRAND.white} 55%)`,
      }}
    >
      <Container maxWidth="lg">
        <LandingSection
          kicker="Contacto"
          title="Cotiza por WhatsApp"
          subtitle="Déjanos tus datos y te respondemos rápido para cerrar tu pedido."
          mediaSrc={bgImg}
          mediaAlt="Perfumes"
          mediaPos="center 40%"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1.5,
              borderRadius: 3,
              border: `1px solid ${alpha(BRAND.accent, 0.14)}`,
              background: alpha(BRAND.white, 0.88),
              boxShadow: "0 18px 55px rgba(0,0,0,0.06)",
              p: { xs: 2, md: 2.25 },
            }}
          >
            <Stack spacing={1.6}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.6}>
                <TextField
                  name="name"
                  label="Nombre"
                  placeholder="Nombre*"
                  fullWidth
                  required
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          mr: 1,
                          color: BRAND.accent,
                        }}
                      >
                        <PersonRoundedIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Email*"
                  type="email"
                  fullWidth
                  required
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          mr: 1,
                          color: BRAND.accent,
                        }}
                      >
                        <EmailRoundedIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.6}>
                <TextField
                  name="phone"
                  label="Teléfono"
                  placeholder="Teléfono*"
                  fullWidth
                  required
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          mr: 1,
                          color: BRAND.accent,
                        }}
                      >
                        <PhoneIphoneRoundedIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
                <TextField
                  name="subject"
                  label="Asunto"
                  placeholder="Asunto*"
                  fullWidth
                  required
                  sx={inputSx}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          mr: 1,
                          color: BRAND.accent,
                        }}
                      >
                        <SubjectRoundedIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Stack>

              <PulseButton
                type="submit"
                disabled={loading}
                endIcon={<SendRoundedIcon />}
                sx={{
                  width: "100%",
                  mt: 0.25,
                  borderRadius: 999,
                  py: 1.35,
                }}
              >
                {loading ? "Enviando..." : "Enviar Solicitud"}
              </PulseButton>
            </Stack>
          </Box>
        </LandingSection>
      </Container>

      {/* ✅ Modal integrado en este componente */}
      <StyledModal
        open={modal.open}
        onClose={closeModal}
        kind={modal.kind}
        title={modal.title}
        message={modal.message}
        // details={modal.details}
        primaryText={modal.primaryText}
        secondaryText={modal.secondaryText}
        onPrimary={modal.onPrimary}
        onSecondary={modal.onSecondary}
        loading={loading}
      />
    </Box>
  );
}
