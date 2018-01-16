import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as localStorage from "application-settings";

interface equipmentListe {
  id: number,
  name: string,
  description: string,
  purchaseDate: string,
  purchasePrice: string,
  nextInspection: string;
}

export class EquipmentViewModel extends Observable {
  constructor() {
      super();
  }

  private initEqsets: equipmentListe[] = [
    { id: 1, name: "Aqualung Axiom i3 XXL", description: "Lorem ipsum dolor", purchaseDate: "27.11.2017", purchasePrice: "250", nextInspection: "27.11.2018"  },
    { id: 2, name: "Iqualung Axiom i4 S", description: "Beschreibung 2", purchaseDate: "01.03.2015", purchasePrice: "125", nextInspection: "01.03.2018"  },
    { id: 3, name: "Axiom i7", description: "Beschreibung 1", purchaseDate: "01.03.2015", purchasePrice: "125", nextInspection: "01.03.2018"  }
]


  public init() {
    let initLists = localStorage.getString("initEqList");

    if(!initLists || initLists == null || initLists.length == 0) {
      localStorage.setString("initEqList", JSON.stringify(this.initEqsets));
    }
    initLists = localStorage.getString("initEqList");
    this.set("equipment", new ObservableArray(JSON.parse(initLists)));
  }

  public getNewId(): number {
    var tempEqSets = JSON.parse(localStorage.getString("initEqList"));
    let id;
    console.log("-----");
    console.log("Länge array: " + tempEqSets.length);
    console.log("idCounter: " + localStorage.getNumber("maxId"));
    console.log("-----");
    if(tempEqSets.length <= localStorage.getNumber("maxId")){
        id = tempEqSets.length--;
        console.log("-->" + id);
        localStorage.setNumber("maxId", id);
        return id;
    } else {
        id = localStorage.getNumber("maxId") || 1;
        id++;
        localStorage.setNumber("maxId", id);
        return id;
    }
  }

  public addToList(newDiveset: equipmentListe) {
   // hol die Objekte vom Persistenten Speicher.
   var tempDivesets = JSON.parse(localStorage.getString("initEqList")); 
   
   // füge neues Objekt hinzu
   tempDivesets.push(newDiveset);
   
   // speichere die Objekte wieder im persistenten Speicher 
   localStorage.setString("initEqList", JSON.stringify(tempDivesets));
   
   // kann hier vlt auch weggelassen werden? unnötiger zwischenschritt?
   var initLists = localStorage.getString("initEqList");
   
   // füge objekte dem set hinzu
   this.set("equipment", new ObservableArray(JSON.parse(initLists)));
  }

  public editentry(newDiveset: equipmentListe) {
    // hol die Objekte vom Persistenten Speicher.
    var tempDivesets = JSON.parse(localStorage.getString("initEqList")); 
    
    // füge neues Objekt hinzu
    console.log("----")
    console.log(tempDivesets.length);
    console.log(newDiveset.id);
    console.log(newDiveset.name);
    console.log(newDiveset.description);
    tempDivesets.splice(newDiveset.id, 1, newDiveset);
    console.log(tempDivesets);
    // speichere die Objekte wieder im persistenten Speicher 
    localStorage.setString("initEqList", JSON.stringify(tempDivesets));
    
    // kann hier vlt auch weggelassen werden? unnötiger zwischenschritt?
    var initLists = localStorage.getString("initEqList");
    
    // füge objekte dem set hinzu
    this.set("equipment", new ObservableArray(JSON.parse(initLists)));
   }

  public removeEquipment(divesetToRemove: equipmentListe) {
    
    var tmp = localStorage.getString("initEqList");
    var newValues = JSON.parse(tmp);
   
    let removeSelectedDiveset = newValues.findIndex((e) => divesetToRemove.id == e.id);

    newValues.splice(removeSelectedDiveset, 1);
    localStorage.setString("initEqList", JSON.stringify(newValues));

    tmp = localStorage.getString("initEqList");
    this.set("equipment", new ObservableArray(JSON.parse(tmp)));
  }

}

/**
 * 

import { Observable } from "data/observable";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";
export class EquipmentViewModel extends Observable {
    public searchText: string;
    private fullFList: any[];
    private index: any;
    constructor() {
        super();
    }
    public setupSearch(pageName: string) {
        this.fullFList = this.readJSON("testdata/equipment/jacket.json");
        this.fullFList.forEach((item, index) => item.id = index);
        this.set("fList", this.fullFList);

        this.index = elasticlunr()
        this.index.addField('name');
        this.index.addField('description');
        this.index.addField('purchaseDate');
        this.index.addField('purchasePrice');
        this.index.addField('nextInspection');
        this.index.setRef('id');
        this.index.setRef('id');
        //this.saveDocument(false);
        this.fullFList.forEach(doc => this.index.addDoc(doc));
    }

    public search(term: string) {
        if (term != "") {
            let result: any[] = this.index.search(term, { expand: true }).map(res => this.fullFList[res.ref]);
            this.set("fList", result);
        } else {
            this.set("fList", this.fullFList);
        }
    }

    private readJSON(file: string): any {
        let appFolder = knownFolders.currentApp();
        let cfgFile = appFolder.getFile(file);
        return JSON.parse(cfgFile.readTextSync());
    }
}
 */