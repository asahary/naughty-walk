import { Inject, Injectable } from '@nestjs/common';
import { WalkRepository } from '../../Domain/Repository/walkRepository';
import { WalkModel } from '../../Domain/DomainModel/Walk/walkModel';

@Injectable()
export class AllWalksGetter {
  public constructor(
    @Inject('WalkRepository')
    private readonly walkRepository: WalkRepository,
  ) {}

  async execute(filters?): Promise<WalkModel[]> {
    try {
      return await this.walkRepository.getAll(filters);
    } catch (e) {

    }
  }
}