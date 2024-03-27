import type IProcess from '@interfaces/IProcess';

export default function getProcessUrl(process: IProcess): string {
    console.log('getProcessUrl')
    console.log(process)
    switch (true) {
        case (process === null):
            return "/";
        case +new Date() >= process.proposalDates[0] && +new Date() < process.proposalDates[1]:
            return `/process/${process._id}/proposals`
        case +new Date() >= process.votingDates[0] && +new Date() < process.votingDates[1]:
            return `/process/${process._id}/voting`
        case +new Date() >= process.votingDates[1]:
            return `/process/${process._id}/results`
        default:
            return `/process/${process._id}`
    }
}
