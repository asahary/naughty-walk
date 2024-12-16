import { OwnerModel } from "../DomainModel/Owner/ownerModel";

export interface OwnerRepository {
  createOwner(owner: OwnerModel): Promise<string>
  getOwner(id: string): Promise<OwnerModel>;
  existsOwnerEmail(email: string): Promise<boolean>
}