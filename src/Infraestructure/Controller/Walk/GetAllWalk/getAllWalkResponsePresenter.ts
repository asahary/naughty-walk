import { Injectable } from '@nestjs/common';
import { WalkModel } from '../../../../Domain/DomainModel/Walk/walkModel';
import { Presenter } from '../../presenter';
import { GetAllWalksDataResponse } from "../../../../Domain/ClientPayloads/Walk/GetAllWalks/getAllWalksDataResponse";
import { BaseResponse } from "../../../../Domain/ClientPayloads/baseResponse";

@Injectable()
export class GetAllWalkResponsePresenter
  implements
    Presenter<GetAllWalksDataResponse>
{
  public present(succeed: boolean, error?: Error, walkList?: WalkModel[]): BaseResponse<GetAllWalksDataResponse> {

    const presentedWalkList = walkList ? walkList.map( walkDomain => {

      return {
        walk_id: walkDomain.id,
        owner_id: walkDomain.owner.id,
        walking_pet_id_list: walkDomain.walkingPets.map( walkingPet => walkingPet.id),
        from: walkDomain.from,
        to: walkDomain.to,
        waypoints: walkDomain.waypoints
      }
    }) : [];

    return {
      succeed,
      data: {
        walk_list: presentedWalkList,
      },
      error: error,
    };
  }
}
