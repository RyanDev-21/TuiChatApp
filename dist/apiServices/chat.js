import { apiRoute } from "../types.js";
export async function fetchPrivateChatList(auth) {
    try {
        const res = await fetch(`${apiRoute}api/friends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth.token
            },
        });
        const response = await res.json();
        if (!res.ok) {
            if (res.status === 400) {
                response.error.includes("token is required");
                const errObj = new Error("You need to login first");
                throw errObj;
            }
            if (res.status === 403) {
                response.error.includes("unauthorized");
                const errObj = new Error("Token expired");
                throw errObj;
            }
            const errObj = new Error(response.error || "Fetching user failed");
            errObj.status = res.status;
            throw errObj;
        }
        let list = [];
        for (let i = 0; i < response.id_list.length; i++) {
            list.push({
                name: response.id_list[i].name,
                id: response.id_list[i].user_id
            });
        }
        return list;
    }
    catch (error) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        };
    }
}
