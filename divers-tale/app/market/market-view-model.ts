import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";
import {MarketService, Cathegory, Condition, Details, MarketItem, Summary} from "./market-service";

export class MarketViewModel extends Observable {
    public cathegoryFilter: number;
    public index: number;
    public service = new MarketService();

    constructor() {
        super();

        let list = this.service.getSummaryList(0);
        this.set("list", list);
    }

    public getDetails(id: number): Details {
        return this.service.getDetails(id);
    }
}