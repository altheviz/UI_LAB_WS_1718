export class DataService {
    private listData;

    constructor() {
        this.listData = require("./dummyData.json");
    }


    loadList(){
        return this.listData;
    }
}