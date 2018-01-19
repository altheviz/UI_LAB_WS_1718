import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";

import { DivelogViewModel } from "./divelog-view-model";

import * as switchModule from "tns-core-modules/ui/switch";
import * as textViewModule from "tns-core-modules/ui/text-view";
import {DivelogService} from "../divelog-service";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";

var divebuddiesData = require("../../divebuddies/static_data");
const service = new DivelogService();
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

    const divelogs = service.loadDivelogs();
    let divelog;
    const page = <Page>args.object;

    if (page.navigationContext == null && !divelogs.isEmpty) {
        divelog = divelogs[0];
    } else {
        const divelogId = page.navigationContext.divelogId;

        if (divelogId == null) {
            divelog = divelogs[0];
        } else {

            for (const d of divelogs) {
                if (d.id == divelogId) {
                    divelog = d;
                }
            }
        }
    }
    page.bindingContext = divelog;
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

export function onOpenDivesiteClicked(args: EventData) {
    const component = <FlexboxLayout>args.object;
    const componentRoute = component.get("route");
    topmost().navigate( {
        moduleName: "divesite/favorite/favorite-detail/favoriteInfo-page",
        transition: {
            name: "fade"
        },
        //TODO pass actual index
        context: {index: 1},
    });
}

export function onBuddyClicked(args: EventData) {
    const component = args.object;
    const componentRoute = component.get("route");
    var divebuddy = divebuddiesData.divebuddies_data[0];
    var certs = [divebuddiesData.certification_data[0]];
    topmost().navigate( {
        moduleName: "divebuddies/user-details/user-details-page",
        context: { user: divebuddy, certifications: certs},
        transition: {
            name: "fade"
        }
    });
}

export function onDeleteButtonTap(args: EventData) {
    const component = args.object;
    const route = component.get("route");
    service.deleteDivelog(component.get("id"));

    topmost().navigate( {
        moduleName: route,
        transition: {
            name: "fade"
        }
    });
}

}