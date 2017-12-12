import * as EmailValidator from "email-validator";
import * as fetchModule from "fetch";
import { knownFolders } from "tns-core-modules/file-system";

import { MockDataService } from "../testdata/mock-data-service";
import { User } from "../profile/User";

export namespace AuthService {

    export function isValidEmail(email: string): boolean {
        return EmailValidator.validate(email);
    }

    export function register(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let user = getUserMockData();
            resolve(user);
        });
    }

    export function login(user: any): Promise<User> {
        if (user.email === "admin@foo.com" && user.password === "password123") {
            return new Promise<User>((resolve, reject) => {
                let user = getUserMockData();
                resolve(user);
            });
        }
        return new Promise<User>((resolve, reject) => {
            reject();
        });
    }

    export function logout(): Promise<undefined> {
        return new Promise<undefined>((resolve, reject) => {
            resolve();
        });
    }

    function getUserMockData(): User {
        let userRawData = MockDataService.getMockDataFor("user");
        let user = new User(
            userRawData.email,
            userRawData.name,
            userRawData.nickname,
            userRawData.city,
            userRawData.region,
            userRawData.country,
            userRawData.sex,
            userRawData.dateOfBirth,
            userRawData.profileImage,
            userRawData.certifications,
            userRawData.diveHistory,
            userRawData.documents
        );

        return user;
    }

}
