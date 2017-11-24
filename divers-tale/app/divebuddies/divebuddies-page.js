const frameModule = require("ui/frame");

const DivebuddiesViewModel = require("./divebuddies-view-model");

var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");

var divebuddiesModel = new DivebuddiesViewModel();
var myDivebuddies;
var groupTabSelected = false;

var id;
var page;

var sex = new ObservableArray(["", "Male", "Female"]);
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    divebuddiesModel.empty();
    divebuddiesModel.load();


    id = 1;//Wird über Session (oder so) übergeben
    myDivebuddies = divebuddiesModel.getMyDiveBuddies(id);
    var pageData = new observableModule.fromObject({
        myDivebuddies: myDivebuddies,
        myGroups: divebuddiesModel.getMyGroups(id),
        groupTabSelected: groupTabSelected,
        sex: sex

    });

    page = args.object;
    page.bindingContext = pageData;

}

function viewUserDetails(args) {
    var user = args.view.bindingContext;
    var navigationOptions = {
        moduleName: "divebuddies/user-details/user-details-page",
        context: { user: user, certifications: divebuddiesModel.getCertificatesOfUser(user) }
    }
    frameModule.topmost().navigate(navigationOptions);
};

function viewGroupDetails(args) {
    var group = args.view.bindingContext;
    var navigationOptions = {
        moduleName: "divebuddies/group-details/group-details-page",
        context: { id: id, group: group, divebuddiesOfGroup: divebuddiesModel.getDivebuddiesOfGroup(group), divebuddiesModel: divebuddiesModel }
    }
    frameModule.topmost().navigate(navigationOptions);
};

function search(args) {

    var dropdown = page.getViewById("sex");

    var sexValue = dropdown.selectedIndex
    if (sexValue == null) {
        sexValue = ""
    } else {
        sexValue = sex.getItem(dropdown.selectedIndex)
    }

    var navigationOptions = {
        moduleName: "divebuddies/search/search-page",
        context: {
            searchedUser: divebuddiesModel.getSearchedUser(id, page.getViewById("nickname").text,
                sexValue, page.getViewById("age").text, page.getViewById("city").text, page.getViewById("region").text, page.getViewById("country").text,
                page.getViewById("experience").text, page.getViewById("certificate").text),
            divebuddiesModel: divebuddiesModel
        }
    }
    frameModule.topmost().navigate(navigationOptions);

}

function newGroup(args) {
    dialogs.prompt({
        title: "Create new group",
        message: "Enter name for new group",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",

        inputType: dialogs.inputType.text
    }).then(function (r) {
        if (r.result) {
            var added = divebuddiesModel.addnewGroup(id, r.text);
            if (added) {
                page.bindingContext.myGroups = divebuddiesModel.getMyGroups(id)
            }
            else {
                dialogs.alert({
                    title: "Error",
                    message: "Group already exists"
                  });
            }

        }

    });
}

function deleteGroup(args) {
    var group = args.view.bindingContext;
    dialogs.confirm({
        title: "Delete " + group.name,
        message: "Are you sure that you want to delete " + group.name + "?",
        okButtonText: "Yes",
        cancelButtonText: "No"
    }).then(function (result) {
        if (result) {
            divebuddiesModel.deleteGroup(id, group.id);
            page.bindingContext.myGroups = divebuddiesModel.getMyGroups(id)
        }
    });
}

function addToGroup(args) {
    var user = args.view.bindingContext;
    var availablegroups = divebuddiesModel.getavailableGroups(id, user.id)
    if(availablegroups.length === 0){
        dialogs.alert({
            title: "Error",
            message: "No Groupe available to add the User"
          });
    } else {
        dialogs.action({
            message: "Which Group do you want to add " + user.nickname + "?",
            cancelButtonText: "Cancel",
            actions: availablegroups
        }).then(function (result) {
            divebuddiesModel.addUsertoGroup(id, user.id, result);
        });
    }


}

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function onSelectedIndexChanged(args){
    if(args.newIndex == 1){
        page.bindingContext.groupTabSelected = true
    } else {
        page.bindingContext.groupTabSelected = false
    }
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.viewGroupDetails = viewGroupDetails;
exports.viewUserDetails = viewUserDetails;
exports.search = search;
exports.newGroup = newGroup;
exports.deleteGroup = deleteGroup;
exports.addToGroup = addToGroup;
exports.onSelectedIndexChanged = onSelectedIndexChanged;