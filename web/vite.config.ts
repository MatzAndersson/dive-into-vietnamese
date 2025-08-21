import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [['babel-plugin-react-compiler', {}]] },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5143', // your ASP.NET URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
