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

var sex = new ObservableArray(["", "Männlich", "Weiblich"]);
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    divebuddiesModel.empty();
    divebuddiesModel.load();


    id = 1;//Wird über Session (oder so) übergeben
    refreshMydivebuddies()

    var pageData = new observableModule.fromObject({
        myDivebuddies: myDivebuddies,
        myGroups: myGroups,
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
            divebuddiesModel: divebuddiesModel,
            id: id
        }
    }
    frameModule.topmost().navigate(navigationOptions);

}

function newGroup(args) {
    dialogs.prompt({
        title: "Neue Gruppe erstellen",
        message: "Bitte den Namen der neuen Gruppe eingeben:",
        okButtonText: "Ok",
        cancelButtonText: "Abbrechen",

        inputType: dialogs.inputType.text
    }).then(function (r) {
        if (r.result) {
            if (r.text != "") {
                var added = divebuddiesModel.addnewGroup(id, r.text);
                if (added) {
                    page.bindingContext.myGroups = divebuddiesModel.getMyGroups(id)
                    refreshMydivebuddies()
                    page.bindingContext.myDivebuddies = myDivebuddies
                }
                else {
                    dialogs.alert({
                        title: "Fehler",
                        message: "Gruppe existiert bereits."
                    });
                }
            }
            else {
                dialogs.alert({
                    title: "Fehler",
                    message: "Gruppe hat leeren Namen."
                });
            }
        }

    });
}

function deleteGroup(args) {
    var group = args.view.bindingContext;
    dialogs.confirm({
        title: "Gruppe löschen",
        message: "Sind sie sicher dass sie die Gruppe '" + group.name + "' löschen wollen?",
        okButtonText: "Ja",
        cancelButtonText: "Nein"
    }).then(function (result) {
        if (result) {
            divebuddiesModel.deleteGroup(id, group.id);
            page.bindingContext.myGroups = divebuddiesModel.getMyGroups(id)
            refreshMydivebuddies()
            page.bindingContext.myDivebuddies = myDivebuddies
        }
    });
}

function addToGroup(args) {
    var user = args.view.bindingContext;
    var availablegroups = divebuddiesModel.getavailableGroups(id, user.id)
    dialogs.action({
        message: "Welcher Gruppe wollen sie '" + user.nickname + "' hinzufügen?",
        cancelButtonText: "Abbrechen",
        actions: availablegroups
    }).then(function (result) {
        divebuddiesModel.addUsertoGroup(id, user.id, result);
        refreshMydivebuddies()
        page.bindingContext.myDivebuddies = myDivebuddies
    });

}

function removeBuddy(args) {
    var user = args.view.bindingContext;
    dialogs.confirm({
        title: "Löschen " + user.nickname,
        message: "Sind sie sicher dass sie '" + user.nickname + "' entfernen wollen?",
        okButtonText: "Ja",
        cancelButtonText: "Nein"
    }).then(function (result) {
        if (result) {
            divebuddiesModel.removeDivebuddy(id, user.id);
            refreshMydivebuddies()
            page.bindingContext.myDivebuddies = myDivebuddies
        }
    });
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

function onSelectedIndexChanged(args) {
    if (args.newIndex == 1) {
        page.bindingContext.groupTabSelected = true
    } else {
        page.bindingContext.groupTabSelected = false
    }
}

function refreshMydivebuddies() {
    myDivebuddies = divebuddiesModel.getMyDiveBuddies(id);
    myGroups = divebuddiesModel.getMyGroups(id);
    myDivebuddies.forEach(function (elementUser) {
        elementUser.groupable = true;
        var count = 0;
        for (var i = 0; i < myGroups.length; i++) {
            myGroups[i].divebuddies.forEach(function (divebuddyId) {
                if (elementUser.id == divebuddyId) {
                    count++;
                }
            })
        }
        if (count == myGroups.length) {
            elementUser.groupable = false;
        }

    });
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
exports.removeBuddy = removeBuddy;