"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("../shared/config");
var EventsService;
(function (EventsService) {
    function getEvents() {
        return fetch(config.apiBaseURL + "/events")
            .then(responseErrorHandler)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            return data;
        })
            .catch(errorHandler);
    }
    EventsService.getEvents = getEvents;
    function getNextEvents(numEvents) {
        return getEvents()
            .then(function (data) {
            data.sort(function (a, b) {
                var first = +new Date(a.time);
                var second = +new Date(b.time);
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
    EventsService.getNextEvents = getNextEvents;
    function errorHandler(response) {
        console.error("HTTP REQUEST FAILED", JSON.stringify(response));
        return new Promise(function (resolve, reject) {
            reject();
        });
    }
    function responseErrorHandler(response) {
        if (!response || !response.status || response.status >= 300) {
            return new Promise(function (resolve, reject) {
                reject(response);
            });
        }
        return response;
    }
})(EventsService = exports.EventsService || (exports.EventsService = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudHMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUEyQztBQUUzQyxJQUFpQixhQUFhLENBK0M3QjtBQS9DRCxXQUFpQixhQUFhO0lBRTVCO1FBQ0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzthQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7YUFDMUIsSUFBSSxDQUFDLFVBQVMsUUFBUTtZQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNBLElBQUksQ0FBQyxVQUFTLElBQUk7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQzthQUNBLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBVmdCLHVCQUFTLFlBVXpCLENBQUE7SUFFRCx1QkFBOEIsU0FBUztRQUN0QyxNQUFNLENBQUMsU0FBUyxFQUFFO2FBQ2YsSUFBSSxDQUFDLFVBQVUsSUFBSTtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUM7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFoQmMsMkJBQWEsZ0JBZ0IzQixDQUFBO0lBRUQsc0JBQXNCLFFBQVE7UUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBOEIsUUFBUTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyxFQS9DZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUErQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIEV2ZW50c1NlcnZpY2Uge1xyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRzKCkge1xyXG4gICByZXR1cm4gZmV0Y2goY29uZmlnLmFwaUJhc2VVUkwgKyBcIi9ldmVudHNcIilcclxuICAgLnRoZW4ocmVzcG9uc2VFcnJvckhhbmRsZXIpXHJcbiAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gIH0pXHJcbiAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0pXHJcbiAgIC5jYXRjaChlcnJvckhhbmRsZXIpO1xyXG4gfSAgIFxyXG5cclxuIGV4cG9ydCBmdW5jdGlvbiBnZXROZXh0RXZlbnRzKG51bUV2ZW50cykge1xyXG4gIHJldHVybiBnZXRFdmVudHMoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgZGF0YS5zb3J0KGZ1bmN0aW9uKGEsYikge1xyXG4gICAgICAgIGxldCBmaXJzdCA9ICtuZXcgRGF0ZShhLnRpbWUpO1xyXG4gICAgICAgIGxldCBzZWNvbmQgPSArbmV3IERhdGUoYi50aW1lKTtcclxuICAgICAgICByZXR1cm4gZmlyc3QgLSBzZWNvbmQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgbWluRXZlbnRzID0gTWF0aC5taW4obnVtRXZlbnRzLCBkYXRhLmxlbmd0aCk7XHJcbiAgICAgIHZhciBldmVudHMgPSBbXTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaW5FdmVudHM7IGkrKykge1xyXG4gICAgICAgIGV2ZW50cy5wdXNoKGRhdGFbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVycm9ySGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIocmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkhUVFAgUkVRVUVTVCBGQUlMRURcIiwgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNwb25zZUVycm9ySGFuZGxlcihyZXNwb25zZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5zdGF0dXMgfHwgcmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxufSJdfQ==