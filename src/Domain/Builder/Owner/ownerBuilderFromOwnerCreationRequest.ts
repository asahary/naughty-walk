import { OwnerModel } from "../../DomainModel/Owner/ownerModel";
import { CreateOwnerRequest } from "../../ClientPayloads/Owner/CreateOwner/createOwnerRequest";
import { Inject } from "@nestjs/common";
import { IdGenerator } from "../../DomainModel/Services/idGenerator";

export class OwnerBuilderFromOwnerCreationRequest {
  public constructor(
    @Inject('IdentifierGenerator')
    private readonly identifierGenerator: IdGenerator
  ) {
  }

  public execute(request: CreateOwnerRequest): OwnerModel{

    return new OwnerModel(
      this.identifierGenerator.generate(),
      request.email,
      request.name,
      request.surname
    );
  }
}