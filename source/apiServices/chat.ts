import { AuthToken, apiRoute, CusError, FriendsLists } from "../types.js";


export async function fetchPrivateChatList(auth: AuthToken): Promise<FriendsLists[] | CusError> {
    try {
        const res = await fetch(`${apiRoute}api/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth.token
            },
        })
        const response = await res.json() as any;
        if (!res.ok) {
            if (res.status === 400) {
                (response.error as string).includes("token is required")
                const errObj = new Error("You need to login first")
                throw errObj;
            }
            if (res.status === 403) {
                (response.error as string).includes("unauthorized")
                const errObj = new Error("Token expired")
                throw errObj;
            }
            const errObj = new Error(response.error || "Fetching user failed");
            (errObj as any).status = res.status;
            throw errObj;
        }
        let list: FriendsLists[] = [];
        for (let i = 0; i < response.id_list.length; i++) {
            list.push({
                name: response.id_list[i].name as string,
                id: response.id_list[i].user_id as string
            })
        }
        return list

    } catch (error: any) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        } as CusError;
    }
}
