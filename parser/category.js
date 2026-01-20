const CATEGORIES = {
  "compra": ["supermercado", "tienda", "compra", "mercado"],
  "gasolina": ["gasolina", "diesel", "carburante", "gas"],
  "ocio": ["ocio", "restaurante", "bar", "pub","cena","comida"],
  "cultura": ["cultura", "libro", "museo", "arte", "videojuego", "cine", "pelicula", "comic", "manga"],
  "alquiler": ["alquiler", "renta", "piso", "departamento"],
  "transporte": ["bus", "metro", "taxi", "uber", "tren", "billete", "avion"],
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

