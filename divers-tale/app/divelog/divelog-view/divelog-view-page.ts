import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";

import { DivelogViewModel } from "./divelog-view-model";

import * as switchModule from "tns-core-modules/ui/switch";
import * as textViewModule from "tns-core-modules/ui/text-view";
import {DivelogService} from "../divelog-service";
import { Settings } from "../../settings/Settings";
import { SettingService } from "../../settings/settings-service";

var divebuddiesData = require("../../divebuddies/static_data");

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
    var service = new DivelogService();
    var settings = SettingService.loadSettings();
    var divelog = service.loadDivelog();
    page.bindingContext = divelog;

    setMeasureUnits(page, settings);
    determineGasContent(page, divelog);
    determineWetSuitContent(page, divelog);
    determineDrySuitContent(page, divelog);
    determineConditionsContent(page, divelog);
    determineTemperatureContent(page, divelog);
    determineCommentContent(page, divelog);
    determineVerificationContent(page, divelog);
}

function setMeasureUnits(page: Page, settings: Settings) {
    let measurementUnitAbbreviation = getMeasurementUnitAbbreviation(settings.getMeasurementUnit());
    let tempUnitAbbreviation = getTemperatureUnitAbbreviation(settings.getTemperatureUnit());

    let firstPressureUnit = page.getViewById("firstPressureUnit");
    firstPressureUnit.set("text", settings.getPressureUnit());

    let secondPressureUnit = page.getViewById("secondPressureUnit");
    secondPressureUnit.set("text", settings.getPressureUnit());

    let vizUnit = page.getViewById("vizUnit");
    vizUnit.set("text", measurementUnitAbbreviation);

    let safetyStopUnit = page.getViewById("safetyStopUnit");
    safetyStopUnit.set("text", measurementUnitAbbreviation);

    let tempAboveSurfaceUnit = page.getViewById("tempAboveSurfaceUnit");
    tempAboveSurfaceUnit.set("text", tempUnitAbbreviation);

    let tempBelowSurfaceUnit = page.getViewById("tempBelowSurfaceUnit");
    tempBelowSurfaceUnit.set("text", tempUnitAbbreviation);

    let tempGroundLevelUnit = page.getViewById("tempGroundLevelUnit");
    tempGroundLevelUnit.set("text", tempUnitAbbreviation);
}

function getMeasurementUnitAbbreviation(measurementUnit: String) {
    if(measurementUnit !== null && measurementUnit === "meter") {
        return "m";
    } else {
        return "ft";
    }
}

function getTemperatureUnitAbbreviation(measurementUnit: String) {
    if(measurementUnit !== null && measurementUnit === "celsius") {
        return "°C";
    } else {
        return "°F";
    }
}

function determineGasContent(page: Page, divelog: DivelogViewModel) {

    let gasLabel = page.getViewById("gas");
    let gasText = "";

    if(divelog.air) {
        gasText = "Air";
    } else {
        gasText = "EAN, " + divelog.eanText;
    }

    gasLabel.set("text", gasText);

    let tankTypeContainer = page.getViewById("tankTypeContainer");
    let tankType = divelog.tankType;
    let tankSizeContainer = page.getViewById("tankSizeContainer");
    let tankSize = divelog.tankSize;

    if(tankType === null || tankType.trim.length === 0) {
        tankTypeContainer.className = "hidden";
    }

    if(tankSize === null) {
        tankSizeContainer.className = "hidden";
    }
}

function determineWetSuitContent(page: Page, divelog: DivelogViewModel) {
    let wetSuitHelmetContainer = page.getViewById("wetSuitHelmetContainer");
    let wetSuitHelmet = divelog.wetSuitHelmet;
    let wetSuitGlovesContainer = page.getViewById("wetSuitGlovesContainer");
    let wetSuitGloves = divelog.wetSuitGloves;
    let wetSuitShoesContainer = page.getViewById("wetSuitShoesContainer");
    let wetSuitShoes = divelog.wetSuitShoes;
    let wetSuitShortSuitContainer = page.getViewById("wetSuitShortSuitContainer");
    let wetSuitShortSuit = divelog.wetSuitShortSuit;
    let wetSuitUnderwearContainer = page.getViewById("wetSuitUnderwearContainer");
    let wetSuitUnderwear = divelog.wetSuitUnderwear;
    let wetSuitLongSuitContainer = page.getViewById("wetSuitLongSuitContainer");
    let wetSuitLongSuit = divelog.wetSuitLongSuit;

    if(wetSuitHelmet === null || wetSuitHelmet === 0) {
        wetSuitHelmetContainer.className = "hidden";
    }

    if(wetSuitGloves === null || wetSuitGloves === 0) {
        wetSuitGlovesContainer.className = "hidden";
    }

    if(wetSuitShoes === null || wetSuitShoes === 0) {
        wetSuitShoesContainer.className = "hidden";
    }

    if(wetSuitShortSuit === null || wetSuitShortSuit === 0) {
        wetSuitShortSuitContainer.className = "hidden";
    }

    if(wetSuitUnderwear === null || wetSuitUnderwear === 0) {
        wetSuitUnderwearContainer.className = "hidden";
    }

    if(wetSuitLongSuit === null || wetSuitLongSuit === 0) {
        wetSuitLongSuitContainer.className = "hidden";
    }
}


function determineDrySuitContent(page: Page, divelog: DivelogViewModel) {
    let glovesContainer = page.getViewById("drySuitGlovesContainer");
    let gloves = divelog.drySuitGloves;
    let shoesContainer = page.getViewById("drySuitShoesContainer");
    let shoes = divelog.drySuitShoes;
    let suitContainer = page.getViewById("drySuitContainer");
    let suit = divelog.drySuit;
    let linerContainer = page.getViewById("drySuitLinerContainer");
    let liner = divelog.drySuitLiner;

    if(gloves === "false") {
        glovesContainer.className = "hidden";
    }

    if(shoes === "false") {
        shoesContainer.className = "hidden";
    }

    if(suit === null || suit.trim.length === 0) {
        suitContainer.className = "hidden";
    }

    if(liner === null || liner.trim.length === 0) {
        linerContainer.className = "hidden";
    }
}

function determineConditionsContent(page: Page, divelog: DivelogViewModel) {
    let vizContainer = page.getViewById("vizContainer");
    let viz = divelog.viz;
    let currentContainer = page.getViewById("currentContainer");
    let current = divelog.current;
    let conditionsContainer = page.getViewById("conditionsContainer");
    let conditionsText = page.getViewById("conditions");
    var conditions :string = "";

    if(divelog.sunny === "true") {
        conditions += "sunny";
        separateConditionsWithComma(conditions);
    }

    if(divelog.sunCloud === "true") {
        conditions += "sunny + cloudy";
        separateConditionsWithComma(conditions);
    }

    if(divelog.cloud === "true") {
        conditions += "cloudy";
        separateConditionsWithComma(conditions);
    }

    if(divelog.rain === "true") {
        conditions += "rain"
        conditions += separateConditionsWithComma(conditions);
    }

    if(divelog.fresh === "true") {
        conditions += "fresh";
        separateConditionsWithComma(conditions);
    }

    if(divelog.salt === "true") {
        conditions += "salt";
        separateConditionsWithComma(conditions);
    }

    if(divelog.boat === "true") {
        conditions += "boat";
        separateConditionsWithComma(conditions);
    }

    if(divelog.night === "true") {
        conditions += "night";
        separateConditionsWithComma(conditions);
    }

    if(divelog.surf === "true") {
        conditions += "surf";
        separateConditionsWithComma(conditions);
    }

    if(divelog.waves === "true") {
        conditions += "waves";
        separateConditionsWithComma(conditions);
    }

    if(divelog.surge === "true") {
        conditions += "surge";
        separateConditionsWithComma(conditions);
    }

    if(divelog.wreck === "true") {
        conditions += "wreck";
        separateConditionsWithComma(conditions);
    }

    if(divelog.reef === "true") {
        conditions += "reef";
        separateConditionsWithComma(conditions);
    }

    if(divelog.deep === "true") {
        conditions += "deep";
        separateConditionsWithComma(conditions);
    }

    if(divelog.photo === "true") {
        conditions += "photo";
        separateConditionsWithComma(conditions);
    }

    if(divelog.drift === "true") {
        conditions += "drift";
        separateConditionsWithComma(conditions);
    }

    if(divelog.training === "true") {
        conditions += "training";
        separateConditionsWithComma(conditions);
    }

    if(divelog.survey === "true") {
        conditions += "survey";
        separateConditionsWithComma(conditions);
    }

    if(divelog.recovery === "true"){
        conditions += "recovery";
        separateConditionsWithComma(conditions);
    }

    if(conditions.length === 0) {
        conditionsContainer.className = "hidden"
    } else {
        conditionsText.set("text", conditions);
    }
}

function separateConditionsWithComma(conditions :string) {
    return ",\n";
}

function determineTemperatureContent(page: Page, divelog: DivelogViewModel) {
    let tempAboveSurfaceContainer = page.getViewById("tempAboveSurfaceContainer");
    let tempAboveSurface = divelog.aboveSurface;
    let tempBelowSurfaceContainer = page.getViewById("tempBelowSurfaceContainer");
    let tempBelowSurface = divelog.belowSurface;
    let tempGroundLevelContainer = page.getViewById("tempGroundLevelContainer");
    let tempGroundLevel = divelog.belowSurface;

    if(tempAboveSurface === null) {
        tempAboveSurfaceContainer.className = "hidden";
    }

    if(tempBelowSurface === null) {
        tempBelowSurfaceContainer.className = "hidden";
    }

    if(tempGroundLevel === null) {
        tempGroundLevelContainer.className = "hidden";
    }
}

function determineCommentContent(page: Page, divelog: DivelogViewModel) {
    let commentContainer = page.getViewById("commentContainer");
    let comment = divelog.comment;

    if(comment === null || comment.trim.length === 0) {
        commentContainer.className = "hidden";
    }
}

function determineVerificationContent(page: Page, divelog: DivelogViewModel) {
    let verificatorNameContainer = page.getViewById("verificatorNameContainer");
    let verificatorName = divelog.verificatorName;
    let verificatorTypeContainer = page.getViewById("verificatorTypeContainer");
    let verificatorTypeLabel = page.getViewById("verificatorType");
    let certificationNumber = divelog.certificationNumber;
    let certificationNumberContainer = page.getViewById("certificationNumberContainer");

    let verificatorType :string;

    if(divelog.instructor === "true") {
        verificatorType = "Instructor";
    }

    if(divelog.diveMaster === "true") {
        verificatorType = "Divemaster";
    }

    if(divelog.buddy === "true") {
        verificatorType = "Buddy";
    }

    verificatorTypeLabel.set("text", verificatorType);

    if(certificationNumber === null) {
        certificationNumberContainer.className = "hidden";
    }
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
        //context: {info: "something you want to pass to your page"},
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