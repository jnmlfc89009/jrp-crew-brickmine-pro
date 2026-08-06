import express from "express";
import path from "path";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/generate", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const style = req.body.style || "lego";
      const customPrompt = req.body.customPrompt;
      const stylePrompts: Record<string, string> = {
        mosaic: "in a 2D tile mosaic style but constructed entirely from Lego bricks",
        miniature: "in a tilt-shift miniature photography style constructed entirely from Lego bricks",
        "3d-diorama": "as an isometric 3D diorama constructed entirely from Lego bricks",
        cinematic: "in a highly cinematic lighting style constructed entirely from Lego bricks",
        toy: "in a bright, playful toy photography style constructed entirely from Lego bricks",
        retro: "in a retro 80s vintage style constructed entirely from Lego bricks",
      };

      const promptStyle = stylePrompts[style] || "constructed entirely from Lego bricks";
      let prompt = `Reimagine this image ${promptStyle}. Keep the original subject and composition but make it look like it's built out of realistic, interlocking plastic toy bricks. Make the colors vibrant.`;

      if (customPrompt) {
        prompt = `Reimagine this image constructed entirely from Lego bricks. ${customPrompt}`;
      }

      const base64ImageData = req.file.buffer.toString("base64");
      const mimeType = req.file.mimetype;

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let generatedImageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          generatedImageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }

      if (generatedImageUrl) {
        res.json({ imageUrl: generatedImageUrl });
      } else {
        res.status(500).json({ error: "Model did not return an image." });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
