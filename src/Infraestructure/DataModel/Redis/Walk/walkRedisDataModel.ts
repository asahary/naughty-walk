import { LocationRedisDataModel } from "../../../Repository/Redis/locationRedisDataModel";

export class WalkRedisDataModel {
  id: string;
  owner_id: string;
  walking_pet_id_list: string[];
  from: LocationRedisDataModel;
  to: LocationRedisDataModel;
  waypoints: LocationRedisDataModel[];
}