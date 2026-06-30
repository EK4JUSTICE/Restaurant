import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  base: '/', // 👈 Add this line right here to fix asset loading!
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (url === '/' || url === '/index.html') {
          res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        } else if (/\.jsx($|[?])/.test(url)) {
          res.setHeader('Content-Type', 'text/jsx; charset=UTF-8')
        }
        next()
      })
    }
  }
})