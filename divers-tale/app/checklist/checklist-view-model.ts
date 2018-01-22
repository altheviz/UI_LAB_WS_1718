import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as localStorage from "nativescript-localstorage";

interface ListItem {
    name: string,
    checked: boolean
}

interface ListData {
    id: number;
    name: string,
    items: ListItem[]
}

interface ListsItem {
    id: number;
    name: string;
}


export class ChecklistViewModel extends Observable {
    constructor() {
        super();
    }

    private defaultList: ListData = {
        id: 0,
        name: "See in Deutschland",
        items: [
            { name: "Jacket", checked: false },
            { name: "Tauchanzug ", checked: false },
            { name: "Kopfhaube", checked: false },
            { name: "Füßlinge", checked: false },
            { name: "Handschuhe", checked: false },
            { name: "Tauchmaske", checked: false },
            { name: "Atemregler", checked: false },
            { name: "Tauchcomputer", checked: false },
            { name: "Kompass", checked: false },
            { name: "Brevet", checked: false },
            { name: "Logbuch", checked: false },
            { name: "Schnorkel", checked: false },
            { name: "Isomatte", checked: false },
            { name: "Handtuch", checked: false },
            { name: "Badehose", checked: false },
            { name: "Tauchflasche", checked: false },
            { name: "Blei (10 Kg)", checked: false },
            { name: "Tauchlampe (Nachttauchen)", checked: false }
        ]
    };
    private items: ObservableArray<ListItem>;


    private storageGetItem(key: string): any {
        return JSON.parse(localStorage.getItem("_checklist_" + key));
    }
    private storageSetItem(key: string, object: any): void {
        localStorage.setItem("_checklist_" + key, JSON.stringify(object));
    }

    public setList(list: ListData) {
        if (!list) {
            console.log("no list");
        }

        this.items = new ObservableArray<ListItem>();
        this.items.push(list.items);
        this.set("obsItems", this.items);
        this.set("listName", list.name);
        this.set("listId", list.id);
    }
    public getSaveableList(): ListData {
        return {
            id: this.get("listId"),
            name: this.get("listName"),
            items: this.items.slice(0, this.items.length - 1)
        };
    }
    public getNewId(): number {
        let id = this.storageGetItem("maxId") || 0;
        id++;
        this.storageSetItem("maxId", id);
        return id;
    }

    public getListFromStorage(id: number): ListData {
        return this.storageGetItem("list_" + id);
    }

    public loadList(id: number) {
        this.setList(this.getListFromStorage(id));
    }

    public saveListInStorage(list: ListData) {
        this.storageSetItem("list_" + list.id, list);
        let index: ListsItem[] = this.storageGetItem("listOfLists") || [];
        let indexItem = index.find(item => item.id == list.id);
        if (!indexItem) {
            indexItem = {
                id: list.id,
                name: list.name
            };
            index.push(indexItem);
        } else {
            indexItem.name = list.name;
        }
        this.storageSetItem("listOfLists", index);
    }

    public getLists(): ListsItem[] {
        return this.storageGetItem("listOfLists");
    }

    public setAsDefault(id: number) {
        this.storageSetItem("defaultList", id);
        this.set("defaultList", id);
    }

    public getDefaultId(): number {
        return this.storageGetItem("defaultList");
    }

    public initList() {
        let lists = this.getLists();
        if (!lists || lists.length == 0 || !this.defaultList) {
            this.saveListInStorage(this.defaultList);
            this.setAsDefault(this.defaultList.id);
        }
        this.loadList(this.getDefaultId());
        this.set("defaultList", this.getDefaultId());
    }

    public getItems():ObservableArray<ListItem>{
        return this.items;
    }

    public storeList(){
        this.saveListInStorage(this.getSaveableList());
    }
}
