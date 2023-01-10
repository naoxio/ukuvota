import { atom } from 'nanostores';

export enum Phases {
    Full,
    Voting
}
export const topicQuestion = atom('');
export const topicDescription = atom('');
export const quickPhases = atom(Phases.Full)
export const weighting = atom('3')
export const defaultProposals = atom(true)
export const slideSelector = atom(true)