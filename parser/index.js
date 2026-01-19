const normalize = require("./normalize");
const detectIntent = require("./intent");
const extractAmount = require("./amount");
const extractCategory = require("./category");

function parseMessage(text) {
  const normalized = normalize(text);

  return {
    intent: detectIntent(normalized),
    amount: extractAmount(normalized),
    category: extractCategory(normalized),
    raw: text
  };
}

module.exports = parseMessage;
