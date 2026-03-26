import { Box, Text, useInput } from 'ink';
import { useState } from 'react';
// import { AuthContext } from "../../context/authContext.js";
// import { fetchPrivateChatList } from "../../apiServices/chat.js";
// import { AuthToken, CusError, FriendsLists } from "../../types.js";
import Spinner from 'ink-spinner';
export type ChatList = {
    name: string;
    active: boolean;
    newMsg: number;
    id: string;
};

type props = {
    setScreen: (screen: 'chat' | 'list') => void
    setSelectedChat: (chatList: ChatList | null) => void
}
//const BOUNCE_FRAMES = ['(o  )', '( o )', '(  o)', '( o )'];
const VISIBLE_ROWS = 5;
export default function PrivateChat({ setScreen, setSelectedChat }: props) {
    const [fetchState] = useState<boolean>(false);
    const [chatList] = useState<ChatList[]>([
        { id: '10', name: 'Alice', active: true, newMsg: 3 },
        { id: '2', name: 'Bob', active: false, newMsg: 0 },
        { id: '3', name: 'Charlie', active: true, newMsg: 1 },
        { id: '4', name: 'Diana', active: true, newMsg: 0 },
        { id: '5', name: 'Eve', active: false, newMsg: 7 },
        { id: '6', name: 'Frank', active: true, newMsg: 12 },
        { id: '7', name: 'Grace', active: false, newMsg: 0 },
    ]);

    //   const { token, refresh_token } = useContext(AuthContext);
    //   const [index, setIndex] = useState<number>(0);
    const [error] = useState<string>('');
    let [selectIndex, setSelectIndex] = useState<number>(0);
    let [scrollOffset, setScrollOffset] = useState<number>(0);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setFetchState(true)
    //         let privateChats: FriendsLists[] | CusError = await fetchPrivateChatList({ token: token, refresh_token: refresh_token } as AuthToken)
    //         if ((privateChats as CusError).message === undefined) {
    //             let list: ChatList[] = [];
    //             privateChats = privateChats as FriendsLists[]
    //             for (let i = 0; i < privateChats.length; i++) {
    //                 list.push({
    //                     name: privateChats[i]?.name || '',
    //                     id: privateChats[i]?.id || '',
    //                     active: true,
    //                     newMsg: 0,
    //                 })
    //             }
    //             setChatList(list)
    //             setFetchState(false)
    //         } else {
    //             setError((privateChats as CusError).message)
    //             setFetchState(false)
    //         }
    //     }
    //  fetchData()
    // }, [])
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setIndex(prev => (prev + 1) % BOUNCE_FRAMES.length);
    //     }, 150);
    //     return () => clearInterval(timer);
    // }, []);
    const parentWidth: number = 36;

    useInput((input, key) => {
        if (key.return) {
            const chat = chatList[selectIndex] || null;
            setSelectedChat(chat)
            setScreen('chat')
        }
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

    const visibleItems = chatList.slice(
        scrollOffset,
        scrollOffset + VISIBLE_ROWS,
    );
    const showScrollbar = chatList.length > VISIBLE_ROWS;

    return (
        <>
            {error === '' ? (
                <Box flexDirection="column">
                    <Box
                        flexDirection="row"
                        justifyContent="space-between"
                        width={parentWidth}
                    >
                        <Text bold color="magenta">
                            {' '}
                            Chats{' '}
                        </Text>
                        <Text dimColor>{chatList.length} friends</Text>
                    </Box>
                    <Box borderStyle="round" flexDirection="column" width={parentWidth}>
                        {visibleItems.length > 0 && !fetchState ? (
                            visibleItems.map((chat, idx) => {
                                const actualIndex = scrollOffset + idx;
                                const isSelected = actualIndex === selectIndex;
                                const maxNameLen = parentWidth - 10;
                                const displayName =
                                    chat.name.length > maxNameLen
                                        ? chat.name.slice(0, maxNameLen - 2) + '..'
                                        : chat.name;
                                const msgDisplay =
                                    chat.newMsg > 0 ? String(chat.newMsg).padStart(2) : '  ';
                                return (
                                    <Box key={chat.id} flexDirection="row" alignItems="center">
                                        <Text color="magenta">{isSelected ? '›' : ' '}</Text>
                                        <Text
                                            bold={isSelected}
                                            backgroundColor={isSelected ? 'magenta' : undefined}
                                            color={isSelected ? 'black' : 'white'}
                                        >
                                            {displayName.padEnd(maxNameLen)}
                                        </Text>
                                        <Text color="gray">│</Text>
                                        <Text color={chat.active ? 'green' : 'gray'}>
                                            {chat.active ? '●' : '○'}
                                        </Text>
                                        <Text color="gray">│</Text>
                                        <Text color="blue" bold={chat.newMsg > 0}>
                                            {msgDisplay}
                                        </Text>
                                    </Box>
                                );
                            })
                        ) : (
                            <Box
                                justifyContent="center"
                                alignItems="center"
                                width={parentWidth}
                                height={VISIBLE_ROWS}
                            >
                                <Text color="gray" dimColor>
                                    No friends yet
                                </Text>
                            </Box>
                        )}
                    </Box>
                    {showScrollbar && (
                        <Box
                            flexDirection="row"
                            justifyContent="space-between"
                            width={parentWidth}
                            marginTop={1}
                        >
                            <Text dimColor>j/k: navigate</Text>
                            <Text dimColor>
                                {selectIndex + 1}/{chatList.length}
                            </Text>
                        </Box>
                    )}
                    {!showScrollbar && (
                        <Box flexDirection="row" gap={3} marginTop={1}>
                            <Text dimColor>j/k: navigate</Text>
                            {fetchState && (
                                <Text color="magenta">
                                    <Spinner type="dots12" />
                                </Text>
                            )}
                        </Box>
                    )}
                </Box>
            ) : (
                <Box>
                    <Text color={'red'}> {error}</Text>
                </Box>
            )}
        </>
    );
}
