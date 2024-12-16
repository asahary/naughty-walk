import { Injectable } from "@nestjs/common";
import { LocationModel } from "../../../Domain/DomainModel/Walk/locationModel";
import { LocationRedisDataModel } from "./locationRedisDataModel";

@Injectable()
export class LocationRedisMapper {
  public constructor(
  ) {}
  async toDomainModel(walkDataModel: LocationRedisDataModel): Promise<LocationModel> {

    return new LocationModel(
      walkDataModel._latitude,
      walkDataModel._longitude
    );
  }

  public toDataModel(
    locationDomainModel: LocationModel,
  ): LocationRedisDataModel {
    const dataModel = new LocationRedisDataModel();

    dataModel._latitude = locationDomainModel.latitude;
    dataModel._longitude = locationDomainModel.longitude;

    return dataModel;
  }
}