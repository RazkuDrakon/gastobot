const normalize = text => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const detectIntent = require("./intent");
const extractCategory = require("./category");

module.exports = function parseMessage(text) {
  const normalized = normalize(text);
  const intent = detectIntent(normalized);
  const category = extractCategory(normalized);

  const match = normalized.match(/(\d+(?:[.,]\d+)?)/);
  const amount = match ? parseFloat(match[1].replace(",", ".")) : null;

  return { intent, amount, category };
};
