import { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import TextInput from 'ink-text-input';

type Step = 'username' | 'email' | 'password' | 'confirmPassword' | 'done';

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const steps: Step[] = ['username', 'email', 'password', 'confirmPassword'];

const stepConfig: Record<Exclude<Step, 'done'>, { label: string; mask?: boolean }> = {
    username: { label: 'Username' },
    email: { label: 'Email' },
    password: { label: 'Password', mask: true },
    confirmPassword: { label: 'Confirm Password', mask: true },
};



export default function RegisterPrompt() {
    const { exit } = useApp();
    const [step, setStep] = useState<Step>('username');
    const [error, setError] = useState<string>('');
    const [values, setValues] = useState<FormValues>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (field: keyof FormValues) => (val: string) => {
        setError('');
        setValues((prev) => ({ ...prev, [field]: val }));
    };

    const handleSubmit = (field: keyof FormValues) => () => {
        // validation
        if (field === 'email' && !values.email.includes('@')) {
            setError('Invalid email address');
            return;
        }

        if (field === 'confirmPassword') {
            if (values.password !== values.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            // all done — do register logic here
            exit();
            return;
        }

        // advance to next step
        const currentIndex = steps.indexOf(field);
        setStep(steps[currentIndex + 1] as Step);

    };

    return (
        <Box flexDirection="column" gap={1}>
            <Text bold> Register</Text>

            {/* completed steps */}
            {steps.slice(0, steps.indexOf(step)).map((s) => (
                <Box key={s}>
                    <Text color="green">✔ {stepConfig[s as Exclude<Step, 'done'>].label}: </Text>
                    < Text > {stepConfig[s as Exclude<Step, 'done'>].mask ? '••••••••' : values[s as Exclude<Step, 'done'>]}</Text>
                </Box>
            ))}

            {/* current step */}
            {step !== 'done' && (
                <Box>
                    <Text>{stepConfig[step].label}: </Text>
                    <TextInput
                        value={values[step]}
                        onChange={handleChange(step)}
                        onSubmit={handleSubmit(step)}
                        mask={stepConfig[step].mask ? '*' : undefined}
                    />
                </Box>
            )}

            {/* error */}
            {error && <Text color="red">✖ {error}</Text>}
        </Box>
    );
}
