const Telebot = require("telebot");
const CONSTANTS = require("./constants");
const parseMessage = require("./parser");
const { add, subtract, getBalance } = require("./services/balance");


const bot = new Telebot({
  token: CONSTANTS.TELEGRAM_BOT_TOKEN
});

bot.on(["/start", "/iniciar"], (msg) => {
  bot.sendMessage(msg.chat.id, `¡Hola, ${msg.chat.username}! Soy tu asistente de gastos.`);
});

bot.on("text", msg => {
  if (msg.text.startsWith("/")) return;
  const { intent, amount, category } = parseMessage(msg.text);

  if (!intent || !amount) {
    return bot.sendMessage(
      msg.chat.id,
      "No he entendido el mensaje.\nEjemplo:\n'He gastado 15 euros en la compra'"
    );
  }

  if (intent === "gasto") {
    subtract(amount, category, msg.chat.id);
    bot.sendMessage(msg.chat.id, `${amount}€ en ${category} registrado`);
  }

  if (intent === "ingreso") {
    add(amount, category, msg.chat.id);
    bot.sendMessage(msg.chat.id, `${amount}€ añadidos en ${category}`);
  }
  const balance = getBalance(msg.chat.id);
  bot.sendMessage(msg.chat.id, `Saldo actual: ${balance}€`);

  if (!intent || !amount) {
  console.log("NO ENTENDIDO:", msg.text);
}
});

bot.on(/^\/saldo$/, msg => {
  const chatId = msg.chat.id;
  const balance = getBalance(chatId);

  bot.sendMessage(chatId, `Tu saldo actual es: ${balance}€`);
});

bot.on(/^\/reset$/, msg => {
  const chatId = msg.chat.id;
  resetBalance(chatId);
  bot.sendMessage(chatId, `Tu saldo ha sido reiniciado.`);
});

bot.start();