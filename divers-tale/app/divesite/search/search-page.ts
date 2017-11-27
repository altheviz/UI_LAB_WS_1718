// import { EventData } from "data/observable";
// import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
// import { topmost } from "ui/frame";
// import { NavigatedData, Page } from "ui/page";

// import { SearchViewModel } from "./search-view-model";

// /* ***********************************************************
// * Use the "onNavigatingTo" handler to initialize the page binding context.
// *************************************************************/
// export function onNavigatingTo(args: NavigatedData) {
//     /* ***********************************************************
//     * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
//     * Skipping the re-initialization on back navigation means the user will see the
//     * page in the same data state that he left it in before navigating.
//     *************************************************************/
//     if (args.isBackNavigation) {
//         return;
//     }

//     const page = <Page>args.object;
//     page.bindingContext = new SearchViewModel();
// }

// /* ***********************************************************
// * According to guidelines, if you have a drawer on your page, you should always
// * have a button that opens it. Get a reference to the RadSideDrawer view and
// * use the showDrawer() function to open the app drawer section.
// *************************************************************/
// export function onDrawerButtonTap(args: EventData) {
//     const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
//     sideDrawer.showDrawer();
// }
import * as searchBarModule from "ui/search-bar";
import * as listViewModule from "ui/list-view";
import * as observableArray from "data/observable-array";
import * as labelModule from "ui/label";

var searchBar = new searchBarModule.SearchBar();
var listView = new listViewModule.ListView();

var colors = ["red", "green", "blue"];
listView.items = colors;
listView.on(listViewModule.ListView.itemLoadingEvent, function (args: listViewModule.ItemEventData) {
    if (!args.view) {
        args.view = new labelModule.Label();
    }
    (<labelModule.Label>args.view).text = colors[args.index];
});
