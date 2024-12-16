import { OwnerModel } from "../Owner/ownerModel";
import { PetModel } from "../Pet/petModel";
import { LocationModel } from "./locationModel";

export class WalkModel {

  public constructor(
    private _id: string,
    private _owner: OwnerModel,
    private _walkingPets: PetModel[],
    private _from: LocationModel,
    private _to: LocationModel,
    private _waypoints: LocationModel[]
  ) {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get owner(): OwnerModel {
    return this._owner;
  }

  set owner(value: OwnerModel) {
    this._owner = value;
  }

  get walkingPets(): PetModel[] {
    return this._walkingPets;
  }

  set walkingPets(value: PetModel[]) {
    this._walkingPets = value;
  }

  get from(): LocationModel {
    return this._from;
  }

  set from(value: LocationModel) {
    this._from = value;
  }

  get to(): LocationModel {
    return this._to;
  }

  set to(value: LocationModel) {
    this._to = value;
  }

  get waypoints(): LocationModel[] {
    return this._waypoints;
  }

  set waypoints(value: LocationModel[]) {
    this._waypoints = value;
  }




}