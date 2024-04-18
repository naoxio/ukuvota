
import type Delta from 'quill-delta';

const createProposalElement = (
  uniqueId: string,
  title: string,
  description: string | Delta,
  isSetup?: boolean
): string => {
  let descriptionContent: string;
  if (typeof description === 'string') {
    descriptionContent = description;
  } else {
    descriptionContent = description.ops.reduce((acc, op) => acc + op.insert, '');
  }

  const descriptionArea = `
    <div id="description-${uniqueId}" class="ql-container ql-snow">
      <div class="ql-editor" data-gramm="false">${descriptionContent}</div>
    </div>
    <input type="hidden" id="quillops-${uniqueId}">
  `;

  const editMode = `
    <div class="flex flex-col w-full edit-mode">
      <b>Title</b>
      <input id="title-${uniqueId}" type="text" class="input input-bordered input-sm my-2 w-full" value="${title}" />
      <label>Description</label>
      ${descriptionArea}
    </div>
  `;

  const viewMode = `
    <div class="flex flex-col w-full view-mode" style="display:none">
      <h1>${title}</h1>
      <p>${descriptionContent}</p>
    </div>
  `;

  const buttons = `
    <div class="flex justify-center w-full pt-2">
      <button class="edit-button btn btn-primary btn-sm" style="display:none;">Edit</button>
      <button class="save-button btn btn-primary btn-sm" style="${isSetup ? 'display:none;' : 'display:block;'}">Save</button>
      <button class="delete-button btn btn-ghost text-error btn-xs" style="display:block;">Delete</button>
    </div>
  `;

  const proposalElement = `
    <div class="proposal card outline outline-1 shadow-xl py-4 px-4 my-2 w-full" id="${uniqueId}">
      <div class="flex items-center flex-col" id="${uniqueId}">
        ${editMode}
        ${viewMode}
      </div>
      ${buttons}
    </div>
  `;

  return proposalElement;
};


export { createProposalElement }