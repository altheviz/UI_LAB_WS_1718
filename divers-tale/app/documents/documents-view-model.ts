import { Observable } from "data/observable";


export class DocumentsViewModel extends Observable {
    public documentList: DocumentItem[]=[];
    constructor() {
        super();
    }
    public loadDocuments(){
        this.documentList = [];
        this.addDocument();        
    } 

    public addDocument(){
        this.documentList.push({
            name: "Perso",
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam ",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Muster_des_Personalausweises_VS.jpg"
        },{
            name: "Tauchschein",
            description: "Lorem ipsum dolor",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Muster_des_Personalausweises_VS.jpg"
        },{
            name: "Tauchschein2",
            description: "Lorem ipsum dolor",
            img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Muster_des_Personalausweises_VS.jpg"
        })
    }
}

export interface DocumentItem {
    name:string;
    description:string;
    img;
}
