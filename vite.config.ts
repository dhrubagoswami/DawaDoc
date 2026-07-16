import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function devApiPlugin(apiKey: string | undefined): Plugin {
  return {
    name: 'dawadoc-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/analyze', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const parsed = JSON.parse(Buffer.concat(chunks).toString('utf-8') || '{}')

          const { runAnalyze } = await server.ssrLoadModule('/server/analyzeHandler.ts')
          const { status, body } = await runAnalyze(parsed, apiKey)

          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Dev API error: ' + (err as Error).message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), devApiPlugin(env.GEMINI_API_KEY)],
  }
})
