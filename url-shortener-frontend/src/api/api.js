import axios from "axios"

//custom axios instance
export default axios.create(
    {
        baseURL:import.meta.env.VITE_BACKEND_URL,
    }
)