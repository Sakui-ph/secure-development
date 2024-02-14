import axios from "axios";

const DEVELOPMENT_BASE_URL = "http://localhost:5555";

export const BASE_URL = DEVELOPMENT_BASE_URL;

export const userEndpoints = (endpoint) => {
    axios.defaults.withCredentials = true
    let url = BASE_URL + "/user/" + endpoint;
    
    return {
        fetch: (username) => axios.get(url, {params: {username}}),
        post: (data) => axios.post(url, data,
            {headers: {"content-type": "application/x-www-form-urlencoded",}}
        ),
        patch: (data) => axios.patch(url, data,
            {headers: {"content-type": "application/x-www-form-urlencoded",}}
        ),
    }    
}

