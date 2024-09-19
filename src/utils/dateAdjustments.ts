import { DateTime } from 'luxon';
import { formatDateInTimezone } from '~/utils/dateUtils';

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

const adjustVotingPhaseDates = (originalProposalEndDate: DateTime, proposalEndDate: DateTime, step2Element: HTMLElement, timezone: string) => {
  const votingTimeSelector = step2Element.querySelector('[data-phase="voting"]');
  if (!votingTimeSelector) return;
  const querySelector = (selector: any) => votingTimeSelector.querySelector(selector);
  const votingStartPicker = querySelector('#start-date-picker-voting input[type="datetime-local"]') as HTMLInputElement;
  const votingEndPicker = querySelector('#end-date-picker-voting input[type="datetime-local"]') as HTMLInputElement;
  if (!votingStartPicker || !votingEndPicker) return; // Ensure elements exist

  const originalVotingStartDate = DateTime.fromISO(votingStartPicker.value, { zone: timezone });
  const originalVotingEndDate = DateTime.fromISO(votingEndPicker.value, { zone: timezone });
  const originalVotingDuration = originalVotingEndDate.diff(originalVotingStartDate).as('milliseconds');

  const newVotingStartDate = proposalEndDate.setZone(timezone);
  const newVotingEndDate = newVotingStartDate.plus({ milliseconds: originalVotingDuration });

  votingStartPicker.value = formatDateInTimezone(newVotingStartDate.toMillis(), timezone);
  votingEndPicker.value = formatDateInTimezone(newVotingEndDate.toMillis(), timezone);
};

export { adjustDates, adjustVotingPhaseDates }