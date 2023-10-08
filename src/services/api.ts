import axios from 'axios';

let env;
let vercelURL;

// Check if process is available and use its values
if (typeof process !== 'undefined' && process.env) {
  env = process.env.NODE_ENV;
  vercelURL = process.env.VERCEL_URL;
} else {
  // Default to development environment
  env = 'development';
  vercelURL = 'localhost:3000';
}

const apiClient = axios.create({
  baseURL: `${env === 'production' ? 'https' : 'http'}://${vercelURL}`
});


export const fetchProcess = async (processId) => {
  try {
    const response = await apiClient.get(`/api/process/${processId}`);
    return response.data.process;
  } catch (error) {
    console.error("Error fetching process:", error);
    return null;
  }
};

export const addProposal = async (processId, data) => {
  try {
    const response = await apiClient.post(`/api/process/${processId}/proposals`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding proposal:", error);
    return null;
  }
};

export const updateProposal = async (processId, proposalId, data) => {
  try {
    const response = await apiClient.put(`/api/process/${processId}/proposals/${proposalId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating proposal:", error);
    return null;
  }
};

export const deleteProposal = async (processId, proposalId) => {
  try {
    const response = await apiClient.delete(`/api/process/${processId}/proposals/${proposalId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting proposal:", error);
    return null;
  }
};

export const createNewProcess = async (body) => {
  try {
    const response = await apiClient.post('/api/process', body);
    return response;
  } catch (error) {
    console.error("Error creating process:", error);
    return null;
  }
};

export const submitVote = async (processId, vote) => {
  try {
    const response = await apiClient.post(`/api/process/${processId}/vote`, vote);
    return response.data;
  } catch (error) {
    console.error('Error submitting vote:', error);
    return null;
  }
};

export const getVoters = async (processId) => {
  try {
    const response = await apiClient.get(`/api/process/${processId}/voters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching voters:', error);
    return null;
  }
};