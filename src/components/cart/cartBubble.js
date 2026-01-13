import * as React from "react";
import { Fab, Badge, Box, Typography, alpha } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { moneyMXN } from "@/utils/catalogUtils";

export default function CartBubble() {
  const router = useRouter();
  const { totals } = useCart();

  // ✅ evita hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // opcional: ocultar en /carrito
  if (router.pathname === "/carrito") return null;

  const isEmpty = totals.count <= 0;

  return (
    <Fab
      onClick={() => router.push("/carrito")}
      variant="extended"
      sx={(theme) => ({
        position: "fixed",
        right: 20,
        bottom: 106,
        zIndex: 2000,
        borderRadius: 999,
        px: 2,
        boxShadow: "0 12px 30px rgba(0,0,0,.18)",
        background: "linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)",
        color: "#3A1F1A",
        border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        backdropFilter: "blur(10px)",
        opacity: isEmpty ? 0.85 : 1,
      })}
    >
      <Badge
        badgeContent={totals.count}
        color="error"
        overlap="circular"
        sx={{ "& .MuiBadge-badge": { fontWeight: 800 } }}
      >
        <ShoppingCartRoundedIcon />
      </Badge>

      <Box sx={{ ml: 1.2, lineHeight: 1 }}>
        <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
          {isEmpty ? "Carrito" : `${totals.count} artículos`}
        </Typography>
        <Typography sx={{ fontWeight: 800, fontSize: 12, opacity: 0.78 }}>
          {isEmpty ? "Vacío" : moneyMXN(totals.total)}
        </Typography>
      </Box>
    </Fab>
  );
}
