import { Observable } from "data/observable";
import {FavoriteListItem} from "./favorite-list-item";
import {DataService} from "./../data-service";


export class FavoriteViewModel extends Observable {

    public favorites: Array<FavoriteListItem>;
    
    constructor() {
        super();
        // apply text for UI elements
        let service = new DataService();
        this.favorites = service.loadList();

        //for each item get first letter
        this.favorites.forEach(element => {
            element.firstletter = element.name.charAt(0);
        });

        //sort 
        this.favorites.sort(this.compare);
    }

    compare(a,b) {
        if (a.firstletter < b.firstletter)
          return -1;
        if (a.firstletter > b.firstletter)
          return 1;
        return 0;
      }
}
