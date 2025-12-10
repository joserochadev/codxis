import { GoogleGenAI } from '@google/genai'

import { env } from '@/env'

const model = 'gemini-2.5-flash'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Failed to generate embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.

    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada, apenas diga que não tem informações suficientes;
    - Seja objetivo;
    - Mantenha um tom educado e profissional;
    - Cite trechos relevantes do contexto se apropriado;
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Fail to generate answer by Gemini.')
  }

  return response.text
}
