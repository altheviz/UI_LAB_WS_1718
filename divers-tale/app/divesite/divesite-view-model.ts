import { Observable } from "data/observable";

// TODO extract into constant into single module
const diveSitesText = "Dive Sites";
const mapText = "Map";
const favoriteText = "Favorites";
const searchText = "Search";

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