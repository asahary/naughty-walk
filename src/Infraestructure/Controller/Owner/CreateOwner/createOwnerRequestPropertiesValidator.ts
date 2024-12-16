import { Injectable } from "@nestjs/common";
import { CreateOwnerRequest } from "../../../../Domain/ClientPayloads/Owner/CreateOwner/createOwnerRequest";
import { MissingOwnerCreationPropertiesError } from "../../../../Domain/Error/missingOwnerCreationPropertiesError";

@Injectable()
export class CreateOwnerRequestPropertiesValidator {

  private isCreateOwnerRequestDto(
    request: unknown,
  ): request is CreateOwnerRequest {
    const schema: Record<keyof CreateOwnerRequest, string> = {
      email: 'string',
      name: 'string',
      surname: 'string',
    };

    const missingProperties = Object.keys(schema)
      .filter((key) => request[key] === undefined)
      .map((key) => key as keyof CreateOwnerRequest)
      .map((key) => key);

    return missingProperties.length === 0;
  }

  public execute(
    request: CreateOwnerRequest,
  ): request is CreateOwnerRequest {

    if (!this.isCreateOwnerRequestDto(request)) {
      throw new MissingOwnerCreationPropertiesError();
    }

    return;
  }
}