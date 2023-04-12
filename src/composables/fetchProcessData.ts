import processTest from "composables/processTestData";

export default async function fetchProcessData(processId: string, origin: string): Promise<any> {
    const isDev = processId === "dev";
    let data;
    let process;
    const res = isDev ? new Response() : await fetch(`${origin}/api/process/${processId}`, { method: "GET" });
    
    if (!isDev && res.status === 404) {
        process = null
    }
    else {
        data = isDev ? null : await res.json();
        process = isDev ? processTest() : data.process;
    }
    
    return process;
}
