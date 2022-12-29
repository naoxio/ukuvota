import crypto from 'crypto'
import path from 'path'
import desm from 'desm'

const __dirname = desm(import.meta.url)

interface Proposal {
  id: string,
  title: string,
  description: string,
  createdAt: number
}
const getTimestamp = (minutes: string, hours: string, days: string) => {
  console.log(minutes, hours, days)
  let rtn = 0
  rtn += parseInt(minutes) * 60 * 1000
  rtn += parseInt(hours) * 3600 * 1000
  rtn += parseInt(days) * 24 * 3600 * 1000
  return rtn
}



const defineRoutes = (fastify) => {
  // Here you have the fastify object and can do whatever you need, such as
  // adding routes or plugins.

  fastify.register(
    import('@fastify/leveldb'),
    { name: 'db' }
  )

  fastify.register(import('@fastify/static'), {
    root: path.join(__dirname, '../../public'),
    prefix: '/public',
    decorateReply: false 
  });


  fastify.get('/api/quick/process/:processId/proposal', async(req: any)  => {
    const processId = req.params.processId
    const proposalId = crypto.randomUUID()
    const process = JSON.parse(await fastify.level.db.get(processId))
    const proposal = {
      id: proposalId,
      title: '',
      description: '',
      createdAt: +new Date(),
    }
    process.proposals.push(proposal)
    await fastify.level.db.put(processId, JSON.stringify(process))
    return { status: 'ok', proposal}
  })
  fastify.get('/api/quick/process/:processId/proposal/:proposalId/delete', async(req: any) => {
    const processId = req.params.processId
    const process = JSON.parse(await fastify.level.db.get(processId))
    process.proposals = process.proposals.filter(proposal => proposal.id !== req.params.proposalId)
    await fastify.level.db.put(processId, JSON.stringify(process))
    return { status: 'ok' }
  })
  fastify.post('/api/quick/process/:processId/proposal/:proposalId', async(req: any) => {
    const processId = req.params.processId
    const body = JSON.parse(req.body)
    const process = JSON.parse(await fastify.level.db.get(processId))
    const proposalIndex = process.proposals.findIndex((proposal) => proposal.id === req.params.proposalId)
    if (proposalIndex === -1) return { status: '-1'}

    const proposal = process.proposals[proposalIndex]
    proposal.title = body.title
    proposal.description = body.description
    await fastify.level.db.put(processId, JSON.stringify(process))
    return { status: 'ok' }
  });

  fastify.get('/api/quick/process/:id', async(req: any) => {
    const process = await fastify.level.db.get(req.params.id)
    return { status: 'ok', process}
  });

  fastify.post('/api/quick/process', async(req: any) => {
    const body = JSON.parse(req.body)
    const uuid = crypto.randomUUID()
    const proposalEnd = +new Date() + getTimestamp(body.proposalMinutes, body.proposalHours, body.proposalDays)
    const votingEnd = proposalEnd + getTimestamp(body.votingMinutes, body.votingHours, body.votingDays)
    let proposals = [] as Proposal[]
    if (body.proposals) {
      for (let i = 0; i < body.proposals.length; i++) {
        const proposalId = crypto.randomUUID()
        const proposal = body.proposals[i]
        proposals.push({
          id: proposalId,
          title: proposal.title,
          description: proposal.description,
          createdAt: +new Date(),
        } as Proposal)
      }
    }
    const process = {
      title: body.topicQuestion,
      description: body.topicDescription,
      proposalEnd: new Date(proposalEnd).toISOString(),
      votingEnd: new Date(votingEnd).toISOString(),
      strategy: body.strategy,
      weighting: body.weighting,
      proposals,
    }
    await fastify.level.db.put(uuid, JSON.stringify(process))

    return { status: 'ok', id: uuid}
  })
};

export default defineRoutes;  