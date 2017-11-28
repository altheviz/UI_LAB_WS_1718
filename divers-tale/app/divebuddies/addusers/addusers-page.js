var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var application = require("application");

var ObservableArray = require("data/observable-array").ObservableArray;
var dialogs = require("ui/dialogs");
var view = require("ui/core/view");

var page;
var group;
var id;
var divebuddiesOfGroup;
var divebuddiesModel;
var users;

function handleBackButton(args) {
  args.cancel = true;
  module.exports.goBack();
}

exports.onNavigatingFrom = function () {
  if (application.android) {
    application.android.off(application.AndroidApplication.activityBackPressedEvent, handleBackButton);
  }
}

exports.onNavigatingTo = function (args) {
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
  users = page.navigationContext.users;

  var pageData = new observableModule.fromObject({
    users: users
  });

  page.bindingContext = pageData;
}

exports.viewUserDetails = function (args) {
  var user = args.view.bindingContext;
  var navigationOptions = {
    moduleName: "divebuddies/user-details/user-details-page",
    context: { user: user, certifications: divebuddiesModel.getCertificatesOfUser(user) }
  }
  frameModule.topmost().navigate(navigationOptions);
};

exports.addUsersToGroup = function (args) {
  var checkboxwaschecked = false;
  users.forEach(element => {
    var checkbox = view.getViewById(page, element.id);
    if (checkbox.checked) {
      checkboxwaschecked = true;
      divebuddiesModel.addUsertoGroup(id, element.id, group.name)
    }
  });
  if (checkboxwaschecked) {
    
    frameModule.topmost().goBack();

  } else {
    dialogs.alert({
      title: "Fehler",
      message: "Keinen Divebuddy ausgewählt."
    });
  }

}

exports.goBack = function () {
  frameModule.topmost().goBack();
}