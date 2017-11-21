var frameModule = require("ui/frame");

var ObservableArray = require("data/observable-array").ObservableArray;

var data = require("./static_data");

var events_data = data.events_data;

function convertDatestring(event) {
  var str = event.date.split(".");
  var datestring = str[2]+ "-" + str[1] + "-" + str[0] + " " + event.time + ":00";
  var isodatestring = (new Date(datestring).toISOString());
  var date = isodatestring.split(".")[0].replace("T", " ");
  return date;
}

function createEventData(event) {
  var canceledDate = null;
  if (event.canceled) {
    str = event.canceledDate.split(".");
    canceledDate = str[2]+ "-" + str[1] + "-" + str[0];
  }

  var res = {
    id: event.id,
    name: event.name,
    type: event.type,
    time: convertDatestring(event),
    divesite: event.divesite === null ? null : event.divesite.id,
    comment: event.comment,
    canceled: event.canceled,
    canceledDate: canceledDate,
    participants: event.participants,
    creator: event.creator
  }
  return res;
}

function getDiveBuddyById(id) {
  for (var i = 0; i < data.user_data.divebuddies.length; i++) {
    var divebuddy = data.user_data.divebuddies[i];
    if (divebuddy.id === id) {
      return divebuddy;
    }
  }
  return null;
}

function EventsViewModel() {

  var viewModel = new ObservableArray();

  viewModel.load = function() {
    events_data.forEach(function(element) {
      var date = new Date(element.time + " UTC");
      var day = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      
      var canceledDate = null;
      if (element.canceled) {
        var str = element.canceledDate.split("-");
        canceledDate = str[2] + "." + str[1] + "." + str[0];
      }

      viewModel.push({
        id: element.id,
        name: element.name,
        divesite: viewModel.getDiveSiteById(element.divesite),
        type: element.type,
        date: day,
        time: date.toLocaleTimeString().substring(0, 5),
        comment: element.comment,
        canceled: element.canceled,
        canceledDate: canceledDate,
        participants: element.participants,
        creator: element.creator
      });
    });

    viewModel.sort(function(a,b) {
      return new Date(convertDatestring(a)) - new Date(convertDatestring(b));
    });
  };

  viewModel.empty = function() {
    while (viewModel.length) {
      viewModel.pop();
    }
  };

  viewModel.update = function(event) {
    for (var i = 0; i < viewModel.length; i++) {
      if (viewModel.getItem(i).id === event.id) {
        viewModel.setItem(i, event);
        break;
      }
    };

    for (var i = 0; i < events_data.length; i++) {
      if (events_data[i].id === event.id) {
        events_data[i] = createEventData(event);
        break;
      }
    }
  }

  viewModel.add = function(event) {
    viewModel.changeUserEventStatus(event, "Ja");
    viewModel.push(event);
    events_data.push(createEventData(event));
  }

  viewModel.delete = function(event) {
    for (var i = 0; i < viewModel.length; i++) {
      if (viewModel.getItem(i).id === event.id) {
        viewModel.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < events_data.length; i++) {
      if (events_data[i].id === event.id) {
        events_data.splice(i, 1);
        break;
      }
    }
  }

  viewModel.getParticipants = function(event) {
    var participants = [];
    event.participants.forEach(function(element) {
      var divebuddy = getDiveBuddyById(element.id);
      if (divebuddy !== null) {
        participants.push({id: element.id, name: divebuddy.name, status: element.status});
      }
    });
    return participants;
  }

  viewModel.getAllDivesites = function() {
    return data.divesites_data;
  }

  viewModel.getUserEventStatus = function(event) {
    var status = null;
    event.participants.forEach(function(element) {
      if (element.id === data.user_data.id) {
        status = element.status;
      }
    });
    return status;
  }

  viewModel.changeUserEventStatus = function(event, status) {
    var isNewParticipant = true;
    event.participants.forEach(function(element) {
      if (element.id === data.user_data.id) {
        element.status = status;
        isNewParticipant = false;
      }
    });

    if (isNewParticipant) {
      event.participants.push({id: data.user_data.id, status: status});
    }

    viewModel.update(event);
  }

  viewModel.isCreator = function(event) {
    return event.creator === data.user_data.id;
  }

  viewModel.getUserId = function(event) {
    return data.user_data.id;
  }

  viewModel.getDiveSiteById = function(id) {
    for (var i = 0; i < data.divesites_data.length; i++) {
      var divesite = data.divesites_data[i];
      if (divesite.id === id) {
        return divesite;
      }
    }
    return null;
  }

  viewModel.getNewEventId = function() {
    var id = 0;
    viewModel.forEach(function(element) {
      if (element.id > id) {
        id = element.id;
      }
    });
    return id + 1;
  }

  return viewModel;
}

module.exports = EventsViewModel;