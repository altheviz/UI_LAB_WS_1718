import {DivelogListItem} from "./divelog-list/divelog-list-item";


export class DivelogService {
    private listData;
    private logData;

    constructor() {
        this.listData = require("./divelog-list-test-data.json");
        this.logData = require("./divelog-test-data.json");
    }


    loadList(){
        return this.listData;
    }

    loadDivelog() {
        return this.logData;
    }
}