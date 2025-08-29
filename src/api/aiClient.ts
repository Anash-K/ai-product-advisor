import axios from "axios";
import { buildPrompt } from "../utils/promptBuilder";
import { Product, Recommendation } from "../types";

const API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const fetchRecommendations = async (
  userQuery: string,
  productCatalog: Product[]
): Promise<Recommendation[]> => {
  // Construct prompt string with user query and catalog
  const prompt = buildPrompt(userQuery, productCatalog);
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await axios.post(API_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyBxd5S7d_gZOt9QnBjRyPV2s7bybXMMVOc",
      },
    });

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!rawText) return [];

    try {
      // Extract JSON from markdown code block
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : rawText;

      const recommendations: Recommendation[] = JSON.parse(jsonString);
      return recommendations;
    } catch (err) {
      console.error("Failed to parse AI response as JSON:", rawText, err);
      return [];
    }
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return [];
  }
};
