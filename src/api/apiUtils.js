export const api = process.env.API_URL || "http://localhost:8000";

export const getHeaders = () => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.token}`,
  };
};

// apply the singleton pattern to localStorage
