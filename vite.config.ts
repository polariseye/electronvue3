import { fileURLToPath, URL } from "node:url";
import fs from 'fs'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { spawn } from 'child_process';
import * as path from "path";
import electron, { onstart } from 'vite-plugin-electron'
import electronPath from 'electron'
fs.rmSync('dist', { recursive: true, force: true })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron-main/index.ts',
        vite: {
          build: {
            outDir: 'dist/electron-main',
            minify: false,
          },
          plugins: [
            // Custom start Electron
            onstart(() => {
              if (process.electronApp) {
                process.electronApp.removeAllListeners()
                process.electronApp.kill()
              }
  
              // Start Electron.app
              process.electronApp = spawn(electronPath, ['.', '--no-sandbox'], { stdio: 'inherit' })
              // Exit command after Electron.app exits
              process.electronApp.once('exit', process.exit)
            }),
          ],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, 'electron-preload/index.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron-preload',
            minify: false,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    minify: false,
  },
});

