import { API_URL } from "../constants";

async function fetchAllGratitudes() {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchGratitude(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createGratitude(gratitudeData) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: gratitudeData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function updateGratitude(id, gratitudeData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: gratitudeData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deleteGratitude(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  // 204 is No Content status
  if (response.status === 204) {
    return null;
  }

  throw new Error(response.statusText);
}

export { createGratitude, deleteGratitude, fetchAllGratitudes, fetchGratitude, updateGratitude };