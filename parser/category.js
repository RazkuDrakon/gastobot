const CATEGORIES = {
  "compra": ["supermercado", "tienda", "compra", "mercado"],
  "gasolina": ["gasolina", "diesel", "carburante", "gas"],
  "ocio": ["cine", "videojuego", "ocio", "restaurante", "bar", "pub","cena","comida"],
  "alquiler": ["alquiler", "renta", "piso", "departamento"],
  "transporte": ["bus", "metro", "taxi", "uber", "tren", "billete"],
  "factura": ["factura", "recibo", "comprobante", "ticket"],
};


module.exports = function extractCategory(text) {
  const normalized = text.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(word => normalized.includes(word))) {
      return category;
    }
  }

  return "general";
};

