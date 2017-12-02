import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

//import { FeaturedViewModel } from "./equipment-view-model";

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
  //  page.bindingContext = new FeaturedViewModel();
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


var frameModule = require("ui/frame");

exports.jacket = function() {
    console.log("hello jacket"); 
    var topmost = frameModule.topmost();
    topmost.navigate("equipment/jacket/jacket-page");
}; 

exports.wetsuite = function() {
    console.log("hello wetsuite");
}; 

exports.regulator = function() {
    console.log("hello regulator");
}; 

exports.Computer = function() {
    console.log("hello Computer");
}; 

exports.Tank = function() {
    console.log("hello Tank");
}; 
