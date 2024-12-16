import { LocationWalkRequest } from "./locationWalkRequest";

export interface CreateWalkRequest {
  owner_id: string,
  walking_pet_id_list: string[],
  from: LocationWalkRequest,
  to: LocationWalkRequest,
  waypoints: LocationWalkRequest[]
}