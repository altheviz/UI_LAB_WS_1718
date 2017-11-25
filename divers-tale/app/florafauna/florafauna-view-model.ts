import { Observable } from "data/observable";
import * as  elasticlunr from "elasticlunr/elasticlunr";
import { knownFolders } from "tns-core-modules/file-system";
export class FlorafaunaViewModel extends Observable {
    public searchText: string;
    private fullFList: any[];
    private index: any;
    constructor() {
        super();
    }
    public setupSearch(pageName: string) {
        this.fullFList = this.readJSON("testdata/" + pageName + ".json");
        this.fullFList.forEach((item, index) => item.id = index);
        this.set("fList", this.fullFList);

        this.index = elasticlunr()
        this.index.addField('name');
        this.index.addField('tags');
        this.index.addField('description');
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
