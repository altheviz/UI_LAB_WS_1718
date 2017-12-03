import { Observable } from "data/observable";
import {DivelogService} from "./divelog-service";

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
    public air: boolean;
    public ean: boolean;
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
    public drySuitGloves: boolean;
    public drySuitShoes: boolean;
    public drySuit: string;
    public drySuitLiner: string;

// conditions
    public viz: number;
    public current: string;
    public sunny: boolean;
    public sunCloud: boolean;
    public cloud: boolean;
    public rain: boolean;
    public fresh: boolean;
    public salt: boolean;
    public boat: boolean;
    public night: boolean;
    public surf: boolean;
    public waves: boolean;
    public surge: boolean;
    public wreck: boolean;
    public reef: boolean;
    public deep: boolean;
    public photo: boolean;
    public drift: boolean;
    public training: boolean;
    public survey: boolean;
    public recovery: boolean;

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
    public instructor: boolean;
    public diveMaster: boolean;
    public buddy: boolean;
    public certificationNumber: number;

    constructor() {
        super();
    }
}
