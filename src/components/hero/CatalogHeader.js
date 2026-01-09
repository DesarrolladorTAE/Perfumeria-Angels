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
        borderRadius: 3,
        background: alpha(PALETTE.white, 0.92),
        border: `1px solid ${alpha(PALETTE.accent, 0.16)}`,
        boxShadow: "0 18px 70px rgba(0,0,0,0.08)",
        p: { xs: 1.2, md: 2 },
      }}
    >
      <Stack spacing={{ xs: 1, md: 1.2 }}>
        {/* Header row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 1000,
                letterSpacing: -0.4,
                color: PALETTE.grey,
                fontSize: { xs: 16, md: 22 },
                lineHeight: 1.1,
              }}
            >
              CATÁLOGO
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(PALETTE.grey, 0.75),
                fontWeight: 700,
                fontSize: { xs: 12, md: 14 },
              }}
            >
              Perfumes, novedades y ofertas.
            </Typography>
          </Box>

          {/* Recargar: icon button en móvil */}
          {isDesktop ? (
            <Button
              onClick={onReload}
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontWeight: 900,
                textTransform: "none",
                borderColor: alpha(PALETTE.grey, 0.25),
                color: PALETTE.grey,
                "&:hover": { borderColor: alpha(PALETTE.grey, 0.5) },
              }}
            >
              Recargar
            </Button>
          ) : (
            <IconButton
              onClick={onReload}
              sx={{
                borderRadius: 2,
                border: `1px solid ${alpha(PALETTE.grey, 0.2)}`,
                color: PALETTE.grey,
              }}
            >
              <RefreshRoundedIcon />
            </IconButton>
          )}
        </Stack>

        {/* Search */}
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca tu mejor opción…"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              background: alpha(PALETTE.white, 0.98),
            },
            "& input": { fontWeight: 800 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Categorías: Select en móvil, Chips en desktop */}
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              overflowX: "auto",
              pb: 0.5,
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                background: alpha(PALETTE.grey, 0.2),
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
                    fontWeight: 900,
                    borderRadius: 999,
                    bgcolor: active ? PALETTE.accent : alpha(PALETTE.grey, 0.06),
                    color: active ? PALETTE.white : PALETTE.grey,
                    border: `1px solid ${
                      active ? alpha(PALETTE.accent, 0.35) : alpha(PALETTE.grey, 0.12)
                    }`,
                    "&:hover": { bgcolor: active ? PALETTE.accent : alpha(PALETTE.grey, 0.1) },
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
                background: alpha(PALETTE.white, 0.98),
                fontWeight: 900,
                "& .MuiSelect-select": { py: 1 },
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

        {/* Tabs */}
        <GhostTabs value={tab} onChange={(v) => setTab(v)} tabs={tabs} />


        {/* Aux chip */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 0.1 }}>
          {tab === 2 ? (
            <Chip
              size="small"
              icon={<LocalOfferRoundedIcon sx={{ fontSize: 16 }} />}
              label="Ofertas activas"
              sx={{
                fontWeight: 950,
                bgcolor: alpha(PALETTE.accent, 0.12),
                color: PALETTE.accent,
                border: `1px solid ${alpha(PALETTE.accent, 0.22)}`,
              }}
            />
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}
