
const exampleProposals = (translator: any) => {
  
  return [
    {
      title: translator.t('proposal.zero.title'),
      description: translator.t('proposal.zero.description'),
    },
    {
      title: translator.t('proposal.one.title'),
      description: translator.t('proposal.one.description'),
    },
  ];
}

export { exampleProposals }