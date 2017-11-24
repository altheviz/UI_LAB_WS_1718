import { Observable } from "data/observable";

// TODO extract into constant into single module
const diveSitesText = "Dive Sites1";
const mapText = "Map1";
const favoriteText = "Favorite1";
const searchText = "Search1";

export class DiveSiteViewModel extends Observable {
    constructor() {
        super();
        // apply text for UI elements
        this.set("diveSites", diveSitesText);
        this.set("map", mapText);
        this.set("favorite", favoriteText);
        this.set("search", searchText);
    }
}