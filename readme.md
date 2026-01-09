# TeleGit 🚀

A lightweight webhook service that connects GitHub events to Telegram notifications, keeping you informed about your organization's activities in real-time.

## 📋 Features

- ✅ Receives GitHub webhook events
- ✅ Secure signature verification
- ✅ Sends formatted notifications to Telegram
- ✅ Supports all GitHub organization events
- ✅ Easy deployment to Vercel

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- A Telegram Bot Token ([Create one with @BotFather](https://t.me/botfather))
- A Telegram Chat ID
- GitHub webhook secret
- GitHub repository/organization access

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd telegit
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=5051
TG_BOT_TOKEN=your_telegram_bot_token
TG_CHAT_ID=your_telegram_chat_id
GITHUB_SECRET=your_github_webhook_secret
```

## 🚀 Usage

### Development

```bash
yarn start
# or
npm start
```

The webhook server will start on `http://localhost:5051`

### Production (Vercel)

The project is configured for Vercel deployment. Simply:

```bash
vercel deploy
```

## ⚙️ GitHub Webhook Configuration

1. Go to your GitHub repository/organization settings
2. Navigate to **Settings** → **Webhooks** → **Add webhook**
3. Configure the webhook:
   - **Payload URL**: `https://your-domain.com/webhook`
   - **Content type**: `application/json`
   - **Secret**: Your `GITHUB_SECRET` value from `.env`
   - **Events**: Select the events you want to monitor

## 📱 Telegram Message Format

The bot sends notifications in the following format:

```
🔔 *GitHub Org Event*
📌 Event: *push*
👤 Actor: username
📂 Repo: org/repo-name
⚡ Action: created
```

## 🔒 Security

- Webhook signature verification using HMAC SHA-256
- Environment variables for sensitive data
- CORS protection

## 📁 Project Structure

```
telegit/
├── app.js           # Main application file
├── package.json     # Dependencies and scripts
├── vercel.json      # Vercel deployment config
├── .env            # Environment variables (not in repo)
└── README.md       # This file
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

ISC

## 👨‍💻 Author

S.M. Khalid Mahmud

---

Made with ❤️ for seamless GitHub-Telegram integration
