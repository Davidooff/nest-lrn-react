import axios from "axios";
const BASE_URL = "http://localhost:3000/user/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMyZWE5MmYxYWMwZGExYjM2M2ZhNzkiLCJyb2xlIjoxLCJpYXQiOjE2OTEyNzA5NDAsImV4cCI6MTY5MTI3ODE0MH0.3gUE798pnRuncFP4YLzRt4KN-QQNVrejsxOfwLtqw2o",
  },
});
