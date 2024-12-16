import { Behaviour } from "./behaviour";

export class PetModel {

  public constructor(
  private _id: string,
  private _name: string,
  private _behaviour: Behaviour,
  private _infoAbout: string = ''
  ) {
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get behaviour(): Behaviour {
    return this._behaviour;
  }

  set behaviour(value: Behaviour) {
    this._behaviour = value;
  }

  get infoAbout(): string {
    return this._infoAbout;
  }

  set infoAbout(value: string) {
    this._infoAbout = value;
  }
}