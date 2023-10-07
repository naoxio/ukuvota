import axios from 'axios'

export default async(processId: string, origin: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/process/${processId}`);
    return response.data.process;
  } catch (error) {
    console.error("Error fetching process:", error);
    return null;
  }
}