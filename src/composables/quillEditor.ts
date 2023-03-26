import Quill from 'quill'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

];

export const options = {
    debug: 'info',
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
};

export function createQuill(id: string) {
    return new Quill(id, options);
}

