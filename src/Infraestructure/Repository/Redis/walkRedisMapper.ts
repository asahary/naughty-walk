import { Inject, Injectable } from "@nestjs/common";
import { WalkModel } from "../../../Domain/DomainModel/Walk/walkModel";
import { WalkRedisDataModel } from "../../DataModel/Redis/Walk/walkRedisDataModel";
import { OwnerRepository } from "../../../Domain/Repository/ownerRepository";
import { LocationRedisMapper } from "./locationRedisMapper";

@Injectable()
export class WalkRedisMapper {
  public constructor(
    @Inject("OwnerRepository")
    private readonly ownerRepository: OwnerRepository,
    private readonly locationRedisMapper: LocationRedisMapper
  ) {
  }

  async toDomainModel(walkDomainModel: WalkRedisDataModel): Promise<WalkModel> {
    const ownerDomainModel = await this.ownerRepository.getOwner(walkDomainModel.owner_id);
    const waypointsPromiseList = walkDomainModel.waypoints.map(waypoint => this.locationRedisMapper.toDomainModel(waypoint));
    const waypointList = await Promise.all(waypointsPromiseList);

    return new WalkModel(
      walkDomainModel.id,
      ownerDomainModel,
      ownerDomainModel.pets,
      await this.locationRedisMapper.toDomainModel(walkDomainModel.from),
      await this.locationRedisMapper.toDomainModel(walkDomainModel.to),
      waypointList
    );
  }

  public toDataModel(
    walkDomainModel: WalkModel
  ): WalkRedisDataModel {
    const dataModel = new WalkRedisDataModel();

    dataModel.id = walkDomainModel.id;
    dataModel.owner_id = walkDomainModel.owner.id;
    dataModel.walking_pet_id_list = walkDomainModel.walkingPets.map(pet => pet.id);
    dataModel.from = { _latitude: walkDomainModel.from.latitude, _longitude: walkDomainModel.from.longitude };
    dataModel.to = { _latitude: walkDomainModel.to.latitude, _longitude: walkDomainModel.to.longitude };
    dataModel.waypoints = walkDomainModel.waypoints.map( (waypoint) =>
    {
      return {
        _latitude: waypoint.latitude,
        _longitude: waypoint.longitude
      }
    }
  );


    return dataModel;
  }
}