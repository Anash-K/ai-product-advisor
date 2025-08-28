import { Product } from "../data/productCatalog";

export const buildPrompt = (
  userQuery: string,
  productCatalog: Product[]
): string => `You are an AI product advisor.
User query: "${userQuery}"

Here is the product catalog:
${JSON.stringify(productCatalog, null, 2)}

Please identify the top 3 products matching the request, and for each product provide:
- product_name
- brand
- price
- category
- why (a short explanation of why it matches)

Return only a JSON array of products without any additional formatting or text.`;
