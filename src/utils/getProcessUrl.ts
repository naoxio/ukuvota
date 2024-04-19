
import type IProcess from '@interfaces/IProcess';

export default function getProcessUrl(process: IProcess): string {
    if (process === null || process === undefined) {
        return "/";
    }
    switch (true) {
        case +new Date() >= process.proposalDates[0] && +new Date() < process.proposalDates[1]:
            return `/process/${process._id}/proposals`;
        case +new Date() >= process.votingDates[0] && +new Date() < process.votingDates[1]:
            if (!process.proposals || Object.values(process.proposals).length === 0)return `/process/${process._id}/results`;
            return `/process/${process._id}/voting`;
        case +new Date() >= process.votingDates[1]:
            return `/process/${process._id}/results`;
        default:
            return `/process/${process._id}`;
    }
}