import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const askAssistant = async (message, history = []) => {
const response = await API.post("/chat", { message , history});

return response.data;
};

export const sendContactMessage = async (contactData) => {
const response = await API.post("/contact", contactData);

return response.data;
};

export const getPortfolioData = async () => {
const response = await API.get("/portfolio");

if (!response.data.success) {
throw new Error(
response.data.message || "Could not load portfolio data"
);
}

return response.data.portfolioData;
};
