import axios from "axios";

export interface Recommendation {
  product_name: string;
  brand: string;
  price: number;
  category: string;
  why: string;
}

export interface Product {
  brand: string;
  product_name: string;
  price: number;
  category: string;
  description: string;
}

const LLM_API_ENDPOINT = "https://gpt4free-api.com/v1/chat/completions";

export const fetchRecommendations = async (
  userQuery: string,
  productCatalog: Product[]
): Promise<Recommendation[]> => {
  const prompt = `
User request: "${userQuery}"
Catalog: ${JSON.stringify(productCatalog, null, 2)}

Return top 3 products in this JSON array format:
[
  { "product_name": "...", "brand": "...", "price": ..., "category": "...", "why": "..." }
]
`;

  const payload = {
    model: "gpt-4o-mini", // keep it simple
    messages: [
      { role: "system", content: "You are a helpful AI product advisor." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 500,
  };
  console.log(payload, "payload");
  

  try {
    const response = await axios.post(LLM_API_ENDPOINT, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("LLM raw response:", response);

    // const textResponse = data?.choices?.[0]?.message?.content;
    // if (!textResponse) {
    //   console.error("No content found in LLM response");
    //   return [];
    // }

    // return JSON.parse(textResponse) as Recommendation[];
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    return [];
  }
};
