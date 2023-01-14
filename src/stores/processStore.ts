import { persistentMap } from '@nanostores/persistent'
import { map } from 'nanostores'


export type Process = {
    title: string
    description: string
    weighting: string
    phases: 'full' | 'voting'
    defaultProposals: 'true' | 'false'
    timeSelector: 'slider' | 'calendar'

}
  
export const process = persistentMap<Process>('process:', {
    title: '',
    description: '',
    weighting: '3',
    phases: 'full',
    defaultProposals: 'true',
    timeSelector: 'calendar'
}, { listen: false })
