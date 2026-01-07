import { useEffect, useMemo, useState } from "react";
import PublicStoreService from "@/api/publicStore.service";

/**
 * Obtiene la configuración pública del sitio por slug (ya fijo en tu service).
 * Retorna datos listos para consumir en distintas partes del sitio.
 */
export default function usePublicSite() {
  const [data, setData] = useState(null); // respuesta completa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await PublicStoreService.getPublicSite();
        if (!alive) return;

        setData(res.data);
      } catch (err) {
        if (!alive) return;
        setError(err);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }; 

    run();

    return () => {
      alive = false;
    };
  }, []);

  const ok = !!data?.ok;
  const expired = !!data?.expired;
  const message = data?.message || null;

  const store = data?.store ?? null;
  const sitio = data?.sitio ?? null;
  const owner = data?.owner ?? null;

  // Derivados útiles para no estar escribiendo 20 veces lo mismo
  const carrusel = useMemo(() => {
    const arr = sitio?.carrusel;
    return Array.isArray(arr) ? arr.filter(Boolean) : [];
  }, [sitio]);

  const socials = useMemo(() => {
    if (!sitio) return null;
    return {
      facebook: sitio.facebook || null,
      instagram: sitio.instagram || null,
      twitter: sitio.twitter || null,
      tiktok: sitio.tiktok || null,
    };
  }, [sitio]);

  const branding = useMemo(() => {
    if (!sitio && !store) return null;
    return {
      logo: sitio?.logo || null,
      portada: sitio?.img_portada || null,
      titulo: sitio?.titulo_1 || store?.name || null,
      descripcion: sitio?.descripcion || null,
    };
  }, [sitio, store]);

  return {
    // estado
    loading,
    error,

    // flags del backend
    ok,
    expired,
    message,

    // data cruda y segmentada
    data,
    store,
    sitio,
    owner,

    // helpers listos
    carrusel,
    socials,
    branding,
  };
}
