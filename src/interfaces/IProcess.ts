import IProposal from "./IProposal";
import IVoter from "./IVoter";
import { Delta } from 'quill'


export default interface IProcess {
  title: string;
  description: string | Delta;
  proposalDates: number[];
  votingDates: number[];
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters: IVoter[];
}