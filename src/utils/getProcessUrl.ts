
import type { IProcess} from '~/types';

export default function getProcessUrl(process: IProcess): string {
    
    switch (true) {
        case +new Date() >= process.proposalDates[0] && +new Date() < process.proposalDates[1]:
            return `/process/${process._id}/proposals`;
        case +new Date() >= process.votingDates[0] && +new Date() < process.votingDates[1]:
            if (Object.values(process.proposals).length === 0)return `/process/${process._id}/results`;
            return `/process/${process._id}/voting`;
        case +new Date() >= process.votingDates[1]:
            return `/process/${process._id}/results`;
        default:
            return `/process/${process._id}`;
    }
}