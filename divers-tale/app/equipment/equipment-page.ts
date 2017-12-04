import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { EquipmentViewModel } from "./equipment-view-model";


const vm = new EquipmentViewModel();
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
    const pageName: string = "Equipment";
    vm.set("selectedPage", pageName);
    vm.set("titel", pageName.substring(1));
    const page = <Page>args.object;
    vm.setupSearch(pageName);
    let view = page.getViewById("textFieldSearch");
    if (view) {
        view.on("textChange", (data: EventData) => {
            vm.search(data["value"]);
        }, this);
    }
    page.bindingContext = vm;

}

export function openListItem(args: EventData){
    var navigationEntry = {
        moduleName: "equipment/equipment-detail-page",
        context: {
            fItem: vm.get("fList")[args["index"]],
            parentPageName: vm.get("selectedPage")
        },
        animated: false
    };
    topmost().navigate(navigationEntry);
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

exports.jacket = function() {
    console.log("hello jacket Detail page");
}; 
