import * as React from "react";
import { Box, Pagination, Stack, Typography, alpha } from "@mui/material";
import { PALETTE } from "@/utils/catalogUtils";

export default function PaginationBar({
  page,
  pageCount,
  total,
  pageSize,
  onChange,
}) {
  if (pageCount <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <Box
      sx={{
        mt: { xs: 1.4, sm: 2.2 },
        p: { xs: 1, sm: 1.2 },
        borderRadius: { xs: 2.4, sm: 3 },
        background: alpha(PALETTE.white, 0.82),
        border: `1px solid ${alpha(PALETTE.grey, 0.12)}`,
        boxShadow: { xs: "0 8px 22px rgba(0,0,0,0.06)", sm: "0 10px 35px rgba(0,0,0,0.05)" },
      }}
    >
      <Stack spacing={{ xs: 0.9, sm: 1 }}>
        {/* fila superior: texto compacto */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minWidth: 0 }}
        >
          <Typography
            sx={{
              fontWeight: 950,
              color: alpha(PALETTE.grey, 0.8),
              fontSize: { xs: 12, sm: 14 },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {from}–{to} de {total}
          </Typography>

          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: 12, sm: 14 },
              color: alpha(PALETTE.grey, 0.7),
              ml: 1,
              whiteSpace: "nowrap",
            }}
          >
            Pág. {page}/{pageCount}
          </Typography>
        </Stack>

        {/* fila inferior: paginación scrollable en móvil */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            overflowX: { xs: "auto", sm: "visible" },
            WebkitOverflowScrolling: "touch",
            pb: { xs: 0.3, sm: 0 },
            // scrollbar discreto
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(PALETTE.grey, 0.18),
              borderRadius: 999,
            },
          }}
        >
          <Pagination
            page={page}
            count={pageCount}
            onChange={(_, v) => onChange(v)}
            shape="rounded"
            siblingCount={0}       // ✅ en móvil reduce ruido
            boundaryCount={1}
            sx={{
              // evita que se encoja y permite scroll horizontal
              flexWrap: "nowrap",
              "& .MuiPagination-ul": {
                flexWrap: "nowrap",
                gap: { xs: 0.4, sm: 0.6 },
                pr: { xs: 1, sm: 0 },
              },
              "& .MuiPaginationItem-root": {
                fontWeight: 950,
                borderRadius: 2,
                minWidth: { xs: 34, sm: 36 },
                height: { xs: 34, sm: 36 },
                fontSize: { xs: 12, sm: 13 },
              },
              "& .MuiPaginationItem-previousNext": {
                minWidth: { xs: 36, sm: 40 },
              },
              "& .Mui-selected": {
                background: `${PALETTE.accent} !important`,
                color: `${PALETTE.white} !important`,
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
