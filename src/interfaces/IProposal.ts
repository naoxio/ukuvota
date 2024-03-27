import type Delta from 'quill-delta';


export default interface IProposal {
    id: string;
    title: string;
    description: string | Delta;
    createdAt?: number;
    editing?: boolean;
}
