import { EventData, Observable } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { User } from "./User";
import { UserService } from "./user-service";
import { TextField } from "ui/text-field";
import * as imagepicker from "nativescript-imagepicker";

let viewModel = new Observable();

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }
 
    // Get current user data and fill profile form
    UserService.getCurrentUser()
        .then((user) => { 
            viewModel.set("user", user);
        });
    viewModel.set("isEditing",false);
    viewModel.set("isEditVisble",true);
    const page = <Page>args.object;
    page.bindingContext = viewModel;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
} 

export function openDocumentsListItem(args: EventData){
    const user = viewModel.get("user");

    //console.log(JSON.stringify(user.documents[args["index"]]));

        var documentEntry = {
            moduleName: "profile/documents/documents-details-page",
            context: {
                documents: user.documents,
                index: args["index"],
            }, 
           animated: false
        };
        topmost().navigate(documentEntry);
}

export function openCertificationsListItem(args: EventData){
    const user = viewModel.get("user");

        var documentEntry = {
            moduleName: "profile/certifications/certifications-details-page",
            context: {
                certifications: user.certifications,
                index: args["index"],
            },
           animated: false
        };
        topmost().navigate(documentEntry);
}

export function editButtonTap ()  {
    (<TextField>topmost().getViewById("userName")).editable=true; 
    (<TextField>topmost().getViewById("userNickname")).editable=true; 
    (<TextField>topmost().getViewById("userEmail")).editable=true; 
    (<TextField>topmost().getViewById("userCity")).editable=true; 
    (<TextField>topmost().getViewById("userRegion")).editable=true; 
    (<TextField>topmost().getViewById("userCountry")).editable=true; 
    (<TextField>topmost().getViewById("userSex")).editable=true; 
    (<TextField>topmost().getViewById("userDateOfBirth")).editable=true; 

    viewModel.set("isEditing",true);
}
export function doneButtonTap ()  {
    (<TextField>topmost().getViewById("userName")).editable=false; 
    (<TextField>topmost().getViewById("userNickname")).editable=false; 
    (<TextField>topmost().getViewById("userEmail")).editable=false; 
    (<TextField>topmost().getViewById("userCity")).editable=false; 
    (<TextField>topmost().getViewById("userRegion")).editable=false; 
    (<TextField>topmost().getViewById("userCountry")).editable=false;
    (<TextField>topmost().getViewById("userSex")).editable=false; 
    (<TextField>topmost().getViewById("userDateOfBirth")).editable=false;  

    viewModel.set("isEditing",false);
}


export function onSelectedIndexChanged(args: any) {
    if (args.newIndex == 0) {
        viewModel.set("isEditVisble",true);
    } else {
        doneButtonTap();
        viewModel.set("isEditVisble",false);
    }
}

export function onFabTapCerti(args: EventData) {
    const user = viewModel.get("user");

    user.certifications.push({
        "name": "New",
        "description": "",
        "img": "res://icon"
      });
}
 
export function onFabTapDoc(args: EventData) {
    const user = viewModel.get("user");

    user.documents.push({
        "name": "New",
        "description": "",
        "img": "res://icon"
      });

}

export function openImage() {
    if (viewModel.get("isEditing") ) {
        const user = viewModel.get("user");

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
                    user.profileImage = imagesource;
                })
            });
        }).catch(function (e) {
        // process error
        });

    }
}
export function selectDate(args: EventData) {
    if (viewModel.get("isEditing") ) {
        const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        const picker = new ModalPicker();

        const user = viewModel.get("user");

        picker.pickDate({
            title: "Bitte Datum auswählen:",
            theme: "light",
            minDate: new Date()
          }).then(function(result) {

            user.dateOfBirth = result.day + "." + result.month + "." + result.year;

          }).catch(function(error) {
            console.log("DatePicker error: " + error);
          });
    }
}