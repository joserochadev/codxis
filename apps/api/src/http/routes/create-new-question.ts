import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export function createNewChatRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/new-question',
    {
      schema: {
        summary: 'Create a new question',
        tags: ['Questions'],
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    (request, reply) => {
      const { question } = request.body
    }
  )
}
