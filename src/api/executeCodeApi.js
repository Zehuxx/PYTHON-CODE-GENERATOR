import axios from 'axios'

const executeCodeApi = axios.create({
    baseURL: process.env.VUE_APP_JDOODLE_PROXY
})

export default executeCodeApi