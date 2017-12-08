export class FavoriteInfoListItem {
    public name: string;
    public description: string;
    public location: string;
    public country: string;
    

    constructor(name: string, description: string, location: string, country: string) {
        this.name = name;
        this.description = description
        this.location = location;
        this.country = country;
    }
}
