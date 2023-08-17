import axios from "axios";
import Cookies from "universal-cookie";
const BASE_URL = "http://localhost:3000/user/";

const cookies = new Cookies();

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: cookies.get("accessToken"),
  },
});
