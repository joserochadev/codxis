import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { Prisma } from 'generated/prisma/client'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { generateAnswer, generateEmbeddings } from '@/services/gemini'

export function createNewQuestionRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/new-question',
    {
      schema: {
        summary: 'Create a new question',
        tags: ['Questions'],
        body: z.object({
          question: z.string().min(1),
          systemType: z
            .enum(['WEB', 'FOOD', 'AGRO', 'SALOES', 'PET', 'CLINICAS', 'SHOP'])
            .optional(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { question, systemType } = request.body

        const questionEmbedding = await generateEmbeddings(question)
        const embeddingsAsString = `[${questionEmbedding.join(',')}]`

        // const systemFilter = systemType ? `AND "system" = '${systemType}'` : ''

        const videos = await prisma.$queryRaw<
          Array<{
            id: string
            title: string
            videoUrl: string
            transcription: string | null
          }>
        >`SELECT
              id,
              title,
              "videoUrl",
              transcription,
              1 - ("embeddings" <=> ${embeddingsAsString}::vector) AS similarity
            FROM "Video"
            WHERE "transcription" IS NOT NULL
              AND "embeddings" IS NOT NULL
              AND 1 - ("embeddings" <=> ${embeddingsAsString}::vector) > 0.7
              ${systemType ? Prisma.sql`AND "system" = ${systemType}` : Prisma.empty}
            ORDER BY "embeddings" <=> ${embeddingsAsString}::vector
            LIMIT 5`

        let answer: string | null = null

        if (videos.length > 0) {
          const transcriptions = videos
            .map((video) => video.transcription)
            .filter((t): t is string => t !== null)

          answer = await generateAnswer(question, transcriptions)
        } else {
          app.log.warn('No similar videos found')
        }

        return reply.code(200).send({
          answer,
          sources: videos.map((video) => ({
            videoId: video.id,
            title: video.title,
            videoUrl: video.videoUrl,
          })),
        })
      } catch (error) {
        console.error('Error creating new question:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
