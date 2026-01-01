import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // run Tailwind plugin before the React plugin so utilities are available
  plugins: [tailwindcss(), react()],
});
