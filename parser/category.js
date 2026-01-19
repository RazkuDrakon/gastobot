const CATEGORIES = ["compra", "gasolina", "ocio", "alquiler","factura", "recibo"];

module.exports = function extractCategory(text) {
  return CATEGORIES.find(cat => text.includes(cat)) || "general";
};
