# AI Conversation Log

This document records all interactions with AI tools used during the development of the **AI Product Advisor** project.

---

## 1️⃣ Prompt: Building Product Recommendation AI Prompt

**User Query / Instruction to AI:**

```text
You are an expert AI product advisor specializing in matching users with perfect products.

USER NEEDS: "<insert user query here>"

AVAILABLE PRODUCTS:
<productCatalog JSON>

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

Do not include any other text, explanations, or formatting outside the JSON array.


AI Response:
[
  {
    "product_name": "Adaptive Pain Management",
    "brand": "CURAPOD by litemed",
    "price": 8999,
    "category": "Healthtech and Wellness",
    "description": "Advanced technology to assist in personalized pain management.",
    "why": "This product meets the user's needs for adaptive, tech-enabled pain relief in a home setting."
  },
  {
    "product_name": "Spandan",
    "brand": "Spandan Healthcare",
    "price": 7328,
    "category": "Healthtech and Wellness",
    "description": "Wearable device for monitoring and managing chronic pain.",
    "why": "It helps track and manage chronic conditions efficiently, suitable for the user's requirements."
  }
]
