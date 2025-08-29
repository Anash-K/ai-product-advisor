# AI Conversation Log

This document records all interactions with AI tools used during the development of the **AI Product Advisor** project.

---

## Prompt: Building Product Recommendation AI Prompt

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


## Prompts & Response:
-> I Want a noise cancellation headset under 2000

AI Response:
[
  {
    "product_name": "Bass Headphones",
    "brand": "LEAF",
    "price": 1999,
    "category": "Entertainment",
    "description": "Immerse yourself in deep, powerful bass with these comfortable over-ear headphones, perfect for music lovers and gamers alike.",
    "why": "These headphones are under your budget and are suitable for music and gaming. While the description doesn't explicitly mention noise cancellation, over-ear headphones often provide a degree of passive noise isolation."
  },
  {
    "product_name": "Blaze Wired Over Ear Gaming Headphones",
    "brand": "bt",
    "price": 1999,
    "category": "Entertainment",
    "description": "Get a competitive edge with the Blaze gaming headphones, featuring crystal-clear audio and a comfortable design for long gaming sessions.",
    "why": "These headphones fit your budget and are over-ear, which can offer some noise isolation. It is suitable for gaming."
  }
] 

-> Show me some wallets

Api Response: 
[
  {
    "product_name": "Wallet Bot- Classic",
    "brand": "ARISTA VAULT",
    "price": 5280,
    "category": "Travel & Lifestyle",
    "description": "Keep your valuables safe with the Wallet Bot- Classic, a smart wallet with GPS tracking and anti-theft features.",      
    "why": "This is a smart wallet, explicitly designed for keeping valuables safe with features like GPS tracking."
  }
]



-> I need a good bluetooth headset 
Api Response :
 [
  {
    "product_name": "Bass Headphones",
    "brand": "LEAF",
    "price": 1999,
    "category": "Entertainment",
    "description": "Immerse yourself in deep, powerful bass with these comfortable over-ear headphones, perfect for music lovers and gamers alike.",
    "why": "These are Bluetooth headphones, allowing you to listen to audio wirelessly."
  },
  {
    "product_name": "Blaze Wired Over Ear Gaming Headphones",
    "brand": "bt",
    "price": 1999,
    "category": "Entertainment",
    "description": "Get a competitive edge with the Blaze gaming headphones, featuring crystal-clear audio and a comfortable design for long gaming sessions.",
    "why": "While wired, these headphones offer a comparable audio experience, particularly suitable for gaming if that's something you'd be interested in doing."
  },
  {
    "product_name": "Dot bluetooth speaker",
    "brand": "bt",
    "price": 699,
    "category": "Entertainment",
    "description": "Enjoy your favorite music on the go with this compact and portable Bluetooth speaker, offering impressive sound in a small package.",
    "why": "This is a Bluetooth speaker. While not a headset, it offers Bluetooth audio capabilities if you'd like to share audio."
  }
]


-> I need a cooking assistant
Api Response 
[
  {
    "product_name": "AI Cooking Assistant",
    "brand": "upliance.ai",
    "price": 27999,
    "category": "Kitchen Appliances",
    "description": "Simplify your cooking with this AI-powered assistant, which guides you through recipes and automates various cooking tasks.",
    "why": "This is the most direct match, explicitly designed to assist with cooking using AI guidance and task automation."
  },
  {
    "product_name": "Autonomous Cooking Robot",
    "brand": "NOSH",
    "price": 74999,
    "category": "Kitchen Appliances",
    "description": "Enjoy delicious meals with the push of a button with this autonomous cooking robot that chops, mixes, and cooks your food to perfection.",
    "why": "This robot automates the entire cooking process, from chopping to cooking, providing hands-free assistance."
  }
] 
