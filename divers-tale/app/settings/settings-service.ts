import * as localStorage from "nativescript-localstorage";

import { Settings } from "./Settings";

export namespace SettingService {

    let settings: Settings;

    export const METER = "meter";
    export const FEET = "feet";
    export const BAR = "bar";
    export const PSI = "psi";
    export const CELSIUS = "celsius";
    export const FAHRENHEIT = "fahrenheit";
    export const TWENTYFOUR_HOURS = "twentyfour_hours";
    export const AM_PM = "am_pm";
    export const DD_MM_YYYY = "dd_mm_yyyy";
    export const MM_DD_YYYY = "mm_dd_yyyy";

    export function loadSettings(): Settings {
        if (!settings) {
            settings = new Settings();
        }

        let storedSettings = localStorage.getItem("_settings_");
        if (storedSettings) {
            settings.setMeasurementUnit(storedSettings.measurementUnit || "");
            settings.setPressureUnit(storedSettings.pressureUnit || "");
            settings.setTemperatureUnit(storedSettings.temperatureUnit || "");
            settings.setTimeFormat(storedSettings.timeFormat || "");
            settings.setDateFormat(storedSettings.dateFormat || "");
        } else {
            // Set default
            settings.setMeasurementUnit(METER);
            settings.setPressureUnit(BAR);
            settings.setTemperatureUnit(CELSIUS);
            settings.setTimeFormat(TWENTYFOUR_HOURS);
            settings.setDateFormat(DD_MM_YYYY);
        }

        return settings;
    }

    export function saveSettings(): void {
        if (!settings) {
            settings = new Settings();
        }
        
        let settingsToSave = {
            measurementUnit: settings.getMeasurementUnit(),
            pressureUnit: settings.getPressureUnit(),
            temperatureUnit: settings.getTemperatureUnit(),
            timeFormat: settings.getTimeFormat(),
            dateFormat: settings.getDateFormat()
        };
        console.log(JSON.stringify(settingsToSave));
        localStorage.setItem("_settings_", settingsToSave);
    }
}