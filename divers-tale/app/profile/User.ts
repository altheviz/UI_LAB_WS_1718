import { Certification } from "./Certification";
import { Equipment } from "./Equipment";
import { DiveLog } from "./DiveLog";
import { Buddy } from "./Buddy";
import { Document } from "./Document";

import { Observable } from "data/observable";


export class UserViewModel extends Observable {
    user: User;

    constructor() {
        super();
        this.user = new User("","","","","","","",
        new Date("February 1, 2000 00:00:00"),"");
    }
}

export class User  {
    email: string;
    name: string;
    nickname: string;
    city: string;
    region: string;
    country: string;
    sex: string;
    dateOfBirth: Date;
    profileImage: string;
    certifications: Certification[];
//    equipment: Equipment[];
//    buddys: Buddy[];
    diveHistory: DiveLog[];
    documents: Document[];

    constructor(email: string,
                name: string,
                nickname?: string,
                city?: string,
                region?: string,
                country?: string,
                sex?: string,
                dateOfBirth?: Date,
                profileImage?: string,
                certifications?: Certification[],
//                equipment?: Equipment[],
                diveHistory?: DiveLog[],
//                buddys?: Buddy[],
                documents?: Document[]) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.city = city;
        this.region = region;
        this.country = country;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.profileImage = profileImage;
        this.certifications = certifications;
//        this.equipment = equipment;
        this.diveHistory = diveHistory;
//        this.buddys = buddys;
        this.documents = documents;
    }
}