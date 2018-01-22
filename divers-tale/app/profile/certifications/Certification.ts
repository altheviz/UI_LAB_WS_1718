export class Certification {

    name:string;
    description:string;
    diverNo:string;
    certDate:string;
    instructorNo:string;
    img;

    constructor(
        name: string,
        description: string,
        diverNo: string,
        certDate: string,
        instructorNo: string,
        img: string
    ) {
        this.name = name;
        this.description = description;
        this.diverNo = diverNo;
        this.certDate = certDate;
        this.instructorNo = instructorNo;
        this.img = img;
    }
}
