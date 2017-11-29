import { Observable } from "data/observable";
import { MapMarkerItem } from "./map-marker-item";

import {FavoriteService} from "./../favorite/favorite-service";

export class MapViewModel extends Observable {

    public markers: Array<MapMarkerItem>;

    constructor() {
        super();

        this.markers = new Array<MapMarkerItem>();
        let service = new FavoriteService();
        var data = service.loadList();
        data.forEach(element => {
            var mapitem : MapMarkerItem = new MapMarkerItem(element.geoData.gpsCoordLength, element.geoData.gpsCoordWidth, element.name);
            this.markers.push(mapitem);
        });
    }

    getMarker() : Array<MapMarkerItem> {
        return this.markers;
    }
}
