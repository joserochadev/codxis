import { proccessAllVideosWithoutEmbeddings } from './video'

async function main() {
  try {
    const result = await proccessAllVideosWithoutEmbeddings()
    console.log(
      `Processing complete! ${result.processedVideos} videos processed.`
    )
  } catch (error) {
    console.error('Error processing videos:', error)
    process.exit(1)
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Unexpected error:', error)
    process.exit(1)
  })
