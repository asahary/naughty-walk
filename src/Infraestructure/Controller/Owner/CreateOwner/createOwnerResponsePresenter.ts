import { Injectable } from '@nestjs/common';
import { Presenter } from "../../presenter";
import { DefaultResponse } from "../../../../Domain/ClientPayloads/defaultResponse";

@Injectable()
export class CreateOwnerResponsePresenter implements Presenter<{ owner_id: string }> {
  public execute(
    succeed: boolean,
    error?: Error,
    creationId?: string,
  ): DefaultResponse<any> {
    return {
      succeed: succeed,
      data: {
        owner_id: creationId,
      },
      error,
    };
  }
}
