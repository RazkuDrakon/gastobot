const CATEGORIES = {
  cultura: {
    comic: ["comic", "manga"],
    cine: ["cine", "pelicula"],
    libros: ["libro"],
    videojuegos: ["videojuego"]
  },

  compra: {
    supermercado: ["supermercado", "mercadona", "lidl", "aldi"],
    mercado: ["mercado", "tienda"]
  },

  ocio: {
    restaurante: ["restaurante", "bar", "pub"],
    comida: ["cena", "comida"]
  },

  gasolina: {
    combustible: ["gasolina", "diesel", "carburante"]
  },

  transporte: {
    publico: ["bus", "metro", "tren"],
    privado: ["taxi", "uber"],
    avion: ["avion", "billete"]
  },

  factura: {
    suministros: ["luz", "agua", "internet"],
    recibo: ["factura", "recibo"]
  }
};

module.exports = function extractCategory(text) {
  const words = text.split(/\s+/);

  for (const [category, subcats] of Object.entries(CATEGORIES)) {
    for (const [subcategory, keywords] of Object.entries(subcats)) {
      for (const keyword of keywords) {
        if (words.includes(keyword)) {
          return { category, subcategory };
        }
      }
    }
  }

  return { category: "general", subcategory: "general" };
};