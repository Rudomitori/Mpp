import axios, {AxiosRequestConfig} from "axios";
import {useQuery} from "@tanstack/react-query";
import configuration from "../configuration";
import {IApiUser} from "./models/ApiUser";
import {axiosOptions} from "./base";

export default abstract class UsersApi {
    static async login(args: {
        login: string, password: string
    }) {
        const response = await axios.post(`${configuration.apiUrl}/users/login`, args, axiosOptions);
        return response.data as IApiUser;
    }

    static async logout() {
        await axios.post(`${configuration.apiUrl}/users/logout`, axiosOptions);
    }

    static async getCurrent() {
        const response = await axios.get(`${configuration.apiUrl}/users/current`, axiosOptions);
        return response.data as IApiUser;
    }

    static async create(args: {
        login: string,
        password: string
    }) {
        const response = await axios.post(`${configuration.apiUrl}/users/create`, args, axiosOptions);
        return response.data as IApiUser
    }
}

export function useCurrentUser() {
    return useQuery(["currentUser"], UsersApi.getCurrent);
}