import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import configuration from "../configuration";
import {axiosOptions} from "./base";
import {IApiMessage} from "./models/ApiMessage";
import {DateTime} from "luxon";

export default abstract class MessagesApi {
    static async get(args: {
        secondUserId: string,
    }) {
        const response = await axios.get(`${configuration.apiUrl}/messages`, {
            ...axiosOptions,
            params: args
        });
        return response.data.map((x: any) => ({
            id: x.id,
            text: x.text,
            fromId: x.fromId,
            toId: x.toId,
            date: DateTime.fromISO(x.date)
        })) as IApiMessage[];
    }

    static async getStatistic() {
        const response = await axios.get(`${configuration.apiUrl}/messages/Statistic`, axiosOptions);
        return response.data as {
            fromId: string,
            toId: string,
            count: number
        }[];
    }
    
    static async send(args: {
        toId: string,
        text: string
    }) {
        const response = await axios.post(`${configuration.apiUrl}/messages`, args, axiosOptions);
        return {
            id: response.data.id,
            fromId: response.data.id,
            toId: response.data.id,
            date: DateTime.fromISO(response.data.date),
            text: response.data.text,
        } as IApiMessage;
    }
}

export const useMessages = (secondUserId: string) => {
    return useQuery(["useMessages", secondUserId], () => MessagesApi.get({secondUserId}), {
        refetchOnWindowFocus: false
    });
}

export const useMessagesStatistic = () => {
    return useQuery(["useMessagesStatistic"], () => MessagesApi.getStatistic(), {
        refetchOnWindowFocus: false
    });
}