import { LocationRequest } from "../locationWalkRequest";

export interface CreateWalkWalksRequest {
  owner_id: string,
  walking_pet_id_list: string[],
  from: LocationRequest,
  to: LocationRequest,
  waypoints: LocationRequest[]
}