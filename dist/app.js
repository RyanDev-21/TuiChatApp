import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Newline, Text } from 'ink';
import meow from 'meow';
import LoginPrompt from './commands/auth/LoginPrompt.js';
import RegisterPrompt from './commands/auth/RegisterPrompt.js';
import ChatMain from './commands/chat/main.js';
const cli = meow(`
     
Usage
    $ chirpy < command > [options]

  Commands
    auth     Authenticate with your account
    chat     Start a chat session

  Auth Options
--login     Sign in with your credentials
--register  Create a new account

  Chat Options
--private   Chat privately with a friend
--public    Chat in a public group

Examples
    $ chirpy auth--login
    $ chirpy auth--register
    $ chirpy chat--private
    $ chirpy chat--public`, {
    importMeta: import.meta,
    flags: {
        login: { type: 'boolean', default: false },
        register: { type: 'boolean', default: false },
        private: { type: 'boolean', deafult: false },
        groups: { type: 'boolean', default: false }
    },
});
const commandMap = {
    auth: {
        login: _jsx(LoginPrompt, {}),
        register: _jsx(RegisterPrompt, {}),
    },
    chat: {
        private: _jsx(ChatMain, {}),
        groups: _jsx(ChatMain, {})
    }
};
function App() {
    const subcommand = cli.input[0];
    const activeFlag = Object.keys(cli.flags)
        .find((key) => cli.flags[key]);
    if (!subcommand || !activeFlag) {
        return _jsxs(Text, { children: ["Usage: chirpy [auth] [--login|--register]", _jsx(Newline, {}), "Usage: chirpy [chat] [--private|--public]"] });
    }
    const Component = commandMap[subcommand]?.[activeFlag];
    if (!Component) {
        return _jsxs(Text, { color: "red", children: ["Unknown command: ", subcommand, " --", activeFlag] });
    }
    return Component;
}
export default App;
