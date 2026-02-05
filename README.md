# 💰 GastoBot

Un bot inteligente de Telegram para gestionar tus gastos e ingresos personales. Administra tus finanzas diarias de forma fácil usando lenguaje natural.

---

## ✨ Características

- **Procesamiento de Lenguaje Natural**: Simplemente envía mensajes como "He gastado 15 euros en la compra" o "Añade 100 euros de sueldo"
- **Registro de Gastos**: Categoriza y registra automáticamente tus gastos
- **Gestión de Saldo**: Mantén un seguimiento de tu saldo actual en tiempo real
- **Historial de Transacciones**: Consulta tus últimas 10 operaciones en cualquier momento
- **Organización por Categorías**: Los gastos se organizan por categoría y subcategoría
- **Registro de Ingresos**: Realiza un seguimiento de gastos e ingresos de forma separada

---

## 🚀 Primeros Pasos

### Requisitos Previos

- **Node.js** (v12 o superior)
- **npm** (viene incluido con Node.js)
- **Enlace al Bot de Telegram** (obtén uno de [BotFather](https://t.me/botfather))

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RazkuDrakon/gastobot.git
   cd gastobot
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio raíz y añade tu token del bot de Telegram:
   ```
   TELEGRAM_BOT_TOKEN=tu_token_aqui
   ```

4. Inicia el bot:
   ```bash
   npm start
   ```

5. ¡Abre tu bot de Telegram y comienza a usarlo!

---

## 💬 Cómo Usar

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `/start` o `/iniciar` | Muestra el mensaje de bienvenida y comandos disponibles |
| `/saldo` | Consulta tu saldo actual |
| `/historial` | Ve tus últimas 10 operaciones |
| `/gastos` | Consulta el resumen de gastos por categoría |
| `/reset` | Reinicia tu saldo a cero |

### Ejemplos de Lenguaje Natural

**Registrando Gastos:**
- "He gastado 15 euros en la compra"
- "Compré un cómic por 12€"
- "Gasto de 50€ en gasolina"

**Registrando Ingresos:**
- "Añade 1000 euros de sueldo"
- "Recibí 50€ de regalo"
- "Ingreso 200 en freelance"

---

## 📁 Estructura del Proyecto

```
gastobot/
├── bot.js                 # Lógica principal del bot y manejadores de comandos
├── package.json           # Dependencias del proyecto y metadatos
├── README.md              # Este archivo
├── .env                   # Variables de entorno (crear este archivo)
│
├── parser/                # Procesamiento de lenguaje natural
│   ├── index.js          # Orquestador principal del parser
│   ├── intent.js         # Detecta intención (gasto vs ingreso)
│   ├── category.js       # Extrae la categoría de la transacción
│   ├── amount.js         # Extrae los montos monetarios
│   ├── normalize.js      # Normalización de texto
│   
└── services/              # Lógica de negocio
    └── balance.js        # Gestión de saldo e historial de transacciones
```

---

## 🔧 Arquitectura

### Módulo Parser
El módulo parser usa técnicas de PLN para entender los mensajes del usuario:
- **Detección de Intención**: Identifica si el mensaje es sobre un gasto o un ingreso
- **Extracción de Categoría**: Reconoce categorías de gastos/ingresos del contexto
- **Extracción de Cantidad**: Parsea valores numéricos en varios formatos
- **Normalización de Texto**: Maneja acentos y caracteres especiales

### Módulo Services
El servicio de balance gestiona los datos financieros:
- **Seguimiento de Saldo**: Mantiene el saldo por usuario usando almacenamiento en memoria
- **Registro de Historial**: Conserva un registro de todas las transacciones con marcas de tiempo
- **Resumen por Categorías**: Proporciona desglose de gastos por categoría

---

## 📋 Variables de Entorno

Crea un archivo `.env` en el directorio raíz:

```env
TELEGRAM_BOT_TOKEN=tu_token_del_bot_aqui
```

Obtén tu token del bot:
1. Abre Telegram y busca [@BotFather](https://t.me/botfather)
2. Crea un nuevo bot con el comando `/newbot`
3. Copia el token que se te proporciona

---

## 🛠️ Desarrollo

### Ejecutar Pruebas
Actualmente no hay pruebas configuradas. Para añadir pruebas:
```bash
npm test
```

### Dependencias

- **telebot** (v1.4.1): Envoltura de la API del Bot de Telegram
- **dotenv** (v17.2.3): Gestión de variables de entorno

---

## 📝 Notas

- Los saldos e historial se almacenan **en memoria** y se reiniciarán cuando el bot se detenga
- Para almacenamiento persistente, considera integrar una base de datos (MongoDB, PostgreSQL, etc.)
- El bot está configurado para entrada en idioma español
- El soporte de emojis proporciona retroalimentación visual en diferentes operaciones

---

## 🐛 Solución de Problemas

**¿El bot no responde?**
- Asegúrate de que tu `TELEGRAM_BOT_TOKEN` sea correcto en el archivo `.env`
- Verifica que el bot esté ejecutándose: `npm start`
- Comprueba que el bot puede acceder a internet

**¿El bot no entiende mi mensaje?**
- Intenta usar los formatos de ejemplo proporcionados
- Asegúrate de incluir tanto una cantidad como una categoría en tu mensaje
- El parser espera entrada en idioma español

---

## 📄 Licencia

ISC

---

## 👤 Autor

**razk-dev**

- GitHub: [@rzk-dev](https://github.com/rzk-dev)
- Repositorio: [gastobot](https://github.com/rzk-dev/gastobot)

---

## 🤝 Contribuir

¿Encontraste un error o tienes una solicitud de característica? Por favor, abre un issue en [GitHub Issues](https://github.com/RazkuDrakon/gastobot/issues)
