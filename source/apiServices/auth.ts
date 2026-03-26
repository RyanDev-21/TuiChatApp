import { RequestUser, ResponseUser, CusError, authData, AuthToken, apiRoute } from "../types.js";
import { saveIntoFile } from "../utils.js";

async function ApiCreateUser(userData: RequestUser): Promise<ResponseUser | CusError> {
    try {
        let res = await fetch(`${apiRoute}api/users`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
        })
        const response = await res.json() as any;
        if (!res.ok) {
            const errObj = new Error(response.error || "User creation failed");
            (errObj as any).status = res.status;
            throw errObj;
        }
        const user: ResponseUser = {
            id: response.id,
            name: response.name,
            email: response.email,
            created_at: response.created_at,
            isRed: response.is_chirpy_red
        }
        return user

    } catch (error: any) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        } as CusError;
    }
}

async function ApiLogIn(userData: authData): Promise<AuthToken | CusError> {
    try {
        const result = await fetch(`${apiRoute}api/login`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        })
        const response = await result.json() as any;
        if (!result.ok) {
            const errObj = new Error(response.error || "Login failed");
            (errObj as any).status = result.status;
            throw errObj;
        };
        return {
            token: response.token,
            refresh_token: response.refresh_token,
        } as AuthToken;

    } catch (error: any) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        } as CusError
    }
}
export async function logInWithCredentials(email: string, pass: string): Promise<string> {
    const userLogin: authData = {
        email: email,
        password: pass
    };
    let tokens: AuthToken | CusError = await ApiLogIn(userLogin);
    if ((tokens as AuthToken).token !== undefined) {
        tokens = tokens as AuthToken;
        let error = saveIntoFile('./UserCredentials.log', tokens);
        if (error == null) {
            console.log("Done..successfully saved credentials\n")
        } else {
            console.error(error)
        }
    } else {
        tokens = tokens as CusError
        return `errMsg:${tokens.message}\ncode:${tokens.code}\nerror:${tokens.originalError}`;
    }
    return 'success'
}
export async function Register(name: string, email: string, pass: string): Promise<string> {
    const userReq: RequestUser = {
        name: name,
        email: email,
        password: pass,
    }
    let user: ResponseUser | CusError = await ApiCreateUser(userReq)
    if ((user as ResponseUser).id !== undefined) {
        user = user as ResponseUser;
        let error = saveIntoFile('./UserInfo.log', user);
        if (error == null) {
            console.log("Done succeed for register user\n");
        } else {
            console.error(error)
        }
    } else {
        user = user as CusError
        return `errMsg:${user.message}\ncode:${user.code}\nerror:${user.originalError}`;
    }
    return "Sucdess"
}
