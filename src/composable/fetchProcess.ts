import axios from 'axios';

export default async (processId: string, origin: string) => {
  console.log(origin);

  // Check if origin contains a port
  const useLocalhost = origin.includes(':3000');
  
  // Set the baseURL based on the check
  const baseURL = useLocalhost ? origin : 'http://127.0.0.1:3000';

  try {
    const response = await axios.get(`${baseURL}/api/process/${processId}`);
    return response.data.process;
  } catch (error) {
    console.error("Error fetching process:", error);
    return null;
  }
}
