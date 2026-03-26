#!/usr/bin/env node
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { render, Text, useApp, useInput, Box, Newline } from 'ink';
import App from './app.js';
import { useState, useEffect } from 'react';
import { AuthContext } from './context/authContext.js';
import { readFromFile } from './utils.js';
//import { exit } from 'node:process';
const Root = () => {
    const { exit } = useApp();
    const [auth, setAuth] = useState({ token: '', refresh_token: '' });
    const [error, setError] = useState(null);
    useInput((input) => {
        if (input === 'q') {
            exit();
        }
    });
    useEffect(() => {
        const initAuth = async () => {
            const content = await readFromFile('../UserCredentials.log');
            if (!('error' in content)) {
                setAuth(content);
            }
            else {
                setError(null);
            }
        };
        initAuth();
    }, []);
    return (_jsx(_Fragment, { children: !error ? (_jsx(AuthContext.Provider, { value: auth, children: _jsx(App, {}) })) : (_jsx(Box, { flexDirection: 'row', alignItems: 'center', children: _jsxs(Text, { color: 'red', children: ["You must first login/register to chat(use chirpy --help to see the option)", _jsx(Newline, {}), _jsx(Text, { color: 'white', children: "Press 'q' to quit the program" })] }) })) }));
};
process.stdout.write('\x1b[s');
const { waitUntilExit } = render(_jsx(Root, {}));
await waitUntilExit();
console.log("Exited the program!!");
