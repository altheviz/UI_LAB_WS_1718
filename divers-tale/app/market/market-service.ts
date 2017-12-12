import { Observable } from "data/observable";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";

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

export class MarketService {
    private _items: MarketItem[];
    private _categories: Cathegory[];
    private _conditions: Condition[];

    private _inpersonateUser = 1;

    public constructor() {
        this._items = this.load("market/dummy-data/market.json");
        this._categories = this.load("market/dummy-data/categories.json");
        this._conditions = this.load("market/dummy-data/conditions.json");
    }

    private load<T>(file: string): T[] {
        let folder = knownFolders.currentApp();
        let raw = folder.getFile(file);
        return JSON.parse(raw.readTextSync());
    }

    private getMarketItems(catId: number): MarketItem[] {
        if(catId === 0) {
            return this._items;
        }
        return this._items.filter(a => a.cathegory == catId);
    }

    public getSummaryList(catId: number): Summary[] {
        let items = this.getMarketItems(catId);
        let result = new Array<Summary>();

        items.forEach(e => {
            let x = new Summary();
            x.name = e.name;
            x.imgUrl = e.imgUrl;
            x.cathegory = this._categories.find(c => c.id == e.cathegory).name;
            x.price = e.price;

            result.push(x);
        });

        return result;
    }

    public getDetails(itemId: number): Details {
        let e = this._items.find(i => i.id == itemId);
        if(!e) {
            return null;
        }
        let x = new Details();
        x.name = e.name;
        x.imgUrl = e.imgUrl;
        x.price = e.price;
        x.brand = e.brand;
        x.boughtBy = e.boughtBy == null ? "n/a" : e.boughtBy + "";
        x.sellBy = e.sellBy + "";
        x.cathegory = this._categories.find(c => c.id == e.cathegory).name;
        x.condition = this._conditions.find(c => c.id == e.condition).description;

        return x;
    }

    public getConditions(): Condition[] {
        return this._conditions;
    }

    public getCondition(conId: number): Condition {
        return this._conditions.find(a => a.id == conId);
    }

    public getCathegories(): Cathegory[] {
        return this._categories;
    }

    public getCathegory(catId: number): Cathegory {
        return this._categories.find(a => a.id == catId);
    }
}