import { atom } from 'nanostores';

const theme = atom('dark');
const firstVisit = atom(true);
const processes = atom<string[]>([]);

const addProcess = (uuid: string) => {
  const currentProcesses = processes.get();
  if (!currentProcesses.includes(uuid)) {
    processes.set([...currentProcesses, uuid]);
  }
};

const addProcesses = (uuids: string[]) => {
  const currentProcesses = processes.get();
  const newProcesses = uuids.filter(uuid => !currentProcesses.includes(uuid));
  processes.set([...currentProcesses, ...newProcesses]);
};

export { addProcess, addProcesses, processes, firstVisit, theme };
