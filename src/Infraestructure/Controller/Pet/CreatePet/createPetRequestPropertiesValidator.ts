import { Injectable } from "@nestjs/common";
import { CreatePetRequest } from "../../../../Domain/ClientPayloads/Pet/CreatePet/createPetRequest";
import { MissingPetCreationPropertiesError } from "../../../../Domain/Error/missingPetCreationPropertiesError";

@Injectable()
export class CreatePetRequestPropertiesValidator {

  //Could be moved to constants file
  private mandatoryProperties = [
    'owner_id',
    'name',
    'behaviour',
  ]

  private isCreatePetRequestDto(
    request: unknown,
  ): request is CreatePetRequest {
    const schema: Record<keyof CreatePetRequest, string> = {
      owner_id: 'string',
      name: 'string',
      behaviour: 'string',
      info_about: 'string',
    };

    const missingProperties: string[] = Object.keys(schema)
      .filter((key) => request[key] === undefined)
      .map((key) => key as keyof CreatePetRequest)
      .map((key) => key);


    console.log(missingProperties);
    return !this.mandatoryProperties.some(
        mandatoryProperty => missingProperties.includes(mandatoryProperty)
      );
  }

  public execute(
    request: CreatePetRequest,
  ): request is CreatePetRequest {

    if (!this.isCreatePetRequestDto(request)) {
      throw new MissingPetCreationPropertiesError();
    }

    return;
  }
}