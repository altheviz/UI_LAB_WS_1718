export class DivelogListItem {
    public id: string;
    public date: Date;
    public diveSite: string;

    constructor(id: string, date: Date, diveSite: string) {
        this.id = id;
        this.date = date;
        this.diveSite = diveSite;
    }
}