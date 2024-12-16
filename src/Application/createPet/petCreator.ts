import { Inject, Injectable } from '@nestjs/common';
import { PetRepository } from '../../Domain/Repository/petRepository';
import { OwnerCreationError } from '../../Domain/Error/ownerCreationError';
import { CreatePetRequest } from '../../Domain/ClientPayloads/Pet/CreatePet/createPetRequest';
import { PetBuilderFromOwnerCreationRequest } from '../../Domain/Builder/Pet/petBuilderFromCreatePetRequest';
import { EnsureBehaviourValueIsValidGuard } from '../../Domain/IntegrityValidation/ensureBehaviourIsValidGuard';
import { PetModel } from "../../Domain/DomainModel/Pet/petModel";

@Injectable()
export class PetCreator {
  public constructor(
    private readonly ensureBehaviourValueIsValidGuard: EnsureBehaviourValueIsValidGuard,
    private readonly petBuilderFromPetCreationRequest: PetBuilderFromOwnerCreationRequest,
    @Inject('PetRepository')
    private readonly petRepository: PetRepository,
  ) {}

  public async execute(request: CreatePetRequest): Promise<PetModel> {
    try {
      this.ensureBehaviourValueIsValidGuard.execute(request.behaviour);

      const petDomainModel =
        this.petBuilderFromPetCreationRequest.execute(request);

      await this.petRepository.createPet(
        request.owner_id,
        petDomainModel,
      );

      return petDomainModel;
    } catch (e) {
      throw new OwnerCreationError(e.message);
    }
  }
}
