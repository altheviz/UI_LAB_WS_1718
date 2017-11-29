import {FavoriteListItem} from "./favorite-list-item";

export class FavoriteService {
    private listData;

    constructor() {
        this.listData = require("./../dummyData.json");
    }


    loadList(){
        return this.listData;
    }
}