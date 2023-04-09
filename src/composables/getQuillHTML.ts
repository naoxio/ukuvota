import { Delta } from 'quill';
import createQuill from './createQuill';
import updateQuill from './updateQuill';

export default function getQuillHTML(content: string | Delta): string {
  let quill = createQuill('#temp');
  quill = updateQuill(quill, content);
  return document.querySelector('#temp').querySelector('.ql-editor').innerHTML;
}
