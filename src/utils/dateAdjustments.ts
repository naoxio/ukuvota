// dateAdjustments.ts

type DateAdjustmentResult = {
  pStart: Date;
  pEnd: Date;
  vStart: Date;
  vEnd: Date;
};

const adjustDates = (
  phase: string,
  proposalStartDate: number,
  proposalEndDate: number,
  votingStartDate: number,
  votingEndDate: number
): DateAdjustmentResult => {
  const now = new Date();

  const parseDate = (dateStr: number, defaultDate: Date): Date => {
    return dateStr ? new Date(dateStr) : defaultDate;
  };

  const shiftDate = (startDate: Date, endDate: Date, shiftAmount: number): [Date, Date] => {
    return [new Date(startDate.getTime() + shiftAmount), new Date(endDate.getTime() + shiftAmount)];
  };

  let pStart = parseDate(proposalStartDate, now);
  let pEnd = parseDate(proposalEndDate, new Date(pStart.getTime() + 60 * 60000));
  let vStart = parseDate(votingStartDate, (phase === 'full' ? pEnd : now));
  let vEnd = parseDate(votingEndDate, new Date(vStart.getTime() + 60 * 60000));

  if (pStart < now && proposalStartDate) {
    const shiftAmount = now.getTime() - pStart.getTime();
    [pStart, pEnd] = shiftDate(pStart, pEnd, shiftAmount);
  }

  if (vStart < now && votingStartDate) {
    const shiftAmount = now.getTime() - vStart.getTime();
    [vStart, vEnd] = shiftDate(vStart, vEnd, shiftAmount);
  }

  return { pStart, pEnd, vStart, vEnd };
};

import { formatDateInTimezone } from '@utils/dateUtils';
import { utcToZonedTime } from 'date-fns-tz';

const adjustVotingPhaseDates = (originalProposalEndDate: Date, proposalEndDate: Date, step2Element: HTMLElement, timezone: string) => {
  const votingTimeSelector = step2Element.querySelector('[data-phase="voting"]');
  if (!votingTimeSelector) return;

  const querySelector = (selector: any) => votingTimeSelector.querySelector(selector);
  const votingStartPicker = querySelector('#start-date-picker-voting input[type="datetime-local"]') as HTMLInputElement;
  const votingEndPicker = querySelector('#end-date-picker-voting input[type="datetime-local"]') as HTMLInputElement;

  if (!votingStartPicker || !votingEndPicker) return; // Ensure elements exist

  const originalVotingStartDate = utcToZonedTime(new Date(votingStartPicker.value), timezone);
  const originalVotingEndDate = utcToZonedTime(new Date(votingEndPicker.value), timezone);
  const originalVotingDuration = originalVotingEndDate.getTime() - originalVotingStartDate.getTime();

  const newVotingStartDate = utcToZonedTime(proposalEndDate, timezone);
  const newVotingEndDate = utcToZonedTime(new Date(newVotingStartDate.getTime() + originalVotingDuration), timezone);

  votingStartPicker.value = formatDateInTimezone(newVotingStartDate.getTime(), timezone);
  votingEndPicker.value = formatDateInTimezone(newVotingEndDate.getTime(), timezone);
};

export { adjustDates, adjustVotingPhaseDates }