import localforage from 'localforage';
import { createQuill, updateQuill } from '@utils/quillUtils';
import IProposal from '@interfaces/IProposal';
import Quill from 'quill';


const toggleDisplay = (element: HTMLElement, isEditing: boolean) => {
  const viewElement = element.querySelector('.view-mode') as HTMLElement;
  const editElement = element.querySelector('.edit-mode') as HTMLElement;
  const editButton = element.querySelector('.edit-button') as HTMLButtonElement;
  const saveButton = element.querySelector('.save-button') as HTMLButtonElement;
  const deleteButton = element.querySelector('.delete-button') as HTMLButtonElement;

  if (isEditing) {
    viewElement.style.display = 'none';
    editElement.style.display = 'block';
    editButton.style.display = 'none';
    saveButton.style.display = 'block';
    deleteButton.style.display = 'block';
    element.setAttribute('data-editing', 'true');
  } else {
    viewElement.style.display = 'block';
    editElement.style.display = 'none';
    editButton.style.display = 'block';
    saveButton.style.display = 'none';
    deleteButton.style.display = 'none';

    element.setAttribute('data-editing', 'false');
  }
};
const initializeQuill = (
  proposalElement: Element,
  uniqueId: string,
  processId: string,
  isSetup: boolean
): void => {
  const descriptionDiv = proposalElement.querySelector(`#description-${uniqueId}`) as HTMLElement;
  const quillOpsInput = proposalElement.querySelector(`#quillops-${uniqueId}`) as HTMLInputElement;

  if (descriptionDiv && quillOpsInput) {
    const quillEditor = createQuill(`#description-${uniqueId}`);

    // Initialize or restore saved content
    if (isSetup) {
      localforage.getItem(descriptionDiv.id).then((savedOps) => {
        if (savedOps) {
          const ops = JSON.parse(savedOps as string);
          quillEditor.setContents(ops);
        }
      });
    }

  // Handle real-time updates
  quillEditor.on('text-change', (delta, oldDelta, source) => {
    const ops = quillEditor.getContents();
    quillOpsInput.value = JSON.stringify(ops);
    if (isSetup) {
      localforage.setItem(descriptionDiv.id, JSON.stringify(ops));
    }
    
    if (source === 'user') {
      fetch(`/api/process/${processId}/proposals`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: uniqueId, 
          description: ops
        })
      }).catch(console.error);
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
    if (!(editButton && saveButton)) return;

    editButton.addEventListener('click', () => {
      console.log('edit')
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


function updateProposalElement(proposalElement: Element, proposal: IProposal) {
  const titleViewElement = proposalElement.querySelector('.view-mode .title') as HTMLElement;
  const titleEditElement = proposalElement.querySelector('.edit-mode input[type="text"]') as HTMLInputElement;
  if (titleViewElement) titleViewElement.textContent = proposal.title;
  if (titleEditElement) titleEditElement.value = proposal.title;

  const descViewElement = proposalElement.querySelector('.view-mode .desc') as HTMLElement;
  if (descViewElement) {
      if (typeof proposal.description !== 'string' && proposal.description?.ops) {
          const textContent = proposal.description.ops.reduce((acc, op) => acc + (typeof op.insert === 'string' ? op.insert : ''), '');
          descViewElement.innerHTML = textContent;
      } else {
          descViewElement.innerHTML = proposal.description as string;
      }
  }

  const quillContainer = proposalElement.querySelector(`#description-${proposalElement.id} .ql-editor`);
  if (quillContainer) {
      const quillEditor = createQuill(`#description-${proposalElement.id}`);

      if (quillEditor) {
          if (typeof proposal.description !== 'string' && proposal.description?.ops) {
            console.log(proposal.description)
              quillEditor.setContents(proposal.description);
          } else {
              quillEditor.setText(proposal.description as string);
          }
      }
  }

  const quillOpsInput = proposalElement.querySelector(`#quillops-${proposalElement.id}`) as HTMLInputElement;
  if (quillOpsInput) {
      quillOpsInput.value = JSON.stringify(proposal.description);
  }
}


  export {setupButtonListeners, setupDeleteButtonListener, initializeQuill, setupEditButtonListener, insertNewProposal, updateProposalElement}