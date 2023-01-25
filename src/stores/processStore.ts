import { persistentMap } from '@nanostores/persistent'
import { onMount } from 'nanostores'

export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: boolean
    slideSelector: boolean
    proposalDates: number[]
    proposalDateMin: string
    proposalDuration: number
    proposalVotingGap: number
    votingDates: number[]
    votingDateMin: string
    votingDuration: number

}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}

const defaultDuration = getMilliseconds(3, 5, 15)
const proposalDates = [+new Date(), +new Date() + defaultDuration]
const proposalDateMin = new Date().toLocaleString()
const votingDates = [proposalDates[1], proposalDates[1] + defaultDuration]
const votingDateMin = new Date(proposalDates[1]).toLocaleString()
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: true,
    slideSelector: true,
    proposalDuration: defaultDuration,
    votingDuration: defaultDuration,
    proposalVotingGap: 0,
    proposalDates, proposalDateMin,
    votingDates, votingDateMin,
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})

const updateDates = (value: Process, keyValue: string, duration: number) => {
    const range = value[keyValue + 'Dates']
    process.setKey(keyValue + "Dates" as keyof Process, [range[0], range[0] + duration])
} 

const updateDateMin = (keyValue: string) => {
    if (+new Date(process.get()[keyValue + 'DateMin']) < +new Date())
        process.setKey(keyValue + 'DateMin' as keyof Process, new Date().toLocaleString())
    const range = process.get()[keyValue + 'Dates']
    if (range && range[0] < +new Date())
        process.setKey(keyValue + 'Dates' as keyof Process, [+new Date(), +new Date() + process.get()[keyValue + 'Duration']])
}
onMount(process, () => {
    updateDateMin('proposal')
    updateDateMin('voting')
    const updating = setInterval(() => {
        if (process.get().slideSelector) {
            updateDateMin('voting')  
            updateDateMin('proposal')
        }
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
                    start = value.proposalDates[1]
                    if (start < +new Date()) start = +new Date()
                    end = start + value.votingDuration
                    const gap = value.proposalVotingGap
                    process.setKey("votingDateMin", new Date(start).toLocaleString())
                    process.setKey("votingDates", [start, end + gap])
                    break
                case 'voting':
                    start = +new Date(value.proposalDateMin)
                    if (start < +new Date()) start = +new Date()
                    end = start + value.votingDuration
                    process.setKey("votingDateMin", new Date().toLocaleString())
                    process.setKey("votingDates", [start, end])
                    break
            }
            break
        case 'proposalDates':
            [start, end] = value[changed]
            process.setKey('votingDateMin', new Date(end).toLocaleString())
            const gap = value.proposalVotingGap
            process.setKey('votingDates', [end + gap, end + gap + value.votingDuration])
            break
        case 'proposalDuration':
            updateDates(value, 'proposal', value[changed])
            start = value.proposalDates[1]
            end = start + value.votingDuration
            process.setKey("votingDates", [start, end])
            break
        case 'votingDuration':
            updateDates(value, 'voting', value[changed])
            break
    }
})
