// src/types/IProcess.ts
import type { IProposal } from './IProposal';
import type { IVoter } from './IVoter';

export interface IProcess {
  _id: string;
  title: string;
  description?: string;
  descriptionId?: string;
  proposalDates: [number, number]; // [start, end]
  votingDates: [number, number]; // [start, end]
  strategy: string;
  weighting: string;
  proposals: IProposal[];
  voters?: IVoter[];
  timezone?: string;
  mode?: 'full' | 'voting';
}