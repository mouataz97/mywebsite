import express, { Request, Response } from "express";
import cors from "cors";

// Create and configure the Express app
export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/ping", (_req: Request, res: Response) => {
    res.json({ ok: true, message: "pong" });
  });

  // Demo endpoint
  app.get("/api/demo", (_req: Request, res: Response) => {
    res.json({ message: "Hello from Express (dev middleware)" });
  });

  return app;
}
