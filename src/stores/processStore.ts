import { persistentMap } from '@nanostores/persistent'
import { onMount } from 'nanostores'
import logslider from 'composable/logslider';
import Delta from 'quill'

type Proposal = {
    title: string,
    description: Delta
}

export type Process = {
    title: string
    description: Delta
    weighting: string
    phases: 'full' | 'voting'
    proposalDates: number[]
    proposalDateMin: string
    proposalDuration: number
    proposalVotingGap: number
    proposalLogSlider: number
    proposalOpen: 0 | 1 | 2
    votingDates: number[]
    votingDateMin: string
    votingDuration: number
    votingOpen: 0 | 1 | 2
    votingLogSlider: number
    proposals: Proposal[]
}

const defaultSliderValue = 20
const defaultDuration = logslider(defaultSliderValue)

const proposalDates = [+new Date(), +new Date() + defaultDuration]
const proposalDateMin = new Date().toLocaleString()
const votingDates = [proposalDates[1], proposalDates[1] + defaultDuration]
const votingDateMin = new Date(proposalDates[1]).toLocaleString()
export const process = persistentMap<Process>('process:', {
    title: '',
    /* @ts-ignore */
    description: {},
    weighting: '3',
    phases: 'full',
    proposalDuration: defaultDuration,
    proposalOpen: 0,
    proposalLogSlider: defaultSliderValue,
    votingDuration: defaultDuration,
    votingOpen: 0,
    proposalVotingGap: 0,
    proposalDates, proposalDateMin,
    votingDates, votingDateMin,
    votingLogSlider: defaultSliderValue,
    proposals: []
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
})

const updateDates = (value: Process, keyValue: string, duration: number) => {
    const range = value[keyValue + 'Dates']
    process.setKey(keyValue + "Dates" as keyof Process, [range[0], range[0] + duration])
} 

const updateDateMin = (process: any, keyValue: string) => {
    const min = +new Date(process.get()[keyValue + 'DateMin' as keyof Process])
    if (min < +new Date())
        process.setKey(keyValue + 'DateMin' as keyof Process, new Date().toLocaleString())
    const range = process.get()[keyValue + 'Dates']
    if (range && range[0] < +new Date())
        process.setKey(keyValue + 'Dates' as keyof Process, [+new Date(), +new Date() + process.get()[keyValue + 'Duration']])
}
const sliderMax = 184
onMount(process, () => {
    if (process.get().votingLogSlider > sliderMax) {
        process.setKey("votingLogSlider", sliderMax)
        process.setKey("votingDuration", logslider(sliderMax))
    }
    if (process.get().proposalLogSlider > sliderMax) {
        process.setKey("proposalLogSlider", sliderMax)
        process.setKey("proposalDuration", logslider(sliderMax))
    }

    process.setKey('proposalOpen', 0); process.setKey('votingOpen', 0);
    const updating = setInterval(() => {
        if (!process.get().votingOpen)
            updateDateMin(process, 'voting') 
        if (process.get().phases === 'full' && !process.get().proposalOpen && !process.get().votingOpen)
            updateDateMin(process, 'proposal')
    
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
