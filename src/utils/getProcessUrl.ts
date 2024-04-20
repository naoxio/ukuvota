
import type IProcess from '@interfaces/IProcess';

import { zonedTimeToUtc } from 'date-fns-tz';

export default function getProcessUrl(process: IProcess): string {
    if (!process) {
        return '/';
    }
    
    const timezone = process.timezone || 'UTC';
    const currentDate = new Date();

    const startProposalDateUtc = zonedTimeToUtc(new Date(process.proposalDates[0]), timezone);
    const endProposalDateUtc = zonedTimeToUtc(new Date(process.proposalDates[1]), timezone);
    const startVotingDateUtc = zonedTimeToUtc(new Date(process.votingDates[0]), timezone);
    const endVotingDateUtc = zonedTimeToUtc(new Date(process.votingDates[1]), timezone);
    
    switch (true) {
        case currentDate >= startProposalDateUtc && currentDate < endProposalDateUtc:
            return `/process/${process._id}/proposals`;
        case currentDate >= startVotingDateUtc && currentDate < endVotingDateUtc:
            if (!process.proposals || Object.values(process.proposals).length === 0) {
                return `/process/${process._id}/results`;
            }
            return `/process/${process._id}/voting`;
        case currentDate >= endVotingDateUtc:
            return `/process/${process._id}/results`;
        default:
            return `/process/${process._id}`;
    }
}
