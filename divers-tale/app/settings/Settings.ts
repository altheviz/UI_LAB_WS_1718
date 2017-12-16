export class Settings {
    private measurementUnit: String;
    private pressureUnit: String;
    private temperatureUnit: String;
    private timeFormat: String;
    private dateFormat: String;

    constructor() {}

    public setMeasurementUnit(measurementUnit: String): void {
        this.measurementUnit = measurementUnit;
    }

    public getMeasurementUnit(): String {
        return this.measurementUnit;
    }

    public setPressureUnit(pressureUnit: String): void {
        this.pressureUnit = pressureUnit;
    }

    public getPressureUnit(): String {
        return this.pressureUnit;
    }

    public setTemperatureUnit(temperatureUnit: String): void {
        this.temperatureUnit = temperatureUnit;
    }

    public getTemperatureUnit(): String {
        return this.temperatureUnit;
    }

    public setTimeFormat(timeFormat: String): void {
        this.timeFormat = timeFormat;
    }

    public getTimeFormat(): String {
        return this.timeFormat;
    }

    public setDateFormat(dateFormat: String): void {
        this.dateFormat = dateFormat;
    }

    public getDateFormat(): String {
        return this.dateFormat;
    }
}