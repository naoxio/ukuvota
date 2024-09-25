import type IProposal from "./IProposal";
import type IVoter from "./IVoter";
import type Delta from 'quill-delta';

export default interface IProcess {
  _id: string;
  title: string;
  description?: string | Delta;
  descriptionId?: string;
  proposalDates: number[];
  votingDates: number[];
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters?: IVoter[];
  timezone?: string;
}