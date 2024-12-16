import { PetModel } from "../DomainModel/Pet/petModel";

export interface PetRepository {
  createPet(ownerId: string, pet: PetModel): Promise<string>
  getPet(id: string): Promise<PetModel>;
  getPetList(idList: string[]): Promise<PetModel[]>;
}