import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { FavoriteInfoViewModel } from "./favoriteInfo-view-model";

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;
    page.bindingContext = new FavoriteInfoViewModel(page.navigationContext.index);
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function onMap(args) {
    console.log("Show on Map tapped.");
    var navigationEntry = {
        moduleName: "divesite/map/map-page",
        clearHistory: true,
        context: {gpsCoordLength: 8.535563, gpsCoordWdith: 49.09877} //pass gps coordinates to show on map
    };
    topmost().navigate(navigationEntry);
}
