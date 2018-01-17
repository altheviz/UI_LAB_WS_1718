import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as localStorage from "application-settings";

interface DivesetList {
  id: number,
  name: string;
  equipment: Equipment[]
}

interface Equipment {
  id: number;
  name: string;
}

export class DivesetViewModel extends Observable {
  constructor() {
      super();
  }

  private initDivesets: DivesetList[] = [
    { id: 0, name: "Baggersee Tauchset",
    equipment: [
      { id: 0, name: "Aqualung Axiom i3 XXL"},
      { id: 1, name: "Aqualung Overall 7mm Balance"},
      { id: 2, name: "Atomic Aquatics Z1"},
      { id: 3, name: "Suunto ZOOP Novo"}

    ]},
    { id: 1, name: "Mittelmeer Tauchset", 
    equipment: [
      { id: 0, name: "Aqualung Axiom i3 XXL"},
      { id: 1, name: "Aqualung Overall 7mm Balance"},
    ]}
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
  }

  public removeDiveset(divesetToRemove: DivesetList) {
    var tmp = localStorage.getString("initLists");
    var newValues = JSON.parse(tmp);
    let removeSelectedDiveset = newValues.findIndex((e) => divesetToRemove.id == e.id);
    newValues.splice(removeSelectedDiveset, 1);
    localStorage.setString("initLists", JSON.stringify(newValues));
    tmp = localStorage.getString("initLists");
    this.set("divesets", new ObservableArray(JSON.parse(tmp)));
  }


  public editDiveset(divesetToChange: DivesetList) {
    let tmpDivesets = JSON.parse(localStorage.getString("initLists"));

    //was macht daS?
    tmpDivesets.splice(divesetToChange.id, 1, divesetToChange);
    
    localStorage.setString("initLists", JSON.stringify(tmpDivesets));
    var initLists = localStorage.getString("initLists");
    this.set("divesets", new ObservableArray(JSON.parse(initLists)));
  }


}