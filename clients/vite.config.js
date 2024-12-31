import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'offline.html','apple-touch-icon.png'],
      manifest: {
        name: 'Shabibsa Data',
        short_name: 'Shabibsa Data',
        description: 'Shabibsa Data Home of VTU', 
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/shabibsadata.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/shabibsadata.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/shabibsadata.png',
            sizes: '384x384', 
            type: 'image/png',
          }
        ],
        start_url: '/', 
        display: 'standalone',
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
  server: {
    port: 5000,
  }
});