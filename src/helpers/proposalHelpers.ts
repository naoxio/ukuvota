import type IProposal from "interfaces/IProposal";

const isProposalEmpty = (proposal: IProposal): boolean => {
  const isEmptyStringDescription = typeof proposal.description === 'string' && proposal.description === '';

  let isEmptyOpsDescription = false;
  if (typeof proposal.description === 'object' && proposal.description.ops) {
      isEmptyOpsDescription = proposal.description.ops.length === 1 && proposal.description.ops[0].insert === '';
  }

  return proposal.title === '' && (isEmptyStringDescription || isEmptyOpsDescription);
}

export { isProposalEmpty }