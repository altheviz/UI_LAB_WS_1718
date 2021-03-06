import { EventData, Observable } from "data/observable";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { SnackBar } from "nativescript-snackbar";

import { User } from "../../profile/User";
import { AuthService } from "../authentication-service";

let viewModel = new Observable();

// Modules
let homeModule = {
    moduleName: "home/home-page",
    backstackVisible: false
};
let registrationModule = {
    moduleName: "authentication/registration/registration-page",
    backstackVisible: false
};

export function loaded(args) {
    const page = <Page>args.object;

    // Fill in email if passed from registration form
    if (page.navigationContext) {
        let context = page.navigationContext;
        if (context && context.email && context.email !== "") {
            viewModel.set("email", context.email);
        }
    }

    // Reset filled in password in form but
    // leave email as is to facilitate login
    viewModel.set("password", "");

    page.bindingContext = viewModel;
}

export function login() {
    let user = {
        email: viewModel.get("email") || "",
        password: viewModel.get("password") || ""
    };

    if (!user.email && !user.password) {
        (new SnackBar()).simple("Please enter valid credentials first.");
        return;
    }
    if (!AuthService.isValidEmail(user.email)) {
        (new SnackBar()).simple("Please enter a valid email address.");
        return;
    }

    completeLogin(user);
}

function completeLogin(user) {
    AuthService.login(user)
        .then((response) => {
            console.info("LOGIN SUCCESSFUL", JSON.stringify(response || ""));
            topmost().navigate(homeModule);
        })
        .catch(() => {
            (new SnackBar()).simple("Login failed. Please try again.");
        });
}

export function register() {
    topmost().navigate(registrationModule);
}
