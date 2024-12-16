import { Body, Controller, Headers, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreatePetRequest } from "../../../../Domain/ClientPayloads/Pet/CreatePet/createPetRequest";
import { CreatePetRequestPropertiesValidator } from "./createPetRequestPropertiesValidator";
import { PetCreator } from "../../../../Application/createPet/petCreator";
import { CreatePetResponsePresenter } from "./createPetResponsePresenter";

@Controller('/createPet')
export class CreatePetController {

  public constructor(
    private readonly createPetRequestPropertiesValidator: CreatePetRequestPropertiesValidator,
    private readonly petCreator: PetCreator,
    private readonly createPetResponsePresenter: CreatePetResponsePresenter
  ) {
  }

  @Post()
  async execute(
    @Headers() headers: Record<string, string>,
    @Body() body: CreatePetRequest,
    @Res() response: Response,
  ) {
    try {
      this.createPetRequestPropertiesValidator.execute(body);

      const createdPet = await this.petCreator.execute(body);

      const presentedResponse = this.createPetResponsePresenter.execute(true, undefined, body.owner_id, createdPet.id);

      return response.status(HttpStatus.CREATED).send(presentedResponse);
    } catch (e) {
      const presentedResponse = this.createPetResponsePresenter.execute(false, e, body?.owner_id );
      return response.status(HttpStatus.BAD_REQUEST).send(presentedResponse);
    }
  }
}