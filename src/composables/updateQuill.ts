import { Quill, Delta } from 'quill';

const isValidDelta = (delta: Delta): boolean => {
    if (!delta || typeof delta !== 'object' || !Array.isArray(delta.ops)) {
        return false;
    }

    return delta.ops.every(op => (
        typeof op === 'object' && (op.hasOwnProperty('insert') || op.hasOwnProperty('delete') || op.hasOwnProperty('retain'))
    ));
}

export default function updateQuill(quill: Quill, delta: Delta | string): Quill {
    const content = isValidDelta(delta) ? delta : (typeof delta === "string") ? { ops: [{ insert: delta }] } : { ops: [] };
    quill.setContents(content);
    return quill;
}
