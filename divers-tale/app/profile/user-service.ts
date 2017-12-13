import * as config from "../shared/config";

import { User } from "./User";

export namespace UserService {

    export function getCurrentUser(): Promise<User> {
        // IMPORTANT: API route should rather be something like
        // /users?current=true to fetch the currently logged in 
        // user identified by his bearer token
        return fetch(`${config.apiBaseURL}/users/1`)
            .then(responseErrorHandler)
            .then((response) => response.json())
            .then((currentUser) => {
                return createUserInstance(currentUser);
            })
            .catch(errorHandler);
    }

    // Helper functions

    function createUserInstance(user: any): User {
        return new User(
            user.email || "",
            user.name || "",
            user.id || null,
            user.nickname || "",
            user.city || "",
            user.region || "",
            user.country || "",
            user.sex || "",
            user.dateOfBirth || null,
            user.profileImage || "",
            user.certifications || [],
            user.diveHistory || [],
            user.documents || []
        );
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