// api.js

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const modifyTask = async (id, newData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const addTask = async (taskFromDealSend) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskFromDealSend),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
