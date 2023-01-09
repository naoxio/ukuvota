import { atom } from 'nanostores';

export enum Phases {
    Full,
    Voting
}
export const topicQuestion = atom('');
export const topicDescription = atom('');
export const quickPhases = atom(Phases.Full)
export const weighting = atom('2')