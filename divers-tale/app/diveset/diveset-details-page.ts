import { Image } from 'ui/image';
import { EventData, Observable, PropertyChangeData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { DivesetViewModel } from "./diveset-view-model";
import { ListView } from "ui/list-view"
import { NavigatedData, Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import { TextField } from "ui/text-field";
import { Switch } from "ui/switch";
import { Label } from "ui/label";

var vm: DivesetViewModel;
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
    
    vm = new DivesetViewModel;
    vm.set("divesets", args.context.divesets);
    vm.set("selectedPage", args.context.parentPageName.substring(0));
    vm.set("titel",  args.context.parentPageName.substring(0) + " Details");
    vm.set("editMode", false);
    page = <Page>args.object;
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

export function editButtonTap(args: EventData) {
    vm.set("editMode", true);
}

function refreshList() {
    (<ListView>page.getViewById("ds")).refresh();
}

function refreshCheckButtons() {
    (<ListView>page.getViewById("dx")).refresh();
}

export function cancelEditButtonTap (args: EventData)  {
    vm.set("editMode", false);
    refreshList();
}

export function saveButtonTap(args: EventData) {
    let nameToChange = (<TextField>page.getViewById("name")).text;
    
    let divesetToChange = {
        name: nameToChange,
        id: vm.get("divesets").id,
        equipment: vm.get("divesets").equipment
    }
    vm.editDiveset(divesetToChange);
    
    vm.set("divesets", divesetToChange);
    vm.set("editMode", false);
    
    let navigationEntry = {
        moduleName: "diveset/diveset-details-page",
        context: {
            divesets: vm.get("divesets"),
            parentPageName: vm.get("selectedPage")
        }
    };
    topmost().navigate(navigationEntry);
    refreshList();
}

export function deleteButtonTap(args: EventData) {
    let divesetInitPage = { moduleName: "diveset/diveset-page" };
    var divesetToRemove = vm.get("divesets");
    vm.removeDiveset(divesetToRemove);
    vm.set("editMode", false);
    topmost().navigate(divesetInitPage);
}

export function toggle(args: EventData) {
    let ds = vm.get("divesets");
    let x = ds.equipment[args["index"]]; 
    x.checked = !x.checked;
    refreshCheckButtons();
}