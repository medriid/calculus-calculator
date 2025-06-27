import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculator API routes can be added here if needed for server-side calculations
  // For now, all calculations are done client-side using math.js
  
  // Example route for server-side calculation if needed:
  // app.post("/api/calculate", async (req, res) => {
  //   try {
  //     const { expression } = req.body;
  //     // Perform calculation
  //     res.json({ result: "calculated result" });
  //   } catch (error) {
  //     res.status(400).json({ error: "Calculation error" });
  //   }
  // });

  const httpServer = createServer(app);
  return httpServer;
}
