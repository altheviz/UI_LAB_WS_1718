import { Observable } from "data/observable";

import { Settings } from "./Settings";
import { SettingService } from "./settings-service";

export class SettingsViewModel extends Observable {

    public settings: Settings;

    constructor() {
        super();

        this.settings = SettingService.loadSettings();
    }
}