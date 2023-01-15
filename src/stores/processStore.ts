import { persistentMap } from '@nanostores/persistent'
import { onMount } from 'nanostores'

export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: 'true' | 'false'
    timeSelector: 'slider' | 'calendar'
    proposalTime: number
    votingTime: number
    phase1Start: number
    phase1End: number
    phase1DateMin: string
    phase2Start: number
    phase2End: number
    phase2DateMin: string
}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}
  

const defaultDuration = 277800000
const phase1Start = +new Date()
const phase1End = phase1Start + defaultDuration
const phase1DateMin = new Date().toISOString()
const phase2Start = phase1Start
const phase2End = phase2Start + defaultDuration
const phase2DateMin = new Date(phase1End).toISOString()
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    timeSelector: 'calendar',
    proposalTime: getMilliseconds(3, 5, 15),
    votingTime: getMilliseconds(3, 5, 15),
    phase1Start, phase1End, phase1DateMin,
    phase2Start, phase2End, phase2DateMin,
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})


