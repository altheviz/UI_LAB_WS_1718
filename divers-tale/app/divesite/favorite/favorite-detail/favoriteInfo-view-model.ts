import { Observable } from "data/observable";
import {FavoriteInfoListItem} from "./favoriteInfo-list-item";
import {DataService} from "../../data-service";

export class FavoriteInfoViewModel extends Observable {

    public infos: Observable;

    constructor(index: number) {
        super();
        // apply text for UI elements
        let service = new DataService();
        this.infos = service.loadEntry(index);
    }
}
