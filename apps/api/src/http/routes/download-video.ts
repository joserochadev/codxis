import { exec } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { FastifyInstance } from 'fastify'

export function downloadVideoRoute(app: FastifyInstance) {
  app.get('/download-video', (request, reply) => {
    const { videoUrl } = request.query as { videoUrl?: string }

    if (!videoUrl) {
      return reply.status(400).send({
        message:
          'videoUrl query parameter is required: ?videoUrl=https://youtube.com/...',
      })
    }

    const videoId = randomUUID()
    const outputPath = path.resolve(`./downloads/video-${videoId}.mp4`)

    app.log.info(`Downloading video: ${videoUrl}`)

    return new Promise((resolve) => {
      exec(
        `yt-dlp -f "bv+ba/b" -o "${outputPath}" "${videoUrl}"`,
        async (erro, stdout, sterr) => {
          if (erro) {
            app.log.error(sterr)
            resolve(
              reply.code(500).send({ message: 'Error downloading video' })
            )
          }

          if (!fs.existsSync(outputPath)) {
            resolve(
              reply
                .code(500)
                .send({ message: 'Video file not found after download' })
            )
          }
        }
      )
    })
  })
}
