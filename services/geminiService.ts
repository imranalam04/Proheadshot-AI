
import { GoogleGenAI } from "@google/genai";
import { HeadshotStyle, OutfitType, GenerationConfig } from "../types";

const getPromptForStyle = (config: GenerationConfig): string => {
  const { style, outfit, brandColor, retouching } = config;
  
  let styleDesc = "";
  let backgroundDesc = "";

  // Incorporate Brand Color if present
  const brandInstruction = brandColor 
    ? `The background should incorporate subtle, professional accents of the brand color ${brandColor} (hex code), perhaps in the blurred lighting or architectural details, to align with corporate branding.`
    : "";

  switch (style) {
    case HeadshotStyle.CORPORATE:
      styleDesc = "High-end corporate headshot, confident expression, sharp focus.";
      backgroundDesc = "Neutral gray or subtle blue gradient professional studio background.";
      break;
    case HeadshotStyle.STARTUP:
      styleDesc = "Modern tech startup founder headshot, approachable yet professional.";
      backgroundDesc = "Bright and airy modern office background with beautiful bokeh and soft natural window light.";
      break;
    case HeadshotStyle.CREATIVE:
      styleDesc = "Creative studio portrait, artistic composition, high contrast.";
      backgroundDesc = "Solid dark or textured abstract background, dramatic moody lighting.";
      break;
    case HeadshotStyle.OUTDOOR:
      styleDesc = "Natural outdoor portrait, relaxed and friendly.";
      backgroundDesc = "Blurred city park or urban architecture background, golden hour lighting.";
      break;
    case HeadshotStyle.BW:
      styleDesc = "Classic black and white studio portrait, timeless look, rembrandt lighting.";
      backgroundDesc = "Dark gray or black studio backdrop.";
      break;
  }

  // Retouching instructions
  const retouchingInstructions = [];
  if (retouching.smoothSkin) retouchingInstructions.push("Apply subtle skin smoothing while keeping texture realistic.");
  if (retouching.whitenTeeth) retouchingInstructions.push("Ensure teeth are naturally white and clean.");
  if (retouching.brightenEyes) retouchingInstructions.push("Add a subtle catchlight to the eyes to make them pop.");

  return `
  Task: Transform the attached selfie into a premium, studio-quality professional headshot.
  
  CRITICAL IDENTITY INSTRUCTION: 
  You MUST preserve the facial identity, structure, and ethnic features of the person in the input image. 
  Do not generate a random person. The output must look exactly like the subject, but professionally photographed.

  Outfit: The person should be wearing a ${outfit}, fitting well and looking high-quality.
  
  Style: ${styleDesc}
  Background: ${brandInstruction} ${backgroundDesc}
  
  Retouching:
  - Remove any blemishes or stray hairs.
  - Fix lighting to be flattering and professional (softbox style).
  - ${retouchingInstructions.join('\n- ')}

  Technical: 8k resolution, photorealistic, cinematic lighting, highly detailed, 85mm lens look.
  Framing: Standard professional head and shoulders crop.
  `;
};

export const generateHeadshot = async (
  base64Image: string,
  config: GenerationConfig
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Select model based on quality preference
  const modelName = config.highQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  // Ensure Base64 doesn't have the prefix
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

  try {
    const prompt = getPromptForStyle(config);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: config.highQuality ? {
        imageConfig: {
          imageSize: '2K',
          aspectRatio: '1:1'
        }
      } : {
         imageConfig: {
          aspectRatio: '1:1'
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated in the response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
