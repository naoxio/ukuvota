import Delta from 'quill';
import {createQuill, updateQuill} from 'composable/quillUtils';
import DOMPurify from 'dompurify';

export default function getQuillHTML(content: string | Delta): string {
  let quill = createQuill('#temp');
  quill = updateQuill(quill, content);
  const contentHTML = document.querySelector('#temp .ql-editor').innerHTML;
  const decodedHTML = decodeURIComponent(contentHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  const sanitizedHTML = DOMPurify.sanitize(decodedHTML);
  const fragment = document.createRange().createContextualFragment(sanitizedHTML);
  const tempElement = document.createElement('div');
  tempElement.appendChild(fragment);
  return tempElement.innerHTML;
}
