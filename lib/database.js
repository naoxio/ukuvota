import { kv } from '@vercel/kv";

export const putProcessIntoDatabase = async (process) => {
    try {
        await kv.set(process._id, process);
    } catch (error) {
        throw error;
    }
};

export const getProcessFromDatabase = async (processId) => {
    try {
        const process = await kv.get(processId);
        if (!process) throw new Error('Process not found');
        return process;
    } catch (error) {
        throw error;
    }
};
