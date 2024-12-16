import { Injectable } from '@nestjs/common';
import { Presenter } from '../../presenter';
import { CreatePetDataResponse } from "../../../../Domain/ClientPayloads/Pet/CreatePet/createPetDataResponse";
import { BaseResponse } from "../../../../Domain/ClientPayloads/baseResponse";

@Injectable()
export class CreatePetResponsePresenter
  implements
    Presenter<CreatePetDataResponse>
{
  public present(
    succeed: boolean,
    error?: Error,
    ownerId?: string,
    creationId?: string,
  ): BaseResponse<CreatePetDataResponse> {
    return {
      succeed,
      data: {
        owner_id: ownerId,
        pet_id: creationId,
      },
      error: error,
    };
  }
}
