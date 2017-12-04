export class MapMarkerItem {
    public gpsCoordLength: number;
    public gpsCoordWidth: number;
    public title: string;

    constructor(gpsCoordLength: number, gpsCoordWidth: number, title : string) {
        this.gpsCoordLength = gpsCoordLength;
        this.gpsCoordWidth = gpsCoordWidth;
        this.title = title;
    }

    getGpsCoordLength() : number {
        return this.gpsCoordLength;
    }

    getGpsCoordWidth() : number {
        return this.gpsCoordWidth;
    }

    getTitle() : string {
        return this.title;
    }

}