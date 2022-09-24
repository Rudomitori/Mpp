import {FC, useState} from "react";
import {Box, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MessagesApi, {useMessages} from "../../api/MessagesApi";
import {useAuth} from "../../contexts/authContext";
import {useParams} from "react-router-dom";
import {useUsers} from "../../api/UsersApi";


const ChatPage: FC<{}> = (props) => {
    const auth = useAuth();
    const users = useUsers();
    const { id: secondUserId } = useParams();
    const messages = useMessages(secondUserId as string);
    
    const messagesVms = messages.data?.map(x => ({
        id: x.id,
        date: x.date,
        isOfCurrentUser: auth.user!.id === x.fromId,
        text: x.text
    }));
    
    const sendMessage = async (text: string) => {
        await MessagesApi.send({toId: secondUserId as string, text});
        // noinspection ES6MissingAwait
        messages.refetch();
    }
    
    return (
        <Container maxWidth="sm" sx={{py: 4, height: "100%"}}>
            <Paper sx={{height: "100%", p: 2}}>
                <Stack gap={2} direction="column" sx={{height: "100%"}}>
                    <Typography variant="h5">
                        {users.data?.find(x => x.id === secondUserId)?.login}
                    </Typography>
                    <Box sx={{flexGrow: 1, overflow: "auto"}}>
                        <Stack gap={2} sx={{p: 2}}>
                            {messagesVms?.map(x => (
                                <Message 
                                    text={x.text}
                                    isOfCurrentUser={x.isOfCurrentUser}
                                    key={x.id}/>
                            ))}
                        </Stack>
                    </Box>
                    <MessageInput onSendMessage={sendMessage}/>
                </Stack>
            </Paper>
        </Container>
    )
}

const MessageInput: FC<{
    onSendMessage: (text: string) => void
}> = (props) => {
    const [text, setText] = useState("");
    const handleSending = () => {
        if(text) {
            props.onSendMessage(text);
            setText("");
        }
    }
    
    return (
        <Paper>
            <Stack gap={1} alignItems="center" direction="row" sx={{pr: 1}}>
                <TextField 
                    fullWidth
                    value={text}
                    multiline
                    rows={2}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === "Enter" || e.key === "NumpadEnter")
                            handleSending()
                    }}
                />
                <IconButton onClick={handleSending}>
                    <SendIcon color="primary"/>
                </IconButton>
            </Stack>
        </Paper>
    )
}

const Message: FC<{
    text: string,
    isOfCurrentUser: boolean,
}> = (props) => {
    
    return (
        <Paper sx={{p:1, maxWidth: "75%", alignSelf: props.isOfCurrentUser ? "start": "end"}}>
            {props.text}
        </Paper>
    )
}

export default ChatPage;