import * as config from "../shared/config";

export namespace EventsService {

  export function getEvents() {
   return fetch(config.apiBaseURL + "/events")
   .then(responseErrorHandler)
   .then(function(response) {
    return response.json();
  })
   .then(function(data) {
    return data;
  })
   .catch(errorHandler);
 }   

 export function getNextEvents(numEvents) {
  return getEvents()
    .then(function (data) {
      data.sort(function(a,b) {
        let first = +new Date(a.time);
        let second = +new Date(b.time);
        return first - second;
      });
      var minEvents = Math.min(numEvents, data.length);
      var events = [];
      for (var i = 0; i < minEvents; i++) {
        events.push(data[i]);
      }
      return events;
    })
    .catch(errorHandler);
  }

  function errorHandler(response): Promise<any> {
    console.error("HTTP REQUEST FAILED", JSON.stringify(response));
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  function responseErrorHandler(response): Promise<any> {
    if (!response || !response.status || response.status >= 300) {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
    return response;
  }
}