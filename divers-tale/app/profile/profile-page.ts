import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { User } from "./User";
import { UserService } from "./user-service";

let viewModel = new Observable();

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    // Get current user data and fill profile form
    UserService.getCurrentUser()
        .then((user) => {
            viewModel.set("user", user);
        });

    const page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
