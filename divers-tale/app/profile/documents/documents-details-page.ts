import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { TextField } from "ui/text-field";
import { TextView } from "ui/text-view";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { Image } from "ui/image";
import * as utils from "utils//utils";
import * as dialogs from "ui/dialogs";
import * as imagepicker from "nativescript-imagepicker";

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

    viewModel.set("document", args.context.documents[args.context.index]);
    viewModel.set("index", args.context.index);
    viewModel.set("documents", args.context.documents);
    viewModel.set("isEditing",false);
    const page = <Page>args.object;
    page.bindingContext = viewModel
}
export function editButtonTap (args: EventData)  {
    const itemName = <TextField>topmost().getViewById("docName"); 
    const itemDes = <TextView>topmost().getViewById("docDes");
    itemName.editable=true;
    itemDes.editable=true;
    viewModel.set("isEditing",true);
}
export function doneButtonTap (args: EventData)  {
    const itemName = <TextField>topmost().getViewById("docName"); 
    const itemDes = <TextView>topmost().getViewById("docDes");
    itemName.editable=false;
    itemDes.editable=false;
    viewModel.set("isEditing",false);
}

export function openImage() {
    if (viewModel.get("isEditing") ) {

        let context = imagepicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function() {
                return context.present();
            })
            .then(function(selection) {
                selection.forEach(function(selected) {
                // process the selected image
                selected.getImage().then(function(imagesource){
                    viewModel.get("document").img= imagesource;
                })
            });
        }).catch(function (e) {
        // process error
        });

    }
}



export function goBack() {
    topmost().goBack();
}

export function deleteButtonTap (args: EventData)  { 
    dialogs.confirm("Do you want to delete this document?").then(result => {
        if (result) {
            // delete item
            const index = viewModel.get("index");
            const documents = viewModel.get("documents");

            documents.splice(index,1);

            goBack();// back to ListView
        }
    });
}
