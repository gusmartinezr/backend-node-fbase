import { onRequest } from "firebase-functions/v2/https";

export const ping = onRequest({ region: "us-central1" }, (_req, res) => {
  res.status(200).send("ok");
});

let appFactory: Promise<ReturnType<any>> | null = null;

async function getApp() {
  if (!appFactory) {
    appFactory = import("./app.js").then(m => m.makeApp());
  }
  return appFactory;
}

export const api = onRequest({ region: "us-central1" }, async (req, res) => {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (err) {
    console.error("Init error:", err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});
