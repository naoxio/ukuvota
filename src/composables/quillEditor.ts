import Quill from 'quill'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'direction': 'rtl' }],                         // text direction

];

export const options = {
    debug: false,
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: '',
    theme: 'snow',
};

export function createQuill(id: string) {
    return new Quill(id, options);
}

