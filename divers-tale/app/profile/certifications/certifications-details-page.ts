import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import * as utils from "utils//utils";
import * as dialogs from "ui/dialogs";

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
let viewModel = new Observable();
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    viewModel.set("certification", args.context.certification); 
    const page = <Page>args.object;
    page.bindingContext = viewModel
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

export function editButtonTap (args: EventData)  {
    console.log("Test");//JSON.stringify(document));
}


export function deleteButtonTap (args: EventData)  { 
    dialogs.confirm("Do you want to delete this certification?").then(result => {
        if (result) {
            // delete item

            // back to ListView
        }
    });
}
