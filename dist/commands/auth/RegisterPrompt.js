import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import TextInput from 'ink-text-input';
const steps = ['username', 'email', 'password', 'confirmPassword'];
const stepConfig = {
    username: { label: 'Username' },
    email: { label: 'Email' },
    password: { label: 'Password', mask: true },
    confirmPassword: { label: 'Confirm Password', mask: true },
};
export default function RegisterPrompt() {
    const { exit } = useApp();
    const [step, setStep] = useState('username');
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (field) => (val) => {
        setError('');
        setValues((prev) => ({ ...prev, [field]: val }));
    };
    const handleSubmit = (field) => () => {
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
        setStep(steps[currentIndex + 1]);
    };
    return (_jsxs(Box, { flexDirection: "column", gap: 1, children: [_jsx(Text, { bold: true, children: " Register" }), steps.slice(0, steps.indexOf(step)).map((s) => (_jsxs(Box, { children: [_jsxs(Text, { color: "green", children: ["\u2714 ", stepConfig[s].label, ": "] }), _jsxs(Text, { children: [" ", stepConfig[s].mask ? '••••••••' : values[s]] })] }, s))), step !== 'done' && (_jsxs(Box, { children: [_jsxs(Text, { children: [stepConfig[step].label, ": "] }), _jsx(TextInput, { value: values[step], onChange: handleChange(step), onSubmit: handleSubmit(step), mask: stepConfig[step].mask ? '*' : undefined })] })), error && _jsxs(Text, { color: "red", children: ["\u2716 ", error] })] }));
}
