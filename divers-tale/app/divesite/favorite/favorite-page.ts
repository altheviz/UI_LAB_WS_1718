import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { FavoriteViewModel } from "./favorite-view-model";

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
    page.bindingContext = new FavoriteViewModel();
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

var frame = require('ui/frame');
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new FavoriteViewModel();
}
exports.onPageLoaded = onPageLoaded;
exports.onNavigatingTo = onNavigatingTo;

function openListItem(args: EventData) {
    var navigationEntry = {
        moduleName: "divesite/favorite/favorite-detail/favoriteMonitoring-page",
        //context: {info: "something you want to pass to your page"},
    };
    topmost().navigate(navigationEntry);
}

exports.openListItem = openListItem;