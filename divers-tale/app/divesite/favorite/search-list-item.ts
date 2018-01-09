export class SearchListItem {
    public firstletter: string; //needs to be calculated from view-model
    public name: string;
    public location: string;

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
        //this.firstletter = this.name.charAt(0);
    }
}
