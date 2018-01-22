import { Observable, fromObject } from "data/observable";

import { DivelogService } from "../divelog/divelog-service";

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
        this.events = [
            {
                id: 2,
                name: "Essen und Nachttauchen",
                type: "Tauchen",
                time: "2018-08-29 16:00:00",
                divesite: 1,
                comment: "Erst essen, dann tauchen.",
                canceled: false,
                canceledDate: null,
                participants: [
                    {
                        id: 2,
                        status: "Ja"
                    },
                    {
                        id: 3,
                        status: "Nein"
                    },
                    {
                        id: 5,
                        status: "Vielleicht"
                    }
                ],
                creator: 2,
                image: "~/images/event.png"
            },
            {
                id: 3,
                name: "Weihnachtsfeier",
                type: "Tauchen",
                time: "2018-12-24 16:00:00",
                divesite: 1,
                comment: "Erst essen, dann tauchen.",
                canceled: false,
                canceledDate: null,
                participants: [
                    {
                        id: 2,
                        status: "Ja"
                    },
                    {
                        id: 3,
                        status: "Nein"
                    },
                    {
                        id: 5,
                        status: "Vielleicht"
                    }
                ],
                creator: 2,
                image: "~/images/event.png"
            }
        ];
    }

}
