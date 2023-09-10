import { t as serverTranslate } from 'i18next';

let clientTranslations;

if (typeof window !== 'undefined') {
  const translationsElement = document.getElementById('translations');
  if (translationsElement) {
    clientTranslations = JSON.parse(translationsElement.getAttribute('data-translations'));
  } else {
    console.error("Translations element not found!");
  }
}

function translate(key: string) {
  if (clientTranslations) {
    const keys = key.split('.');
    let value = clientTranslations;
    for (let k of keys) {
        value = value[k];
        if (value === undefined) break;
    }
    console.log(value)
    return value || `Missing translation for ${key}`;
  } else {
      return serverTranslate(key)
  }
}

// Initialize variables
export default [
  {
    title: translate('proposal.zero.title'),
    description: {
      ops: [
        { insert: translate('proposal.zero.description') },
      ]
    }
  },
  {
    title: translate('proposal.one.title'),
    description: {
      ops: [
        { insert: translate('proposal.one.description') },
      ]
    }
  },
];
