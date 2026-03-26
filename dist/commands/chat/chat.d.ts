import { ChatList } from "./chatList.js";
type mainProps = {
    selectedChat: ChatList | null;
    setScreen: (screen: 'chat' | 'list') => void;
};
export default function Chat({ selectedChat, setScreen }: mainProps): import("react/jsx-runtime").JSX.Element;
export {};
