export class LocationModel {

  public constructor(
    private _latitude: number,
    private _longitude: number
  ) {
  }


  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }
}