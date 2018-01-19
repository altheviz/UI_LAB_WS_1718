import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as localStorage from "application-settings";
import { EquipmentViewModel } from "../equipment/equipment-view-model";

interface DivesetList {
  id: number,
  name: string,
  equipment: Equipment[]
}

interface Equipment {
  id: number,
  name: string,
  checked: boolean
}

export class DivesetViewModel extends Observable {
  constructor() {
      super();
  }

  private evm = new EquipmentViewModel();

  private initDivesets: DivesetList[] = [
    { id: 0, name: "Baggersee Tauchset",
    equipment: [
      { id: 0, name: "test1", checked: false},
      { id: 1, name: "test2", checked: true},
      { id: 3, name: "Suunto ZOOP Novo", checked: false}

    ]},
    { id: 1, name: "Mittelmeer Tauchset", 
    equipment: [
      { id: 0, name: "Aqualung Axiom i3 XXL", checked: false},
      { id: 1, name: "Aqualung Overall 7mm Balance", checked: false},
    ]}
  ];
  
  public emvInit() {
    this.evm.init();
    var eqList = localStorage.getString("initEqList");
  
    this.initDivesets.forEach(element => {
      element.equipment = JSON.parse(eqList);
    });
    
    localStorage.setString("initLists", JSON.stringify(this.initDivesets));
    //console.log("zustand nach befüllen= " + JSON.stringify(this.initDivesets));
    var x = localStorage.getString("initLists");
    this.set("divesets", new ObservableArray(JSON.parse(x)));
  }

  public init() {
    
    let initLists = localStorage.getString("initLists");
    
    if(!initLists || initLists == null || initLists.length == 0) {
      localStorage.setString("initLists", JSON.stringify(this.initDivesets));
      this.emvInit();
    }
    //this.emvInit();
    
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
  
   if(newDiveset.equipment.length == 0) {
    console.log("equipment is empty" + JSON.stringify(newDiveset.equipment)); 
    let eqlist = localStorage.getString("initEqList");
    newDiveset.equipment = JSON.parse(eqlist); 
    console.log("equipment is full" + JSON.stringify(newDiveset.equipment)); 
   };

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
    let tmp = localStorage.getString("initLists");
    var newValues = JSON.parse(tmp);
    let replaceSelectedItem = newValues.findIndex((e) => divesetToChange.id == e.id);
    newValues.splice(replaceSelectedItem, 1, divesetToChange);
    localStorage.setString("initLists", JSON.stringify(newValues));
    tmp = localStorage.getString("initLists");
    this.set("divesets", new ObservableArray(JSON.parse(tmp)));
  }

  public editEquipment(checked: boolean) {
    //TODOvar tmp = localStorage.getString("initLists");
    console.log("check it= " + JSON.stringify(checked));
  }


  /**public getEquipmentFromList() {
    console.log("hier bin ich");
    this.emvInit();
  }*/

}