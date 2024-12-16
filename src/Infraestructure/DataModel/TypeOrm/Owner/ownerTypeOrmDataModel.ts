import { Entity, Column, PrimaryColumn, OneToMany, DeepPartial } from "typeorm";
import { PetTypeOrmDataModel } from "../Pet/petTypeOrmDataModel";

@Entity({ name: 'owner' })
export class OwnerTypeOrmDataModel {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  id: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'surname', type: 'varchar' })
  surname: string;

  @OneToMany(() => PetTypeOrmDataModel, (petDataModel) => petDataModel.owner)
  petList: PetTypeOrmDataModel[];
}
