import { Body, Controller, Get, Headers, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { PostWalkResponsePresenter } from "./postWalkResponsePresenter";
import { CreateWalkRequest } from "../../../../Domain/ClientPayloads/Walk/CreateWalk/createWalkRequest";
import { WalkPublisher } from "../../../../Application/publishWalk/walkPublisher";

@Controller('/publishWalk')
export class PostWalkController {

  public constructor(
    private readonly walkPublisher: WalkPublisher,
    private readonly postWalkResponsePresenter: PostWalkResponsePresenter
  ) {
  }

  @Post()
  async execute(
    @Headers() headers: Record<string, string>,
    @Body() body: CreateWalkRequest,
    @Res() response: Response,
  ) {


    try {


      const result = await this.walkPublisher.execute(body);
      const presented = this.postWalkResponsePresenter.execute(true, undefined,result.id);

      return response.status(HttpStatus.OK).send(presented);
    }catch (e){
      const presented = this.postWalkResponsePresenter.execute(true, undefined, e);

      return response.status(HttpStatus.BAD_REQUEST).send(presented);
    }

  }
}