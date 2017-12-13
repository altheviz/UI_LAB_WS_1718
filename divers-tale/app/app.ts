/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import * as app from "application";
import "./bundle-config";
import { AuthService } from "./authentication/authentication-service";

// If user is already logged in he will be redirected to home view directly
let initialModule = {
    moduleName: "authentication/login/login-page",
    backstackVisible: false
};
if (AuthService.isLoggedIn()) {
    initialModule = {
        moduleName: "home/home-page",
        backstackVisible: false
    };
}
app.start(initialModule);

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
