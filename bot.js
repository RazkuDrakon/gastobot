require("dotenv").config();
const TeleBot = require("telebot");

const parseMessage = require("./parser/index");
const {
  add,
  subtract,
  getBalance,
  getHistory,
  getExpensesByCategory,
  resetBalance
} = require("./services/balance");

const bot = new TeleBot({
  token: process.env.TELEGRAM_BOT_TOKEN
});

/* ───────────── START ───────────── */

bot.on(["/start", "/iniciar"], msg => {
  bot.sendMessage(
    msg.chat.id,
    `¡Hola, ${msg.chat.username}! 👋 Soy tu asistente de gastos.

Comandos disponibles:
/saldo - Consultar saldo
/historial - Ver historial
/gastos - Ver gastos por categoría
/reset - Reiniciar saldo

Ejemplos:
• "He gastado 15 euros en comic"
• "Añade 100 euros de sueldo"`
  );
});

/* ───────────── MENSAJES DE TEXTO ───────────── */

bot.on("text", msg => {
  if (msg.text.startsWith("/")) return;

  const { intent, amount, category, subcategory } = parseMessage(msg.text);

  if (!intent || !amount) {
    console.log("NO ENTENDIDO:", msg.text);
    return bot.sendMessage(
      msg.chat.id,
      "❓ No he entendido el mensaje.\nEjemplo:\n'He gastado 15 euros en la compra'"
    );
  }

  const chatId = msg.chat.id;

  if (intent === "gasto") {
    subtract(amount, category, subcategory, chatId);
    bot.sendMessage(
      chatId,
      `💸 ${amount}€ registrado\nCategoría: ${category}\nSubcategoría: ${subcategory}`
    );
  }

  if (intent === "ingreso") {
    add(amount, category, subcategory, chatId);
    bot.sendMessage(
      chatId,
      `💰 ${amount}€ añadido\nCategoría: ${category}\nSubcategoría: ${subcategory}`
    );
  }

  const balance = getBalance(chatId);
  bot.sendMessage(chatId, `💳 Saldo actual: ${balance}€`);
});

/* ───────────── /SALDO ───────────── */

bot.on(/^\/saldo$/, msg => {
  const balance = getBalance(msg.chat.id);
  bot.sendMessage(msg.chat.id, `💳 Tu saldo actual es: ${balance}€`);
});

/* ───────────── /HISTORIAL ───────────── */

bot.on(/^\/historial$/, msg => {
  const chatId = msg.chat.id;
  const history = getHistory(chatId);

  if (history.length === 0) {
    return bot.sendMessage(chatId, "📭 No hay operaciones todavía");
  }

  const last = history.slice(-10).reverse();

  const text = last
    .map(op =>
      `${op.type === "gasto" ? "💸" : "💰"} ${op.amount}€ · ${op.category}/${op.subcategory}`
    )
    .join("\n");

  bot.sendMessage(chatId, `🧾 Últimas operaciones:\n\n${text}`);
});

/* ───────────── /GASTOS ───────────── */

bot.on(/^\/gastos$/, msg => {
  const chatId = msg.chat.id;
  const summary = getExpensesByCategory(chatId);

  if (Object.keys(summary).length === 0) {
    return bot.sendMessage(chatId, "📭 No hay gastos registrados");
  }

  let text = "📊 Gastos por categoría:\n\n";

  for (const [category, amount] of Object.entries(summary)) {
    text += `• ${category}: ${amount}€\n`;
  }

  bot.sendMessage(chatId, text);
});

/* ───────────── /RESET ───────────── */

bot.on(/^\/reset$/, msg => {
  resetBalance(msg.chat.id);
  bot.sendMessage(msg.chat.id, "🔄 Saldo e historial reiniciados");
});

/* ───────────── START BOT ───────────── */

bot.start();
