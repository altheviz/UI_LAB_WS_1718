import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";
import { ValueList, SelectedIndexChangedEventData, DropDown } from "nativescript-drop-down";

import { SettingsViewModel } from "./service-view-model";
import { SettingService } from "./settings-service";

let viewModel: Observable;

export function onNavigatingTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;
    viewModel = new SettingsViewModel();
    page.bindingContext = viewModel;

    initDropdown(page);
}

function initDropdown(page: Page) {
    // Measurement unit
    let measurementUnitList = page.getViewById<DropDown>("measurement-unit");
    let measurementUnitItems = new ValueList<String>([
        { value: SettingService.METER, display: "Meter" },
        { value: SettingService.FEET, display: "Feet" }
    ]);
    if (viewModel.get("settings").getMeasurementUnit() === SettingService.METER) {
        viewModel.set("measurementUnitSelectedIndex", 0);
    } else {
        viewModel.set("measurementUnitSelectedIndex", 1);
    }
    measurementUnitList.items = measurementUnitItems;

    // Pressure unit
    let pressureUnitList = page.getViewById<DropDown>("pressure-unit");
    let pressureUnitItems = new ValueList<String>([
        { value: SettingService.BAR, display: "Bar" },
        { value: SettingService.PSI, display: "PSI" }
    ]);
    if (viewModel.get("settings").getPressureUnit() === SettingService.BAR) {
        viewModel.set("pressureUnitSelectedIndex", 0);
    } else {
        viewModel.set("pressureUnitSelectedIndex", 1);
    }
    pressureUnitList.items = pressureUnitItems;

    // Temperature unit
    let temperatureUnitList = page.getViewById<DropDown>("temperature-unit");
    let temperatureUnitItems = new ValueList<String>([
        { value: SettingService.CELSIUS, display: "Celsius" },
        { value: SettingService.FAHRENHEIT, display: "Fahrenheit" }
    ]);
    if (viewModel.get("settings").getTemperatureUnit() === SettingService.CELSIUS) {
        viewModel.set("temperatureUnitSelectedIndex", 0);
    } else {
        viewModel.set("temperatureUnitSelectedIndex", 1);
    }
    temperatureUnitList.items = temperatureUnitItems;

    // Time format
    let timeFormatList = page.getViewById<DropDown>("time-format");
    let timeFormatItems = new ValueList<String>([
        { value: SettingService.TWENTYFOUR_HOURS, display: "24 Hours" },
        { value: SettingService.AM_PM, display: "AM/PM" }
    ]);
    if (viewModel.get("settings").getTimeFormat() === SettingService.TWENTYFOUR_HOURS) {
        viewModel.set("timeFormatSelectedIndex", 0);
    } else {
        viewModel.set("timeFormatSelectedIndex", 1);
    }
    timeFormatList.items = timeFormatItems;

    // Date format
    let dateFormatList = page.getViewById<DropDown>("date-format");
    let dateFormatItems = new ValueList<String>([
        { value: SettingService.DD_MM_YYYY, display: "dd.mm.yyyy" },
        { value: SettingService.MM_DD_YYYY, display: "mm/dd/yyyy" }
    ]);
    if (viewModel.get("settings").getDateFormat() === SettingService.DD_MM_YYYY) {
        viewModel.set("dateFormatSelectedIndex", 0);
    } else {
        viewModel.set("dateFormatSelectedIndex", 1);
    }
    dateFormatList.items = dateFormatItems;
}

export function measurementUnitChanged(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0 || args.newIndex === null) {
        viewModel.get("settings").setMeasurementUnit(SettingService.METER);
    } else {
        viewModel.get("settings").setMeasurementUnit(SettingService.FEET);
    }
    SettingService.saveSettings();
}

export function pressureUnitChanged(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0 || args.newIndex === null) {
        viewModel.get("settings").setPressureUnit(SettingService.BAR);
    } else {
        viewModel.get("settings").setPressureUnit(SettingService.PSI);
    }
    SettingService.saveSettings();
}

export function temperatureUnitChanged(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0 || args.newIndex === null) {
        viewModel.get("settings").setTemperatureUnit(SettingService.CELSIUS);
    } else {
        viewModel.get("settings").setTemperatureUnit(SettingService.FAHRENHEIT);
    }
    SettingService.saveSettings();
}

export function timeFormatChanged(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0 || args.newIndex === null) {
        viewModel.get("settings").setTimeFormat(SettingService.TWENTYFOUR_HOURS);
    } else {
        viewModel.get("settings").setTimeFormat(SettingService.AM_PM);
    }
    SettingService.saveSettings();
}

export function dateFormatChanged(args: SelectedIndexChangedEventData) {
    if (args.newIndex === 0 || args.newIndex === null) {
        viewModel.get("settings").setDateFormat(SettingService.DD_MM_YYYY);
    } else {
        viewModel.get("settings").setDateFormat(SettingService.MM_DD_YYYY);
    }
    SettingService.saveSettings();
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}