import { IProposal } from "./IProposal";
import { IVoter } from "./IVoter";

export interface IQuick {
  title: string;
  description: string;
  proposalEnd: string;
  votingEnd: string;
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters: IVoter[];
}