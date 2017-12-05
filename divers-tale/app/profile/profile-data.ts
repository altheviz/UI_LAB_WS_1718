export class ProfileData {
    private data;

   constructor() {
        this.data = require("./profile-data.json");
   }


   loadData(){
        return this.data;
   }
}
