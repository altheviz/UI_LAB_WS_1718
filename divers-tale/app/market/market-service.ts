import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";

import { User } from "../profile/User";
import { UserService } from "../profile/user-service";

export class MarketItem {
    public id: number;
    public name: string;
    public brand: string;
    public cathegory: number;
    public condition: number;
    public sellBy: number;
    public boughtBy: number | null;
    public price: string;
    public imgUrl: string | null;
}

export class Cathegory {
    public id: number;
    public name: string;
}

export class Condition {
    public id: number;
    public description: string;
}

export class Summary {
    public itemId: number;
    public name: string;
    public cathegory: string;
    public condition: string;
    public price: string;
    public imgUrl: string;
}

export class Details {
    public itemId: number;
    public name: string;
    public brand: string;
    public condition: string;
    public cathegory: string;
    public price: string;
    public imgUrl: string;
    public sellBy: string;
    public boughtBy: string;
}

export class MarketService extends Observable {
    private _items: ObservableArray<MarketItem> = new ObservableArray<MarketItem>([]);
    private _categories: ObservableArray<Cathegory> = new ObservableArray<Cathegory>([]);
    private _conditions: ObservableArray<Condition> = new ObservableArray<Condition>([]);

    private _impersonateUser = 1;

    public constructor() {
        super();
        this._items = this.load("market/dummy-data/market.json");
        this._categories = this.load("market/dummy-data/categories.json");
        this._conditions = this.load("market/dummy-data/conditions.json");
    }

    private load<T>(file: string): T {
        let folder = knownFolders.currentApp();
        let raw = folder.getFile(file);
        return JSON.parse(raw.readTextSync());
    }

    private getMarketItems(catId: number): ObservableArray<MarketItem> {
        if(catId === 0) {
            return this._items;
        }

        return new ObservableArray(this._items.filter(a => a.cathegory == catId));
    }

    private makeSummaryList(list: ObservableArray<MarketItem>) : Summary[] {
        let result = new Array<Summary>();
        list.sort((a: MarketItem, b: MarketItem) => {
            return Math.sign(a.id - b.id);
        }).forEach(e => {
            let x = new Summary();
            x.name = e.name + ' (' + e.brand + ')';
            x.imgUrl = e.imgUrl;
            //TODO - okay but cathegory might be missing 
            x.cathegory = this._categories.filter(c => c.id == e.cathegory)[0].name;
            x.condition = this._conditions.filter(c => c.id == e.condition)[0].description;
            x.price = e.price;

            result.push(x);
        });
        return result;
    }

    public getSearchList(catId: number): Summary[] {
        let items = new ObservableArray(this.getMarketItems(catId).filter(x => x.boughtBy === null && x.sellBy !== this._impersonateUser));
        return this.makeSummaryList(items);
    }

    public getBoughtList(): Summary[] {
        let items = new ObservableArray(this.getMarketItems(0).filter(x => x.boughtBy === this._impersonateUser));
        return this.makeSummaryList(items);
    }

    public getSoldList(): Summary[] {
        let items = new ObservableArray(this.getMarketItems(0).filter(x => x.sellBy === this._impersonateUser));
        return this.makeSummaryList(items);
    }

    public getDetails(itemId: number): Details {
        let _e = this._items.filter(i => i.id == itemId);
        if(_e.length <= 0) {
            return null;
        }
        let e = _e[0];
        let x = new Details();
        x.name = e.name;
        x.imgUrl = e.imgUrl;
        x.price = e.price;
        x.brand = e.brand;
        x.boughtBy = e.boughtBy == null ? "n/a" : e.boughtBy + "";
        x.sellBy = e.sellBy + "";
        x.cathegory = this._categories.filter(c => c.id == e.cathegory)[0].name;
        x.condition = this._conditions.filter(c => c.id == e.condition)[0].description;

        return x;
    }

    public getConditions(): ObservableArray<Condition> {
        return this._conditions;
    }

    public getCondition(conId: number): Condition {
        let tmp = this._conditions.filter(a => a.id == conId);
        if(tmp.length <= 0) {
            return null;
        }
        return tmp[0];
    }

    public getCathegories(): ObservableArray<Cathegory> {
        return this._categories;
    }

    public getCathegory(catId: number): Cathegory {
        let tmp = this._categories.filter(a => a.id == catId);
        if(tmp.length <= 0) {
            return null;
        }
        return tmp[0];
    }

}