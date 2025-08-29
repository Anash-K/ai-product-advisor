import { Product } from "../types";

export const buildPrompt = (
  userQuery: string,
  productCatalog: Product[]
): string => `You are an expert AI product advisor specializing in matching users with perfect products.

USER NEEDS: "${userQuery}"

AVAILABLE PRODUCTS:
${JSON.stringify(productCatalog, null, 2)}

ANALYSIS REQUIREMENTS:
1. First analyze the user's primary needs and implicit requirements
2. Match against product features, category, and description
3. Rank by relevance (most to least suitable)
4. Select up to 3 best matches (fewer if not enough good matches)

RESPONSE FORMAT:
Return ONLY a valid JSON array with this exact structure:
[
  {
    "product_name": "string (must match catalog exactly)",
    "brand": "string (must match catalog exactly)",
    "price": number (must match catalog exactly),
    "category": "string (must match catalog exactly)",
    "description": "string (from catalog)",
    "why": "string (concise, user-friendly explanation focusing on how it meets their specific needs)"
  }
]

Do not include any other text, explanations, or formatting outside the JSON array.`;