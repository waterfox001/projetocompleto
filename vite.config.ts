import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      alias: [
        // Match any relative or absolute import pointing to stop-os or stop.os
        { find: /.*projects\/stop[\.-]os\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/stop-os/$1') },
        // Match any relative or absolute import pointing to torre-os or torre.os
        { find: /.*projects\/torre[\.-]os\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/torre-os/$1') },
        // Match any relative or absolute import pointing to site-torre or site2torre
        { find: /.*projects\/(site-torre|site2torre)\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/site-torre/$2') },
        // Match any relative or absolute import pointing to site-stop or site1stop
        { find: /.*projects\/(site-stop|site1stop)\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/site-stop/$2') },
        // Explicit alias for projects
        { find: /^projects\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/$1') },
        { find: /^@\/projects\/(.*)/, replacement: path.resolve(__dirname, 'src/projects/$1') },
        { find: '@projects', replacement: path.resolve(__dirname, 'src/projects') },
        // Standard aliases
        { find: /^@\/(.*)/, replacement: path.resolve(__dirname, 'src/$1') },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
