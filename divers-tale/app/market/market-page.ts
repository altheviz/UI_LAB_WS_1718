import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import {MarketService} from "./market-service";
import {MarketViewModel} from "./market-view-model";

const ms = new MarketViewModel();

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }
    const pageName: string = args.context.pageName;
    
    const page = <Page>args.object;

    page.bindingContext = ms;
    console.log(JSON.stringify(ms))
    // TODO ...
}

export function openListItem(args: EventData){
    var navigationEntry = {
        moduleName: "details/details-page",
        context: {
            fItem: ms.get("list")[args["index"]],
            parentPageName: ms.get("selectedPage")
        },
        animated: false
    };
    topmost().navigate(navigationEntry); 
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}