import axios from "axios";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5051;
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const GITHUB_SECRET = process.env.GITHUB_SECRET;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

const verifySignatureFn = (req) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) return false;

  const hmac = crypto
    .createHmac("sha256", GITHUB_SECRET)
    .update(req.rawBody)
    .digest("hex");

  return signature === `sha256=${hmac}`;
};

(async () => {
  try {
    app.post("/webhook", async (req, res) => {
      if (!verifySignatureFn(req)) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      const event = req.headers["x-github-event"];
      const payload = req.body;

      const actor = payload.sender?.login;
      const repo = payload.repository?.full_name;
      const action = payload.action;

      let message = `🔔 *GitHub Org Event*\n📌 Event: *${event}*`;

      if (actor) {
        message += `\n👤 Actor: ${actor}`;
      }

      if (repo) {
        message += `\n📂 Repo: ${repo}`;
      }

      if (action) {
        message += `\n⚡ Action: ${action}`;
      }

      await axios.post(
        `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TG_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }
      );

      res.json({ ok: true });
    });
  } catch (error) {
    console.error(error.message);
  }
})();

app.get("/", (_, res) => {
  res.send("TeleGit is running...");
});

app.listen(PORT, () => {
  console.log(`TeleGit webhook is running on port: ${PORT}`);
});
