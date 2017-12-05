import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import observableArray = require("data/observable-array");
import pages = require("ui/page");
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import observable = require("data/observable");
import { EquipmentViewModel } from "./equipment-view-model";
import { DropDown } from "nativescript-drop-down";


const vm = new EquipmentViewModel();
var viewModel: observable.Observable;
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
pageLoaded(args);
    
}

export function pageLoaded(args: observable.EventData) {
    var page = <pages.Page>args.object;
    var items = new observableArray.ObservableArray();

    viewModel = new observable.Observable();

        items.push("Jacket");
        items.push("Wetsuite");
        items.push("Regulator");
        items.push("Computer");
        items.push("Tank");
    

    viewModel.set("items", items);
    viewModel.set("selectedIndex", 0);

    page.bindingContext = viewModel;
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
    console.log("entries saved");
}; 


export function dropDownOpened(args: EventData) {
    console.log("Drop Down opened");
}
 
export function dropDownClosed(args: EventData) {
    console.log("Drop Down closed");
}
 
export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}