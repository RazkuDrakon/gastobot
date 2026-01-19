module.exports = function extractAmount(text) {
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  return match ? parseFloat(match[1].replace(",", ".")) : null;
};
