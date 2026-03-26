#!/usr/bin/env node
import { render, Text, useApp, useInput, Box, Newline } from 'ink';
import App from './app.js';
import { useState, useEffect } from 'react';
import { AuthContext } from './context/authContext.js';
import { AuthToken, NormalError } from './types.js';
import { readFromFile } from './utils.js';
//import { exit } from 'node:process';

const Root = () => {
    const { exit } = useApp();
    const [auth, setAuth] = useState<AuthToken>({ token: '', refresh_token: '' });
    const [error, setError] = useState<NormalError | null>(null);

    useInput((input) => {
        if (input === 'q') {
            exit();
        }
    })
    useEffect(() => {
        const initAuth = async () => {
            const content = await readFromFile('../UserCredentials.log');
            if (!('error' in (content as any))) {
                setAuth(content as AuthToken);
            } else {
                setError(null);
            }
        };
        initAuth();
    }, []);

    return (
        <>
            {!error ? (
                <AuthContext.Provider value={auth}>
                    <App />
                </AuthContext.Provider>
            ) : (
                <Box flexDirection='row' alignItems='center'>
                    <Text color={'red'}>
                        You must first login/register to chat(use chirpy --help to see the
                        option)
                        <Newline></Newline>
                        <Text color={'white'}>
                            Press 'q' to quit the program
                        </Text>
                    </Text>

                </Box >

            )}
        </>
    );
};
process.stdout.write('\x1b[s');
const { waitUntilExit } = render(<Root />);
await waitUntilExit();
console.log("Exited the program!!");

