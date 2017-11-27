var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var application = require("application");

var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var user;
var id;

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
  // if (args.isBackNavigation) {
  //   return;
  // }

  if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, handleBackButton);
  }

  page = args.object;

  searchedUser = page.navigationContext.searchedUser;
  divebuddiesModel = page.navigationContext.divebuddiesModel;
  invitationModel = page.navigationContext.invitationModel;
  id = page.navigationContext.id;
  var divebuddies = divebuddiesModel.getMyDiveBuddies(id);
  searchedUser.forEach(function(elementuser){
    elementuser.addable = true;
    divebuddies.forEach(function(divebuddyelement){
      if(elementuser.id == divebuddyelement.id || invitationModel.contains(id, elementuser.id)){
        elementuser.addable = false;
      }
    })
  });

  var pageData = new observableModule.fromObject({
    searchedUser: searchedUser,
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

exports.inviteUser = function(args) {
  var user = args.view.bindingContext;
  var navigationOptions = {
    moduleName: "invitations/invite/invite-page",
    context: { 
      fromUser: id, 
      toUser: user, // id of the logged user should be passed
      divebuddiesModel : divebuddiesModel
    }
  }
  frameModule.topmost().navigate(navigationOptions);

};

exports.goBack = function() {
  frameModule.topmost().goBack();
};