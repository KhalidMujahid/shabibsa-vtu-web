import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'offline.html'],
      manifest: {
        name: 'Shabibsa Data',
        short_name: 'Shabibsa Data',
        description: 'Shabibsa Data web app vtu',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/shabibsadata.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/shabibsadata.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: {
                maxEntries: 10,
              },
            },
          },
          {
            urlPattern: /offline\.html$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'offline-page-cache',
            },
          },
        ],
      },
    }),
  ],
  server:{
    port: 5000,
  }
});
