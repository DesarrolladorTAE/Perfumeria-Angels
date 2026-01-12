import * as React from "react";
import { Box, Tabs, Tab, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PALETTE } from "@/utils/catalogUtils";

export default function GhostTabs({ value, onChange, tabs }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // ✅ "todos" primero (solo visual)
  const orderedTabs = React.useMemo(() => {
    if (!Array.isArray(tabs)) return [];
    const all = tabs.find((t) => t.key === "todos");
    const rest = tabs.filter((t) => t.key !== "todos");
    return all ? [all, ...rest] : tabs;
  }, [tabs]);

  return (
    <Box sx={{ mt: { xs: 0.6, md: 1.2 }, borderRadius: 999, px: 0.25, py: 0.15 }}>
    <Tabs
  value={value}
  onChange={(_, v) => onChange(v)}
  variant="scrollable"
  scrollButtons={false}
  sx={{
    minHeight: { xs: 34, md: 40 },
    "& .MuiTabs-flexContainer": { gap: { xs: 0.4, md: 0.6 } },
    "& .MuiTabs-indicator": {
      height: { xs: 2, md: 3 },
      borderRadius: 999,
      backgroundColor: PALETTE.accent,
    },

    /* ✅ TAB BASE */
    "& .MuiTab-root": {
      minHeight: { xs: 34, md: 40 },
      px: { xs: 1, md: 1.2 },
      py: { xs: 0.35, md: 0.6 },
      textTransform: "none",
      fontWeight: 950,
      fontSize: { xs: 12, md: 14 },

      /* ✅ letras blancas */
      color: alpha("#fff", 0.9),

      borderRadius: 999,
      transition: "all .18s ease",

      /* ✅ fondo dark suave */
      background: alpha("#fff", 0.06),
      border: `1px solid ${alpha("#fff", 0.14)}`,

      "&:hover": {
        background: alpha(PALETTE.accent, 0.16),
        borderColor: alpha(PALETTE.accent, 0.35),
      },
    },

    /* ✅ TAB SELECCIONADO */
    "& .MuiTab-root.Mui-selected": {
      color: PALETTE.accent, // rosita
      background: alpha(PALETTE.accent, 0.18),
      border: `1px solid ${alpha(PALETTE.accent, 0.55)}`,
    },
  }}
>
  {orderedTabs.map((t) => (
    <Tab
      key={t.key}
      value={t.key}
      icon={isDesktop ? t.icon : null}
      iconPosition="start"
      label={t.label}
      sx={{
        "& .MuiTab-iconWrapper": {
          mr: 0.6,
          color: alpha("#fff", 0.7), // icono blanco tenue
        },
        "&.Mui-selected .MuiTab-iconWrapper": {
          color: PALETTE.accent, // icono rosita
        },
      }}
    />
  ))}
</Tabs>

    </Box>
  );
}
