import {DateTime} from "luxon";
import {IApiUser} from "./ApiUser";

export interface IApiLogItem {
    id: string,
    date: DateTime,
    action: string,
    
    user: IApiUser | null;
}