import { Observable } from "data/observable";
import {DivelogService} from "../divelog-service";

export class DivelogViewModel extends Observable {

    // Meta
    public id: number;
    public diveNumber: number;
    public location: string = "";
    public date: Date;
    public diveSite: string = "";

// Entry 1
    public si: string = "";
    public firstEntryTime: string = "";
    public firstPg: string = "";
    public rnt: string = "";
    public firstPressure: number;

// time
    public bottomTime: number;
    public average1: number;
    public average2: number;

//safety stop
    public safetyTime: number;
    public safetyLevel: number;

// Entry 2
    public secondEntryTime: string = "";
    public secondPg: string = "";
    public oxygenPercentage: number;
    public secondPressure: number;

// weight
    public ditch: number;
    public trim: number;

// tank / gas
    public air: string = "";
    public ean: string = "";
    public eanText: string = "";
    public tankType: string = "";
    public tankSize: string = "";

// wet suit
    public wetSuitHelmet: number;
    public wetSuitGloves: number;
    public wetSuitShoes: number;
    public wetSuitShortSuit: number;
    public wetSuitUnderwear: number;
    public wetSuitLongSuit: number;

// dry suit
    public drySuitGloves: string = "";
    public drySuitShoes: string = "";
    public drySuit: string = "";
    public drySuitLiner: string = "";

// conditions
    public viz: number;
    public current: string = "";
    public sunny: string = "";
    public sunCloud: string = "";
    public cloud: string = "";
    public rain: string = "";
    public fresh: string = "";
    public salt: string = "";
    public boat: string = "";
    public night: string = "";
    public surf: string = "";
    public waves: string = "";
    public surge: string = "";
    public wreck: string = "";
    public reef: string = "";
    public deep: string = "";
    public photo: string = "";
    public drift: string = "";
    public training: string = "";
    public survey: string = "";
    public recovery: string = "";

// temperature
    public aboveSurface: number;
    public belowSurface: number;
    public groundLevel: number;

// comment
    public comment: string = "";

// times
    public previousTime: string = "";
    public thisDive: string = "";
    public totalTime: string = "";

// verification
    public verificatorName: string = "";
    public instructor: string = "";
    public diveMaster: string = "";
    public buddy: string = "";
    public certificationNumber: number;

    constructor() {
        super();
    }
}
