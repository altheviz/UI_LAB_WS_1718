import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import observableArray = require("data/observable-array");
import pages = require("ui/page");
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import observable = require("data/observable");
import { EquipmentViewModel } from "./equipment-view-model";
import { DropDown } from "nativescript-drop-down";
//import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { TextField } from "ui/text-field";
import view = require("ui/core/view");
import label = require("ui/text-field");


var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
const vm = new EquipmentViewModel();
var viewModel: observable.Observable;
let textFieldldDescription;
var page: Page;
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

    const pageName: string = "EquipmentAdd";
    vm.set("selectedPage", pageName);
    vm.set("titel", pageName.substring(1));
    const page = <Page>args.object;
    page.bindingContext = vm;
    pageLoaded(args);
}

export function pageLoaded(args: observable.EventData) {
    page = <pages.Page>args.object;
    var items = new observableArray.ObservableArray();

    viewModel = new observable.Observable();

        items.push("Jacket");
        items.push("Wetsuite");
        items.push("Regulator");
        items.push("Computer");
        items.push("Tank");
    

    viewModel.set("items", items);
    viewModel.set("selectedIndex", 0);

    page.bindingContext = viewModel;
 
    
}


/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function saveEntriesTap(args) {
    var eqName = (<TextField>page.getViewById("name")).text;
    var eqDescription = (<TextField>page.getViewById("description")).text
    var eqEinkaufdatum = (<TextField>page.getViewById("purchaseDate")).text
    var eqEpreis = (<TextField>page.getViewById("purchasePrice")).text
    var eqInspektion = (<TextField>page.getViewById("nextInspection")).text
    var eqType = (<TextField>page.getViewById("name")).text

    vm.addToList({
        id: vm.getNewId(),
        name: eqName,
        description: eqDescription,
        purchaseDate: eqEinkaufdatum,
        purchasePrice:eqEpreis,
        nextInspection: eqInspektion,
    })
    console.log("saveEntriesTap");
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function jacket(args: EventData) {
    console.log("Drop Down openead");
}

export function dropDownOpened(args: EventData) {
    console.log("Drop Down opened");
}
 
export function dropDownClosed(args: EventData) {
    console.log("Drop Down closed");
}
 
export function dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}
