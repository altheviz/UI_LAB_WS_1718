import { EventData, Observable } from "data/observable";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { SnackBar } from "nativescript-snackbar";

import { User } from "../../profile/User";
import { AuthService } from "../authentication-service";

let viewModel = new Observable();

// Modules
let loginModule = {
    moduleName: "authentication/login/login-page",
    backstackVisible: false
};

export function loaded(args) {
    // Reset filled in data in form
    viewModel.set("name", "");
    viewModel.set("email", "");

    const page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function register() {
    let user = {
        email: viewModel.get("email") || "",
        name: viewModel.get("name") || ""
    };
    if (!user.email && !user.name) {
        (new SnackBar()).simple("Please enter valid data.");
        return;
    }
    if (!AuthService.isValidEmail(user.email)) {
        (new SnackBar()).simple("Please enter a valid email address.");
        return;
    }

    completeRegistration(user.email, user.name);
}

function completeRegistration(email: string, name: string) {
    let newUser = new User(email, name);
    AuthService.register(newUser)
        .then((response) => {
            console.info("REGISTRATION SUCCESSFUL", JSON.stringify(response || ""));
            loginModule["context"] = {
                email: viewModel.get("email") || ""
            };
            topmost().navigate(loginModule);
        })
        .catch(() => {
            (new SnackBar()).simple("Registration failed. Please try again.");
        });
}

export function login() {
    topmost().navigate(loginModule);
}
