import processTest from "composables/processTestData";

export default async function fetchProcessData(processId: string, url: URL): Promise<any> {
    const isDev = processId === "dev";
    let data;
    let process;
    const res = isDev ? new Response() : await fetch(`${url.origin}/api/process/${processId}`, { method: "GET" });
    
    if (!isDev && res.status === 404) {
        process = null
    }
    else {
        data = isDev ? null : await res.json();
        process = isDev ? processTest() : JSON.parse(data.process);
    }
    
    return process;
}
