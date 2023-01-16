import { persistentMap } from '@nanostores/persistent'

export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: 'true' | 'false'
    timeSelector: 'slider' | 'calendar'
    proposalDateRange: number[]
    proposalDateMin: string
    proposalDuration: number
    votingDateRange: number[]
    votingDateMin: string
    votingDuration: number

}

const getMilliseconds = (days: number, hours: number, minutes: number) => {
    return ((days * 24 + hours) * 60 + minutes) * 60 * 1000
}

const defaultDuration = getMilliseconds(3, 5, 15)
const proposalDateRange = [+new Date(), +new Date() + defaultDuration]
const proposalDateMin = new Date().toLocaleDateString()
const votingDateRange = [proposalDateRange[1], proposalDateRange[1] + defaultDuration]
const votingDateMin = new Date(proposalDateRange[1]).toLocaleDateString()
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    timeSelector: 'calendar',
    proposalDuration: defaultDuration,
    votingDuration: defaultDuration,
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

process.subscribe((value, changed) => {
    let [start, end] = [0, 0]
    switch (changed) {
        case 'phases':
            switch(value[changed]) {
                case 'full':
                    start = value.proposalDateRange[1]
                    end = start + value.votingDuration
                    process.setKey("votingDateRange", [start, end])
                    break
                case 'voting':
                    start = +new Date(value.proposalDateMin)
                    end = start + value.votingDuration
                    process.setKey("votingDateMin", start.toLocaleString())

                    process.setKey("votingDateRange", [start, end])
                    break
            }
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

