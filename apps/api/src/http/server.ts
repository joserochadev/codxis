import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createNewQuestionRoute } from './routes/create-new-question'
import { downloadVideoRoute } from './routes/download-video'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/health', (request, reply) => {
  return reply.send({ status: 'ok', timestamp: new Date().toISOString() })
})

app.register(downloadVideoRoute)
app.register(createNewQuestionRoute)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
