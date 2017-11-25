//import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Rx";
import {DivelogListItem} from "./divelog-list-item";

export class DivelogService {
    private data;

    constructor() {
        this.data = require("./divelog-list-test-data.json");
    }


    loadList(){
        return this.data;
    }
}