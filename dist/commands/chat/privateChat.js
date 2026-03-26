import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Text, useInput } from 'ink';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/authContext.js";
import { fetchPrivateChatList } from "../../apiServices/chat.js";
import Spinner from 'ink-spinner';
const VISIBLE_ROWS = 5;
export default function PrivateChat() {
    const [fetchState, setFetchState] = useState(true);
    const [chatList, setChatList] = useState([
    // { id: '1', name: 'Alice', active: true, newMsg: 3 },
    // { id: '2', name: 'Bob', active: false, newMsg: 0 },
    // { id: '3', name: 'Charlie', active: true, newMsg: 1 },
    // { id: '4', name: 'Diana', active: true, newMsg: 0 },
    // { id: '5', name: 'Eve', active: false, newMsg: 7 },
    // { id: '6', name: 'Frank', active: true, newMsg: 12 },
    // { id: '7', name: 'Grace', active: false, newMsg: 0 },
    ]);
    const { token, refresh_token } = useContext(AuthContext);
    //   const [index, setIndex] = useState<number>(0);
    const [error, setError] = useState('');
    let [selectIndex, setSelectIndex] = useState(0);
    let [scrollOffset, setScrollOffset] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setFetchState(true);
            let privateChats = await fetchPrivateChatList({ token: token, refresh_token: refresh_token });
            if (privateChats.message === undefined) {
                let list = [];
                privateChats = privateChats;
                for (let i = 0; i < privateChats.length; i++) {
                    list.push({
                        name: privateChats[i]?.name || '',
                        id: privateChats[i]?.id || '',
                        active: true,
                        newMsg: 0,
                    });
                }
                setChatList(list);
                setFetchState(false);
            }
            else {
                setError(privateChats.message);
                setFetchState(false);
            }
        };
        fetchData();
    }, []);
    const parentWidth = 36;
    useInput(input => {
        switch (input) {
            case 'j':
            case 'down':
                if (selectIndex < chatList.length - 1) {
                    const newIndex = selectIndex + 1;
                    setSelectIndex(newIndex);
                    if (newIndex >= scrollOffset + VISIBLE_ROWS) {
                        setScrollOffset(newIndex - VISIBLE_ROWS + 1);
                    }
                }
                break;
            case 'k':
            case 'up':
                if (selectIndex > 0) {
                    const newIndex = selectIndex - 1;
                    setSelectIndex(newIndex);
                    if (newIndex < scrollOffset) {
                        setScrollOffset(newIndex);
                    }
                }
                break;
        }
    });
    const visibleItems = chatList.slice(scrollOffset, scrollOffset + VISIBLE_ROWS);
    const showScrollbar = chatList.length > VISIBLE_ROWS;
    return (_jsx(_Fragment, { children: error === '' ? (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Box, { flexDirection: "row", justifyContent: "space-between", width: parentWidth, children: [_jsxs(Text, { bold: true, color: "magenta", children: [' ', "Chats", ' '] }), _jsxs(Text, { dimColor: true, children: [chatList.length, " friends"] })] }), _jsx(Box, { borderStyle: "round", flexDirection: "column", width: parentWidth, children: visibleItems.length > 0 && !fetchState ? (visibleItems.map((chat, idx) => {
                        const actualIndex = scrollOffset + idx;
                        const isSelected = actualIndex === selectIndex;
                        const maxNameLen = parentWidth - 10;
                        const displayName = chat.name.length > maxNameLen
                            ? chat.name.slice(0, maxNameLen - 2) + '..'
                            : chat.name;
                        const msgDisplay = chat.newMsg > 0 ? String(chat.newMsg).padStart(2) : '  ';
                        return (_jsxs(Box, { flexDirection: "row", alignItems: "center", children: [_jsx(Text, { color: "magenta", children: isSelected ? '›' : ' ' }), _jsx(Text, { bold: isSelected, backgroundColor: isSelected ? 'magenta' : undefined, color: isSelected ? 'black' : 'white', children: displayName.padEnd(maxNameLen) }), _jsx(Text, { color: "gray", children: "\u2502" }), _jsx(Text, { color: chat.active ? 'green' : 'gray', children: chat.active ? '●' : '○' }), _jsx(Text, { color: "gray", children: "\u2502" }), _jsx(Text, { color: "blue", bold: chat.newMsg > 0, children: msgDisplay })] }, chat.id));
                    })) : (_jsx(Box, { justifyContent: "center", alignItems: "center", width: parentWidth, children: _jsx(Text, { color: "gray", dimColor: true, children: "No friends yet" }) })) }), showScrollbar && (_jsxs(Box, { flexDirection: "row", justifyContent: "space-between", width: parentWidth, marginTop: 1, children: [_jsx(Text, { dimColor: true, children: "j/k: navigate" }), _jsxs(Text, { dimColor: true, children: [selectIndex + 1, "/", chatList.length] })] })), !showScrollbar && (_jsxs(Box, { flexDirection: "row", gap: 3, marginTop: 1, children: [_jsx(Text, { dimColor: true, children: "j/k: navigate" }), fetchState && (_jsx(Text, { color: "magenta", children: _jsx(Spinner, { type: "dots12" }) }))] }))] })) : (_jsx(Box, { children: _jsxs(Text, { color: 'red', children: [" ", error] }) })) }));
}
