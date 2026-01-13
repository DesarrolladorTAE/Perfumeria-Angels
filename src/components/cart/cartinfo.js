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
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { useCart } from "@/context/CartContext";
import { moneyMXN } from "@/utils/catalogUtils";

export default function CartPage() {
  const { items, inc, dec, remove, clear, totals, calcFinalPrice } = useCart();

  return (
    <Container sx={{ py: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          Tu carrito
        </Typography>

        <Button
          onClick={clear}
          startIcon={<CleaningServicesRoundedIcon />}
          disabled={items.length === 0}
          sx={{ borderRadius: 3 }}
        >
          Limpiar
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {items.length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center", opacity: 0.7 }}>
          <Typography sx={{ fontWeight: 800 }}>No hay productos aún</Typography>
          <Typography>Agrega productos desde el catálogo.</Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {items.map((it) => {
            const unit = calcFinalPrice(it);
            const hasDiscount = Number(it.price || 0) !== unit;

            return (
              <Card key={it.id} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={1.6} alignItems="center">
                    <Avatar
                      src={it.image || undefined}
                      variant="rounded"
                      sx={{ width: 56, height: 56, borderRadius: 2 }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 900 }} noWrap>
                        {it.name}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="baseline">
                        {hasDiscount && (
                          <Typography sx={{ textDecoration: "line-through", opacity: 0.6 }}>
                            {moneyMXN(it.price)}
                          </Typography>
                        )}
                        <Typography sx={{ fontWeight: 900 }}>
                          {moneyMXN(unit)}
                        </Typography>
                        <Typography sx={{ opacity: 0.65, fontSize: 13 }}>
                          c/u
                        </Typography>
                      </Stack>

                      {it.stock != null && (
                        <Typography sx={{ opacity: 0.7, fontSize: 12 }}>
                          Stock: {it.stock}
                        </Typography>
                      )}
                    </Box>

                    <Stack direction="row" alignItems="center" spacing={0.6}>
                      <IconButton onClick={() => dec(it.id, 1)} sx={{ border: "1px solid rgba(0,0,0,.08)" }}>
                        <RemoveRoundedIcon />
                      </IconButton>

                      <Typography sx={{ width: 28, textAlign: "center", fontWeight: 900 }}>
                        {it.qty}
                      </Typography>

                      <IconButton
                        onClick={() => inc(it.id, 1)}
                        disabled={it.stock != null && it.qty >= it.stock}
                        sx={{ border: "1px solid rgba(0,0,0,.08)" }}
                      >
                        <AddRoundedIcon />
                      </IconButton>
                    </Stack>

                    <IconButton onClick={() => remove(it.id)} sx={{ ml: 1 }}>
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ opacity: 0.75 }}>Importe</Typography>
                    <Typography sx={{ fontWeight: 900 }}>
                      {moneyMXN(unit * (it.qty || 1))}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ opacity: 0.75 }}>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{moneyMXN(totals.subtotal)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ opacity: 0.75 }}>Descuento</Typography>
                  <Typography sx={{ fontWeight: 900 }}>
                    - {moneyMXN(totals.savings)}
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 900 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                    {moneyMXN(totals.total)}
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: 3, mt: 1, py: 1.2, fontWeight: 900 }}
                  onClick={() => alert("Aquí va tu checkout")}
                >
                  Continuar
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Container>
  );
}
