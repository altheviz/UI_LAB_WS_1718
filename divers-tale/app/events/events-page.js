var frameModule = require("ui/frame");
var observableModule = require("data/observable")

var EventsViewModel = require("./events-view-model");

var page;

var eventsModel = new EventsViewModel();

exports.onNavigatingTo = function(args) {
  eventsModel.empty();
  eventsModel.load();

  var pageData = new observableModule.fromObject({
    eventsModel: eventsModel
  });

  page = args.object;
  page.bindingContext = pageData;
}

exports.onDrawerButtonTap = function(args) {
  var sideDrawer = frameModule.topmost().getViewById("sideDrawer");
  sideDrawer.showDrawer();
}

exports.viewDetails = function(args) {
  var event = args.view.bindingContext;
  var navigationOptions = {
    moduleName: "events/details/details-page",
    context: { event: event, eventsModel: eventsModel }
  }
  frameModule.topmost().navigate(navigationOptions);
};

exports.newEvent = function() {
  var navigationOptions = {
    moduleName: "events/edit/edit-page",
    context: { isNewEvent: true, event: null, eventsModel: eventsModel },
    backstackVisible: false
  }
  frameModule.topmost().navigate(navigationOptions);  
}