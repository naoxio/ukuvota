/* @ts-ignore */
import type Delta from 'quill-delta';
import { isProposalEmpty } from './proposalUtils';
import IProposal from '@interfaces/IProposal';
const createProposalElement = (
  uniqueId: string,
  title: string,
  description: string | Delta,
  translator: any,
  isSetup?: boolean,
  index?: number
): string => {
  let descriptionContent: string;
  if (typeof description === 'string') {
    descriptionContent = description;
  } else {
    descriptionContent = description.ops.reduce((acc: any, op: any) => acc + op.insert, '');
  }
  const isEmpty = isProposalEmpty({title, description: descriptionContent} as IProposal);
  const descriptionArea = `
    <div id="description-${uniqueId}" class="ql-container ql-snow">
      <div class="ql-editor" data-gramm="false">${descriptionContent}</div>
    </div>
    <input type="hidden" id="quillops-${uniqueId}">
  `;
  const editMode = `
    <div class="edit-mode" style="${isSetup ? 'display:block;' : 'display:none;'}">
      <input id="title-${uniqueId}" type="text" class="form-input" placeholder="${translator.t('process.title')}" value="${title}" />
      ${descriptionArea}
    </div>
  `;
  const viewMode = `
    <div class="view-mode" style="${isSetup ? 'display:none;' : 'display:block;'}">
      <h2 class="proposal-title">${title}</h2>
      <div class="proposal-description">${descriptionContent}</div>
      <p class="empty-proposal" style="${isEmpty ? 'display:block;' : 'display:none;'}">${translator.t('emptyProposal')}</p>
    </div>
  `;
  const buttons = isSetup ? '' : `
    <div class="proposal-buttons">
      <button class="edit-button button">${translator.t('buttons.edit')}</button>
    </div>
  `;
  const proposalElement = `
    <div class="proposal" id="${uniqueId}" draggable="true" data-index="${index !== undefined ? index : ''}">
      <div class="proposal-content">
        ${editMode}
        ${viewMode}
        ${buttons}
      </div>
      <div class="proposal-header">
        <button class="delete-button" aria-label="Delete proposal">×</button>
      </div>
    </div>
  `;
  return proposalElement;
};

export { createProposalElement };