import localforage from 'localforage';
import { createQuill, updateQuill } from '~/utils/quillUtils';

const formElement = document.getElementById('step-1');
if (formElement) {
  const quillContainer = document.getElementById('description') as HTMLElement;
  const descriptionId = quillContainer.dataset.descriptionId || `description_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  quillContainer.style.display = 'block';
  if (quillContainer) quillContainer.innerText = '';
  const quillOpsInput = document.getElementById('quillops') as HTMLInputElement;
  const descriptionIdInput = document.getElementById('descriptionId') as HTMLInputElement;
  const quillEditor = createQuill('#description');
  if (descriptionIdInput) descriptionIdInput.value = descriptionId;

  localforage.getItem(descriptionId).then((descriptionData) => {
    if (descriptionData) {
      const quillOps = JSON.parse(descriptionData as string);
      updateQuill(quillEditor, quillOps);
      quillOpsInput.value = descriptionData as string;
    }
  });

  if (quillEditor) {
    quillEditor.on('text-change', () => {
      const quillOps = quillEditor.getContents();
      localforage.setItem(descriptionId, JSON.stringify(quillOps));
    });
  }
}