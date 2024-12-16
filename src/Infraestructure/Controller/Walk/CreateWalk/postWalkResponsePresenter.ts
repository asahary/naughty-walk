import { Injectable } from '@nestjs/common';
import { WalkModel } from '../../../../Domain/DomainModel/Walk/walkModel';
import { Presenter } from '../../presenter';

@Injectable()
export class PostWalkResponsePresenter
  implements
    Presenter<{
      walk_id: string;
    }>
{
  public execute(succeed: boolean,  error?: Error, createWalkId?: string,) {
    return {
      succeed,
      data: {
        walk_id: createWalkId,
      },
      error: error,
    };
  }
}
