const GASTO = [
  // Verbos directos
  "gasto",
  "gastar",
  "gaste",
  "gastado",
  "gastando",

  // Pago
  "pago",
  "pagar",
  "pague",
  "pagado",
  "pagando",

  // Añadir gasto
  "anade",
  "anadir",
  "agrega",
  "agregar",
  "apunta",
  "apuntar",
  "mete",

  // Expresiones naturales
  "he gastado",
  "he pagado",
  "acabo de gastar",
  "me he gastado",
  "me gaste",

  // Otros
  "coste",
  "costo",
  "cuesta",
  "salio",
  "salida",
  "consumi",
  "consumir"
];

const INGRESO = [
  // Verbos directos
  "ingreso",
  "ingresar",
  "ingrese",
  "ingresado",
  "ingresando",

  // Añadir dinero
  "anade",
  "anadir",
  "suma",
  "sumar",
  "agrega",
  "agregar",
  "mete",
  "ingresa",

  // Cobros
  "cobro",
  "cobrar",
  "cobre",
  "cobrado",

  // Ahorro
  "ahorro",
  "ahorrar",
  "ahorre",

  // Devoluciones
  "devuelven",
  "devolucion",
  "reembolso",

  // Otros
  "recibo",
  "recibir",
  "recibi"
];


module.exports = function detectIntent(text) {
  if (text.includes("gasto")) return "gasto";
  if (text.includes("ingreso")) return "ingreso";

  if (GASTO.some(v => text.includes(v))) return "gasto";
  if (INGRESO.some(v => text.includes(v))) return "ingreso";

  return null;
};

