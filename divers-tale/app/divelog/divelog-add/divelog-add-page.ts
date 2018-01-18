import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";
import observable = require("data/observable");
import observableArray = require("data/observable-array");
import pages = require("ui/page");
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Settings } from "../../settings/Settings";
import { SettingService } from "../../settings/settings-service";

import {DivelogViewModel} from "../divelog-view/divelog-view-model"

import * as switchModule from "tns-core-modules/ui/switch";
import * as textViewModule from "tns-core-modules/ui/text-view";

var viewModel: observable.Observable;


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
    page.bindingContext = new DivelogViewModel();
    var settings = SettingService.loadSettings();

    setMeasureUnits(page, settings);
}

function setMeasureUnits(page :Page, settings: Settings) {
    
    var pressureHint :string;

    let firstPressureHint = page.getViewById("firstPressureHint");    
    let secondPressureHint = page.getViewById("secondPressureHint");    
    pressureHint = "Pressure (" + settings.getPressureUnit() + ")";

    firstPressureHint.set("hint", pressureHint);
    secondPressureHint.set("hint", pressureHint);

    var measurementAbbreviation :string;
    if(settings.getMeasurementUnit() === "meter") {
        measurementAbbreviation = "(m)";    
    } else {
        measurementAbbreviation = "(ft)";
    }
    
    let avg = page.getViewById("avg");
    avg.set("hint", avg.get("hint") + " " + measurementAbbreviation);
    
    let depth = page.getViewById("depth");
    depth.set("hint", depth.get("hint") + " " + measurementAbbreviation);

    let level = page.getViewById("level");
    level.set("hint", level.get("hint") + " " + measurementAbbreviation);
    
    let viz = page.getViewById("viz");
    viz.set("hint", viz.get("hint") + " " + measurementAbbreviation);

    var tempAbbreviation :string;
    if(settings.getTemperatureUnit() === "celsius") {
        tempAbbreviation = "(°C)";
    } else {
        tempAbbreviation = "(°F)";
    }

    let tempAboveSurface = page.getViewById("tempAboveSurface")
    tempAboveSurface.set("hint", tempAboveSurface.get("hint") + " " + tempAbbreviation);

    let tempBelowSurface = page.getViewById("tempBelowSurface")
    tempBelowSurface.set("hint", tempBelowSurface.get("hint") + " " + tempAbbreviation);

    let tempGroundLevel = page.getViewById("tempGroundLevel")
    tempGroundLevel.set("hint", tempGroundLevel.get("hint") + " " + tempAbbreviation);

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

export function pageLoaded(args: observable.EventData) {
    var page = <pages.Page>args.object;
    var items = new observableArray.ObservableArray();
    var verifierTypes = ["Instructor", "Divemaster", "Buddy"];

    viewModel = new observable.Observable();

    for (var i = 0; i < verifierTypes.length; i++) {
        items.push(verifierTypes[i]);
    }

    viewModel.set("items", items);
    page.bindingContext = viewModel;
}

export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}