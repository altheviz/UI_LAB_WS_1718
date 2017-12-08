import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { DiveSiteViewModel } from "./divesite-view-model";
import * as tabViewModule from "tns-core-modules/ui/tab-view";

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;
    page.bindingContext = new DiveSiteViewModel();
}

export function onSelectedIndexChanged(args: tabViewModule.SelectedIndexChangedEventData) {
    var page = args.object.get("parent").get("parent");
    switch (args.newIndex)
    {
        case 0: { //map tab
            page.bindingContext.set("isAdd", false);
            page.bindingContext.set("isDelete", false);
            break;
        }
        case 1: { //favorite tab
            page.bindingContext.set("isAdd", true);
            page.bindingContext.set("isDelete", true);
            break;
        }
        case 2: { //search tab
            page.bindingContext.set("isAdd", false);
            page.bindingContext.set("isDelete", false);
            break;
        }
    }
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function onAdd(args: EventData) {
    console.log("Add action item tapped.");
}

export function onDelete(args: EventData) {
    console.log("Delete action item tapped.");
}