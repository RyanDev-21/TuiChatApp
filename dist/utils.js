import fs from 'node:fs/promises';
export async function saveIntoFile(file, data) {
    try {
        const content = JSON.stringify(data, null, 2);
        await fs.writeFile(file, content, 'utf-8');
        console.log("Data saved successfully\n");
        return null;
    }
    catch (error) {
        return {
            error: error?.message || "file system error"
        };
    }
}
export async function readFromFile(file) {
    try {
        let content = await fs.readFile(file, 'utf8');
        content = JSON.parse(content);
        return content;
    }
    catch (error) {
        return {
            error: error?.message || 'file system error',
        };
    }
}
const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const PASS_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
export function validateEmail(email) {
    email = email.trim();
    return EMAIL_REGEX.test(email) || "Invalid email";
}
export function validatePassword(pass) {
    pass = pass.trim();
    return PASS_REGEX.test(pass) || "8 characters,at least 1 upperCase,at least one special character";
}
