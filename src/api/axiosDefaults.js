import axios from "axios";

axios.defaults.baseURL = "https://innoevent-7b1d2e7d15e7.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
