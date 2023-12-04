import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Delta from 'quill';


const getQuillHTML = (content: string | Delta): string =>{
    if (typeof content === 'string') {
        return content;
    }
    if ('ops' in content && Array.isArray(content.ops)) {
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(content.ops, cfg);
      const html = converter.convert();
      return html;
    }
    return ''
}

export default getQuillHTML;