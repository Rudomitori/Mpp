import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import ButtonsPage from "../pages/buttons/ButtonsPage";
import ChatPage from "../pages/chat/ChatPage";
import LogsPage from "../pages/logs/LogsPage";
import LoginPage from "../pages/login/LoginPage";
import UsersPage from "../pages/users/UsersPage";
import RegisterPage from "../pages/register/RegisterPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import {useAuth} from "../contexts/authContext";
import AccessDeniedPlaceholder from "./AccessDeniedPlaceholder";
import {FC, ReactNode} from "react";
import LoadingPlaceholder from "./LoadingPlaceholder";

enum AccessLevel {
    any,
    authenticated,
    admin
}

interface IRoutInfo {
    path: string,
    element: ReactNode,
    accessLevel: AccessLevel
}

const routs: IRoutInfo[] = [
    {
        path: "/buttons",
        element: <ButtonsPage/>,
        accessLevel: AccessLevel.any,
    },
    {
        path: "/chats/:id",
        element: <ChatPage/>,
        accessLevel: AccessLevel.authenticated,
    },
    {
        path: "/logs",
        accessLevel: AccessLevel.admin,
        element: <LogsPage/>
    },
    {
        path: "/login",
        accessLevel: AccessLevel.any,
        element: <LoginPage/>
    },
    {
        path: "/users",
        accessLevel: AccessLevel.authenticated,
        element: <UsersPage/>
    },
    {
        path: "/register",
        accessLevel: AccessLevel.any,
        element: <RegisterPage/>
    },
    {
        path: "/statistics",
        accessLevel: AccessLevel.admin,
        element: <StatisticsPage/>
    },
]

const Routing = () => {
    return (
        <Routes>
            {routs.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<RouteWithAuth {...route} />}/>
            ))}
        </Routes>
    )
}

const RouteWithAuth: FC<IRoutInfo> = (props) => {
    const auth = useAuth();
    const location = useLocation();

    if(auth.loading)
        return <LoadingPlaceholder/>
    
    if (!auth.user && props.accessLevel > AccessLevel.any)
        return <Navigate to={"/login"} replace state={{backUrl: location.pathname}}/>;

    if (!auth.user?.isAdmin && props.accessLevel == AccessLevel.admin)
        return <AccessDeniedPlaceholder/>

    return <>{props.element}</>;
}

export default Routing;