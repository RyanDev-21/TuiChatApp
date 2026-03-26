import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import PrivateChat from "./chatList.js";
import Chat from "./chat.js";
export default function ChatMain() {
    const [screen, setScreen] = useState('list');
    const [selectedChat, setSelectedChat] = useState(null);
    return (_jsx(_Fragment, { children: screen === 'list' ?
            _jsx(PrivateChat, { setScreen: setScreen, setSelectedChat: setSelectedChat })
            :
                _jsx(Chat, { setScreen: setScreen, selectedChat: selectedChat }) }));
}
