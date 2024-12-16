
import { WalkModel } from "../DomainModel/Walk/walkModel";

export interface WalkRepository {
  saveWalk(walkModel: WalkModel): Promise<string>;
  getWalk(walkId: string): Promise<WalkModel>;
  getAll(filters?): Promise<WalkModel[]>;
}