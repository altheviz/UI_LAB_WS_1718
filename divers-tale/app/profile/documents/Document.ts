export class Document {

    name:string;
    description:string;
    img;

    constructor(
        name: string,
        description: string,
        img: string
    ) {
        this.name = name;
        this.description = description;
        this.img = img;
    }
}
