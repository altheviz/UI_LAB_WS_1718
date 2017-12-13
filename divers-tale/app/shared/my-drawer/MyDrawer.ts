import { EventData } from "data/observable";
import { topmost } from "ui/frame";
import { GridLayout } from "ui/layouts/grid-layout";

import { MyDrawerViewModel } from "./MyDrawer-view-model";
import { AuthService } from "../../authentication/authentication-service";

export function onLoaded(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentTitle = component.get("selectedPage");

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

export function onNavigationItemTap(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentRoute = component.get("route");
    const pageName = component.get("pagename");
    topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        },
        context: { pageName: pageName }
    });
}

export function onLogout(args: EventData): void {
    AuthService.logout()
        .then(() => {
            console.info("LOGOUT SUCCESSFUL");
            topmost().navigate({
                moduleName: "authentication/login/login-page",
                transition: {
                    name: "fade"
                },
                backstackVisible: false,
                clearHistory: true
            });
        })
        .catch((err) => {
            console.log("Logout failed: ", err);
        });
}
