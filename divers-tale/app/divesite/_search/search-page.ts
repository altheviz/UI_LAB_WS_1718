import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { SearchViewModel } from "./search-view-model";

import { SearchBar } from "ui/search-bar";
import { ListView } from "ui/list-view";
import { isAndroid } from "platform";

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
    model.set("searchResults", model.searchResults);
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
    searchBar.dismissSoftInput();

    model.set("searchResults", model.searchResults);
}

export function onClear(args) {
    console.log("clear search-bar text");
    var searchBar:SearchBar = <SearchBar>args.object;
    
    model.loadList();
    searchBar.dismissSoftInput();
}

export function onPageLoaded(args) {
    const page = <Page>args.object;
    page.bindingContext = model;
    model.set("searchResults", model.searchResults);

}

export function sBLoaded(args){
    var searchBar:SearchBar = <SearchBar>args.object;
    if (isAndroid) { searchBar.android.clearFocus(); }
}

export function openListItem(args: EventData) {
    var navigationEntry = {
        moduleName: "divesite/favorite/favorite-detail/favoriteMonitoring-page",
        //clearHistory: true
    };
    topmost().navigate(navigationEntry);
}
