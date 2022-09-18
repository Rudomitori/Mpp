import List from "@mui/material/List";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import {FC, ReactNode} from "react";
import {NavLink} from "react-router-dom";
import GamepadIcon from "@mui/icons-material/Gamepad";
import ChatIcon from "@mui/icons-material/Chat";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {ListItemText} from "@mui/material";

const NavMenu = () => {
    return (
        <List component="nav">
            <NavMenuItem 
                link={"buttons"}
                text={"Buttons"} 
                icon={<GamepadIcon/>}/>
            <NavMenuItem
                link={"chats"}
                text={"Chats"}
                icon={<ChatIcon/>}/>
            <NavMenuItem
                link={"logs"}
                text={"Logs"}
                icon={<ListIcon/>}/>
            <NavMenuItem
                link={"statistics"}
                text={"Statistics"}
                icon={<BarChartIcon/>}/>
            <NavMenuItem
                link={"users"}
                text={"Users"}
                icon={<PeopleAltIcon/>}/>
        </List>
    )
}

const NavMenuItem: FC<{
    link: string,
    text: string,
    icon: ReactNode
}> = (props) => {
    return (
        <ListItemButton 
            component={NavLink}
            to={props.link}>
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            {/*<ListItemButton */}
            {/*    component={NavLink} */}
            {/*    to={props.link}>*/}
            {/*    {props.text}*/}
            {/*</ListItemButton>*/}
            <ListItemText primary={props.text}/>
        </ListItemButton>
    )
}

export default NavMenu;