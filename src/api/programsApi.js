import axios from 'axios'

const programsApi = axios.create({
    baseURL: process.env.VUE_APP_PROGRAMS_API
})

export default programsApi