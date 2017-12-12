var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var application = require("application");

var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var user;
var certifications;




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

  user = page.navigationContext.user;
  certifications = page.navigationContext.certifications;

  var pageData = new observableModule.fromObject({
    user: user,
    certifications: certifications
  });

  page.bindingContext = pageData;
}

exports.goBack = function() {
  frameModule.topmost().goBack();
}