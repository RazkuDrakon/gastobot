require("dotenv").config();
const TeleBot = require("telebot");
const parseMessage = require("./parser");
const { add, subtract, getBalance, getHistory, getExpensesByCategory } = require("./services/balance");


const bot = new TeleBot({ token: process.env.TELEGRAM_BOT_TOKEN });

bot.on(["/start", "/iniciar"], (msg) => {
  bot.sendMessage(msg.chat.id, `¡Hola, ${msg.chat.username}! Soy tu asistente de gastos.`);
});

bot.on("text", msg => {
  if (msg.text.startsWith("/")) return;

  const { intent, amount, category } = parseMessage(msg.text);

  if (!intent || !amount) {
    console.log("NO ENTENDIDO:", msg.text);
    return bot.sendMessage(msg.chat.id, "No he entendido el mensaje.\nEjemplo:\n'He gastado 15 euros en la compra'");
  }

  if (intent === "gasto") {
    subtract(amount, category, msg.chat.id);
    bot.sendMessage(msg.chat.id, `💸 ${amount}€ en ${category} registrado`);
  }

  if (intent === "ingreso") {
    add(amount, category, msg.chat.id);
    bot.sendMessage(msg.chat.id, `💰 ${amount}€ añadidos en ${category}`);
  }

  const balance = getBalance(msg.chat.id);
  bot.sendMessage(msg.chat.id, `💳 Saldo actual: ${balance}€`);
});

bot.on(/^\/saldo$/, msg => {
  const chatId = msg.chat.id;
  const balance = getBalance(chatId);
  bot.sendMessage(chatId, `💳 Tu saldo actual es: ${balance}€`);
});

bot.on(/^\/historial$/, msg => {
  const chatId = msg.chat.id;
  const history = getHistory(chatId);

  if (history.length === 0) return bot.sendMessage(chatId, "📭 No hay operaciones todavía");

  const last = history.slice(-10).reverse();
  const text = last.map(op => `${op.type === "gasto" ? "💸" : "💰"} ${op.amount}€ · ${op.category}`).join("\n");

  bot.sendMessage(chatId, `🧾 Últimas operaciones:\n\n${text}`);
});

bot.on(/^\/reset$/, msg => {
  const chatId = msg.chat.id;
  resetBalance(chatId);
  bot.sendMessage(chatId, `Tu saldo ha sido reiniciado.`);
});

bot.on(/^\/gastos$/, msg => {
  const chatId = msg.chat.id;
  const summary = getExpensesByCategory(chatId);

  if (Object.keys(summary).length === 0) return bot.sendMessage(chatId, "📭 No hay gastos registrados");

  let text = "📊 Gastos por categoría:\n\n";
  for (const [category, amount] of Object.entries(summary)) {
    text += `• ${category}: ${amount}€\n`;
  }

  bot.sendMessage(chatId, text);
});

bot.start();