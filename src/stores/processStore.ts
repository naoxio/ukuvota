import { persistentMap } from '@nanostores/persistent'

export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: 'true' | 'false'
    timeSelector: 'slider' | 'calendar'
    proposalTime: number
    votingTime: number
    proposalStart: number
    proposalEnd: number
    proposalDateMin: string
    votingStart: number
    votingEnd: number
    votingDateMin: string
}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}
  

const defaultDuration = 277800000
const proposalStart = +new Date()
const proposalEnd = proposalStart + defaultDuration
const proposalDateMin = new Date().toISOString()
const votingStart = proposalEnd
const votingEnd = votingStart + defaultDuration
const votingDateMin = new Date(proposalEnd).toISOString()
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    timeSelector: 'calendar',
    proposalTime: getMilliseconds(3, 5, 15),
    votingTime: getMilliseconds(3, 5, 15),
    proposalStart, proposalEnd, proposalDateMin,
    votingStart, votingEnd, votingDateMin,
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})
