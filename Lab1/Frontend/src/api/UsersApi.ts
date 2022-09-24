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
    
    static async get() {
        const response = await axios.get(`${configuration.apiUrl}/users`, axiosOptions);
        return response.data as IApiUser[];
    }

    static async getCurrent() {
        const response = await axios.get(`${configuration.apiUrl}/users/current`, axiosOptions);
        return response.data as IApiUser;
    }

    static async create(args: {
        login: string,
        password: string
    }) {
        const response = await axios.post(`${configuration.apiUrl}/users`, args, axiosOptions);
        return response.data as IApiUser
    }
    
    static async changePassword(args: {
        userId: string,
        password: string
    }) {
        const response = await axios.patch(
            `${configuration.apiUrl}/users/${args.userId}/password`, 
            {password: args.password},
            axiosOptions
        );
    }
    
    static async deleteUser(args: {
        userId: string
    }) {
        await axios.delete(
            `${configuration.apiUrl}/users/${args.userId}`,
            axiosOptions
        );
    }
}

export const useUsers = () => {
    return useQuery(["useUsers"], UsersApi.get, {
        refetchOnWindowFocus: false
    });
}