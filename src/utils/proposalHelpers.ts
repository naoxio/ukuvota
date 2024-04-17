import localforage from 'localforage';
import { createQuill, updateQuill } from '@utils/quillUtils';

const initializeQuill = (proposalElement: Element, uniqueId: string, isSetup: boolean) => {
  const descriptionDiv = proposalElement.querySelector(`#description-${uniqueId}`) as HTMLElement;
  const quillOpsInput = proposalElement.querySelector(`#quillops-${uniqueId}`) as HTMLInputElement;
  console.log(uniqueId)
  if (descriptionDiv && quillOpsInput) {
    const quillEditor = createQuill(`#description-${uniqueId}`);

    // Load saved Quill operations from localforage if isSetup is true
    if (isSetup) {
      localforage.getItem(descriptionDiv.id).then((savedOps) => {
        if (savedOps) {
          const ops = JSON.parse(savedOps as string);
          quillEditor.setContents(ops);
        }
      });
    }

    if (quillOpsInput.value) {
      try {
        const quillOps = JSON.parse(quillOpsInput.value);
        updateQuill(quillEditor, quillOps);
      } catch (error) {
        console.error('Error parsing quillops:', error);
      }
    }

    quillEditor.on('text-change', () => {
      const ops = quillEditor.getContents();
      quillOpsInput.value = JSON.stringify(ops);
      // Save Quill operations to localforage if isSetup is true
      if (isSetup) {
        localforage.setItem(descriptionDiv.id, JSON.stringify(ops));
      }
    });
  }
};

const setupDeleteButtonListener = (proposalElement: Element, proposalsContainer: Element, processId: string, noProposalsText: HTMLElement | null) => {
    const deleteButton = proposalElement.querySelector('.delete-button') as HTMLButtonElement;
    if (deleteButton) {
      deleteButton.addEventListener('click', async () => {
        proposalsContainer.removeChild(proposalElement);
        if (proposalsContainer.children.length === 0 && noProposalsText) {
          noProposalsText.style.display = 'block';
        }
        if (processId) {
          await fetch(`/api/process/${processId}/proposals`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: proposalElement.id }),
          });
        }
      });
    }
  };

  const setupEditButtonListener = (proposalElement: Element, processId: string) => {
    const editButton = proposalElement.querySelector('.edit-button') as HTMLButtonElement;
    const saveButton = proposalElement.querySelector('.save-button') as HTMLButtonElement;
    const viewElement = proposalElement.querySelector('.view-mode') as HTMLElement;
    const editElement = proposalElement.querySelector('.edit-mode') as HTMLElement;
    if (!(editButton && saveButton && viewElement && editElement)) return;
    // Listener for entering edit mode
    editButton.addEventListener('click', () => {
      viewElement.style.display = 'none';
      editElement.style.display = 'block';
      editButton.style.display = 'none';
      saveButton.style.display = 'block';
      proposalElement.setAttribute('data-editing', 'true');
    });
    // Listener for saving changes (exiting edit mode)
    saveButton.addEventListener('click', async () => {
      // Fetching the updated values
      const titleInputValue = (proposalElement.querySelector('.edit-mode input') as HTMLInputElement).value;
      const quillEditorContent = (proposalElement.querySelector('.edit-mode .ql-editor') as HTMLElement).innerHTML;

      // Updating the view mode elements
      const h1 = proposalElement.querySelector('.view-mode h1') as HTMLElement;
      h1.textContent = titleInputValue;
      const desc = proposalElement.querySelector('.view-mode p') as HTMLElement;
      desc.innerHTML = quillEditorContent;

      // Switching the display modes
      viewElement.style.display = 'block';
      editElement.style.display = 'none';
      editButton.style.display = 'block';
      saveButton.style.display = 'none';
      proposalElement.setAttribute('data-editing', 'false');

      if (processId) {
        await fetch(`/api/process/${processId}/proposals`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: proposalElement.id,
            title: titleInputValue,
            description: quillEditorContent,
          }),
        });
      }
    });
  };

  const setupButtonListeners = (proposalElement: Element, proposalsContainer: HTMLElement, processId: string, noProposalsText: HTMLElement | null) => {
    setupEditButtonListener(proposalElement, processId);
    setupDeleteButtonListener(proposalElement, proposalsContainer, processId, noProposalsText);
  };

  const insertNewProposal = (proposalElement: string, proposalsContainer: HTMLElement, processId: string, isSetup: boolean, noProposalsText: HTMLElement | null) => {
    proposalsContainer.insertAdjacentHTML('beforeend', proposalElement);
    const newProposalElement = proposalsContainer.lastElementChild as HTMLElement;
    setupButtonListeners(newProposalElement, proposalsContainer, processId, noProposalsText);
    initializeQuill(newProposalElement, newProposalElement.id, isSetup);
    if (noProposalsText) {
      noProposalsText.style.display = 'none';
    }
  };



  export {setupButtonListeners, setupDeleteButtonListener, initializeQuill, setupEditButtonListener, insertNewProposal}