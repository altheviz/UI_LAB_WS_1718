import { Certification } from "./certifications/Certification";
import { Document } from "./documents/Document";

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
    documents: Document[];

    constructor(
        email: string,
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
        documents?: Document[]
    ) {
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
        this.documents = documents;
    }
}
