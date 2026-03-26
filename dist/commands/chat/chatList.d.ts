export type ChatList = {
    name: string;
    active: boolean;
    newMsg: number;
    id: string;
};
type props = {
    setScreen: (screen: 'chat' | 'list') => void;
    setSelectedChat: (chatList: ChatList | null) => void;
};
export default function PrivateChat({ setScreen, setSelectedChat }: props): import("react/jsx-runtime").JSX.Element;
export {};
