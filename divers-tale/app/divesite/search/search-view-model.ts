import { Observable } from "data/observable";
import { SearchListItem } from "./search-list-item";
import { DataService } from "../data-service";
import { ObservableArray} from "data/observable-array";

export class SearchViewModel extends Observable {
    public searchResults: ObservableArray<SearchListItem>;
    
    constructor() {
        super();
        // apply text for UI elements
        let service = new DataService();
        this.searchResults = service.loadList();

        //for each item get first letter
        this.searchResults.forEach(element => {
            element.firstletter = element.name.charAt(0);
        });

        //sort 
        this.searchResults.sort(this.compare);
    }

    /**
     * filterSearchList
     */
    public filterSearchList(searchText: string) {
        console.log("Trying to filter: "+searchText);

        const result = this.searchResults.filter(element => element.name.toLowerCase().startsWith(searchText.toLowerCase()));

        while (this.searchResults.length > 0) {
            this.searchResults.pop();
        };

        result.forEach(element => {
            this.searchResults.push(element);
        });

        this.searchResults.sort(this.compare);

        //console.dir(this.searchResults);
    }

    compare(a,b) {
        if (a.firstletter < b.firstletter)
          return -1;
        if (a.firstletter > b.firstletter)
          return 1;
        return 0;
    }
}

export default SearchViewModel;