import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/flower_linkpost/', // GitHub Pages subpath for felix6328/flower_linkpost
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0) so mobile phones can connect
    port: 5173,
  },
});
