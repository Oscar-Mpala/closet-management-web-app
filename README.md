# Closet - Offline-First Wardrobe Management PWA

A Progressive Web App (PWA) built to manage personal wardrobes, generate outfits, and track daily wear. Designed with an offline-first architecture, ensuring full functionality and instant load times regardless of network connectivity.

## Features
* **Digital Wardrobe:** Upload, categorize, and track clothing items.
* **Outfit Canvas:** A randomization engine to build and save outfit combinations.
* **Smart Dashboard:** Dynamically suggests outfits based on real-time weather and clothing availability.
* **Calendar Tracking:** Log historical outfit data.
* **Laundry Management:** Automatically tracks `wearCount` and manages clean/dirty statuses.

## Tech Stack
* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Database:** Dexie.js (IndexedDB wrapper for persistent local storage)
* **Icons:** Lucide React
* **PWA:** `vite-plugin-pwa` (Service workers & manifest generation)

## Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server.
4. Run `npm run build` to compile the production PWA.