import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { saveIntoFile, validateEmail, validatePassword } from '../../utils.js';
import { logInWithCredentials } from '../../apiServices/auth.js';
export default function LoginPrompt() {
    const [step, setStep] = useState('email');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [start, setStartValue] = useState(0);
    const [emailError, setEmailErrValues] = useState('');
    const [passError, setPassErrValues] = useState('');
    const handleSubmit = (field, next) => async (val) => {
        let res;
        switch (field) {
            case 'email':
                setStartValue(1);
                res = validateEmail(val);
                break;
            case 'password':
                setStartValue(2);
                res = validatePassword(val);
                break;
        }
        const isValid = typeof res === 'boolean';
        if (isValid) {
            field === 'email' ? setEmailErrValues('') : setPassErrValues('');
            setValues((prev) => ({ ...prev, [field]: val }));
        }
        else {
            field === 'email' ? setEmailErrValues(res) : setPassErrValues(res);
        }
        if (isValid) {
            if (next === 'done') {
                setStartValue(3);
                setStep(next);
                //api call here
                //exit();
                let res = await logInWithCredentials(values.email, values.password);
                await saveIntoFile('../../UserCredentials.log', res);
            }
            else {
                setStep(next);
            }
        }
    };
    return (_jsxs(Box, { flexDirection: "column", children: [step !== 'email' && start !== 0 && emailError === '' && _jsxs(Box, { flexDirection: 'row', children: [_jsx(Text, { bold: true, color: 'green', children: "\u2713" }), _jsx(Text, { bold: true, children: "Email" })] }), step !== 'email' && (start !== 0 && start !== 1) && passError === '' && _jsxs(Box, { flexDirection: 'row', children: [_jsx(Text, { bold: true, color: 'green', children: "\u2713" }), _jsx(Text, { bold: true, children: "Password" })] }), (step === 'email') && (_jsxs(Box, { children: [_jsx(Text, { bold: true, color: 'red', children: "\u2717" }), _jsx(Text, { children: "Email: " }), _jsx(TextInput, { value: values.email, onChange: (val) => setValues((prev) => ({ ...prev, email: val })), onSubmit: handleSubmit('email', 'password') })] })), step === 'password' && (_jsxs(Box, { children: [_jsx(Text, { bold: true, color: 'red', children: "\u2717" }), _jsx(Text, { children: "Password: " }), _jsx(TextInput, { value: values.password, onChange: (val) => setValues((prev) => ({ ...prev, password: val })), onSubmit: handleSubmit('password', 'done'), mask: "*" })] })), emailError !== '' ? _jsx(Text, { color: 'red', children: emailError }) : _jsx(Text, { color: 'red', children: passError }), start === 3 && _jsx(Text, { color: 'green', children: "Success" })] }));
}
