import Axios from "axios";
import { baseUrl } from "./constant";
const instance=Axios.create({
    baseURL:baseUrl,
    headers:{
    "Content-Type": "application/json"
    }
})
export default instance;