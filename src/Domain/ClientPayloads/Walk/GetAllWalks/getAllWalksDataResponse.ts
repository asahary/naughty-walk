import { LocationDataResponse } from '../locationWalkDataResponse';

export interface GetAllWalksDataResponse {
  walk_list: {
    walk_id: string;
    owner_id: string;
    walking_pet_id_list: string[];
    from: LocationDataResponse;
    to: LocationDataResponse;
    waypoints: LocationDataResponse[];
  }[];
}
