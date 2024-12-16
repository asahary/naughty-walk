import { OwnerCreator } from '../../../../Application/createOwner/ownerCreator';
import {
  Headers,
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateOwnerRequest } from '../../../../Domain/ClientPayloads/Owner/CreateOwner/createOwnerRequest';
import { Response } from 'express';
import { CreateOwnerResponsePresenter } from './createOwnerResponsePresenter';
import { CreateOwnerRequestPropertiesValidator } from "./createOwnerRequestPropertiesValidator";

@Controller('/createOwner')
export class CreateOwnerController {
  public constructor(
    private readonly createOwnerRequestPropertiesValidator: CreateOwnerRequestPropertiesValidator,
    private readonly ownerCreator: OwnerCreator,
    private readonly createOwnerResponsePresenter: CreateOwnerResponsePresenter,
  ) {}

  @Post()
  async execute(
    @Headers() headers: Record<string, string>,
    @Body() body: CreateOwnerRequest,
    @Res() response: Response,
  ) {
    try {
      this.createOwnerRequestPropertiesValidator.execute(body);

      const createdOwner = await this.ownerCreator.execute(body);

      const presentedResponse = this.createOwnerResponsePresenter.execute(true, undefined, createdOwner.id);

      return response.status(HttpStatus.CREATED).send(presentedResponse);
    } catch (e) {
      const presentedResponse = this.createOwnerResponsePresenter.execute(false, e, undefined);
      return response.status(HttpStatus.BAD_REQUEST).send(presentedResponse);
    }
  }

}
