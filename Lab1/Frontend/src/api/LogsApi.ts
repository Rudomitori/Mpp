import axios from "axios";
import configuration from "../configuration";
import {useQuery} from "@tanstack/react-query";
import {axiosOptions} from "./base";
import {IApiLogItem} from "./models/ApiLogItem";
import {DateTime} from "luxon";

export default abstract class LogsApi {
    static async sendLog(action: string) {
        const response = await axios.post(`${configuration.apiUrl}/logs`, {action});
    }
    
    static async get(withUser?: boolean) {
        const response = await axios.get(`${configuration.apiUrl}/logs`, {
            ...axiosOptions,
            params: {withUser}
        });
        
        return response.data.map((x:any) => ({
            id: x.id,
            action: x.action,
            date: DateTime.fromISO(x.date),
            user: x.user
        })) as IApiLogItem[]
    }
}

export const useLogs = (withUser?: boolean) => {
    return useQuery(["logs", withUser], () => LogsApi.get(withUser), {
        refetchOnWindowFocus: false
    });
}