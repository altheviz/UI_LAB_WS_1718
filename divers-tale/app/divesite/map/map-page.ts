import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { MapViewModel } from "./map-view-model";

import {MapMarkerItem } from "./map-marker-item";

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    var navContext = page.navigationContext;
    page.bindingContext = new MapViewModel();
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

/*******************
* Map specific content
*/

var mapsModule = require("nativescript-google-maps-sdk");

function onMapReady(args) {
  var mapView = args.object;

  var mapModel = new MapViewModel();
  
  //add markers for each item to map
  mapModel.getMarker().forEach(mapMarkerItem => {
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(mapMarkerItem.getGpsCoordWidth(), mapMarkerItem.getGpsCoordLength());
    marker.title = mapMarkerItem.getTitle();
    mapView.addMarker(marker);
  });

  //center on HSKA
  mapView.latitude = 49.01566599999999;
  mapView.longitude = 8.389605999999958;
  mapView.zoom = 9;

  // Enable zoom gestures
  mapView.settings.zoomGesturesEnabled = true;

}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera));
}

exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
