import IProposal from "@interfaces/IProposal";

export type ProcessCookie = {
  clientTimezone: string;
  weighting?: string;
  title?: string;
  nojsdescription?: string;
  quillopsdescription?: string;
  phase?: string;
  step: string;
  create?: string;
  startProposalDate?: number;
  endProposalDate?: number;
  startVotingDate?: number;
  endVotingDate?: number;
  proposals?: Array<IProposal>
};

const isValidJSONString = (str: string): boolean => {
  str = str.trim();
  return (str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'));
}

const parseProcessCookie = (cookieValue: string | undefined): ProcessCookie => {
  const defaultProcessCookie: ProcessCookie = {
    step: '1',
    clientTimezone: ''
  };
  if (cookieValue) {
      if (isValidJSONString(cookieValue)) {
          try {
              return JSON.parse(cookieValue);
          } catch (e) {
              console.error("Error parsing process cookie:", e);
          }
      } else {
          console.error("Invalid cookie format:", cookieValue);
      }
  }

  return defaultProcessCookie;
}

const parseProcessRawCookie = (processCookieHeader: any): ProcessCookie => {
  const rawProcessCookie = processCookieHeader 
    ? decodeURIComponent(processCookieHeader.split('; ').find((row: any) => row.startsWith('process='))?.split('=')[1] || '{}') 
    : '{}';
  return parseProcessCookie(rawProcessCookie);
}
export {parseProcessCookie, parseProcessRawCookie}