import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { ChecklistViewModel } from "./checklist-view-model";
import * as dialogs from "ui/dialogs";
import { ListView } from "ui/list-view"
import { TextField } from "ui/text-field"

var page: Page;
var vm: ChecklistViewModel;

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
    vm = new ChecklistViewModel();
    page = <Page>args.object;
    vm.set("selectedPage", "checklist");
    vm.initList();
    vm.set("editMode", false);
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


export function toggle(args: EventData) {
    let item = vm.getItems().getItem(args["index"]);
    item.checked = !item.checked;
    vm.getItems().setItem(args["index"], item);
    vm.storeList();
    console.log("toggle" + item.checked);
}
export function editButtonTap (args: EventData)  {
    vm.set("editMode", true);
}

export function newButtonTap (args: EventData)  {
    vm.setList({
        id: vm.getNewId(),
        name: "Neue Liste",
        items: []
    });
    vm.set("editMode", true);
}
export function defaultButtonTap (args: EventData)  {
    vm.setAsDefault(vm.get("listId"));
}
export function listButtonTap (args: EventData) {
    let lists = vm.getLists();
    dialogs.action("Wähle eine Liste", "Abbrechen", lists.map(l => l.name)).then((selected: string) => {
        if (selected != "Abbrechen") {
            vm.loadList(lists.find(l => l.name == selected).id);
        }
    });
}
function refreshList() {
    (<ListView>page.getViewById("checklist")).refresh();
}
export function saveButtonTap (args: EventData)  {
    vm.storeList();
    vm.set("editMode", false);
    refreshList();
}

export function cancelEditButtonTap (args: EventData)  {
    vm.setList(vm.getListFromStorage(vm.get("listId")) || vm.getListFromStorage(vm.getDefaultId()));
    vm.set("editMode", false);
    refreshList();
}

export function deleteItem(args)  {
    var item = args.view.bindingContext;
    var index = vm.getItems().indexOf(item);
    vm.getItems().splice(index, 1);
}

export function addButtonTap(args: EventData) {
    (<TextField>page.getViewById("newEntry")).dismissSoftInput();
    console.log("addButtonTap");
    vm.getItems().push({ name: vm.get("newEntryText"), checked: false });
    vm.set("newEntryText", "");
}

export function resetButtonTap(args: EventData){
    vm.getItems().forEach(item => item.checked = false);
    refreshList();
    vm.storeList();
}
