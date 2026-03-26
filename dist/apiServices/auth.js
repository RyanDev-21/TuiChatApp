import { apiRoute } from "../types.js";
import { saveIntoFile } from "../utils.js";
async function ApiCreateUser(userData) {
    try {
        let res = await fetch(`${apiRoute}api/users`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (!res.ok) {
            const errObj = new Error(response.error || "User creation failed");
            errObj.status = res.status;
            throw errObj;
        }
        const user = {
            id: response.id,
            name: response.name,
            email: response.email,
            created_at: response.created_at,
            isRed: response.is_chirpy_red
        };
        return user;
    }
    catch (error) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        };
    }
}
async function ApiLogIn(userData) {
    try {
        const result = await fetch(`${apiRoute}api/login`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        });
        const response = await result.json();
        if (!result.ok) {
            const errObj = new Error(response.error || "Login failed");
            errObj.status = result.status;
            throw errObj;
        }
        ;
        return {
            token: response.token,
            refresh_token: response.refresh_token,
        };
    }
    catch (error) {
        return {
            message: error.message || "An unexpected error occured",
            code: error.status || 500,
            originalError: error
        };
    }
}
export async function logInWithCredentials(email, pass) {
    const userLogin = {
        email: email,
        password: pass
    };
    let tokens = await ApiLogIn(userLogin);
    if (tokens.token !== undefined) {
        tokens = tokens;
        let error = saveIntoFile('./UserCredentials.log', tokens);
        if (error == null) {
            console.log("Done..successfully saved credentials\n");
        }
        else {
            console.error(error);
        }
    }
    else {
        tokens = tokens;
        return `errMsg:${tokens.message}\ncode:${tokens.code}\nerror:${tokens.originalError}`;
    }
    return 'success';
}
export async function Register(name, email, pass) {
    const userReq = {
        name: name,
        email: email,
        password: pass,
    };
    let user = await ApiCreateUser(userReq);
    if (user.id !== undefined) {
        user = user;
        let error = saveIntoFile('./UserInfo.log', user);
        if (error == null) {
            console.log("Done succeed for register user\n");
        }
        else {
            console.error(error);
        }
    }
    else {
        user = user;
        return `errMsg:${user.message}\ncode:${user.code}\nerror:${user.originalError}`;
    }
    return "Sucdess";
}
