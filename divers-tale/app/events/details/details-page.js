var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var application = require("application");
var dialogs = require("ui/dialogs");

var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var event;
var eventsModel;

var status = new ObservableArray(["Ja", "Nein", "Vielleicht"]);

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

  event = page.navigationContext.event;
  eventsModel = page.navigationContext.eventsModel;

  var editButtonVisible;
  if (!eventsModel.isCreator(event) || event.canceled) {
    editButtonVisible = "collapse";
  } else {
    editButtonVisible = "visible";
  }

  var deleteButtonVisible;
  if (eventsModel.isCreator(event) && event.canceled) {
    deleteButtonVisible = "visible";
  } else {
    deleteButtonVisible = "collapse";
  }

  var statusIndex = status.indexOf(eventsModel.getUserEventStatus(event));
  var pageData = new observableModule.fromObject({
    event: event,
    editButtonVisible: editButtonVisible,
    deleteButtonVisible: deleteButtonVisible,
    status: status,
    selectedStatus: statusIndex === -1 ? null : statusIndex,
    divebuddiesList: eventsModel.getParticipants(event)
  });

  page.bindingContext = pageData;
}

exports.goBack = function() {
  var navigationOptions = {
    moduleName: "events/events-page",
    clearHistory: true
  }
  frameModule.topmost().navigate(navigationOptions);
}

exports.editEvent = function() {
  var navigationOptions = {
    moduleName: "events/edit/edit-page",
    context: { isNewEvent: false, event: event, eventsModel: eventsModel },
    backstackVisible: false
  }
  frameModule.topmost().navigate(navigationOptions);
}

exports.viewDivesite = function() {
  frameModule.topmost().navigate("divesite/divesite-page");
  var navigationOptions = {
    moduleName: "divesite/favorite/favorite-detail/favoriteInfo-page",
    context: { index: event.divesite.id }
  }
  frameModule.topmost().navigate(navigationOptions);
};

exports.viewDivebuddy = function(args) {
  var divebuddy = args.view.bindingContext;
  var user = eventsModel.getDiveBuddyById(divebuddy.id);
  var certifications = [];
  user.certificates.forEach(function(id) {
    certifications.push(eventsModel.getCertificateById(id))
  });

  var navigationOptions = {
    moduleName: "divebuddies/user-details/user-details-page",
    context: { user: user, certifications: certifications }
  }
  frameModule.topmost().navigate(navigationOptions);
};

exports.statusChanged = function(args) {
  eventsModel.changeUserEventStatus(event, status.getItem(args.newIndex));
}

exports.deleteEvent = function() {
  dialogs.confirm({
    title: "Event löschen",
    message: "Sind sie sicher, dass sie das Event '" + event.name + "' löschen wollen?",
    okButtonText: "Ja",
    cancelButtonText: "Nein"
  }).then(function (result) {
    if (result) {
      eventsModel.delete(event);
      module.exports.goBack();
    }
  });
}