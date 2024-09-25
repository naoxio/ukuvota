import type IProposal from '@interfaces/IProposal';

const isProposalEmpty = (proposal: IProposal): boolean => {
  const isEmptyStringDescription = typeof proposal.description === 'string' && proposal.description === '';
  let isEmptyOpsDescription = false;
  if (typeof proposal.description === 'object' && proposal.description.ops) {
    isEmptyOpsDescription = proposal.description.ops.length === 1 && proposal.description.ops[0].insert === '';
  }
  return proposal.title === '' && (isEmptyStringDescription || isEmptyOpsDescription);
};

const truncateDescription = (description: any, maxLength: number) => {
  if (typeof description === 'object' && description.ops) {
    let truncatedText = '';
    let currentLength = 0;
    for (const op of description.ops) {
      if (op.insert) {
        const insertText = typeof op.insert === 'string' ? op.insert : op.insert.toString();
        if (currentLength + insertText.length <= maxLength) {
          truncatedText += insertText;
          currentLength += insertText.length;
        } else {
          const remainingLength = maxLength - currentLength;
          truncatedText += insertText.substring(0, remainingLength) + '...';
          break;
        }
      }
    }
    return truncatedText;
  } else if (typeof description === 'string') {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
  return '';
};

const truncateTitle = (title: string, maxLength: number) => {
  if (!title) return
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
};


export { isProposalEmpty, truncateDescription, truncateTitle };