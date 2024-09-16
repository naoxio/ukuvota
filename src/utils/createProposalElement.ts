import type Delta from 'quill-delta';
import { isProposalEmpty } from './proposalUtils';
import IProposal from '@types/IProposal';

const createProposalElement = (
  uniqueId: string,
  title: string,
  description: string | Delta,
  translator: any,
  isSetup?: boolean,
): string => {
  let descriptionContent: string;
  if (typeof description === 'string') {
    descriptionContent = description;
  } else {
    descriptionContent = description.ops.reduce((acc, op) => acc + op.insert, '');
  }
  const isEmpty = isProposalEmpty({id: uniqueId, title, description: descriptionContent} as IProposal);

  // Use translator.t to fetch localized strings
  const descriptionArea = `
    <div id="description-${uniqueId}" class="ql-container ql-snow">
      <div class="ql-editor" data-gramm="false">${descriptionContent}</div>
    </div>
    <input type="hidden" id="quillops-${uniqueId}">
  `;

  const editMode = `
    <div class="flex flex-col w-full edit-mode" style="${isSetup ? 'display:block;' : 'display:none;'}">
      <b>${translator.t('process.title')}</b>
      <input id="title-${uniqueId}" type="text" class="input input-bordered input-sm my-2 w-full" value="${title}" />
      <label>${translator.t('process.description')}</label>
      ${descriptionArea}
    </div>
  `;

  const viewMode = `
    <div class="flex flex-col w-full view-mode" style="${isSetup ? 'display:none;' : 'display:block;'}">
      <h2 class="title">${title}</h2>
      <div class="desc">${descriptionContent}</div>
      <p class="text-center text-gray-500 empty-proposal" style="${isEmpty ? 'display:block;' : 'display:none;'}">${translator.t('emptyProposal')}</p>
    </div>
  `;

  const buttons = `
    <div class="flex justify-around w-full pt-2">
      <button class="edit-button btn btn-primary btn-sm" style="${isSetup ? 'display:none;' : 'display:block;'}">${translator.t('buttons.edit')}</button>
      <button class="save-button btn btn-primary btn-sm" style="display:none;">${translator.t('buttons.save')}</button>
    </div>
  `;

  const proposalElement = `
    <div class="proposal card outline outline-1 shadow-xl py-4 px-4 my-8 w-full" id="${uniqueId}">
      <div class="flex justify-end">
        <button class="delete-button btn btn-ghost text-error btn-xs" style="${isSetup ? 'display:block;' : 'display:none;'}" >${translator.t('buttons.delete')}</button>
      </div>
      <div class="flex items-center flex-col" id="${uniqueId}">
        ${editMode}
        ${viewMode}
      </div>
      ${buttons}
    </div>
  `;

  return proposalElement;
};

export { createProposalElement };
