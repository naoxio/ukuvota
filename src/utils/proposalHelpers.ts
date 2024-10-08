import localforage from 'localforage';
import { createQuill, updateQuill } from '~/utils/quillUtils';
import IProposal from '~/interfaces/IProposal';
import { isProposalEmpty } from '~/utils/proposalUtils';

const toggleDisplay = (element: HTMLElement, isEditing: boolean) => {
  const viewElement = element.querySelector('.view-mode') as HTMLElement;
  const editElement = element.querySelector('.edit-mode') as HTMLElement;
  const editButton = element.querySelector('.edit-button') as HTMLButtonElement | null;
  const saveButton = element.querySelector('.save-button') as HTMLButtonElement | null;
  const deleteButton = element.querySelector('.delete-button') as HTMLButtonElement | null;
  const emptyProposalElement = viewElement?.querySelector('.empty-proposal') as HTMLElement | null;

  if (isEditing) {
    if (viewElement) viewElement.style.display = 'none';
    if (editElement) editElement.style.display = 'block';
    if (editButton) editButton.style.display = 'none';
    if (saveButton) saveButton.style.display = 'block';
    if (deleteButton) deleteButton.style.display = 'block';
    element.setAttribute('data-editing', 'true');
  } else {
    const title = viewElement?.querySelector('.title')?.textContent || '';
    const descriptionContent = viewElement?.querySelector('.desc')?.innerHTML || '';

    if (viewElement) viewElement.style.display = 'block';
    if (editElement) editElement.style.display = 'none';
    if (editButton) editButton.style.display = 'block';
    if (saveButton) saveButton.style.display = 'none';
    if (deleteButton) deleteButton.style.display = 'none';

    element.setAttribute('data-editing', 'false');

    const isEmpty = isProposalEmpty({
      title: title,
      description: descriptionContent,
    } as IProposal);

    if (emptyProposalElement) {
      emptyProposalElement.style.display = isEmpty ? 'block' : 'none';
    }
  }
};

const initializeQuill = (proposalElement: Element, uniqueId: string, processId: string, isSetup: boolean): void => {
  const descriptionDiv = proposalElement.querySelector(`#description-${uniqueId}`) as HTMLElement;
  const quillOpsInput = proposalElement.querySelector(`#quillops-${uniqueId}`) as HTMLInputElement;
  const titleInput = proposalElement.querySelector(`.edit-mode input[type='text']`) as HTMLInputElement;
  const titleDisplay = proposalElement.querySelector('.view-mode .title') as HTMLElement;

  if (descriptionDiv && quillOpsInput) {
    const quillEditor = createQuill(`#description-${uniqueId}`);

    if (isSetup) {
      localforage.getItem(descriptionDiv.id).then((savedOps) => {
        if (savedOps) {
          const ops = JSON.parse(savedOps as string);
          quillEditor.setContents(ops);
        }
      });
    }
    const eventSource = new EventSource(`/api/process/${processId}/proposals/${uniqueId}`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data) {
        if (data.description) {
          quillEditor.setContents(data.description);
          quillOpsInput.value = JSON.stringify(data.description);
          (proposalElement.querySelector('.view-mode .desc') as HTMLElement).innerHTML = data.description;
          (proposalElement.querySelector('.edit-mode .ql-editor') as HTMLElement).innerHTML = data.description;
        }
        if (data.title) {
          titleDisplay.textContent = data.title;
          titleInput.value = data.title;
        }
      }

    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
    };
    
    

    // Clean up the event source when the component is destroyed or unmounted
    proposalElement.addEventListener('remove', () => eventSource.close());
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
    if (!(editButton && saveButton)) return;

    editButton.addEventListener('click', () => {
      toggleDisplay(proposalElement as HTMLElement, true);
    });

    saveButton.addEventListener('click', async () => {
      const titleInputValue = (proposalElement.querySelector('.edit-mode input') as HTMLInputElement).value;
      const quillEditorContent = (proposalElement.querySelector('.edit-mode .ql-editor') as HTMLElement).innerHTML;

      const title = proposalElement.querySelector('.view-mode .title') as HTMLElement;
      title.textContent = titleInputValue;
      const desc = proposalElement.querySelector('.view-mode .desc') as HTMLElement;
      desc.innerHTML = quillEditorContent;

      toggleDisplay(proposalElement as HTMLElement, false);

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
  const insertNewProposal = (
    proposalHTML: string, 
    proposalsContainer: HTMLElement, 
    processId: string, 
    isSetup: boolean,
    noProposalsText: HTMLElement | null,
    editing?: boolean | null,
  ) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(proposalHTML, 'text/html');
    const newProposalElement = doc.body.firstChild as HTMLElement;
  
    if (newProposalElement) {

      if (editing) {
        toggleDisplay(newProposalElement as HTMLElement, true);

      }
      proposalsContainer.appendChild(newProposalElement);
  
      setupButtonListeners(newProposalElement, proposalsContainer, processId, noProposalsText);
      initializeQuill(newProposalElement, newProposalElement.id, processId, isSetup);
      if (noProposalsText && proposalsContainer.children.length > 0) {
        noProposalsText.style.display = 'none';
      }
    } else {
      console.error('Error: The proposal HTML did not parse correctly.');
    }
  };


  export {setupButtonListeners, setupDeleteButtonListener, initializeQuill, setupEditButtonListener, insertNewProposal, }