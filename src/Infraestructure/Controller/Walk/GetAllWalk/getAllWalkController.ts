import { Body, Controller, Get, Headers, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { GetAllWalkResponsePresenter } from "./getAllWalkResponsePresenter";
import { AllWalksGetter } from "../../../../Application/getAllWalks/allWalksGetter";

@Controller('/getAllWalks')
export class GetAllWalkController {

  public constructor(
    private readonly allWalksGetter: AllWalksGetter,
    private readonly presenter: GetAllWalkResponsePresenter
  ) {
  }

  @Get()
  async execute(
    @Headers() headers: Record<string, string>,
    @Body() body: any,
    @Res() response: Response,
  ) {


    try {

      const result = await this.allWalksGetter.execute(body?.filters);
      const presented = this.presenter.execute(true, undefined, result);

      return response.status(HttpStatus.OK).send(presented);
    }catch (e){
      const presented = this.presenter.execute(true, undefined, e);

      return response.status(HttpStatus.BAD_REQUEST).send(presented);
    }

  }
}