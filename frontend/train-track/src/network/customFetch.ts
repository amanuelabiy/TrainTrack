import axios from "axios";

const productionUrl = "http://localhost:5000/api";

export const customFetch = axios.create({ baseURL: productionUrl });
