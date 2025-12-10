import { prisma } from '@/lib/prisma'

import { generateEmbeddings } from './gemini'

export async function processVideoEmbeddings(videoId: string) {
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    select: { transcription: true },
  })

  if (!video || !video.transcription) {
    throw new Error('Video or transcription not found')
  }

  const embeddings = await generateEmbeddings(video.transcription)
  const embeddingsAsString = `[${embeddings.join(',')}]`

  await prisma.$executeRaw`
      UPDATE "Video"
      SET "embeddings" = ${embeddingsAsString}::vector
      WHERE "id" = ${videoId}
    `

  return { success: true }
}

export async function proccessAllVideosWithoutEmbeddings() {
  const videos = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM "Video"
      WHERE "transcription" IS NOT NULL
      AND "embeddings" IS NULL
    `

  for (const video of videos) {
    try {
      await processVideoEmbeddings(video.id)
      console.log(`Processed embeddings for video ID: ${video.id}`)
    } catch (error) {
      console.error(`Failed to process video ID: ${video.id}`, error)
    }
  }

  return { processedVideos: videos.length }
}
