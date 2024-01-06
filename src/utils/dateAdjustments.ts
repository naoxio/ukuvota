// dateAdjustments.ts

type DateAdjustmentResult = {
  pStart: Date;
  pEnd: Date;
  vStart: Date;
  vEnd: Date;
};

export const adjustDates = (
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
