import type { IProposal } from './IProposal';
import type { IVoter } from './IVoter';

export interface IProcess {
  _id: string;
  title: string;
  description?: string;
  descriptionId?: string;
  proposalDates: number[];
  votingDates: number[];
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters?: IVoter[];
  timezone?: string;
  phase?: string;

}