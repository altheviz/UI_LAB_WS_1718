import { DataService } from "../data-service";
import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { SearchListItem } from "./search-list-item";

export class SearchViewModel extends Observable {
    searchResults: ObservableArray<SearchListItem> = new ObservableArray<SearchListItem>();

    constructor() {
        super();

        this.loadList();
    }

    /**
     * filterSearchList
     */
    filterSearchList(searchText: string) {
        console.log("Trying to filter: " + searchText);

        const result = this.searchResults.filter(element => 
            element.name.toLowerCase().includes(searchText.toLowerCase())
        );

        while (this.searchResults.length > 0) {
            this.searchResults.pop();
        }

        result.forEach(element => {
            this.searchResults.push(element);
        });

        this.searchResults.sort(this.compare);
    }

    loadList() {
        let service = new DataService();
        let result = service.loadList();
        this.updateSearchResults(result);
    }

    private compare(a, b) {
        if (a.name.charAt(0) < b.name.charAt(0)) { return -1; }
        if (a.name.charAt(0) > b.name.charAt(0)) { return 1; }

        return 0;
    }

    private updateSearchResults(newList) {
        while (this.searchResults.length > 0) {
            this.searchResults.pop();
        }

        newList.forEach(element => element.firstletter = element.name.charAt(0))
        newList.forEach(element => this.searchResults.push(element));

        this.searchResults.sort(this.compare);
    }
}

export default SearchViewModel;
