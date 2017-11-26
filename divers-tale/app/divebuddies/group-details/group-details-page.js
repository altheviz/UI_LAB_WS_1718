var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var application = require("application");

var ObservableArray = require("data/observable-array").ObservableArray;
var dialogs = require("ui/dialogs");

var page;
var group;
var id;
var divebuddiesOfGroup;
var divebuddiesModel;

function handleBackButton(args) {
  args.cancel = true;
  module.exports.goBack();
}

exports.onNavigatingFrom = function() {
  if (application.android) {
    application.android.off(application.AndroidApplication.activityBackPressedEvent, handleBackButton);
  }
}

exports.onNavigatingTo = function(args) {
  if (args.isBackNavigation) {
    return;
  }

  if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, handleBackButton);
  }

  page = args.object;

  id = page.navigationContext.id;
  group = page.navigationContext.group;
  divebuddiesOfGroup = page.navigationContext.divebuddiesOfGroup;
  divebuddiesModel = page.navigationContext.divebuddiesModel;


  var pageData = new observableModule.fromObject({
    divebuddiesOfGroup: divebuddiesOfGroup,
    group: group
  });

  page.bindingContext = pageData;
}

exports.viewUserDetails = function(args) {
  var user = args.view.bindingContext;
  var navigationOptions = {
      moduleName: "divebuddies/user-details/user-details-page",
      context: { user: user, certifications: divebuddiesModel.getCertificatesOfUser(user) }
  }
  frameModule.topmost().navigate(navigationOptions);
};

exports.deleteUser = function(args) {
  var user = args.view.bindingContext;
  dialogs.confirm({
    title: "Benutzer entfernen",
    message: "Sind sie sicher, dass sie '" + user.nickname + "' von der Gruppe '" + group.name + "' entfernen wollen?",
    okButtonText: "Ja",
    cancelButtonText: "Nein"
}).then(function (result) {
    if (result) {
        divebuddiesModel.deleteUserFromGroup(id, group.id, user.id);
        page.bindingContext.divebuddiesOfGroup = divebuddiesModel.getDivebuddiesOfGroup(group)
    }
});
};


exports.goBack = function() {
  frameModule.topmost().goBack();
}