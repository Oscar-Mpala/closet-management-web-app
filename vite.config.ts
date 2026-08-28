import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- We need this back!
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(), // <-- And this!
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Closet Management App',
        short_name: 'Closet',
        description: 'Your personal wardrobe and outfit tracker',
        theme_color: '#EEE9DF',
        background_color: '#EEE9DF',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});