import { Injectable } from '@nestjs/common';
import { Presenter } from '../../presenter';

@Injectable()
export class CreatePetResponsePresenter
  implements
    Presenter<{
      owner_id: string;
      pet_id: string;
    }>
{
  public execute(
    succeed: boolean,
    error?: Error,
    ownerId?: string,
    creationId?: string,
  ) {
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
