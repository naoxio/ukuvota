import type IProposal from "./IProposal";
import type IVoter from "./IVoter";
/* @ts-ignore */
import { Delta } from 'quill'


export default interface IProcess {
  _id: string;
  title: string;
  description: string | Delta;
  proposalDates: number[];
  votingDates: number[];
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters?: IVoter[];
  timezoneOffset?: number;
}