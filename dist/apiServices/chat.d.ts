import { AuthToken, CusError, FriendsLists } from "../types.js";
export declare function fetchPrivateChatList(auth: AuthToken): Promise<FriendsLists[] | CusError>;
