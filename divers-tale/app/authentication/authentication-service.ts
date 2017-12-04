import * as EmailValidator from "email-validator";
import * as fetchModule from "fetch";

import { User } from "../profile/User";

export function isValidEmail(email) {
    return EmailValidator.validate(email);
}

export function register(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        resolve(user);
    });
}

export function login(user) {
    if (user.email === "admin@foo.com" && user.password === "password123") {
        return new Promise<undefined>((resolve, reject) => {
            resolve();
        });
    }
    return new Promise<undefined>((resolve, reject) => {
        reject();
    });
}

export function logout() {
    return new Promise<undefined>((resolve, reject) => {
        resolve();
    });
}
