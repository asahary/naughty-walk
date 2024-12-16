import { PetModel } from '../../../../Domain/DomainModel/Pet/petModel';
import { PetTypeOrmDataModel } from './petTypeOrmDataModel';
import { Injectable } from '@nestjs/common';
import { Behaviour } from '../../../../Domain/DomainModel/Pet/behaviour';

@Injectable()
export class PetTypeOrmMapper {
  public constructor() {}
  public toDomainModel(petDomainModel: PetTypeOrmDataModel): PetModel {
    return new PetModel(
      petDomainModel.id,
      petDomainModel.name,
      Behaviour[petDomainModel.behaviour],
      petDomainModel.infoAbout,
    );
  }

  public toDataModel(
    ownerId: string,
    petDomainModel: PetModel,
  ): PetTypeOrmDataModel {
    const dataModel = new PetTypeOrmDataModel();

    dataModel.id = petDomainModel.id;
    dataModel.name = petDomainModel.name;
    dataModel.behaviour = petDomainModel.behaviour;
    dataModel.infoAbout = petDomainModel.infoAbout;
    dataModel.ownerId = ownerId;

    return dataModel;
  }
}