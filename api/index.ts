import crypto from 'crypto'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  })
  


  fastify.get('/quick/process/:id', async(req: any) => {
    const process = await fastify.level.db.get(req.params.id)
    console.log(process)
    return { status: 'ok', process}
  });

  fastify.post('/quick/process', async(req: any) => {
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
      proposals,
    }
    await fastify.level.db.put(uuid, JSON.stringify(process))

    return { status: 'ok', id: uuid}
  })
};

export default defineRoutes;  