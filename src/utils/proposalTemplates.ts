import { t } from 'astro-i18n';

export default [
  {
    title: t('proposal.zero.title'),
    description: {
      ops: [
        { insert: t('proposal.zero.description') },
      ]
    }
  },
  {
    title: t('proposal.one.title'),
    description: {
      ops: [
        { insert: t('proposal.one.description') },
      ]
    }
  },
];
