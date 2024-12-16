import { Inject } from '@nestjs/common';
import { OwnerRepository } from '../../Domain/Repository/ownerRepository';
import { OwnerBuilderFromOwnerCreationRequest } from '../../Domain/Builder/Owner/ownerBuilderFromOwnerCreationRequest';
import { CreateOwnerRequest } from '../../Domain/ClientPayloads/Owner/CreateOwner/createOwnerRequest';
import { EnsureEmailIsNotDuplicatedGuard } from '../../Domain/IntegrityValidation/ensureEmailIsNotDuplicatedGuard';
import { OwnerCreationError } from '../../Domain/Error/ownerCreationError';
import { OwnerModel } from "../../Domain/DomainModel/Owner/ownerModel";

export class OwnerCreator {
  public constructor(
    private readonly ownerBuilderFromOwnerCreationRequest: OwnerBuilderFromOwnerCreationRequest,
    @Inject('OwnerRepository')
    private readonly ownerRepository: OwnerRepository,
    private readonly ensureEmailIsNotDuplicated: EnsureEmailIsNotDuplicatedGuard,
  ) {}

  async execute(request: CreateOwnerRequest): Promise<OwnerModel> {
    try {
      const ownerDomainModel =
        this.ownerBuilderFromOwnerCreationRequest.execute(request);

      await this.ensureEmailIsNotDuplicated.execute(ownerDomainModel.email);

      await this.ownerRepository.createOwner(ownerDomainModel);

      return ownerDomainModel;
    } catch (e) {
      throw new OwnerCreationError(e.message);
    }
  }
}
