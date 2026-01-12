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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import GhostTabs from "./GhostTabs";
import { PALETTE } from "@/utils/catalogUtils";

export default function CatalogHeader({
  q,
  setQ,
  catOptions,
  catName,
  setCatName,
  tab,
  setTab,
  tabs,
  tabItemsCount,
  onReload,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        borderRadius: { xs: 2.6, md: 3.2 },
        overflow: "hidden",

        // ✅ negro sólido
        background: "#000",
        border: `1px solid ${alpha("#fff", 0.12)}`,
        boxShadow: "0 22px 70px rgba(0,0,0,0.35)",
      }}
    >
      {/* ===== TOP BAR ===== */}
      <Box
        sx={{
          px: { xs: 1.2, md: 2 },
          py: { xs: 1.1, md: 1.4 },
          background: "#000",
          borderBottom: `3px solid ${PALETTE.accent}`,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 1000,
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
                fontWeight: 700,
                fontSize: { xs: 12, md: 14 },
              }}
            >
              Perfumes, novedades y ofertas ·{" "}
              <Box component="span" sx={{ color: PALETTE.accent, fontWeight: 900 }}>
                {tabItemsCount}
              </Box>
            </Typography>
          </Box>

          {/* Recargar */}
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

      {/* ===== BODY ===== */}
      <Box sx={{ p: { xs: 1.2, md: 2 }, background: "#000" }}>
        <Stack spacing={{ xs: 1, md: 1.2 }}>
          {/* Search */}
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
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

          {/* Categorías */}
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
              {catOptions.map((name) => {
                const active = catName === name;
                return (
                  <Chip
                    key={name}
                    label={name}
                    onClick={() => setCatName(name)}
                    sx={{
                      fontWeight: 950,
                      borderRadius: 999,
                      bgcolor: active ? PALETTE.accent : alpha("#fff", 0.06),
                      color: active ? "#fff" : alpha("#fff", 0.88),
                      border: `1px solid ${active ? alpha(PALETTE.accent, 0.7) : alpha("#fff", 0.14)}`,
                      "&:hover": {
                        bgcolor: active ? PALETTE.accent : alpha("#fff", 0.1),
                      },
                    }}
                  />
                );
              })}
            </Stack>
          ) : (
            <FormControl fullWidth size="small">
              <Select
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: 2,
                  background: alpha("#fff", 0.06),
                  border: `1px solid ${alpha("#fff", 0.16)}`,
                  fontWeight: 950,
                  color: "#fff",
                  "& .MuiSelect-select": { py: 1 },
                  "& .MuiSvgIcon-root": { color: alpha("#fff", 0.75) },
                }}
              >
                {catOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Divider sx={{ opacity: 0.25, borderColor: alpha("#fff", 0.18) }} />

          {/* Tabs */}
          <Box
            sx={{
              // ✅ Esto hace que se note más el bloque de tabs (la flecha que te señalaron)
              p: 0.8,
              borderRadius: 2.2,
              background: alpha("#fff", 0.05),
              border: `1px solid ${alpha("#fff", 0.12)}`,
            }}
          >
            <GhostTabs value={tab} onChange={(v) => setTab(v)} tabs={tabs} />
          </Box>

          {/* Aux chip */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 0.2 }}>
            {tab === "ofertas" ? (
              <Chip
                size="small"
                icon={<LocalOfferRoundedIcon sx={{ fontSize: 16 }} />}
                label="Ofertas activas"
                sx={{
                  fontWeight: 950,
                  bgcolor: PALETTE.accent,
                  color: "#fff",
                  border: `1px solid ${alpha("#000", 0.35)}`,
                  "& .MuiChip-icon": { color: "#fff" },
                }}
              />
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
