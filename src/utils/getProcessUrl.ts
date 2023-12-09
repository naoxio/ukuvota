import type IProcess from '@interfaces/IProcess';

export default function getProcessUrl(process: IProcess, processId: string): string {
    switch (true) {
        case (process === null):
            return "/";
        case +new Date() >= process.proposalDates[0] && +new Date() < process.proposalDates[1]:
            return `/process/${processId}/proposals`
        case +new Date() >= process.votingDates[0] && +new Date() < process.votingDates[1]:
            return `/process/${processId}/voting`
        case +new Date() >= process.votingDates[1]:
            return `/process/${processId}/results`
        default:
            return `/process/${processId}`
    }
}
