// services/balance.js

// Saldo por chat
const balances = new Map();

function getBalance(chatId) {
  return balances.get(chatId) || 0;
}

function add(amount, category, chatId) {
  const current = getBalance(chatId);
  balances.set(chatId, current + amount);

  console.log(`[INGRESO] +${amount}€ (${category})`);
}

function subtract(amount, category, chatId) {
  const current = getBalance(chatId);
  balances.set(chatId, current - amount);

  console.log(`[GASTO] -${amount}€ (${category})`);
}

function resetBalance(chatId) {
  balances.set(chatId, 0);
  console.log(`[RESET] Saldo reiniciado para el chat ${chatId}`);
}

module.exports = {
  add,
  subtract,
  getBalance,
  resetBalance
};
