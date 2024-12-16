import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PetRepository } from '../../../Domain/Repository/petRepository';
import { PetTypeOrmDataModel } from '../../DataModel/TypeOrm/Pet/petTypeOrmDataModel';
import { PetTypeOrmMapper } from '../../DataModel/TypeOrm/Pet/petTypeOrmMapper';
import { PetModel } from '../../../Domain/DomainModel/Pet/petModel';

@Injectable()
export class TypeOrmPetRepository implements PetRepository {
  public constructor(
    @InjectRepository(PetTypeOrmDataModel)
    private readonly petRepository: Repository<PetTypeOrmDataModel>,
    private readonly petTypeOrmMapper: PetTypeOrmMapper,
  ) {}

  async createPet(ownerId: string, pet: PetModel): Promise<string> {
    const dataModel = this.petTypeOrmMapper.toDataModel(ownerId, pet);

    try {
      return (await this.petRepository.save(dataModel)).id;
    } catch (e) {
      throw new Error(`Pet type orm repository error: ${e.message}`);
    }
  }

  async getPet(id: string): Promise<PetModel> {
    try {
      const dataModel = await this.petRepository.findOneBy({ id });

      return this.petTypeOrmMapper.toDomainModel(dataModel);
    } catch (e) {
      throw new Error(`Pet type orm repository error: ${e.message}`);
    }
  }

  async getPetList(idList: string[]): Promise<PetModel[]> {
    try {
      const dataModelList = await this.petRepository.findBy({ id: In(idList) });

      const dataModelPromiseList = dataModelList.map((dataModel) =>
        this.petTypeOrmMapper.toDomainModel(dataModel),
      );

      return dataModelPromiseList;
    } catch (e) {
      throw new Error(`Pet type orm repository error: ${e.message}`);
    }
  }
}
