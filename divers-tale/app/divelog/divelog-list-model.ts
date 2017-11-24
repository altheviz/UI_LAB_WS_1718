import { Observable } from "data/observable";
import {DivelogListItem} from "./divelog-list-item";
import {DivelogService} from "./divelog-service";

export class DivelogListModel extends Observable {
    public divelogs: Array<DivelogListItem>;

    constructor() {
        super();
        console.log("hallo");
        let service = new DivelogService();
        this.divelogs = service.loadList();
    }
}