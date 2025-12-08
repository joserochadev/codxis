import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../generated/prisma/client'
import { env } from '../src/env'

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function seed() {
  await prisma.video.deleteMany()

  const video = await prisma.video.create({
    data: {
      title: 'Regra Fiscal | Cadastro de Produto',
      videoPublishDate: new Date('2024-11-27T00:00:00Z'),
      videoUrl: 'https://youtu.be/8gVt8kqum64',
      system: 'WEB',
      transcription: `
      00:00:08.020 [Música]
      00:00:10.000 fala pessoal tudo bem Hoje vou mostrar
      00:00:12.639 para vocês como criar uma regra fiscal
      00:00:14.679 no sistema uma funcionalidade muito útil
      00:00:17.760 para quem precisa agilizar o cadastro de
      00:00:19.800 produtos manualmente e aplicar
      00:00:21.960 tributações de forma eficiente a regra
      00:00:25.199 fiscal permite automatizar o processo de
      00:00:27.920 tributação tanto no cadastro de de
      00:00:30.119 produtos quanto na entrada de notas
      00:00:32.558 fiscais ela economiza tempo e evita
      00:00:35.440 erros manuais lembre-se de sempre
      00:00:38.280 conferir com o seu contador Qual a
      00:00:40.480 tributação correta a ser
      00:00:42.600 utilizada vamos ver como cadastrar a
      00:00:45.079 regra fiscal na prática acesse o menu
      00:00:47.840 cadastros depois vá em fiscal e clique
      00:00:50.559 em regra fiscal clique no botão de
      00:00:53.760 cadastrar comece dando um título à sua
      00:00:56.440 regra fiscal esse nome deve ser definido
      00:00:59.199 com base na tributação que vai ser
      00:01:01.359 utilizada exemplo regra de produtos
      00:01:05.080 tributados no campo tipo de item
      00:01:07.960 selecione mercadoria para revenda Esse é
      00:01:10.640 o tipo mais comum no campo ncm é
      00:01:14.040 recomendável não preencher de forma fixa
      00:01:16.439 já que o ncm Varia muito entre os
      00:01:18.680 produtos você pode informar esse código
      00:01:21.280 manualmente ao cadastrar cada produto
      00:01:24.280 insira a tributação do ICMS de acordo
      00:01:27.680 com as orientações do contador por
      00:01:30.000 exemplo escolha origem 0 CST 102 cfop
      00:01:36.560 para dentro do estado 5102 cfop para
      00:01:40.640 fora do Estado
      00:01:43.000 6102 agora configure a tributação para
      00:01:46.200 nota fiscal do Consumidor utilizando as
      00:01:48.560 mesmas informações de CST 102 e cfop
      00:01:53.840 5002 depois disso insira as tributações
      00:01:57.039 de PIS e cofins de saída como por
      00:02:00.039 exemplo PIS de saída 49 cofins de saída
      00:02:04.960 49 outros Campos como ISS Impostos sobre
      00:02:09.038 serviço podem ser preenchidos conforme
      00:02:11.560 necessário especialmente se você estiver
      00:02:14.000 criando uma regra fiscal para serviços
      00:02:16.840 para isso basta alterar o tipo de item
      00:02:19.160 para serviços você pode perceber que
      00:02:21.760 existem vários Campos fiscais que devem
      00:02:23.680 ser preenchidos quando solicitados pela
      00:02:26.840 contabilidade ao finalizar o
      00:02:28.680 preenchimento de todas as informações
      00:02:30.920 clique em salvar para registrar sua
      00:02:32.920 regra fiscal Pronto sua regra fiscal foi
      00:02:36.480 criada com sucesso agora vou mostrar
      00:02:39.640 formas de utilização da regra fiscal
      00:02:42.599 quando você for cadastrar um produto
      00:02:44.480 manualmente pode aplicar a regra fiscal
      00:02:47.080 que criou para preencher automaticamente
      00:02:49.720 os campos tributários como tipo de item
      00:02:52.440 CST origem e cfop agilizando o processo
      00:02:57.480 após isso basta completar os Campos
      00:03:00.120 obrigatórios como descrição do produto
      00:03:03.080 ncm e unidade de medida e salvar o
      00:03:06.560 cadastro do produto outra forma de
      00:03:09.360 utilizar a regra é no cadastro de uma
      00:03:11.599 natureza de operação aqui você pode
      00:03:14.440 definir se a tributação será priorizada
      00:03:17.040 a partir do cadastro do produto ou se
      00:03:19.239 vai aplicar uma regra fiscal específica
      00:03:21.519 o sistema utilizará a regra da natureza
      00:03:23.959 de operação substituindo a tributação do
      00:03:26.959 produto no momento de inserir o produto
      00:03:29.920 na emissão de nota fiscal na entrada de
      00:03:32.799 uma nova nota fiscal Você pode utilizar
      00:03:35.280 a regra fiscal para aplicar tributações
      00:03:37.879 de saída de forma rápida aos produtos
      00:03:40.680 novos que estão sem
      00:03:43.040 tributação basta selecionar os produtos
      00:03:45.519 desejados na aba de regra fiscal
      00:03:48.400 escolher a regra que se aplica E com
      00:03:50.879 isso todos os produtos terão sua
      00:03:53.319 tributação configurada para venda de
      00:03:55.760 forma prática você também pode aplicar a
      00:03:58.920 regra fiscal na funcionalidade
      00:04:01.239 manutenção de produtos em lote
      00:04:03.599 permitindo a alteração de até 500
      00:04:06.200 produtos ao mesmo tempo nesse caso ao
      00:04:09.720 selecionar a regra o sistema preencherá
      00:04:12.480 automaticamente os campos tributários
      00:04:14.959 Bastando você selecionar os produtos e
      00:04:17.279 clicar em gravar para aplicar a regra um
      00:04:20.880 detalhe importante se você editar uma
      00:04:23.320 regra fiscal a possibilidade de alterar
      00:04:26.080 a regra e atualizar todos os produtos
      00:04:28.520 que utilizam a regra de forma rápida e
      00:04:31.440 prática Essas são algumas das formas de
      00:04:34.240 utilizar as regras fiscais no sistema
      00:04:36.840 agilizando o seu trabal
      00:04:39.919 etili tributações
      00:04:42.759 epr confa aos dutos com a sua
      00:04:46.520 contabilidade se você aou este vídeo
      00:04:48.680 útil não se esa deixar seu like
      00:04:51.400 compartilhar e deixar seu feedback nos
      00:04:53.960 comentários estamos sempre trabalhando
      00:04:56.160 para trazer conteúdos de qualidade até a
      00:04:58.639 próxima a
      00:05:01.740 [Música]
      `,
    },
  })
}

seed().then(async () => {
  console.log('Database seeded successfully')
  await prisma.$disconnect()
})
