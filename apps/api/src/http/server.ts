import fastify from 'fastify'

import { downloadVideoRoute } from './routes/download-video'

const app = fastify()

app.get('/health', (request, reply) => {
  return reply.send({ status: 'ok', timestamp: new Date().toISOString() })
})

app.register(downloadVideoRoute)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
