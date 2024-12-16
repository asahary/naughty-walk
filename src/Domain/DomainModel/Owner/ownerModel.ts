import { PetModel } from "../Pet/petModel";

export class OwnerModel {
  public constructor(
    private _id: string,
    private _email: string,
    private _name: string,
    private _surname: string,
    private _pets: PetModel[] = []
  ) {
  }

 //getters
  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get pets(): PetModel[] {
    return this._pets;
  }

  //setters
  set id(value: string) {
    this._id = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set surname(value: string) {
    this._surname = value;
  }

  set pets(value: PetModel[]) {
    this._pets = value;
  }
}