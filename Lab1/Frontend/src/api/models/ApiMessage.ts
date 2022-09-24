import {DateTime} from "luxon";

export interface IApiMessage {
    id: string,
    fromId: string,
    toId: string,
    date: DateTime
    text: string
}