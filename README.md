# 🧞 AI-Genie Quest — The Magical AI Tutor for Kids

An interactive, gamified EdTech platform designed for hackathons that teaches children about Artificial Intelligence based on their age group. Powered by **Google Gemini API (`gemini-2.0-flash`)**, the platform dynamically adapts its user interface, tone, analogies, and complexity to provide a tailored learning experience.

---

## 🌟 Key Features

- **Age-Adaptive UI & Content:** The entire theme, fonts, and language shift dynamically based on the selected age group:
  - **Toddlers (5–8 years):** Pastel theme, playful cartoon elements, and warm analogies (e.g., *"AI is like a friendly puppy that learns tricks"*).
  - **Explorers (9–12 years):** Comic-book/Gaming style UI focusing on gamified Prompt Engineering basics.
  - **Prodigies (13+ years):** Sleek sci-fi dark mode diving into neural networks, tokens, and machine learning math.
- **Dynamic AI Chatbot:** Integrated with Google Gemini API to answer any tech question using age-appropriate terminology and system instructions.
- **Gamified Mini Quizzes:** Level-specific interactive quizzes that reward kids with custom unlockable badges (like *AI Cub*, *Prompt Master*, and *AI Ninja*) saved securely via `localStorage`.
- **Zero-Configuration Setup:** Front-end client-side API key management via a secure settings modal.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Routing:** TanStack Router (`@tanstack/react-router`)
- **Icons:** Lucide React
- **AI Engine:** Google Gemini API (`gemini-2.0-flash`)
- **Build Tool / Environment:** Vite & Bun

---
---

## 🧭 Project Architecture & Data Flow

Below is the simple technical layout of how **AI-Genie Quest** handles routing, state management, and external API requests securely within the client:
