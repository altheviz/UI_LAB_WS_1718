import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import {DivelogListModel} from "./divelog-list-model";
import {FlexboxLayout} from "tns-core-modules/ui/layouts/flexbox-layout";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;
    page.bindingContext = new DivelogListModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function onItemTap(args: EventData) {
    const component = <FlexboxLayout>args.object;
    const componentRoute = component.get("route");
    const divelogId = component.get("id");

    topmost().navigate({
        moduleName: componentRoute,
        context: {divelogId: divelogId},
        transition: {
            name: "fade"
        }
    });
}

export function onFabTap(args: EventData) {
    const component = <FlexboxLayout>args.object;
    const componentRoute = component.get("route");
    topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}



