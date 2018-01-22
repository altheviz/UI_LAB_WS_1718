import { Observable, fromObject } from "data/observable";

import { DivelogService } from "../divelog/divelog-service";
import { EventsService } from "../events/events-service";

export class HomeViewModel extends Observable {

    private divelogService: DivelogService;
    
    public lastDivelog;
    public events;
    
    constructor() {
        super();

        // Divelog
        this.divelogService = new DivelogService();
        this.lastDivelog = this.divelogService.loadDivelogs()[0];

        // Events
        EventsService.getNextEvents(3)
            .then((events) => {
                this.events = events;
            });
    }

}
