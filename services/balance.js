const balances = new Map();
const history = new Map();

function getBalance(chatId) {
  return balances.get(chatId) || 0;
}

function getHistory(chatId) {
  return history.get(chatId) || [];
}

function add(amount, category, subcategory, chatId) {
  const current = getBalance(chatId);
  balances.set(chatId, current + amount);

  const entry = {
    type: "ingreso",
    amount,
    category,
    subcategory,
    date: new Date()
  };

  const userHistory = getHistory(chatId);
  userHistory.push(entry);
  history.set(chatId, userHistory);
}

function subtract(amount, category, subcategory, chatId) {
  const current = getBalance(chatId);
  balances.set(chatId, current - amount);

  const entry = {
    type: "gasto",
    amount,
    category,
    subcategory,
    date: new Date()
  };

  const userHistory = getHistory(chatId);
  userHistory.push(entry);
  history.set(chatId, userHistory);
}

function getExpensesByCategory(chatId) {
  const userHistory = getHistory(chatId);
  const summary = {};

  userHistory
    .filter(op => op.type === "gasto")
    .forEach(op => {
      if (!summary[op.category]) summary[op.category] = 0;
      summary[op.category] += op.amount;
    });

  return summary;
}

function resetBalance(chatId) {
  balances.set(chatId, 0);
  history.set(chatId, []);
  console.log(`[RESET] Saldo reiniciado para el chat ${chatId}`);
}

module.exports = {
  add,
  subtract,
  getBalance,
  getHistory,
  getExpensesByCategory,
  resetBalance
};
