export default interface IVoter {
    id: string;
    name: string;
    votes: { proposalId: string, vote: number }[];
  }
  