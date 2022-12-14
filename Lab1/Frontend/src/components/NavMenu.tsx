import List from "@mui/material/List";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import {FC, ReactNode} from "react";
import {NavLink} from "react-router-dom";
import GamepadIcon from "@mui/icons-material/Gamepad";
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {ListItemText} from "@mui/material";
import {useAuth} from "../contexts/authContext";

const NavMenu = () => {
    const auth = useAuth();
    
    return (
        <List component="nav">
            <NavMenuItem 
                link={"buttons"}
                text={"Buttons"} 
                icon={<GamepadIcon/>}/>
            {auth.user?.isAdmin && (
                <NavMenuItem
                    link={"logs"}
                    text={"Logs"}
                    icon={<ListIcon/>}/>
            )}
            {auth.user?.isAdmin && (
                <NavMenuItem
                    link={"statistics"}
                    text={"Statistics"}
                    icon={<BarChartIcon/>}/>
            )}
            {auth.user && (
                <NavMenuItem
                    link={"users"}
                    text={"Users"}
                    icon={<PeopleAltIcon/>}/>
            )}
            <NavMenuItem
                link={"about"}
                text={"About"}
                icon={<InfoIcon/>}/>
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
            <ListItemText primary={props.text}/>
        </ListItemButton>
    )
}

export default NavMenu;