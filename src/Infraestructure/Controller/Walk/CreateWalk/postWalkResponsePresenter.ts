import { Injectable } from '@nestjs/common';
import { WalkModel } from '../../../../Domain/DomainModel/Walk/walkModel';
import { Presenter } from '../../presenter';
import { CreateWalkDataResponse } from "../../../../Domain/ClientPayloads/Walk/CreateWalk/createWalkDataResponse";
import { BaseResponse } from "../../../../Domain/ClientPayloads/baseResponse";

@Injectable()
export class PostWalkResponsePresenter
  implements
    Presenter<CreateWalkDataResponse>
{
  public present(succeed: boolean, error?: Error, createWalkId?: string): BaseResponse<CreateWalkDataResponse> {
    return {
      succeed,
      data: {
        walk_id: createWalkId,
      },
      error: error,
    };
  }
}
