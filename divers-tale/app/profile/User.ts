import { Certification } from "./Certification";
import { DiveLog } from "./DiveLog";
import { Document } from "./Document";

export class User  {
    id: number;
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
    diveHistory: DiveLog[];
    documents: Document[];

    constructor(email: string,
                name: string,
                id?: number,
                nickname?: string,
                city?: string,
                region?: string,
                country?: string,
                sex?: string,
                dateOfBirth?: Date,
                profileImage?: string,
                certifications?: Certification[],
                diveHistory?: DiveLog[],
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
        this.diveHistory = diveHistory;
        this.documents = documents;
    }
}
