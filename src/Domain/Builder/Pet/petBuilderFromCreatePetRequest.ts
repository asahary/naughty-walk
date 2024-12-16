import { Inject, Injectable } from "@nestjs/common";
import { IdGenerator } from '../../DomainModel/Services/idGenerator';
import { PetModel } from '../../DomainModel/Pet/petModel';
import { CreatePetRequest } from '../../ClientPayloads/Pet/CreatePet/createPetRequest';
import { Behaviour } from '../../DomainModel/Pet/behaviour';

@Injectable()
export class PetBuilderFromOwnerCreationRequest {
  public constructor(
    @Inject('IdentifierGenerator')
    private readonly identifierGenerator: IdGenerator,
  ) {}

  public execute(request: CreatePetRequest): PetModel {
    return new PetModel(
      this.identifierGenerator.generate(),
      request.name,
      Behaviour[request.behaviour],
      request.info_about,
    );
  }
}