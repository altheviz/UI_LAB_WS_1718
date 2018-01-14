export class DataService {
    private listData;

    constructor() {
        this.listData = require("./dummyData.json");
    }


    loadList(){
        return this.listData;
    }

    loadEntry(index: number) {
        var newArr = []; 
        
        this.listData.forEach(element => {
            if (element.id == index) {
                newArr.push(element);
            }
        });
        
        return newArr[0];
    } 
}