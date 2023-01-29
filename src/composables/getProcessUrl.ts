import { IProcess } from '../../shared/interfaces/IProcess'

export function getProcessUrl(process: IProcess, processId: string) {

    switch (true) {
        case !process:
            return "/";
        case +new Date() >= process.proposalDates[0] && +new Date() < process.proposalDates[1]:
            return `/process/${processId}/proposals`
        case +new Date() >= process.votingDates[0] && +new Date() < process.votingDates[1]:
            return `/process/${processId}/voting`
        case +new Date() > process.votingDates[1]:
            return `/process/${processId}/results`
        default:
            return `/process/${processId}`

    }
}