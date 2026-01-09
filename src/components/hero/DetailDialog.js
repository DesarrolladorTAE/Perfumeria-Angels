import * as React from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { PALETTE, calcDiscount, moneyMXN } from "@/utils/catalogUtils";

export default function DetailDialog({
  open,
  onClose,
  detailLoading,
  detailErr,
  detail,
  activeImg,
  setActiveImg,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(PALETTE.grey, 0.14)}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: alpha(PALETTE.soft, 0.7),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 1000, color: PALETTE.grey }}>
          {detail?.name || "Detalle del producto"}
        </Typography>

        <IconButton onClick={onClose} aria-label="Cerrar">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 1.6, md: 2 } }}>
        {detailLoading ? (
          <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1, fontWeight: 800, color: alpha(PALETTE.grey, 0.8) }}>
              Cargando detalle…
            </Typography>
          </Box>
        ) : detailErr ? (
          <Box sx={{ p: 2, borderRadius: 2, border: `1px solid ${alpha(PALETTE.accent, 0.25)}` }}>
            <Typography sx={{ fontWeight: 900, color: PALETTE.accent }}>{detailErr}</Typography>
          </Box>
        ) : !detail ? (
          <Typography sx={{ color: alpha(PALETTE.grey, 0.7), fontWeight: 800 }}>
            Sin información del producto.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 2.4,
                  border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
                  background: alpha(PALETTE.soft, 0.45),
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {Array.isArray(detail.images) && detail.images.length ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={detail.images[activeImg] || detail.images[0]}
                    alt={detail.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }}
                  />
                ) : (
                  <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.6) }}>
                    Sin imágenes
                  </Typography>
                )}
              </Box>

              {Array.isArray(detail.images) && detail.images.length > 1 ? (
                <Stack direction="row" spacing={1} sx={{ mt: 1.2, overflowX: "auto", pb: 0.5 }}>
                  {detail.images.map((src, idx) => {
                    const active = idx === activeImg;
                    return (
                      <Box
                        key={src + idx}
                        onClick={() => setActiveImg(idx)}
                        role="button"
                        aria-label={`Ver imagen ${idx + 1}`}
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 2,
                          border: `2px solid ${active ? PALETTE.accent : alpha(PALETTE.grey, 0.12)}`,
                          background: PALETTE.white,
                          overflow: "hidden",
                          flex: "0 0 auto",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`${detail.name} mini`}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
              {(() => {
                const dc = calcDiscount(detail.price, detail.discount);
                return (
                  <>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Rating value={Number(detail.rating || 0)} precision={0.5} readOnly />
                      {detail.saleCount ? (
                        <Typography variant="body2" sx={{ fontWeight: 800, color: alpha(PALETTE.grey, 0.7) }}>
                          ({detail.saleCount} ventas)
                        </Typography>
                      ) : null}
                      {detail.new ? (
                        <Chip
                          size="small"
                          label="NOVEDAD"
                          sx={{
                            ml: "auto",
                            fontWeight: 900,
                            bgcolor: alpha(PALETTE.accent, 0.12),
                            color: PALETTE.accent,
                            border: `1px solid ${alpha(PALETTE.accent, 0.25)}`,
                          }}
                        />
                      ) : null}
                    </Stack>

                    <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
                      {dc.has ? (
                        <Typography sx={{ textDecoration: "line-through", color: alpha(PALETTE.grey, 0.6), fontWeight: 800 }}>
                          {moneyMXN(detail.price)}
                        </Typography>
                      ) : null}

                      <Typography sx={{ fontWeight: 1000, fontSize: 22, color: PALETTE.grey }}>
                        {moneyMXN(dc.final)}
                      </Typography>

                      {dc.has ? (
                        <Chip
                          size="small"
                          icon={<LocalOfferRoundedIcon sx={{ fontSize: 16 }} />}
                          label={`AHORRA ${moneyMXN(dc.saved)} (${dc.pct}%)`}
                          sx={{
                            fontWeight: 900,
                            bgcolor: PALETTE.accent,
                            color: PALETTE.white,
                            "& .MuiChip-icon": { color: PALETTE.white },
                          }}
                        />
                      ) : null}
                    </Stack>

                    {detail.shortDescription ? (
                      <Typography sx={{ color: alpha(PALETTE.grey, 0.85), fontWeight: 750, mb: 1 }}>
                        {detail.shortDescription}
                      </Typography>
                    ) : null}

                    {detail.fullDescription ? (
                      <Typography sx={{ color: alpha(PALETTE.grey, 0.8), mb: 1.4 }}>
                        {detail.fullDescription}
                      </Typography>
                    ) : null}

                    {Array.isArray(detail.categories) && detail.categories.length ? (
                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 1.2 }}>
                        {detail.categories.map((c) => (
                          <Chip
                            key={c.id}
                            size="small"
                            label={c.name}
                            sx={{
                              fontWeight: 900,
                              bgcolor: alpha(PALETTE.grey, 0.06),
                              color: PALETTE.grey,
                              border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
                            }}
                          />
                        ))}
                      </Stack>
                    ) : null}

                    {typeof detail.stock === "number" ? (
                      <Typography sx={{ fontWeight: 900, color: alpha(PALETTE.grey, 0.8), mb: 1 }}>
                        Stock: {detail.stock}
                      </Typography>
                    ) : null}
                  </>
                );
              })()}
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 1.6 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 900,
            textTransform: "none",
            borderColor: alpha(PALETTE.grey, 0.25),
            color: PALETTE.grey,
          }}
        >
          Cerrar
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 950,
            textTransform: "none",
            bgcolor: PALETTE.accent,
            "&:hover": { bgcolor: alpha(PALETTE.accent, 0.92) },
          }}
          onClick={onClose}
        >
          Agregar al carrito
        </Button>
      </DialogActions>
    </Dialog>
  );
}
