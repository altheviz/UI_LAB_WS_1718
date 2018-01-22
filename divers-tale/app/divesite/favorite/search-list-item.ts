export class SearchListItem {
    public id: number;
    public firstletter: string; //needs to be calculated from view-model
    public name: string;
    public location: string;

    constructor(id: number, name: string, location: string) {
        this.id = id;
        this.name = name;
        this.location = location;
        //this.firstletter = this.name.charAt(0);
    }
}
