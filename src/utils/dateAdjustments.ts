import { DateTime } from 'luxon';
import type { IProcess } from '~/types';

type DateAdjustmentResult = {
  pStart: DateTime;
  pEnd: DateTime;
  vStart: DateTime;
  vEnd: DateTime;
};

const adjustDates = (
  phase: string,
  proposalStartDate: number,
  proposalEndDate: number,
  votingStartDate: number,
  votingEndDate: number
): DateAdjustmentResult => {
  const now = DateTime.now();
  const parseDate = (dateNum: number, defaultDate: DateTime): DateTime => {
    return dateNum ? DateTime.fromMillis(dateNum) : defaultDate;
  };
  const shiftDate = (startDate: DateTime, endDate: DateTime, shiftAmount: number): [DateTime, DateTime] => {
    return [startDate.plus({ milliseconds: shiftAmount }), endDate.plus({ milliseconds: shiftAmount })];
  };

  let pStart = parseDate(proposalStartDate, now);
  let pEnd = parseDate(proposalEndDate, pStart.plus({ hours: 1 }));
  let vStart = parseDate(votingStartDate, (phase === 'full' ? pEnd : now));
  let vEnd = parseDate(votingEndDate, vStart.plus({ hours: 1 }));

  if (pStart < now && proposalStartDate) {
    const shiftAmount = now.diff(pStart).as('milliseconds');
    [pStart, pEnd] = shiftDate(pStart, pEnd, shiftAmount);
  }

  if (vStart < now && votingStartDate) {
    const shiftAmount = now.diff(vStart).as('milliseconds');
    [vStart, vEnd] = shiftDate(vStart, vEnd, shiftAmount);
  }

  return { pStart, pEnd, vStart, vEnd };
};

const adjustVotingPhaseDates = (
  originalProposalEndDate: DateTime,
  proposalEndDate: DateTime,
  processData: IProcess,
  timezone: string
) => {
  if (processData.phase !== 'full') return;

  const originalVotingStartDate = DateTime.fromMillis(processData.votingDates[0], { zone: timezone });
  const originalVotingEndDate = DateTime.fromMillis(processData.votingDates[1], { zone: timezone });
  const originalVotingDuration = originalVotingEndDate.diff(originalVotingStartDate).as('milliseconds');

  const newVotingStartDate = proposalEndDate.setZone(timezone);
  const newVotingEndDate = newVotingStartDate.plus({ milliseconds: originalVotingDuration });

  processData.votingDates = [newVotingStartDate.toMillis(), newVotingEndDate.toMillis()];
};

export { adjustDates, adjustVotingPhaseDates }