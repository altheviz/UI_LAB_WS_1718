import * as EmailValidator from "email-validator";
import * as fetchModule from "fetch";
import { knownFolders } from "tns-core-modules/file-system";

import { User } from "../profile/User";

export function isValidEmail(email) {
    return EmailValidator.validate(email);
}

export function register(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        resolve(getMockData());
    });
}

export function login(user) {
    if (user.email === "admin@foo.com" && user.password === "password123") {
        return new Promise<User>((resolve, reject) => {
            let userRawData = readJSON("testdata/user.json");
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
            resolve(user);
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

function getMockData() {
    let userRawData = readJSON("testdata/user.json");
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

function readJSON(file: string): any {
    if (!file) {
        return {};
    }

    let appFolder = knownFolders.currentApp();
    let mockData = appFolder.getFile(file);

    return JSON.parse(mockData.readTextSync());
}
