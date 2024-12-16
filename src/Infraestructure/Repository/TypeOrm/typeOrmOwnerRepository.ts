import { OwnerRepository } from '../../../Domain/Repository/ownerRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerTypeOrmDataModel } from '../../DataModel/TypeOrm/Owner/ownerTypeOrmDataModel';
import { Repository } from 'typeorm';
import { OwnerModel } from '../../../Domain/DomainModel/Owner/ownerModel';
import { OwnerTypeOrmMapper } from '../../DataModel/TypeOrm/Owner/ownerTypeOrmMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmOwnerRepository implements OwnerRepository {
  public constructor(
    @InjectRepository(OwnerTypeOrmDataModel)
    private readonly ownerRepository: Repository<OwnerTypeOrmDataModel>,
    private readonly ownerTypeOrmMapper: OwnerTypeOrmMapper,
  ) {}

  async getOwner(id: string): Promise<OwnerModel> {
    try {
      const ownerDataModel = await this.ownerRepository.findOne({
        where: { id },
        relations: { petList: true },
      });

      return this.ownerTypeOrmMapper.toDomainModel(ownerDataModel);
    } catch (e) {
      throw new Error(`Owner type orm repository error: ${e.message}`);
    }
  }

  async createOwner(owner: OwnerModel): Promise<string> {
    const dataModel = this.ownerTypeOrmMapper.toDataModel(owner);

    try {
      return (await this.ownerRepository.save(dataModel)).id;
    } catch (e) {
      throw new Error(`Owner type orm repository error: ${e.message}`);
    }
  }

  async existsOwnerEmail(email: string): Promise<boolean> {
    return await this.ownerRepository.existsBy({ email: email });
  }
}
