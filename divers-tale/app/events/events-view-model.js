var frameModule = require("ui/frame");

var ObservableArray = require("data/observable-array").ObservableArray;

var config = require("../shared/config");
var data = require("./static_data");
var events_service = require("./events-service").EventsService;
var divesites_service = require("../divesite/data-service");

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
    creator: event.creator,
    image: event.image
  }
  return res;
}

function responseErrorHandler(response) {
  if (!response || !response.status || response.status >= 300) {
    return new Promise(function (resolve, reject) {
      reject(response);
    });
  }
  return response;
}

function errorHandler(response) {
  console.error("HTTP REQUEST FAILED", JSON.stringify(response));
  return new Promise(function (resolve, reject) {
      reject();
  });
}

function EventsViewModel() {

  var viewModel = new ObservableArray();

  viewModel.load = function() {

    events_service.getEvents()
      .then(function (data) {
        data.forEach(function(element) {
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
            creator: element.creator,
            image: element.image
          });
        });

        viewModel.sort(function(a,b) {
          return new Date(convertDatestring(a)) - new Date(convertDatestring(b));
        });
      })
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

    fetch(config.apiBaseURL + "/events/" + event.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventData(event))
    })
    .catch (function (error) {
      console.log('Request failed', error);
    });
  }

  viewModel.add = function(event) {
    viewModel.changeUserEventStatus(event, "Ja");
    viewModel.push(event);

    fetch(config.apiBaseURL + "/events", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventData(event))
    })
    .catch (function (error) {
      console.log('Request failed', error);
    });
  }

  viewModel.delete = function(event) {
    for (var i = 0; i < viewModel.length; i++) {
      if (viewModel.getItem(i).id === event.id) {
        viewModel.splice(i, 1);
        break;
      }
    }

    fetch(config.apiBaseURL + "/events/" + event.id, {
      method: 'DELETE'
    })
    .catch (function (error) {
      console.log('Request failed', error);
    });
  }

  viewModel.getParticipants = function(event) {
    var participants = [];
    event.participants.forEach(function(element) {
      var divebuddy = viewModel.getDiveBuddyById(element.id);
      if (divebuddy !== null && divebuddy.id !== viewModel.getUserId()) {
        participants.push({id: element.id, name: divebuddy.name, status: element.status});
      }
    });
    return participants;
  }

  viewModel.getAllDivesites = function() {
    var service = new divesites_service.DataService();
    return service.loadList();
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
    var divesites = viewModel.getAllDivesites();
    for (var i = 0; i < divesites.length; i++) {
      var divesite = divesites[i];
      if (divesite.id === id) {
        return divesite;
      }
    }
    return null;
  }

  viewModel.getDiveBuddyById = function(id) {
    for (var i = 0; i < data.divebuddies_data.divebuddies_data.length; i++) {
      var divebuddy = data.divebuddies_data.divebuddies_data[i];
      if (divebuddy.id === id) {
        return divebuddy;
      }
    }
    return null;
  }

  viewModel.getNewEventId = function() {
    var id = 0;
    return fetch(config.apiBaseURL + "/events")
    .then(responseErrorHandler)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function(element) {
        if (element.id > id) {
          id = element.id;
        }
      });
      return id + 1;
    })
    .catch(function() {
      viewModel.forEach(function(element) {
        if (element.id > id) {
          id = element.id;
        }
      });
      return id + 1;
    });
  }

  viewModel.getCertificateById = function(id) {
    for (var i = 0; i < data.divebuddies_data.certification_data.length; i++) {
      var certification = data.divebuddies_data.certification_data[i];
      if (certification.id === id) {
          return certification;
      }
    }
    return null;
  }

  return viewModel;
}

module.exports = EventsViewModel;