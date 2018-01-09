export class UserSettings {
    measurementUnitIsMeter: boolean; // False = feet
    pressureUnitIsBar: boolean; // False = psi
    temparatureUnitIsCelsius: boolean; // False = fahrenheit
    timeFormat: String; //24h, 12h bzw. am, pm
    dateFormat: String; //dd.mm.yyyy, mm/dd/yyyy
    
    constructor(measurementUnitIsMeter: boolean, pressureUnitIsBar: boolean, temparatureUnitIsCelsius: boolean, timeFormat: String, dateFormat: String){
        this.measurementUnitIsMeter = measurementUnitIsMeter;
        this.pressureUnitIsBar = pressureUnitIsBar;
        this.temparatureUnitIsCelsius = temparatureUnitIsCelsius;
        this.timeFormat = timeFormat;
        this.dateFormat = dateFormat;
    }
}


export class DiveSiteData{
    name: string;
    description: string;
    location: string;
    country: string;
    geoData: GeoData;
    extraInfo: ExtraInfo;
    constructor (name: string, description: string, location: string, country: string, geoData: GeoData, extraInfo: ExtraInfo){
        this.name = name;
        this.description = description;
        this.location = location;
        this.country = country;
        this.geoData = geoData;
        this.extraInfo = extraInfo;
    }
}

export class GeoData{
    gpsCoordLength: number;
    gpsCoordWidth: number;
    sizeInQm: number;
    lengthInM: number;
    widthInM: number;
    depthAvgInM: number;
    depthMaxInM: number;
    heightInM: number;

    constructor(gpsCoordLength: number, gpsCoordWidth: number, sizeInQm: number, lengthInM: number, widthInM: number, depthAvgInM: number, depthMaxInM: number, heightInM: number){
        this.gpsCoordLength = gpsCoordLength;
        this.gpsCoordWidth = gpsCoordWidth;
        this.sizeInQm = sizeInQm;
        this.lengthInM = lengthInM;
        this.widthInM = widthInM;
        this.depthAvgInM = depthAvgInM;
        this.depthMaxInM = depthMaxInM;
        this.heightInM = heightInM;
    }
}

export class ExtraInfo{
    forBeginners: boolean;
    trainingAllowed: boolean;
    iceDivingAllowed: boolean;
    airStationAvailable: boolean;
    interestingFauna: boolean;
    interestingFlora: boolean;
    nightdivingAllowed: boolean;
    registrationMandatory: boolean;
    parkingAvailable: boolean;
    divingAllowed: boolean;
    diveBaseAvailable: boolean;
    toilettShowerAvailable: boolean;
    entryFee: boolean;
    wrackDiving: boolean;
    caveDiving: boolean;
    currentExits: boolean;

    constructor(forBeginners: boolean, trainingAllowed: boolean, iceDivingAllowed: boolean, airStationAvailable: boolean, interestingFauna: boolean, interestingFlora: boolean, nightdivingAllowed: boolean, registrationMandatory: boolean, parkingAvailable: boolean, divingAllowed: boolean, diveBaseAvailable: boolean, toilettShowerAvailable: boolean, entryFee: boolean, wrackDiving: boolean, caveDiving: boolean, currentExits: boolean){
        this.forBeginners = forBeginners;
        this.trainingAllowed = trainingAllowed;
        this.iceDivingAllowed = iceDivingAllowed;
        this.airStationAvailable= airStationAvailable;
        this.interestingFauna = interestingFauna;
        this.interestingFlora=interestingFlora;
        this.nightdivingAllowed = nightdivingAllowed;
        this.registrationMandatory = registrationMandatory;
        this.parkingAvailable = parkingAvailable;
        this.divingAllowed=divingAllowed;
        this.toilettShowerAvailable = toilettShowerAvailable;
        this.entryFee=entryFee;
        this.wrackDiving = wrackDiving;
        this.caveDiving = caveDiving;
        this.currentExits = currentExits;
    }
}


export function createDummyData(){
    let dummyData:DiveSiteData[] =[];
    dummyData.push(new DiveSiteData("Deglersee", "Der Deglersee, besser bekannt als der See Plittersdorf, bietet hervorragende Taucherlebnisse in einer sehr schönen Unterwasserwelt. Die Annehmlichkeiten des Campingplatzes (Duschen, WC) dürfen mit dem Erwerb einer Taucherlaubnis in Anspruch genommen werden. Als Ausbildungssee darf der Deglersee nur in gestatteten Ausnahmefällen genutzt werden.", "Rastatt", "Deutschland", new GeoData(8.146019,48.872054,8000, 496, 205,11, 24, 113), new ExtraInfo(true, false,false, true,true, true,false, false,true, true,true, true,false, false,false, false)));

    dummyData.push(new DiveSiteData("Sämannsee-Süd", "Der See liegt 500 m vom Rhein entfernt. Im Norden gibt es einen direkten Zufluss zum Sämannsee-Nord (KA90-1).", "Rastatt", "Deutschland", new GeoData( 8.119067,48.830051,21000,608,492,13,33,114), new ExtraInfo(false, false,false, false,false, false,false, false,true, true,false, true,false, false,false, false)));

    dummyData.push(new DiveSiteData("Stürmlinger See", "Östlich von Durmersheim. Tauchen verboten.", "Durmersheim", "Deutschland", new GeoData(8.289580,48.929130,44000,1084,540,11,32,118), new ExtraInfo(false, false,false, false,false, false,false, false,false, true,false, true,false, false,false, false)));

    dummyData.push(new DiveSiteData("Wendelinus-Baggersee", "Der Wendelinus Baggersee liegt östlich der Autobahn. Mit seinen westlichen und nördlichen Ufern liegt der See im Büchenauer Wald. Im Osten befindet sich die Badezone.", "Bruchsal", "Deutschland", new GeoData(8.548841,49.097528,20000,660,435,13,26,110), new ExtraInfo(true, false,false, false,true, true,false, false,true, true,false, false,false, false,false, false)));

    dummyData.push(new DiveSiteData("Alte Allmend, Büchenauer Baggersee", "Im Büchenauer Baggersee ist die Gemeingebrauchszone genau festgelegt. Innerhalb dieser ist sowohl das Tauchen sowie die Ausübung anderer Sportarten gestattet. Alle anderen Bereiche unterliegen anderer Regelungen. Zur Verbesserung der sehr angespannten Situation werden alle Taucher gebeten, die Rechtsverordnung zur Nutzung des Sees einzuhalten. Das bedeutet: Tauchen bitte auf den zugelassenen Bereich beschränken! Es ist ein Missverständnis, dass der Tauchereinstieg nur für die Taucher angelegt wurde. Er ist gleichzeitig auch Badeeinstieg. Die Wiese um diesen Einstieg herum sollte nicht mit Taucherkisten belegt werden, weil sie auch als Liegewiese für Badegäste angelegt wurde. Parken bitte nicht im Wohngebiet, sondern NUR auf dem Parkplatz an der Mehrzweckhalle.  Achtung! Es wurden in der Vergangenheit Diebstäle von abgelegten Tauchflaschen und Autoeinbrüche festgestellt.", "Bruchsal", "Deutschland", new GeoData(8.535563,49.098770,11000,786,190,9,25,113), new ExtraInfo(true, false,false, false,false, false,false, false,true, true,false, false,false, false,false, false)));

    return dummyData;
}