import { persistentMap } from '@nanostores/persistent'
import { onMount } from 'nanostores'

export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: 'true' | 'false'
    proposalSelector: 'slider' | 'calendar'
    votingSelector: 'slider' | 'calendar'
    proposalDateRange: number[]
    proposalDateMin: string
    proposalDuration: number
    proposalVotingGap: number
    votingDateRange: number[]
    votingDateMin: string
    votingDuration: number

}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}

const defaultDuration = getMilliseconds(3, 5, 15)
const proposalDateRange = [+new Date(), +new Date() + defaultDuration]
const proposalDateMin = new Date().toLocaleString()
const votingDateRange = [proposalDateRange[1], proposalDateRange[1] + defaultDuration]
const votingDateMin = new Date(proposalDateRange[1]).toLocaleString()
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    proposalSelector: 'slider',
    votingSelector: 'slider',
    proposalDuration: defaultDuration,
    votingDuration: defaultDuration,
    proposalVotingGap: 0,
    proposalDateRange, proposalDateMin,
    votingDateRange, votingDateMin,
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})

const updateDateRange = (value: Process, keyValue: string, duration: number) => {
    const range = value[keyValue + 'DateRange']
    process.setKey(keyValue + "DateRange" as keyof Process, [range[0], range[0] + duration])
} 

const updateDateMin = (keyValue: string) => {
    if (+new Date(process.get()[keyValue + 'DateMin']) < +new Date())
        process.setKey(keyValue + 'DateMin' as keyof Process, new Date().toLocaleString())
    const range = process.get()[keyValue + 'DateRange']
    if (range && range[0] < +new Date())
        process.setKey(keyValue + 'DateRange' as keyof Process, [+new Date(), +new Date() + process.get()[keyValue + 'Duration']])
}
onMount(process, () => {
    updateDateMin('proposal')
    updateDateMin('voting')
    const updating = setInterval(() => {
        if (process.get().votingSelector === 'slider')
            updateDateMin('voting')  
        if (process.get().proposalSelector === 'slider')
            updateDateMin('proposal')

    }, 1000)
    return () => {
      clearInterval(updating)
    }
})

process.subscribe((value, changed) => {
    let [start, end] = [0, 0]
    switch (changed) {
        case 'phases':
            switch(value[changed]) {
                case 'full':
                    start = value.proposalDateRange[1]
                    end = start + value.votingDuration
                    const gap = value.proposalVotingGap
                    process.setKey("votingDateMin", new Date(start).toLocaleString())
                    process.setKey("votingDateRange", [start + gap, end + gap])
                    break
                case 'voting':
                    start = +new Date(value.proposalDateMin)
                    end = start + value.votingDuration
                    process.setKey("votingDateMin", new Date().toLocaleString())
                    process.setKey("votingDateRange", [start, end])
                    break
            }
            break
        case 'proposalDateRange':
            [start, end] = value[changed]
            process.setKey('votingDateMin', new Date(end).toLocaleString())
            const gap = value.proposalVotingGap
            process.setKey('votingDateRange', [end + gap, end + gap + value.votingDuration])
            break
        case 'proposalDuration':
            updateDateRange(value, 'proposal', value[changed])
            start = value.proposalDateRange[1]
            end = start + value.votingDuration
            process.setKey("votingDateRange", [start, end])
            break
        case 'votingDuration':
            updateDateRange(value, 'voting', value[changed])
            break
    }
})
