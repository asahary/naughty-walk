import { Inject, Injectable } from "@nestjs/common";
import { WalkRepository } from '../../../Domain/Repository/walkRepository';
import { WalkModel } from '../../../Domain/DomainModel/Walk/walkModel';
import { Cache } from '@nestjs/cache-manager';
import { WalkRedisMapper } from "./walkRedisMapper";
import { WalkRedisDataModel } from "../../DataModel/Redis/Walk/walkRedisDataModel";

@Injectable()
export class RedisWalkRepository implements WalkRepository {
  public constructor(
    @Inject('RedisCache')
    private readonly cacheRepository: Cache,
    private redisWalkMapper: WalkRedisMapper
  ) {}

  async saveWalk(walkModel: WalkModel): Promise<string> {
    const dataModel = this.redisWalkMapper.toDataModel(walkModel);

    await this.cacheRepository.set(walkModel.id, dataModel, 36000);

    return dataModel.id;
  }

  async getWalk(walkId: string): Promise<WalkModel> {

    const dataModel = await this.cacheRepository.get<WalkRedisDataModel>(walkId);

    return await this.redisWalkMapper.toDomainModel(dataModel);
  }

  async getAll(): Promise<WalkModel[]> {
    const keys = await this.cacheRepository.store.keys();
    const dataModelList: WalkRedisDataModel[] = await this.cacheRepository.store.mget(...keys) as unknown as WalkRedisDataModel[] ;

    const domainModelPromiseList = dataModelList.map(dataModel => this.redisWalkMapper.toDomainModel(dataModel));

    return await Promise.all(domainModelPromiseList);
  }
}
