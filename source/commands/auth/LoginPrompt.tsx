import { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { saveIntoFile, validateEmail, validatePassword } from '../../utils.js';
import { logInWithCredentials } from '../../apiServices/auth.js';

type Step = 'email' | 'password' | 'done';

type FormValues = {
    email: string;
    password: string;
};

export default function LoginPrompt() {
    const [step, setStep] = useState<Step>('email');
    const [values, setValues] = useState<FormValues>({
        email: '',
        password: '',
    });
    const [start, setStartValue] = useState<number>(0);
    const [emailError, setEmailErrValues] = useState<string>('');
    const [passError, setPassErrValues] = useState<string>('');

    const handleSubmit = (field: keyof FormValues, next: Step) => async (val: string) => {
        let res: string | boolean;
        switch (field) {
            case 'email':
                setStartValue(1)
                res = validateEmail(val);
                break
            case 'password':
                setStartValue(2)
                res = validatePassword(val);
                break
        }
        const isValid = typeof res === 'boolean'
        if (isValid) {
            field === 'email' ? setEmailErrValues('') : setPassErrValues('')
            setValues((prev) => ({ ...prev, [field]: val }));
        } else {
            field === 'email' ? setEmailErrValues(res as string) : setPassErrValues(res as string)
        }

        if (isValid) {
            if (next === 'done') {
                setStartValue(3)
                setStep(next)
                //api call here
                //exit();
                let res = await logInWithCredentials(values.email, values.password);
                await saveIntoFile('../../UserCredentials.log', res)

            } else {
                setStep(next);
            }

        }
    };

    return (
        <Box flexDirection="column">
            {step !== 'email' && start !== 0 && emailError === '' && <Box flexDirection='row'>
                <Text bold color={'green'}>✓</Text>
                < Text bold>Email</Text>
            </Box>}
            {step !== 'email' && (start !== 0 && start !== 1) && passError === '' && <Box flexDirection='row'>
                <Text bold color={'green'}>✓</Text>
                < Text bold>Password</Text>
            </Box>}


            {
                (step === 'email') && (
                    <Box>
                        <Text bold color={'red'}>✗</Text>
                        <Text>Email: </Text>
                        <TextInput
                            value={values.email}
                            onChange={(val) => setValues((prev) => ({ ...prev, email: val }))}
                            onSubmit={handleSubmit('email', 'password')}
                        />
                    </Box>
                )
            }

            {
                step === 'password' && (
                    <Box>
                        <Text bold color={'red'}>✗</Text>
                        <Text>Password: </Text>
                        <TextInput
                            value={values.password}
                            onChange={(val) => setValues((prev) => ({ ...prev, password: val }))}
                            onSubmit={handleSubmit('password', 'done')}
                            mask="*"
                        />
                    </Box>
                )
            }

            {emailError !== '' ? <Text color={'red'}>{emailError}</Text> : <Text color={'red'}>{passError}</Text>}
            {start === 3 && < Text color={'green'}>Success</Text>}
        </Box >
    );
}

