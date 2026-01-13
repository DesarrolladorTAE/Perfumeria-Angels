import * as React from "react";

const CartContext = React.createContext(null);

const STORAGE_KEY = "cart_v1";

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

// Normaliza el producto del catálogo a item de carrito
function toCartItem(product, qty = 1) {
  // intenta obtener imagen de varias formas comunes
  const img =
    // 1) images: string[]
    (Array.isArray(product?.images) && product.images.length
      ? product.images[0]
      : null) ||
    // 2) image: string | { url } | { src }
    (typeof product?.image === "string"
      ? product.image
      : product?.image?.url || product?.image?.src || null) ||
    // 3) cover (por si ya lo traes)
    (typeof product?.cover === "string" ? product.cover : null);

  return {
    id: product.id ?? product.sku, // (opcional) por si tu id real es sku
    sku: product.sku ?? null,
    name: product.name,
    price: Number(product.price || 0),
    discount: product.discount ?? null,
    image: img,
    stock: typeof product.stock === "number" ? product.stock : null,
    qty,
  };
}


function calcFinalPrice(item) {
  const price = Number(item.price || 0);
  const d = item.discount;

  if (!d) return price;

  // soporta discount como porcentaje (0-100) o monto
  if (typeof d === "number") {
    // si es <= 1 asumimos factor, si es >1 asumimos porcentaje
    const pct = d <= 1 ? d * 100 : d;
    const final = price * (1 - pct / 100);
    return Math.max(0, Number(final.toFixed(2)));
  }

  if (typeof d === "object") {
    // { type: "percent", value: 10 } o { type:"amount", value: 50 }
    if (d.type === "percent") {
      const final = price * (1 - (d.value || 0) / 100);
      return Math.max(0, Number(final.toFixed(2)));
    }
    if (d.type === "amount") {
      const final = price - (d.value || 0);
      return Math.max(0, Number(final.toFixed(2)));
    }
  }

  return price;
}

export function CartProvider({ children }) {
  const [items, setItems] = React.useState(() => {
    if (typeof window === "undefined") return [];
    return safeParse(window.localStorage.getItem(STORAGE_KEY), []);
  });

  // ✅ persistencia
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ✅ sync multi-tab (opcional pero recomendado)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      setItems(safeParse(e.newValue, []));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ✅ Agregar (o sumar qty si ya existe)
  const add = React.useCallback((product, qty = 1) => {
    if (!product?.id) return;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);
      const maxStock = typeof product.stock === "number" ? product.stock : null;
      const addQty = Math.max(1, Number(qty || 1));

      if (idx >= 0) {
        const next = [...prev];
        const current = next[idx];
        const desired = (current.qty || 0) + addQty;
        const finalQty =
          maxStock != null ? Math.min(desired, maxStock) : desired;

        next[idx] = { ...current, qty: Math.max(1, finalQty) };
        return next;
      }

      const base = toCartItem(product, addQty);
      if (maxStock != null) base.qty = Math.min(base.qty, maxStock);
      base.qty = Math.max(1, base.qty);
      return [base, ...prev];
    });
  }, []);

  // ✅ Setear cantidad:
  // - qty <= 0 => elimina
  // - respeta stock si existe
  const setQty = React.useCallback((productId, qty) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id !== productId) return it;

          const q = Number(qty || 0);
          if (q <= 0) return null;

          const finalQty = it.stock != null ? Math.min(q, it.stock) : q;
          return { ...it, qty: Math.max(1, finalQty) };
        })
        .filter(Boolean)
    );
  }, []);

  // ✅ sumar/restar fácil
  const inc = React.useCallback((productId, step = 1) => {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((x) => x.id === productId);
      if (idx < 0) return prev;

      const it = next[idx];
      const s = Math.max(1, Number(step || 1));
      const desired = (it.qty || 0) + s;
      const finalQty = it.stock != null ? Math.min(desired, it.stock) : desired;

      next[idx] = { ...it, qty: Math.max(1, finalQty) };
      return next;
    });
  }, []);

  const dec = React.useCallback((productId, step = 1) => {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((x) => x.id === productId);
      if (idx < 0) return prev;

      const it = next[idx];
      const s = Math.max(1, Number(step || 1));
      const desired = (it.qty || 0) - s;

      // ✅ si baja a 0 o menos => elimina item
      if (desired <= 0) return next.filter((x) => x.id !== productId);

      next[idx] = { ...it, qty: desired };
      return next;
    });
  }, []);

  const remove = React.useCallback((productId) => {
    setItems((prev) => prev.filter((x) => x.id !== productId));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const totals = React.useMemo(() => {
    const subtotal = items.reduce(
      (acc, it) => acc + Number(it.price || 0) * (it.qty || 1),
      0
    );

    const total = items.reduce(
      (acc, it) => acc + calcFinalPrice(it) * (it.qty || 1),
      0
    );

    const savings = Math.max(0, subtotal - total);
    const count = items.reduce((acc, it) => acc + (it.qty || 1), 0);

    return {
      count,
      subtotal: Number(subtotal.toFixed(2)),
      total: Number(total.toFixed(2)),
      savings: Number(savings.toFixed(2)),
    };
  }, [items]);

  const value = React.useMemo(
    () => ({
      items,
      add,
      setQty,
      inc,
      dec,
      remove,
      clear,
      totals,
      calcFinalPrice, // ✅ útil para UI (precio con descuento)
    }),
    [items, add, setQty, inc, dec, remove, clear, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
