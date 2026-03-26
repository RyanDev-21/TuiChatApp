import { Newline, Text } from 'ink';
import meow from 'meow';
import { type Subcommand, type Flags } from './types.js';
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

const commandMap: Record<Subcommand, Partial<Record<keyof Flags, React.ReactElement>>> = {
    auth: {
        login: <LoginPrompt />,
        register: <RegisterPrompt />,
    },
    chat: {
        private: <ChatMain />,
        groups: <ChatMain />
    }

};
function App() {

    const subcommand = cli.input[0] as Subcommand | undefined;
    const activeFlag = (Object.keys(cli.flags) as Array<keyof Flags>)
        .find((key) => cli.flags[key]);

    if (!subcommand || !activeFlag) {
        return <Text>Usage: chirpy [auth] [--login|--register]
            <Newline></Newline>
            Usage: chirpy [chat] [--private|--public]
        </Text>;
    }

    const Component = commandMap[subcommand]?.[activeFlag];

    if (!Component) {
        return <Text color="red">Unknown command: {subcommand} --{activeFlag}</Text>;
    }
    return Component;
}
export default App;
