import { NormalError } from './types.js';
export declare function saveIntoFile(file: string, data: any): Promise<NormalError | null>;
export declare function readFromFile(file: string): Promise<any | NormalError>;
export declare function validateEmail(email: string): string | true;
export declare function validatePassword(pass: string): string | true;
