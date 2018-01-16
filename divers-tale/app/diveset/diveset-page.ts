import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { DivesetViewModel } from "./diveset-view-model";
import { topmost } from "ui/frame";
import {Button} from "ui/button";
import {GestureTypes} from "ui/gestures"
import { NavigatedData, Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import { ListView } from "ui/list-view";
import { TextField } from "ui/text-field";

var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;

var bt: Button;
//var buttonState = 0;
var page: Page;
var vm: DivesetViewModel;


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

    vm = new DivesetViewModel();
    page = <Page>args.object;
    vm.set("selectedPage", "Diveset");
    vm.set("editMode", false);
    vm.init();
    page.bindingContext = vm;
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


export function newDivesetTap(args:EventData){ 
    dialogs.prompt({
        title: "Create new Diveset",
        message: "Add a new Diveset",
        cancelButtonText: "Cancel",
        okButtonText: "OK",
        defaultText: "",
        inputType: dialogs.inputType.text
    }).then(r => {
        if (r.result) {
            vm.addToList({
                //hier der trick. schon das json verwenden :-)
                id: vm.getNewId(),
                name: r.text,
                equipment: []
            });
        } else {
            console.log("Dialog closed! " + r.result + " text: " + r.text);
        }
    });
}

export function detailDivesetTap(args: EventData) {
    var navigationEntry = {
        moduleName: "diveset/diveset-details-page",
        context: {
            divesets: vm.get("divesets").getItem(args["index"]),
             parentPageName: vm.get("selectedPage")
        }
    };
    topmost().navigate(navigationEntry);
    
}