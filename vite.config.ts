import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig(({ mode })=>{
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      '.env': {},
    },
    esbuild: {
      pure: ['console.log'],
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 50000,
      sourcemap: true
    },
    server: {
      host: true,
      port: parseInt( env.VITE_PORT)
    },
    preview: {
      port: parseInt( env.VITE_PER_PORT)
    }
  };
});
