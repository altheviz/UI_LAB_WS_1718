import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { SettingsViewModel } from "./settings-view-model";

//begin dropdown
import observable = require("data/observable");
import observableArray = require("data/observable-array");
import pages = require("ui/page");
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
let viewModel: observable.Observable;
//end dropdown

let email;
let testPage;

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

    console.log("onNavigatingTo");
    const page = <Page>args.object;
    page.bindingContext = new SettingsViewModel();

    testPage = page;
    initDropdown(page);
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    console.log("onDrawerButtonTap");
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

// for dropdown
function initDropdown(page: pages.Page) {
    console.log("pageLoaded");
    //var page = <pages.Page>args.object;
    var items = new observableArray.ObservableArray();
    items.push("meter");
    items.push("feet");

    var press = new observableArray.ObservableArray();
    press.push("bar");
    press.push("psi");

    var temperature = new observableArray.ObservableArray();
    temperature.push("celsius");
    temperature.push("fahrenheit");

    var timeFormat = new observableArray.ObservableArray();
    timeFormat.push("24 hours");
    timeFormat.push("am/pm");

    var dateFormat = new observableArray.ObservableArray();
    dateFormat.push("dd.mm.yyyy");
    dateFormat.push("mm/dd/yyyy");


    viewModel = new observable.Observable();
    viewModel.set("items", items);
    viewModel.set("press", press);
    viewModel.set("temperature",temperature);
    viewModel.set("timeFormat", timeFormat);
    viewModel.set("dateFormat", dateFormat);

    viewModel.set("selectedIndex", 1);

    page.bindingContext = viewModel;
}

export function dropDownOpened(args: EventData) {
    console.log("dropDownOpened");
    console.log("Drop Down opened");
}

export function dropDownClosed(args: EventData) {
    console.log("dropDownClosed");
    console.log("Drop Down closed");
}

export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log("dropDownSelectedIndexChanged");
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}

export function showme() {
    console.log("showme");
    email = testPage.getViewById("email");
    alert(email.text);
}
