import * as React from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
  IconButton,
  Divider,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import GhostTabs from "./GhostTabs";
import { PALETTE } from "@/utils/catalogUtils";

function getCatSlug(cat) {
  return String(cat?.slug || cat?.category_slug || cat?.category_id || "");
}

function getCatLabel(cat) {
  return (
    cat?.label ||
    cat?.category_name ||
    cat?.name ||
    (cat?.category_id ? `Categoría ${cat.category_id}` : "Categoría")
  );
}

function isPrincipalCategory(cat) {
  return (
    cat?.is_principal === true ||
    cat?.is_principal === 1 ||
    cat?.is_principal === "1" ||
    cat?.is_default === true ||
    cat?.is_default === 1 ||
    cat?.is_default === "1"
  );
}

export default function CatalogHeader({
  q = "",
  setQ,
  catOptions = [],
  catSlug = "",
  selectedCatLabel = "",
  setCatSlug,
  tab,
  setTab,
  tabs = [],
  tabItemsCount = 0,
  onReload,
  activeCategory,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const safeCatOptions = Array.isArray(catOptions) ? catOptions : [];

  const currentCategorySlug = React.useMemo(() => {
    return String(catSlug || activeCategory?.slug || "");
  }, [catSlug, activeCategory]);

  const currentCategoryName = React.useMemo(() => {
    const found = safeCatOptions.find(
      (cat) => getCatSlug(cat) === currentCategorySlug,
    );

    return (
      selectedCatLabel ||
      activeCategory?.name ||
      (found ? getCatLabel(found) : "")
    );
  }, [selectedCatLabel, activeCategory, safeCatOptions, currentCategorySlug]);

  const principalCategory = React.useMemo(() => {
    return safeCatOptions.find((cat) => isPrincipalCategory(cat)) || null;
  }, [safeCatOptions]);

  const hasPrincipalCategory = Boolean(principalCategory);

  const principalLabel = hasPrincipalCategory
    ? getCatLabel(principalCategory)
    : "";

  return (
    <Box
      sx={{
        borderRadius: { xs: 2.6, md: 3.2 },
        overflow: "hidden",
        background: "#000",
        border: `1px solid ${alpha("#fff", 0.12)}`,
        boxShadow: "0 22px 70px rgba(0,0,0,0.35)",
      }}
    >
      <Box
        sx={{
          px: { xs: 1.2, md: 2 },
          py: { xs: 1.1, md: 1.4 },
          background: "#000",
          borderBottom: `3px solid ${PALETTE.accent}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 950,
                letterSpacing: -0.6,
                color: "#fff",
                fontSize: { xs: 16, md: 22 },
                lineHeight: 1.05,
              }}
            >
              CATÁLOGO
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                color: alpha("#fff", 0.78),
                fontWeight: 800,
                fontSize: { xs: 12, md: 14 },
              }}
            >
              {principalLabel
                ? `Explora lo más buscado en ${principalLabel}`
                : "Perfumes, novedades y ofertas"}{" "}
              ·{" "}
              <Box
                component="span"
                sx={{ color: PALETTE.accent, fontWeight: 950 }}
              >
                {tabItemsCount}
              </Box>
            </Typography>
          </Box>

          {isDesktop ? (
            <Button
              onClick={onReload}
              variant="contained"
              sx={{
                borderRadius: 2,
                fontWeight: 950,
                textTransform: "none",
                bgcolor: PALETTE.accent,
                color: "#fff",
                boxShadow: "none",
                px: 2.2,
                "&:hover": { bgcolor: alpha(PALETTE.accent, 0.9) },
              }}
            >
              Recargar
            </Button>
          ) : (
            <IconButton
              onClick={onReload}
              sx={{
                borderRadius: 2,
                bgcolor: alpha("#fff", 0.08),
                color: "#fff",
                border: `1px solid ${alpha("#fff", 0.16)}`,
              }}
            >
              <RefreshRoundedIcon />
            </IconButton>
          )}
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 1.2, md: 2 }, background: "#000" }}>
        <Stack spacing={{ xs: 1, md: 1.25 }}>
          <TextField
            value={q}
            onChange={(e) => setQ?.(e.target.value)}
            placeholder="Busca tu favorito …"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: alpha("#fff", 0.06),
                border: `1px solid ${alpha("#fff", 0.16)}`,
                color: "#fff",
                "&:hover": { borderColor: alpha("#fff", 0.28) },
                "&.Mui-focused": {
                  borderColor: PALETTE.accent,
                  boxShadow: `0 0 0 3px ${alpha(PALETTE.accent, 0.22)}`,
                },
              },
              "& input": { fontWeight: 900, color: "#fff" },
              "& input::placeholder": { color: alpha("#fff", 0.55) },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: alpha("#fff", 0.65) }} />
                </InputAdornment>
              ),
            }}
          />

          {hasPrincipalCategory && principalLabel ? (
            <Box
              sx={{
                width: "100%",
                borderRadius: 2.3,
                p: { xs: 1.2, md: 1.4 },
                background: `linear-gradient(90deg, ${alpha(
                  PALETTE.accent,
                  0.28,
                )}, ${alpha("#fff", 0.06)})`,
                border: `1px solid ${alpha(PALETTE.accent, 0.42)}`,
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: PALETTE.accent,
                      color: "#fff",
                      boxShadow: `0 0 0 4px ${alpha(PALETTE.accent, 0.18)}`,
                    }}
                  >
                    <WhatshotRoundedIcon fontSize="small" />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 950,
                        fontSize: { xs: 13.5, md: 15 },
                        lineHeight: 1.1,
                      }}
                    >
                      Aprovecha nuestra selección más popular
                    </Typography>

                    <Typography
                      sx={{
                        color: alpha("#fff", 0.72),
                        fontWeight: 800,
                        fontSize: { xs: 12, md: 13 },
                      }}
                    >
                      {principalLabel} con productos disponibles para ti
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
                  label="Recomendado para ti"
                  sx={{
                    height: 30,
                    fontWeight: 950,
                    borderRadius: 999,
                    bgcolor: "#fff",
                    color: PALETTE.accent,
                    "& .MuiChip-icon": { color: PALETTE.accent },
                  }}
                />
              </Stack>
            </Box>
          ) : null}

          {isDesktop ? (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                overflowX: "auto",
                pb: 0.5,
                "&::-webkit-scrollbar": { height: 7 },
                "&::-webkit-scrollbar-thumb": {
                  background: alpha("#fff", 0.16),
                  borderRadius: 999,
                },
              }}
            >
              {safeCatOptions.length > 0 ? (
                safeCatOptions.map((cat) => {
                  const slug = getCatSlug(cat);
                  const label = getCatLabel(cat);
                  const active = currentCategorySlug === slug;
                  const principal = isPrincipalCategory(cat);

                  return (
                    <Chip
                      key={slug || label}
                      onClick={() => setCatSlug?.(slug)}
                      label={
                        <Stack
                          direction="row"
                          spacing={0.7}
                          alignItems="center"
                        >
                          <Box component="span">{label}</Box>

                          {principal ? (
                            <Box
                              component="span"
                              sx={{
                                px: 0.75,
                                py: 0.15,
                                borderRadius: 999,
                                fontSize: 10,
                                fontWeight: 950,
                                bgcolor: active ? "#fff" : PALETTE.accent,
                                color: active ? PALETTE.accent : "#fff",
                              }}
                            >
                              TOP
                            </Box>
                          ) : null}
                        </Stack>
                      }
                      sx={{
                        height: 36,
                        fontWeight: 950,
                        borderRadius: 999,
                        bgcolor: active
                          ? PALETTE.accent
                          : principal
                            ? alpha(PALETTE.accent, 0.2)
                            : alpha("#fff", 0.06),
                        color: active ? "#fff" : alpha("#fff", 0.92),
                        border: `1px solid ${
                          active || principal
                            ? alpha(PALETTE.accent, 0.85)
                            : alpha("#fff", 0.14)
                        }`,
                        boxShadow:
                          active || principal
                            ? `0 0 0 3px ${alpha(PALETTE.accent, 0.18)}`
                            : "none",
                        "&:hover": {
                          bgcolor: active
                            ? PALETTE.accent
                            : alpha(PALETTE.accent, 0.24),
                        },
                      }}
                    />
                  );
                })
              ) : (
                <Chip
                  label="Pronto tendremos categorías destacadas"
                  sx={{
                    fontWeight: 900,
                    borderRadius: 999,
                    bgcolor: alpha("#fff", 0.06),
                    color: alpha("#fff", 0.65),
                    border: `1px dashed ${alpha("#fff", 0.18)}`,
                  }}
                />
              )}
            </Stack>
          ) : (
            <FormControl fullWidth size="small">
              <Select
                value={safeCatOptions.length ? currentCategorySlug : ""}
                onChange={(e) => setCatSlug?.(e.target.value)}
                displayEmpty
                disabled={!safeCatOptions.length}
                renderValue={() =>
                  safeCatOptions.length
                    ? currentCategoryName || "Categoría"
                    : "Pronto tendremos categorías destacadas"
                }
                sx={{
                  borderRadius: 2,
                  background: alpha("#fff", 0.06),
                  border: `1px solid ${alpha("#fff", 0.16)}`,
                  fontWeight: 900,
                  color: "#fff",
                  "& .MuiSelect-select": { py: 1 },
                  "& .MuiSvgIcon-root": { color: alpha("#fff", 0.75) },
                }}
              >
                {safeCatOptions.map((cat) => {
                  const slug = getCatSlug(cat);
                  const label = getCatLabel(cat);

                  return (
                    <MenuItem key={slug || label} value={slug}>
                      {label}
                      {isPrincipalCategory(cat) ? "  🔥 Top" : ""}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}

          <Divider sx={{ opacity: 0.25, borderColor: alpha("#fff", 0.18) }} />

          <Box
            sx={{
              p: 0.8,
              borderRadius: 2.2,
              background: alpha("#fff", 0.05),
              border: `1px solid ${alpha("#fff", 0.12)}`,
            }}
          >
            <GhostTabs value={tab} onChange={(v) => setTab?.(v)} tabs={tabs} />
          </Box>

          {tab === "ofertas" ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ pt: 0.2 }}
            >
              <Chip
                size="small"
                icon={<LocalOfferRoundedIcon sx={{ fontSize: 16 }} />}
                label="Ofertas activas"
                sx={{
                  fontWeight: 900,
                  bgcolor: PALETTE.accent,
                  color: "#fff",
                  border: `1px solid ${alpha("#000", 0.35)}`,
                  "& .MuiChip-icon": { color: "#fff" },
                }}
              />
            </Stack>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}
