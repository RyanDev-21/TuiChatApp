import { useState } from "react";
import PrivateChat from "./chatList.js";
import { ChatList } from "./chatList.js";
import Chat from "./chat.js";
export default function ChatMain() {
    const [screen, setScreen] = useState<string>('list');
    const [selectedChat, setSelectedChat] = useState<ChatList | null>(null);
    return (
        <>
            {
                screen === 'list' ?
                    <PrivateChat setScreen={setScreen} setSelectedChat={setSelectedChat}></PrivateChat>
                    :
                    <Chat setScreen={setScreen} selectedChat={selectedChat} />
            }
        </>
    )
}
