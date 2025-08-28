import { Product } from "../data/productCatalog";

export const buildPrompt = (userQuery: string, catalog: Product[]): string => `
You are an AI Product Advisor. A user has given this request: "${userQuery}".

Your task:
1. Compare their needs with this product catalog:
${JSON.stringify(catalog, null, 2)}

2. Pick the top 3 most suitable products.
3. For each product, explain in 2-3 sentences why it meets the user’s needs.
4. Respond strictly in JSON format as:
[
  {
    "product_name": "...",
    "brand": "...",
    "price": ...,
    "category": "...",
    "why": "reason the product matches request"
  }
]
`;
