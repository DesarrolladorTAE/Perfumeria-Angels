import { useState } from "react";
import axios from "axios";
import usePublicSite from "@/hooks/usePublicSite";
import { useToast, useConfirm } from "@/components/alerts/AlertProvider";

const API_URL = "https://telorecargo.com/api/enviar-documentos-whatsapp";

const normalizePhone = (raw) => {
  if (!raw) return "";
  return raw.replace(/[^\d+]/g, "");
};

const ContactOne = () => {
  const { carrusel, owner, store } = usePublicSite();
  const toast = useToast();
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);

  // 📸 Imagen del carrusel (7 o fallback 0)
  const bgImg =
    carrusel?.[7]?.url ||
    carrusel?.[7] ||
    carrusel?.[0]?.url ||
    carrusel?.[0] ||
    "";

  // 📞 Teléfono destino desde backend
  const destination = normalizePhone(
    owner?.phone || store?.phone || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const f = e.currentTarget;

    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const phone = normalizePhone(f.phone.value);
    const subject = f.subject.value.trim();

    const message = [
      "🧴 *Nueva solicitud - Perfumes*",
      "",
      `👤 *Nombre:* ${name}`,
      `📞 *Teléfono:* ${phone}`,
      `📧 *Email:* ${email}`,
      `📝 *Asunto:* ${subject}`,
      "",
      "— Enviado desde la tienda online",
    ].join("\n");

    try {
      setLoading(true);

      const ok = await confirm({
        title: "Enviar mensaje",
        text: "Tu mensaje se enviará por WhatsApp para atención inmediata.",
        confirmText: "Enviar",
        cancelText: "Cancelar",
      });

      if (!ok) {
        setLoading(false);
        return;
      }

      const res = await axios.post(API_URL, {
        phone: destination,
        message,
      });

      if (!res?.data || res.data?.success === false) {
        throw new Error("API sin éxito");
      }

      toast.success("Mensaje enviado por WhatsApp", {
        title: "Enviado",
      });

      f.reset();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo enviar el mensaje", {
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-one pd-100-0-100">
      <div className="container">
        <div
          className="contact-one__inner"
          style={{
            backgroundImage: bgImg ? `url(${bgImg})` : "none",
          }}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div
                className="contact-one__content wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div className="section-title text-left">
                  <h2 className="section-title__title">
                    Compra y cotiza directo por WhatsApp
                  </h2>
                  <p className="section-title__text">
                    Atención directa, perfumes originales y respuesta inmediata.
                    Escríbenos y cerramos tu pedido sin vueltas.
                  </p>
                </div>

                <form
                  className="contact-one__form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="contact-one__form-input">
                        <input
                          type="text"
                          placeholder="Nombre*"
                          name="name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="contact-one__form-input">
                        <input
                          type="email"
                          placeholder="Email*"
                          name="email"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="contact-one__form-input">
                        <input
                          type="text"
                          placeholder="Teléfono*"
                          name="phone"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="contact-one__form-input">
                        <input
                          type="text"
                          placeholder="Asunto*"
                          name="subject"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                        disabled={loading}
                      >
                        {loading ? "Enviando..." : "Enviar por WhatsApp"}
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactOne;
