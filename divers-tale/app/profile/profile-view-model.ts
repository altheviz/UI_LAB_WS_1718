import { Observable } from "data/observable";

export class ProfileViewModel extends Observable {
  public name: string;
  public nickname: string;
  public city: string;
  public region: string;
  public country: string;
  public birthDate: Date;
  public sex: string;

  public userId: number;
  public email: string;
// public profileImage: string/object;

  constructor() {
    super();
  }

  public setName( n: string) {this.name = n;}
  public setNickname( n: string) {this.nickname = n;}
  public setCity( n: string) {this.city = n;}
  public setRegion( n: string) {this.region = n;}
  public setBirthDate( d: Date) {this.birthDate = d;}
  public setCountry( n: string) {this.country = n;}
  public setSex( n: string) {this.sex = n;}
  public setEmail( n: string) {this.email = n;}
  //public setImage( i ) {this.image = i;}

  public getName() :string {return this.name;}
  public getNickname() :string {return this.nickname;}
  public getCity() :string {return this.city;}
  public getRegion() :string {return this.region;}
  public getCountry() :string {return this.country;}
  public getSex() :string {return this.sex;}
  public getEmail() :string {return this.email;}
  public getBirthDate() :Date {return this.birthDate;}
  //public getImage() :string {return this.image;}

  //public setImage( i ) {this.image = i;}

}
