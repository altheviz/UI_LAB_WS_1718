import * as localStorage from "nativescript-localstorage";
import {DivelogViewModel} from "./divelog-view/divelog-view-model";

export class DivelogService {
    private logData;

    constructor() {
    }

    loadDivelogs() {
        let divelogs = localStorage.getItem('divelogs');

        if (divelogs == null || JSON.parse(divelogs).length < 1) {
            divelogs = JSON.parse(JSON.stringify(require("./divelog-test-data.json")));

        } else {
            divelogs = JSON.parse(divelogs);
        }

        return divelogs;
    }

    saveDivelog(divelog: DivelogViewModel) {
        const divelogs = this.loadDivelogs();
        this.deleteDivelog(divelog.id);

        for (const d of divelogs) {
            if (d.id == divelog.id) {
                divelogs.splice(divelogs.indexOf(d), 1);
            }
        }

        divelogs.unshift(divelog);
        localStorage.setItem("divelogs", JSON.stringify(divelogs));
    }

    loadDivelog(id: number) {
        const divelogs = this.loadDivelogs();
        let divelog;
        if (id == null && !divelogs.isEmpty) {
            divelog = divelogs[0];
        } else {
            if (id == null) {
                divelog = divelogs[0];
            } else {

                for (const d of divelogs) {
                    if (d.id == id) {
                        divelog = d;
                    }
                }
            }
        }
        return divelog;
    }

    deleteDivelog(id: number) {
        let divelogs = localStorage.getItem('divelogs');

        if (divelogs != null) {
            divelogs = JSON.parse(divelogs);
            for (const divelog of divelogs) {
                if (divelog.id == id) {
                    divelogs.splice(divelogs.indexOf(divelog), 1);
                }
            }

            localStorage.setItem("divelogs", JSON.stringify(divelogs));
        }
    }
}