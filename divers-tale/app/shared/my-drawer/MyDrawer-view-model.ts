import { Observable } from "data/observable";

import { ObservableProperty } from "../../shared/observable-property-decorator";
import { User } from "../../profile/User";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
export class MyDrawerViewModel extends Observable {
    @ObservableProperty() selectedPage: string;
    @ObservableProperty() user: User;

    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    *************************************************************/
    constructor(selectedPage: string, user: User) {
        super();

        this.selectedPage = selectedPage;
        this.user = user;
    }
}
