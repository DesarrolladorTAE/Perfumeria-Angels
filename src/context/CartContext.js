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
  const img =
    Array.isArray(product?.images) && product.images.length
      ? product.images[0]
      : null;

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price || 0),
    discount: product.discount ?? null,
    image: img,
    stock: typeof product.stock === "number" ? product.stock : null,
    qty,
  };
}

function calcFinalPrice(item) {
  // Si ya usas calcDiscount en utils, puedes importarlo.
  // Aquí lo dejo genérico:
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
    if (d.type === "percent") return Math.max(0, price * (1 - (d.value || 0) / 100));
    if (d.type === "amount") return Math.max(0, price - (d.value || 0));
  }

  return price;
}

export function CartProvider({ children }) {
  const [items, setItems] = React.useState(() => {
    if (typeof window === "undefined") return [];
    return safeParse(window.localStorage.getItem(STORAGE_KEY), []);
  });

  // persistencia
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = React.useCallback((product, qty = 1) => {
    if (!product?.id) return;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === product.id);
      const maxStock = typeof product.stock === "number" ? product.stock : null;

      if (idx >= 0) {
        const next = [...prev];
        const current = next[idx];
        const desired = (current.qty || 0) + qty;
        const finalQty = maxStock != null ? Math.min(desired, maxStock) : desired;
        next[idx] = { ...current, qty: finalQty };
        return next;
      }

      const base = toCartItem(product, qty);
      if (maxStock != null) base.qty = Math.min(base.qty, maxStock);
      return [base, ...prev];
    });
  }, []);

  const setQty = React.useCallback((productId, qty) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id !== productId) return it;
          const q = Math.max(1, Number(qty || 1));
          const finalQty = it.stock != null ? Math.min(q, it.stock) : q;
          return { ...it, qty: finalQty };
        })
        .filter(Boolean)
    );
  }, []);

  const remove = React.useCallback((productId) => {
    setItems((prev) => prev.filter((x) => x.id !== productId));
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const totals = React.useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + (Number(it.price || 0) * (it.qty || 1)), 0);
    const total = items.reduce((acc, it) => acc + (calcFinalPrice(it) * (it.qty || 1)), 0);
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
    () => ({ items, add, setQty, remove, clear, totals }),
    [items, add, setQty, remove, clear, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
