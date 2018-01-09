"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var observableArray = require("data/observable-array");
var observable = require("data/observable");
var equipment_view_model_1 = require("./equipment-view-model");
var vm = new equipment_view_model_1.EquipmentViewModel();
var viewModel;
var textFieldldDescription;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    var pageName = "EquipmentAdd";
    vm.set("selectedPage", pageName);
    vm.set("titel", pageName.substring(1));
    var page = args.object;
    page.bindingContext = vm;
    pageLoaded(args);
}
exports.onNavigatingTo = onNavigatingTo;
function pageLoaded(args) {
    var page = args.object;
    var items = new observableArray.ObservableArray();
    viewModel = new observable.Observable();
    items.push("Jacket");
    items.push("Wetsuite");
    items.push("Regulator");
    items.push("Computer");
    items.push("Tank");
    items.push("AA");
    items.push("AA");
    viewModel.set("items", items);
    viewModel.set("selectedIndex", 0);
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
function saveEntriesTap(args) {
    console.log("saveEntriesTap");
    console.log("saveEntriesTap");
    console.log("saveEntriesTap");
}
exports.saveEntriesTap = saveEntriesTap;
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function jacket(args) {
    console.log("Drop Down openead");
}
exports.jacket = jacket;
function dropDownOpened(args) {
    console.log("Drop Down opened");
}
exports.dropDownOpened = dropDownOpened;
function dropDownClosed(args) {
    console.log("Drop Down closed");
}
exports.dropDownClosed = dropDownClosed;
function dropDownSelectedIndexChanged(args) {
    console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
}
exports.dropDownSelectedIndexChanged = dropDownSelectedIndexChanged;
