export class FavoriteInfoListItem {
    public name: string;
    public description: string;
    public location: string;
    public country: string;
    public width: number;
    public length: number;
    public depthAvg: number;
    public depthMax: number;
    public height: number;
    

    constructor(name: string, description: string, location: string, country: string, width: number, length: number, depthAvg: number, depthMax: number, height: number) {
        this.name = name;
        this.description = description
        this.location = location;
        this.country = country;
        this.width = width;
        this.length = length;
        this.depthAvg = depthAvg;
        this.depthMax = depthMax;
        this.height = height;
    }
}
