var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var dialogs = require("ui/dialogs");

var ValueList = require("nativescript-drop-down").ValueList;
var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var event;
var eventsModel;
var isNewEvent;
var newEvent;
var divesiteItemSource;

var picker = new ModalPicker();
var types = new ObservableArray(["Tauchen", "Club", "Event"]);

function validateEvent() {
  if (newEvent.name === "" || newEvent.type === "" || newEvent.divesite === undefined
    || newEvent.time === "" || newEvent.date === "" || newEvent.comment === "") {
    return false;
  }
  return true;
}

exports.onNavigatingTo = function(args) {
  if (args.isBackNavigation) {
    return;
  }

  page = args.object;

  isNewEvent = page.navigationContext.isNewEvent;
  eventsModel = page.navigationContext.eventsModel;
  event = page.navigationContext.event;

  divesiteItemSource = new ValueList();
  divesiteItemSource.push({ value: null, display: "<Nichts ausgewählt>" });

  var divesitesDD = page.getViewById("divesitesDD");
  divesitesDD.items = divesiteItemSource;

  var selectedDivesite = 0;
  var divesites = eventsModel.getAllDivesites();
  divesites.sort(function(a,b) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });

  for (var i = 0; i < divesites.length; i++) {
    divesiteItemSource.push({ value: divesites[i].id, display: divesites[i].name });
    if (!isNewEvent && event.divesite !== null && event.divesite.id === divesites[i].id) {
      selectedDivesite = i + 1;        
    }    
  }

  var selectedType;
  var cancelVisible;

  if (isNewEvent) {

    newEvent = {
      id: eventsModel.getNewEventId(),
      name: "",
      type: "",
      time: "",
      date: "",
      divesite: undefined,
      comment: "",
      participants: [],
      creator: eventsModel.getUserId(),
      canceled: false,
      canceledDate: null
    }

    selectedType = null;
    selectedDivesite = null;
    cancelVisible = "collapse";

  } else {

    newEvent = {
      id: event.id,
      name: event.name,
      type: event.type,
      time: event.time,
      date: event.date,
      divesite: event.divesite,
      comment: event.comment,
      participants: event.participants,
      creator: event.creator,
      canceled: event.canceled,
      canceledDate: event.canceledDate
    }

    selectedType = types.indexOf(event.type);
    cancelVisible = "visible";
  }

  var pageData = new observableModule.fromObject({
    event: newEvent,
    types: types,
    selectedType: selectedType,
    selectedDivesite: selectedDivesite,
    cancelVisible: cancelVisible,
    isNewEvent: isNewEvent
  });  

  page.bindingContext = pageData;
}

exports.typeChanged = function(args) {
  newEvent.type = types.getItem(args.newIndex);
}

exports.divesiteChanged = function(args) {
  newEvent.divesite = eventsModel.getDiveSiteById(divesiteItemSource.getValue(args.newIndex));
}

exports.discardChanges = function() {
  if (isNewEvent) {
    frameModule.topmost().goBack();
    return;      
  }
  var navigationOptions = {
    moduleName: "events/details/details-page",
    context: { event: event, eventsModel: eventsModel },
    backstackVisible: false
  }
  frameModule.topmost().navigate(navigationOptions);
}

exports.saveChanges = function() {
  if (!validateEvent()) {
    dialogs.alert({
      title: "Fehler",
      message: "Nicht alle Felder ausgefüllt."
    });
    return;
  }
  if (isNewEvent) {
    eventsModel.add(newEvent);    
  } else {
    eventsModel.update(newEvent);
  }

  var navigationOptions = {
    moduleName: "events/details/details-page",
    context: { event: newEvent, eventsModel: eventsModel },
    backstackVisible: false
  }
  frameModule.topmost().navigate(navigationOptions);
}

exports.cancelEvent = function() {
  dialogs.confirm({
    title: "Event absagen",
    message: "Sind sie sicher, dass sie das Event '" + event.name + "' absagen wollen?",
    okButtonText: "Ja",
    cancelButtonText: "Nein"
  }).then(function (result) {
    if (result) {
      var date = new Date();
      var canceledDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      event.canceled = true;
      event.canceledDate = canceledDate;
      eventsModel.update(event);

      var navigationOptions = {
        moduleName: "events/details/details-page",
        context: { event: event, eventsModel: eventsModel },
        backstackVisible: false
      }
      frameModule.topmost().navigate(navigationOptions);
    }
  });
}

exports.selectDate = function() {
  picker.pickDate({
    title: "Bitte Datum auswählen:",
    theme: "light",
    minDate: new Date()
  }).then(function(result) {
    newEvent.date = result.day + "." + result.month + "." + result.year;
    var dateField = page.getViewById("dateField");
    dateField.text = newEvent.date;
  }).catch(function(error) {
    console.log("DatePicker error: " + error);
  });
};

exports.selectTime = function() {
  picker.pickTime({
    is24HourView: true
  }).then(function(result) {
    var hour = result.hour < 10 ? '0' + result.hour : result.hour;
    var minute = result.minute < 10 ? '0' + result.minute : result.minute;
    newEvent.time = hour + ":" + minute;
    var timeField = page.getViewById("timeField");
    timeField.text = newEvent.time;
  }).catch(function(error) {
    console.log("TimePicker error: " + error);
  });
};