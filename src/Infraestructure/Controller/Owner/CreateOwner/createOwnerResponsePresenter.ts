import { Injectable } from '@nestjs/common';
import { Presenter } from "../../presenter";
import { CreateOwnerDataResponse } from "../../../../Domain/ClientPayloads/Owner/CreateOwner/createOwnerDataResponse";
import { BaseResponse } from "../../../../Domain/ClientPayloads/baseResponse";

@Injectable()
export class CreateOwnerResponsePresenter implements Presenter<CreateOwnerDataResponse> {
  public present(
    succeed: boolean,
    error?: Error,
    creationId?: string,
  ): BaseResponse<CreateOwnerDataResponse> {
    return {
      succeed: succeed,
      data: {
        owner_id: creationId,
      },
      error,
    };
  }
}
