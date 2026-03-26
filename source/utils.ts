import fs from 'node:fs/promises';
import { NormalError } from './types.js';


export async function saveIntoFile(file: string, data: any): Promise<NormalError | null> {
    try {
        const content = JSON.stringify(data, null, 2);
        await fs.writeFile(file, content, 'utf-8');
        console.log("Data saved successfully\n");
        return null
    } catch (error: any) {
        return {
            error: error?.message || "file system error"
        } as NormalError
    }
}
export async function readFromFile(file: string): Promise<any | NormalError> {
    try {
        let content = await fs.readFile(file, 'utf8')
        content = JSON.parse(content)
        return content
    } catch (error: any) {
        return {
            error: error?.message || 'file system error',
        } as NormalError;
    }
}

const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const PASS_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);


export function validateEmail(email: string): string | true {
    email = email.trim()
    return EMAIL_REGEX.test(email) || "Invalid email"
}
export function validatePassword(pass: string): string | true {
    pass = pass.trim()
    return PASS_REGEX.test(pass) || "8 characters,at least 1 upperCase,at least one special character"
}
