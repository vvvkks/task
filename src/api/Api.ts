import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
    baseURL: string;
    headers: {
        'x-api-key': string;
    };
}

const axiosConfig: AxiosConfig = {
    baseURL: 'https://api.thecatapi.com/v1/images/',
    headers: {
        'x-api-key': 'live_NCRYREPpaHJo9qygk792XOxbJGa04d2Mwer23GbolguztwbIlfoLso409iihFxoG',
    },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;