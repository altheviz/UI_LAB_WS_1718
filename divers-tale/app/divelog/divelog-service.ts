import {DivelogListItem} from "./divelog-list/divelog-list-item";
import { DivelogViewModel } from "./divelog-view/divelog-view-model";


export class DivelogService {
    private listData;
    private logData;

    constructor() {
        this.listData = require("./divelog-list-test-data.json");
        this.logData = require("./divelog-test-data.json");
    }


    loadDivelogs(){
        return this.listData;
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
        const divelogs = JSON.parse(localStorage.getItem('divelogs'));

        for (const divelog of divelogs) {
            if (divelog.id == id) {
                divelogs.splice(divelogs.indexOf(divelog), 1);
            }
        }

        localStorage.setItem("divelogs", JSON.stringify(divelogs));
    }
}