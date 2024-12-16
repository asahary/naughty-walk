import { Injectable } from '@nestjs/common';
import { WalkModel } from '../../../../Domain/DomainModel/Walk/walkModel';
import { Presenter } from '../../presenter';

@Injectable()
export class GetAllWalkResponsePresenter
  implements
    Presenter<{
      walk_list: any[];
    }>
{
  public execute(succeed: boolean, error?: Error, walkList?: WalkModel[]) {
    return {
      succeed,
      data: {
        walk_list: walkList,
      },
      error: error,
    };
  }
}
