import { Observable } from "data/observable";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";
export class EquipmentModel extends Observable {
    public searchText: string;
    private fullFList: any[];
    private index: any;
    constructor() {
        super();
    }

}
