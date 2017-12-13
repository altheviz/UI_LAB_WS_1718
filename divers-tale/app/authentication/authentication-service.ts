import * as config from "../shared/config";
import * as localStorage from "nativescript-localstorage";
import * as EmailValidator from "email-validator";

import { User } from "../profile/User";

export namespace AuthService {

    export function isValidEmail(email: string): boolean {
        return EmailValidator.validate(email);
    }

    export function register(user: User): Promise<User> {
        return fetch(`${config.apiBaseURL}/users`, {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(user)
            })
            .then(responseErrorHandler)
            .then((response) => response.json())
            .catch(errorHandler);
    }

    export function login(user: any): Promise<any> {
        // IMPORTANT: Authentication route should use POST method
        // when implemented as real backend and therefore pass
        // the user credentials
        return fetch(`${config.apiBaseURL}/authenticate`)
            .then(responseErrorHandler)
            .then((response) => response.json())
            .then((response) => {
                // Write accessToken to local storage
                localStorage.setItem("_accessToken_", response["accessToken"]);
                // Get and return current user
                return;
            })
            .catch(errorHandler);
    }

    export function logout(): Promise<undefined> {
        // IMPORTANT: Authentication route should also use POST method
        // when implemented as real backend
        return fetch(`${config.apiBaseURL}/deauthenticate`)
            .then(responseErrorHandler)
            .then((response) => response.json())
            .then(() => {
                localStorage.removeItem("_accessToken_");
                return;
            })
            .catch(errorHandler);
    }

    export function isLoggedIn(): boolean {
        let accessToken = localStorage.getItem("_accessToken_");
        console.info(accessToken);
        if (!accessToken || accessToken === "") {
            return false;
        }
        return true;
    }

    function errorHandler(response): Promise<any> {
        // Proper implementation needed
        // not just console.log ;)
        console.error("HTTP REQUEST FAILED", JSON.stringify(response));
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    function responseErrorHandler(response): Promise<any> {
        if (!response || !response.status || response.status >= 300) {
            return new Promise((resolve, reject) => {
                reject(response);
            });
        }
        return response;
    }

}
