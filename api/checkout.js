// Crea el pago en Mercado Pago con el total exacto del carrito.
// Los precios salen de precios.json (nunca del navegador), así nadie puede cambiarlos.
const P = require("../precios.json");

const limpiar = (s, n = 120) => String(s || "").slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: "Falta configurar MP_ACCESS_TOKEN" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  if (!items.length) return res.status(400).json({ error: "Carrito vacío" });

  const mpItems = [];
  for (const it of items) {
    const unit = it.custom ? P.personalizado : P.productos[String(it.id)];
    if (!(unit > 0)) return res.status(400).json({ error: "Producto inválido" });
    mpItems.push({
      title: limpiar(it.name, 70) + (it.stamp ? " (con estampa)" : "") + " - Talle " + limpiar(it.size, 10),
      description: limpiar([it.det, it.pos && "Logo en: " + it.pos].filter(Boolean).join(" | "), 250),
      quantity: 1,
      currency_id: "ARS",
      unit_price: Number(unit),
    });
  }

  const origin = "https://" + req.headers.host;
  const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({
      items: mpItems,
      back_urls: {
        success: origin + "/?pago=ok",
        pending: origin + "/?pago=pendiente",
        failure: origin + "/?pago=error",
      },
      auto_return: "approved",
    }),
  });
  const data = await r.json();
  if (!r.ok || !data.init_point) return res.status(502).json({ error: "No se pudo crear el pago" });
  res.status(200).json({ url: data.init_point });
};
