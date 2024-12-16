import { Inject, Injectable } from "@nestjs/common";
import { WalkModel } from "../../Domain/DomainModel/Walk/walkModel";
import { WalkRepository } from "../../Domain/Repository/walkRepository";
import { CreateWalkWalksRequest } from "../../Domain/ClientPayloads/Walk/CreateWalk/createWalkWalksRequest";
import {
  WalkBuilderFromOwnerCreationRequest
} from "../../Domain/Builder/Walk/walkBuilderFromCreateWalkRequest";

@Injectable()
export class WalkPublisher {

  public constructor(
    private walkBuilderFromRequest: WalkBuilderFromOwnerCreationRequest,
    @Inject('WalkRepository')
    private readonly walkRepository: WalkRepository
  ) {
  }

  async execute(publishWalkRequest: CreateWalkWalksRequest): Promise<WalkModel> {

    try {

      const walkDomainModel = await this.walkBuilderFromRequest.execute(publishWalkRequest);

      const result = await this.walkRepository.saveWalk(walkDomainModel);

      return walkDomainModel;
    }catch (e) {

    }
  }
}