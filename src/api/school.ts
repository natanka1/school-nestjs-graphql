import axios from 'axios'

const schoolApi = axios.create({
    baseURL: 'http://localhost:4002'
})

export {schoolApi};