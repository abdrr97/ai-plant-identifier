// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function identifyPlant(image: File) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Convert the image file to correct format for Gemini
  const imageData = await fileToGenerativePart(image);

  const prompt = `Identify this plant and provide the following information:
  1. Common name
  2. Scientific species name
  3. Natural habitat
  4. Common uses

  Return ONLY a JSON object with this exact structure, with no markdown or code blocks:
  {
    "name": "Common name",
    "species": "Scientific name",
    "habitat": "Natural habitat description",
    "uses": ["use1", "use2", "use3"]
  }`;

  const result = await model.generateContent([prompt, imageData]);
  const text = result.response.text();

  // Clean the response text by removing markdown code blocks and any surrounding whitespace
  const cleanedText = text
    .replace(/```json\n?/g, "") // Remove ```json
    .replace(/```\n?/g, "") // Remove closing ```
    .trim(); // Remove any surrounding whitespace

  try {
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Failed to parse JSON response:", cleanedText, e);
    throw new Error("Invalid response format from Gemini API");
  }
}

async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

  const base64EncodedData = (await base64EncodedDataPromise) as string;
  const mimeType = file.type;

  return {
    inlineData: {
      data: base64EncodedData.split(",")[1],
      mimeType,
    },
  };
}
