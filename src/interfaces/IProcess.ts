import IProposal from "./IProposal";
import IVoter from "./IVoter";

export default interface IProcess {
  title: string;
  description: string;
  proposalDates: number[];
  votingDates: number[];
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters: IVoter[];
}