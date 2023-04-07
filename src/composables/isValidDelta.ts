import Delta from 'quill'

export default function(delta: Delta) {
    if (!delta || typeof delta !== 'object' || !Array.isArray(delta.ops)) {
        return false;
    }

    return delta.ops.every(op => {
        if (typeof op === 'object' && (op.hasOwnProperty('insert') || op.hasOwnProperty('delete') || op.hasOwnProperty('retain'))) {
        return true;
        }

        return false;
    });
}
  