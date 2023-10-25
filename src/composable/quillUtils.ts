import Quill, { Delta } from 'quill';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'direction': 'rtl' }],

];

const options = {
    debug: false,
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: '',
    theme: 'snow',
};

const createQuill = (id: string) => {
    return new Quill(id, options);
}

const isValidDelta = (delta: Delta): boolean => {
    if (!delta || typeof delta !== 'object' || !Array.isArray(delta.ops)) {
        return false;
    }

    return delta.ops.every((op: any) => (
        typeof op === 'object' && (op.hasOwnProperty('insert') || op.hasOwnProperty('delete') || op.hasOwnProperty('retain'))
    ));
}

const updateQuill = (quill: Quill, delta: Delta | string): Quill => {
    const content = isValidDelta(delta) ? delta : (typeof delta === "string") ? { ops: [{ insert: delta }] } : { ops: [] };
    quill.setContents(content);
    return quill;
}

export { createQuill, updateQuill }