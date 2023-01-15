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
    proposolStart: number
    proposolEnd: number
    proposalDateMin: string
    votingStart: number
    votingEnd: number
    votingDateMin: string
}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}
  
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    timeSelector: 'calendar',
    proposalTime: getMilliseconds(3, 5, 15),
    votingTime: getMilliseconds(3, 5, 15),
    proposolStart: +new Date(),
    proposolEnd: +new Date(),
    proposalDateMin: new Date().toISOString(),
    votingStart: +new Date(),
    votingEnd: +new Date(),
    votingDateMin: new Date().toISOString(),
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})
