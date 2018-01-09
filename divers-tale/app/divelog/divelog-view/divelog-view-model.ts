import { Observable } from "data/observable";
import {DivelogService} from "../divelog-service";

export class DivelogViewModel extends Observable {

    // Meta
    public id: number;
    public diveNumber: number;
    public location: string;
    public date: Date;
    public diveSite: string;

// Entry 1
    public si: string;
    public firstEntryTime: string;
    public firstPg: string;
    public rnt: string;
    public firstPressure: number;

// time
    public bottomTime: number;
    public average1: number;
    public average2: number;

//safety stop
    public safetyTime: number;
    public safetyLevel: number;

// Entry 2
    public secondEntryTime: string;
    public secondPg: string;
    public oxygenPercentage: number;
    public secondPressure: number;

// weight
    public ditch: number;
    public trim: number;

// tank / gas
    public air: String;
    public ean: String;
    public eanText: string;
    public tankType: string;
    public tankSize: string;

// wet suit
    public wetSuitHelmet: number;
    public wetSuitGloves: number;
    public wetSuitShoes: number;
    public wetSuitShortSuit: number;
    public wetSuitUnderwear: number;
    public wetSuitLongSuit: number;

// dry suit
    public drySuitGloves: String;
    public drySuitShoes: String;
    public drySuit: string;
    public drySuitLiner: string;

// conditions
    public viz: number;
    public current: string;
    public sunny: String;
    public sunCloud: String;
    public cloud: String;
    public rain: String;
    public fresh: String;
    public salt: String;
    public boat: String;
    public night: String;
    public surf: String;
    public waves: String;
    public surge: String;
    public wreck: String;
    public reef: String;
    public deep: String;
    public photo: String;
    public drift: String;
    public training: String;
    public survey: String;
    public recovery: String;

// temperature
    public aboveSurface: number;
    public belowSurface: number;
    public groundLevel: number;

// comment
    public comment: string;

// times
    public previousTime: string;
    public thisDive: string;
    public totalTime: string;

// verification
    public verificatorName: string;
    public instructor: String;
    public diveMaster: String;
    public buddy: String;
    public certificationNumber: number;

    constructor() {
        super();
    }
}
