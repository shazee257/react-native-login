import axios from "axios";

export const BaseURL = "http://54.145.81.48:5000";


axios.defaults.baseURL = BaseURL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export function fetchAPI({ method, endPoint, params, data = {}, token = "" }) {
    const headers = {
        'Content-Type': 'application/json'
    };
    headers.token = token;

    const config = {
        method,
        url: endPoint,
        headers,
        params,
        data
    };

    return axios(config);
}