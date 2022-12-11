import axios from "axios";
import { parseCookies } from 'nookies'

const { 'auth.token': token } = parseCookies()

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// Inserir o Token no Header das requisições
if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`


api.interceptors.request.use(config => {
    return config
})