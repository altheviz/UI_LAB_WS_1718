import { EventData } from "data/observable";
import { topmost } from "ui/frame";
import { GridLayout } from "ui/layouts/grid-layout";

import { MyDrawerViewModel } from "./MyDrawer-view-model";
import { AuthService } from "../../authentication/authentication-service";

/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
export function onLoaded(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentTitle = component.get("selectedPage");

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
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
                backstackVisible: false,
                transition: {
                    name: "fade"
                }
            });
        })
        .catch((err) => {
            console.log("Logout failed: ", err);
        });
}
