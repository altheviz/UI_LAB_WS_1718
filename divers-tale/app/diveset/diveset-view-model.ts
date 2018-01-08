import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as localStorage from "application-settings";

interface DivesetList {
  id: number,
  name: string;
}

export class DivesetViewModel extends Observable {
  constructor() {
      super();
  }

  private initDivesets: DivesetList[] = [
    { id: 0, name: "Default Tauchset One"},
    { id: 1, name: "Default Tauchset Two"}
  ]

  public init() {
    let initLists = localStorage.getString("initLists");

    if(!initLists || initLists == null || initLists.length == 0) {
      localStorage.setString("initLists", JSON.stringify(this.initDivesets));
    }
    initLists = localStorage.getString("initLists");
    this.set("divesets", new ObservableArray(JSON.parse(initLists)));
  }

  public getNewId(): number {
     let id = localStorage.getNumber("maxId") || 1;
     id++;
     localStorage.setNumber("maxId", id);
     return id;
  }

  public addToList(newDiveset: DivesetList) {
   // hol die Objekte vom Persistenten Speicher.
   var tempDivesets = JSON.parse(localStorage.getString("initLists")); 
   
   // füge neues Objekt hinzu
   tempDivesets.push(newDiveset);
  
   // speichere die Objekte wieder im persistenten Speicher 
   localStorage.setString("initLists", JSON.stringify(tempDivesets));
   
   // kann hier vlt auch weggelassen werden? unnötiger zwischenschritt?
   var initLists = localStorage.getString("initLists");
   
   // füge objekte dem set hinzu
   this.set("divesets", new ObservableArray(JSON.parse(initLists)));

   console.log("newDiveset values= id=" + newDiveset.id + " name=" + newDiveset.name);
  }

}