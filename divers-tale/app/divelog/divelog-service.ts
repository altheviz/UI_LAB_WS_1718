//import "rxjs/add/operator/map";
//import {Observable} from "rxjs/Rx";
import {DivelogListItem} from "./divelog-list-item";

export class DivelogService {

    constructor() {
        var a = require("./divelog-list-test-data.json");
        console.log(a);
    }


    loadList(){
        /* let items: Array<DivelogListItem>;
         let handleJSONFile;

        // Read the file, and pass it to your callback
         fs.readFile('divelog-list-test-data.json', handleJSONFile);

        // Handle the data
         handleJSONFile = function (err, data) {
             if (err) {
                 throw err;
             }
             return JSON.parse(data);
         }
         console.log("blaaaaaaaaaaaa JSON: " + handleJSONFile);
         return handleJSONFile;*/
        return new Array<DivelogListItem>();
    }
}