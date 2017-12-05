var frameModule = require("ui/frame");
var observableModule = require("data/observable")

var EventsViewModel = require("./events-view-model");

var page;

var eventsModel = new EventsViewModel();

function loadItems() {
  eventsModel.empty();
  eventsModel.load();

  var pageData = new observableModule.fromObject({
    eventsModel: eventsModel
  });

  page.bindingContext = pageData;
}

exports.onNavigatingTo = function(args) {
  page = args.object;
  loadItems(args);
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

exports.refreshList = function(args) {
  var pullRefresh = args.object;
  //make sure we have a timeout somewhere later
  loadItems();
  pullRefresh.refreshing = false;
}