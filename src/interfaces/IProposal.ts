import { Delta } from 'quill'

export default interface IProposal {
    id: string;
    title: string;
    description: string | Delta;
    createdAt?: number;
}
