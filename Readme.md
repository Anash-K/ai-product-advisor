🤖 AI Product Advisor
Your intelligent shopping companion that understands natural language and recommends the perfect products using advanced AI.

https://img.shields.io/badge/React_Native-0.72.0-blue.svg
https://img.shields.io/badge/Expo-49.0.0-lightgrey.svg
https://img.shields.io/badge/TypeScript-5.0.0-blue.svg
https://img.shields.io/badge/AI--Powered-Gemini-orange.svg

✨ Intelligent Features
Feature	Description
🎯 Natural Language Processing	Describe your needs in plain English - "lightweight laptop for travel with long battery life"
⚡ Real-time AI Recommendations	Powered by Google's Gemini AI for intelligent product matching
🎨 Beautiful Animations	Smooth transitions and engaging micro-interactions throughout
📱 Adaptive Design	Optimized for mobile, tablet, and web with responsive layouts
💾 Smart Caching	React Query for efficient data caching and state management
🏗️ Architecture
The application follows a modular and layered architecture with a clear flow of data:

Data Flow
User enters a query in HomeScreen

Query is sent to promptBuilder.ts, which creates a structured AI prompt

Prompt is passed to apiClient.ts, which queries the AI model with the product catalog

AI responds with a strict JSON array of product matches

Response is validated against types/index.ts

UI displays products via ProductCard (or NoDataCard/ErrorCard if needed)

On selection, product details are shown in ProductDetailScreen.tsx

Key Design Decisions
Modular Folder Structure: Separated code into screens, components, api, constants, data, utils, and types for better maintainability

Reusable Components: Created components like ProductCard, ErrorCard, and SkeletonLoader to avoid code duplication

Prompt Builder Utility: Centralized logic ensures prompts are structured and reliable

Typed Data Models: Strong typing prevents runtime errors and improves productivity

AI Integration Strategy: Explicit JSON-only responses eliminate ambiguity in AI responses

📂 Project Structure
text
my-ai-product-advisor/
├── App.tsx                      # Root component with navigation
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
│
└── src/
    ├── api/
    │   └── aiClient.ts          # Gemini API integration with error handling
    │
    ├── components/
    │   ├── ProductCard.tsx      # Animated product display card
    │   ├── ErrorCard.tsx        # User-friendly error states
    │   ├── SkeletonLoader.tsx   # Loading placeholders
    │   └── index.ts             # Component exports
    │
    ├── constants/
    │   ├── Colors.ts            # Design system color palette
    │   └── Images.ts            # Static image assets
    │
    ├── navigation/
    │   └── AppNavigator.tsx     # Stack navigation configuration
    │
    ├── screens/
    │   ├── HomeScreen.tsx       # Main search interface
    │   └── ProductDetailScreen.tsx # Detailed product view
    │
    ├── data/
    │   └── productCatalog.ts    # Sample product database
    │
    ├── types/
    │   └── index.ts             # TypeScript type definitions
    │
    └── utils/
        ├── promptBuilder.ts     # AI prompt engineering
        ├── formatters.ts        # Data formatting utilities
        └── validation.ts        # Input validation
🚀 Getting Started
Installation
bash
# Clone the repository
git clone https://github.com/your-username/ai-product-advisor.git

# Navigate to project directory
cd ai-product-advisor

# Install dependencies
npm install

# Start the development server
npm start
Running on Different Platforms
bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
🛠️ Tech Stack
React Native (Expo) - Cross-platform framework

TypeScript - Type safety and developer experience

TanStack React Query - API fetching & caching

Google Gemini AI - Recommendation engine

Custom UI Components - ProductCard, ErrorCard, SkeletonLoader, etc.

🖼 Screenshots
Home Screen	Product Details	No Products Found
<img src="./src/assets/HomeScreen.jpeg" width="200">	<img src="./src/assets/DetailsScreen.jpeg" width="200">	<img src="./src/assets/NoData.jpeg" width="200">
Splash Screen	Skeleton Effect
<img src="./src/assets/SplashScreen.jpeg" width="200">	<img src="./src/assets/SkeletonEffect.jpeg" width="200">
🔮 Roadmap
Voice-based product search 🎤

Smarter AI suggestions 🤖

Wishlist & Save for Later 💾

Multi-language support 🌍

Advanced filtering and sorting 🔍

👨‍💻 Author
Built with ❤️ by Anash Khan