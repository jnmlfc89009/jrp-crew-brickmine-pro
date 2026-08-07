import { HfInference } from "@huggingface/inference";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const getHf = () => {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY environment variable is required");
  }
  return new HfInference(apiKey);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image, style = "brick", customPrompt } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Extract base64 data and mime type from data URL
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid image format" });
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const imageBuffer = Buffer.from(base64Data, "base64");
    
    const stylePrompts: Record<string, string> = {
      mosaic: "in a 2D tile mosaic style but constructed entirely from Brick bricks",
      miniature: "in a tilt-shift miniature photography style constructed entirely from Brick bricks",
      "3d-diorama": "as an isometric 3D diorama constructed entirely from Brick bricks",
      cinematic: "in a highly cinematic lighting style constructed entirely from Brick bricks",
      toy: "in a bright, playful toy photography style constructed entirely from Brick bricks",
      retro: "in a retro 80s vintage style constructed entirely from Brick bricks",
    };

    const promptStyle = stylePrompts[style] || "constructed entirely from Brick bricks";
    let prompt = `Reimagine this image ${promptStyle}. Keep the original subject and composition but make it look like it's built out of realistic, interlocking plastic toy bricks. Make the colors vibrant.`;

    if (customPrompt) {
      prompt = `Reimagine this image constructed entirely from Brick bricks. ${customPrompt}`;
    }

    const hf = getHf();
    const imageBlob = new Blob([imageBuffer], { type: mimeType });
    
    const responseBlob = await hf.imageToImage({
      model: "timbrooks/instruct-pix2pix",
      inputs: imageBlob,
      parameters: {
        prompt: prompt,
      },
    });

    const buffer = Buffer.from(await responseBlob.arrayBuffer());
    const base64EncodeString = buffer.toString("base64");
    const generatedImageUrl = `data:${responseBlob.type};base64,${base64EncodeString}`;

    if (generatedImageUrl) {
      res.status(200).json({ imageUrl: generatedImageUrl });
    } else {
      res.status(500).json({ error: "Model did not return an image." });
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
  }
}
