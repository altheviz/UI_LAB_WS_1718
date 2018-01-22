import { Observable } from "data/observable";
import { knownFolders } from "tns-core-modules/file-system";


export class DivesignsViewModel extends Observable {
    constructor() {
        super();
    }
    public initData(){
        const divesigns = this.readJSON("testdata/divesigns.json");
        this.set("dsList", divesigns);
    }

    private readJSON(file: string): any {
        let appFolder = knownFolders.currentApp();
        let cfgFile = appFolder.getFile(file);
        return JSON.parse(cfgFile.readTextSync());
    }
}
