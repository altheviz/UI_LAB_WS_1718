import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";
import observable = require("data/observable");
import observableArray = require("data/observable-array");
import pages = require("ui/page");
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import * as localStorage from "nativescript-localstorage";
import {DivelogViewModel} from "../divelog-view/divelog-view-model"

import * as switchModule from "tns-core-modules/ui/switch";
import * as textViewModule from "tns-core-modules/ui/text-view";
import {View} from "tns-core-modules/ui/core/view";
import {DivelogService} from "../divelog-service";

var viewModel: observable.Observable;
var page: Page;
const divelogsService = new DivelogService();


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
    page = <Page>args.object;
    page.bindingContext = new DivelogViewModel();

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
    var items = new observableArray.ObservableArray();
    var verifierTypes = ["Instructor", "Divemaster", "Buddy"];

    viewModel = new observable.Observable();

    for (var i = 0; i < verifierTypes.length; i++) {
        items.push(verifierTypes[i]);
    }

    viewModel.set("items", items);
    page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function buttonTap(args: EventData) {
    let diveModel = new DivelogViewModel();
    const id = Math.floor(Math.random() * (100000 - 0 + 1));

    diveModel.id = id;
    diveModel.diveNumber = page.getViewById("dive#").get("text");
    diveModel.location = page.getViewById("location").get("text");
    diveModel.date = page.getViewById("date").get("text");
    diveModel.diveSite = page.getViewById("diveSite").get("text");

// Entry 1
    diveModel.si = page.getViewById("si").get("text");
    diveModel.firstEntryTime = page.getViewById("firstEntryTime").get("text");
    diveModel.firstPg = page.getViewById("firstPg").get("text");
    diveModel.rnt = page.getViewById("rnt").get("text");
    diveModel.firstPressure = page.getViewById("firstPressure").get("text");

// time
    diveModel.bottomTime = page.getViewById("bottomTime").get("text");
    diveModel.average1 = page.getViewById("avg").get("text");
    diveModel.average2 = page.getViewById("depth").get("text");

//safety stop
    diveModel.safetyTime = page.getViewById("safetyTime").get("text");
    diveModel.safetyLevel = page.getViewById("safetyLevel").get("text");

// Entry 2
    diveModel.secondEntryTime = page.getViewById("secondEntryTime").get("text");
    diveModel.secondPg = page.getViewById("secondPg").get("text");
    diveModel.oxygenPercentage = page.getViewById("oxygenPercentage").get("text");
    diveModel.secondPressure = page.getViewById("secondPressure").get("text");

// weight
    diveModel.ditch = page.getViewById("ditch").get("text");
    diveModel.trim = page.getViewById("trim").get("text");

// tank / gas
    diveModel.air = page.getViewById("air").get("text");
    diveModel.ean = page.getViewById("ean").get("text");
    diveModel.eanText = page.getViewById("eanText").get("text");
    diveModel.tankType = page.getViewById("tankType").get("text");
    diveModel.tankSize = page.getViewById("tankSize").get("text");

// wet suit
    diveModel.wetSuitHelmet = page.getViewById("wetSuitHelmet").get("text");
    diveModel.wetSuitGloves = page.getViewById("wetSuitGloves").get("text");
    diveModel.wetSuitShoes = page.getViewById("wetSuitShoes").get("text");
    diveModel.wetSuitShortSuit = page.getViewById("wetSuitShortSuit").get("text");
    diveModel.wetSuitUnderwear = page.getViewById("wetSuitUnderwear").get("text");
    diveModel.wetSuitLongSuit = page.getViewById("wetSuitLongSuit").get("text");

// dry suit
    diveModel.drySuitGloves = page.getViewById("drySuitGloves").get("text");
    diveModel.drySuitShoes = page.getViewById("drySuitShoes").get("text");
    diveModel.drySuit = page.getViewById("drySuit").get("text");
    diveModel.drySuitLiner = page.getViewById("drySuitLiner").get("text");

// conditions
    diveModel.viz = page.getViewById("viz").get("text");
    diveModel.current = page.getViewById("current").get("text");
    diveModel.sunny = page.getViewById("sunny").get("text");
    diveModel.sunCloud = page.getViewById("sunCloud").get("text");
    diveModel.cloud = page.getViewById("cloud").get("text");
    diveModel.rain = page.getViewById("rain").get("text");
    diveModel.fresh = page.getViewById("fresh").get("text");
    diveModel.salt = page.getViewById("salt").get("text");
    diveModel.boat = page.getViewById("boat").get("text");
    diveModel.night = page.getViewById("night").get("text");
    diveModel.surf = page.getViewById("surf").get("text");
    diveModel.waves = page.getViewById("waves").get("text");
    diveModel.surge = page.getViewById("surge").get("text");
    diveModel.wreck = page.getViewById("wreck").get("text");
    diveModel.reef = page.getViewById("reef").get("text");
    diveModel.deep = page.getViewById("deep").get("text");
    diveModel.photo = page.getViewById("photo").get("text");
    diveModel.drift = page.getViewById("drift").get("text");
    diveModel.training = page.getViewById("training").get("text");
    diveModel.survey = page.getViewById("survey").get("text");
    diveModel.recovery = page.getViewById("recovery").get("text");

// temperature
    diveModel.aboveSurface = page.getViewById("aboveSurface").get("text");
    diveModel.belowSurface = page.getViewById("belowSurface").get("text");
    diveModel.groundLevel = page.getViewById("groundLevel").get("text");

// comment
    diveModel.comment = page.getViewById("comment").get("text");

// times
    diveModel.previousTime = page.getViewById("previousTime").get("text");
    diveModel.thisDive = page.getViewById("thisDive").get("text");
    diveModel.totalTime = page.getViewById("totalTime").get("text");

// verification
    diveModel.verificatorName = page.getViewById("verificatorName").get("text");
    // diveModel.instructor = page.getViewById("instructor").get("text");
    // diveModel.diveMaster = page.getViewById("diveMaster").get("text");
    // diveModel.buddy = page.getViewById("buddy").get("text");
    diveModel.certificationNumber = page.getViewById("certificationNumber").get("text");

    let divelogs = divelogsService.loadDivelogs();

    divelogs.unshift(diveModel);

    localStorage.setItem("divelogs", JSON.stringify(divelogs));

    const component = <FlexboxLayout>args.object;
    const componentRoute = component.get("route");
    topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}

export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}