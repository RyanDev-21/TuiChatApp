import { createContext } from "react";
import { AuthToken } from "../types.js";
export const AuthContext = createContext({ token: "", refresh_token: "" } as AuthToken);
