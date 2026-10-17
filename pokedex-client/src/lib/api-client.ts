import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    'X-User-Id': '550e8400-e29b-41d4-a716-446655440000'
  }
});

export default apiClient;
