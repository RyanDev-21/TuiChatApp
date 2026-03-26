import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
export default function Chat({ selectedChat, setScreen }) {
    const totalHeight = process.stdout.rows - 4;
    const headerHeight = Math.floor(totalHeight * 0.15);
    const inputHeight = Math.floor(totalHeight * 0.15);
    const msgViewHeight = totalHeight - headerHeight - inputHeight;
    const chatID = selectedChat?.id || '';
    const name = selectedChat?.name || '';
    const active = selectedChat?.active || false;
    const singleMsgBoxHeight = 6;
    let msgKey = 1;
    const msgHeaderHeight = Math.floor(singleMsgBoxHeight * 0.20);
    const singleMsgHeight = 3;
    const visibleCount = Math.floor(msgViewHeight / singleMsgHeight);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([{
            content: "Hey, did you get the Ink project running?",
            messageID: "msg_001",
            timeStamp: new Date("2026-03-24T10:00:00Z"),
            senderID: "1"
        },
        {
            content: "Yeah, just fixed that React import error you mentioned.",
            messageID: "msg_002",
            timeStamp: new Date("2026-03-24T10:01:30Z"),
            senderID: "1"
        },
        {
            content: "Awesome. The TypeScript setup in Ink is actually pretty smooth.",
            messageID: "msg_003",
            timeStamp: new Date("2026-03-24T10:02:15Z"),
            senderID: "1"
        },
        {
            content: "Agreed. Building CLI UIs with Flexbox feels like cheating!",
            messageID: "msg_004",
            timeStamp: new Date("2026-03-24T10:03:00Z"),
            senderID: chatID
        },
        {
            content: "Exactly. How are you handling the terminal resizing?",
            messageID: "msg_005",
            timeStamp: new Date("2026-03-24T10:04:10Z"),
            senderID: "1"
        },
        {
            content: "Ink's useStdout hook is a lifesaver for that.",
            messageID: "msg_006",
            timeStamp: new Date("2026-03-24T10:05:00Z"),
            senderID: chatID
        },
        {
            content: "True. Are you using any specific component for the input field?",
            messageID: "msg_007",
            timeStamp: new Date("2026-03-24T10:05:45Z"),
            senderID: "1"
        },
        {
            content: "I'm using ink-text-input. It handles the cursor state nicely.",
            messageID: "msg_008",
            timeStamp: new Date("2026-03-24T10:06:20Z"),
            senderID: "1"
        },
        {
            content: "Nice. I should check that out for my chat UI.",
            messageID: "msg_009",
            timeStamp: new Date("2026-03-24T10:07:00Z"),
            senderID: "1"
        },
        {
            content: "Definitely. It makes the 'Enter to send' logic much cleaner.",
            messageID: "msg_010",
            timeStamp: new Date("2026-03-24T10:07:45Z"),
            senderID: chatID
        },
        {
            content: "Quick question: how do you manage global state in the CLI?",
            messageID: "msg_011",
            timeStamp: new Date("2026-03-24T10:08:30Z"),
            senderID: "1"
        },
        {
            content: "Just standard React Context. Works perfectly even in the terminal!",
            messageID: "msg_012",
            timeStamp: new Date("2026-03-24T10:09:15Z"),
            senderID: chatID
        }]);
    const [stateActive, setStateActive] = useState('chat');
    const [focusState, setFocusState] = useState(false);
    let [scrollIdx, setScrollIdx] = useState(messages.length - 1);
    const visibleMsgs = useMemo(() => {
        const start = scrollIdx - visibleCount;
        const end = scrollIdx;
        return messages.slice(start > 0 ? start : 0, end);
    }, [scrollIdx, messages]);
    let [cursorIdx, setCursorIdx] = useState(visibleMsgs.length - 1);
    useInput((input, key) => {
        switch (stateActive) {
            case "chat":
                if (key.escape) {
                    setScreen('list');
                }
                switch (input) {
                    case 'k':
                        if (cursorIdx > 0) {
                            setCursorIdx(prev => prev - 1);
                        }
                        else {
                            if (scrollIdx > visibleCount) {
                                setScrollIdx(prev => prev - 1);
                            }
                        }
                        break;
                    case 'j':
                        if (cursorIdx < visibleMsgs.length - 1) {
                            setCursorIdx(prev => prev + 1);
                        }
                        else {
                            if (scrollIdx < messages.length) {
                                setScrollIdx(prev => prev + 1);
                            }
                        }
                        break;
                    case 'm':
                        setStateActive('msg');
                        setFocusState(true);
                        break;
                }
                break;
            case "msg":
                if (key.escape) {
                    setFocusState(false);
                    setStateActive('chat');
                }
        }
    });
    const handleSubmit = (value) => {
        const msg = {
            content: value,
            messageID: msgKey + "",
            timeStamp: new Date(),
            senderID: 1 + "",
        };
        setMessages(prev => {
            const newMsgs = [...prev, msg];
            setScrollIdx(newMsgs.length);
            setCursorIdx(visibleMsgs.length - 1);
            return newMsgs;
        });
        setInputMessage('');
        msgKey++;
    };
    return (_jsxs(Box, { minHeight: totalHeight, minWidth: process.stdout.columns, flexDirection: "column", children: [_jsxs(Box, { flexDirection: "row", borderStyle: 'single', alignSelf: "flex-start", height: headerHeight, minWidth: "100%", justifyContent: "space-between", children: [_jsx(Box, { width: "25%", alignItems: "center", justifyContent: "center", height: "100%", children: _jsx(Text, { children: chatID }) }), _jsx(Box, { width: "50%", justifyContent: "center", alignItems: "center", height: "100%", children: _jsx(Text, { children: name }) }), _jsx(Box, { width: "25%", alignItems: "center", justifyContent: "center", height: "100%", children: _jsx(Text, { color: active ? 'green' : 'white', children: active ? 'Active' : '' }) })] }), _jsx(Box, { height: msgViewHeight + 1, overflow: "hidden", flexDirection: "column", paddingY: 0.5, paddingX: 1, children: visibleMsgs.length > 0 ?
                    (visibleMsgs.map((msg, index) => {
                        return (_jsxs(Box, { flexDirection: "column", height: singleMsgBoxHeight, children: [cursorIdx === index ?
                                    _jsx(Box, { alignSelf: msg.senderID === '1' ? 'flex-end' : 'flex-start', paddingX: 1, height: msgHeaderHeight, justifyContent: 'flex-start', width: "40%", children: _jsx(Text, { color: msg.senderID === '1' ? 'blue' : 'green', bold: true, underline: true, children: msg.senderID === '1' ? 'You' : name }) })
                                    :
                                        _jsx(Box, { height: msgHeaderHeight }), _jsxs(Box, { flexDirection: "row", alignSelf: msg.senderID === '1' ? "flex-end" : "flex-start", height: singleMsgHeight, children: [cursorIdx === index && stateActive === 'chat' &&
                                            _jsx(Box, { height: "100%", alignItems: "center", justifyContent: "center", children: _jsx(Text, { bold: true, dimColor: true, children: msg.senderID === '1' && "->" }) }), _jsx(MessageBubble, { msgKey: msg.messageID, message: msg.content, isOwn: msg.senderID === '1' }), cursorIdx === index && stateActive === 'chat' &&
                                            _jsx(Box, { height: "100%", alignItems: "center", justifyContent: "center", children: _jsx(Text, { bold: true, dimColor: true, children: msg.senderID !== '1' && "<-" }) })] })] }));
                    }))
                    :
                        _jsx(Box, { justifyContent: "center", alignItems: "center", children: _jsx(Text, { bold: true, children: "No Message yet!Consider sending to your friends" }) }) }), _jsxs(Box, { alignSelf: "flex-end", alignItems: "center", height: inputHeight, children: [_jsx(Text, { children: "Press enter to send the message" }), _jsx(Box, { width: process.stdout.columns, flexDirection: "row", paddingX: 1, paddingY: 1, children: _jsx(TextInput, { value: inputMessage, focus: focusState, onChange: setInputMessage, placeholder: "Type message here", onSubmit: handleSubmit }) })] })] }));
}
function MessageBubble({ msgKey, message, isOwn }) {
    return (_jsx(Box, { height: "100%", overflow: 'hidden', justifyContent: 'flex-start', width: "40%", paddingX: 1, borderDimColor: true, borderColor: isOwn ? 'blue' : 'green', borderLeft: false, borderRight: false, borderBottom: false, children: _jsx(Text, { children: message }) }, msgKey));
}
