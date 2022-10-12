import axios from 'axios'

const ClientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
}) 

export default ClientAxios