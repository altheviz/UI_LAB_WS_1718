import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { EquipmentViewModel } from "./equipment-view-model";
import * as utils from "utils//utils";
import { TextField } from "ui/text-field";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
var vm: EquipmentViewModel;
var page: Page;
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
    vm = new EquipmentViewModel;
    vm.set("equipment", args.context.equipment);
    vm.set("selectedPage", "Details");
    vm.set("titel", "Details");
    vm.set("editMode", false);
    
    page.bindingContext = vm
}

export function openWiki() {
    utils.openUrl(vm.get("fItem")["details"]);
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

export function editButtonTap(args: EventData) {
    vm.set("editMode", true);
    console.log("edit - edit mode true");
}

export function confirmEdit(args){
    vm.set("editMode", false);
    var eqName2 = (<TextField>page.getViewById("name")).text;
    var eqDescription2 = (<TextField>page.getViewById("description")).text;
    var eqEinkaufdatum2 = (<TextField>page.getViewById("purchaseDate")).text;
    var eqEpreis2 = (<TextField>page.getViewById("purchasePrice")).text;
    var eqInspektion2 = (<TextField>page.getViewById("nextInspection")).text;
    var editedequipment = {
        id: vm.get("equipment").id,
        name: eqName2,
        description: eqDescription2,
        purchaseDate: eqEinkaufdatum2,
        purchasePrice:eqEpreis2,
        nextInspection: eqInspektion2
    }
    vm.editentry(editedequipment);
    vm.set("equipment", editedequipment);
}

export function cancelButtonTap(args: EventData) {
    vm.set("editMode", false);
    console.log("cancel - edit mode false");
}

export function deleteButtonTap(args: EventData) {
    let equipmentInitPage = { moduleName: "equipment/equipment-page" };
    
    var equipmentToRemove = vm.get("equipment");
    vm.removeEquipment(equipmentToRemove);
    topmost().navigate(equipmentInitPage);
}


