import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { SearchViewModel } from "./search-view-model";

// import * as searchBarModule from "ui/search-bar";
// import * as listViewModule from "ui/list-view";
// import * as observableArray from "data/observable-array";
// import * as labelModule from "ui/label";
import { SearchBar } from "ui/search-bar";
import { ListView } from "ui/list-view";

var model = new SearchViewModel();


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
    page.bindingContext = model;
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

export function onSubmit(args) {
    var searchBar:SearchBar = <SearchBar>args.object;
    console.log("Search submit result: "+searchBar.text);
    model.filterSearchList(searchBar.text);
    var listView = <ListView>topmost().getViewById("listview");
    listView.refresh();
    console.dir(model.searchResults);
}

export function onClear(args) {
    console.log("clear search-bar text");
}

export function onPageLoaded(args) {
    const page = <Page>args.object;
    page.bindingContext = model;
}
