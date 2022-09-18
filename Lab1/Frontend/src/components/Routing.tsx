import {Route, Routes} from "react-router-dom";
import ButtonsPage from "../pages/buttons/ButtonsPage";
import ChatsPage from "../pages/chat/ChatsPage";
import LogsPage from "../pages/logs/LogsPage";
import LoginPage from "../pages/login/LoginPage";
import UsersPage from "../pages/users/UsersPage";
import RegisterPage from "../pages/register/RegisterPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";

const Routing = () => {
    return (
        <Routes>
            <Route path="/buttons" element={<ButtonsPage/>}/>
            <Route path="/chats" element={<ChatsPage/>}/>
            <Route path="/logs" element={<LogsPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/statistics" element={<StatisticsPage/>}/>
        </Routes>
    )
}

export default Routing;