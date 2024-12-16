import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OwnerTypeOrmDataModel } from "../Owner/ownerTypeOrmDataModel";

@Entity({ name: 'pet' })
export class PetTypeOrmDataModel {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  id: string;

  @Column({ name: 'owner_id', type: 'varchar' })
  ownerId: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'behaviour', type: 'varchar' })
  behaviour: string;

  @Column({ name: 'info_about', type: 'varchar' })
  infoAbout: string;

  @ManyToOne(() => OwnerTypeOrmDataModel, (ownerDataModel) => ownerDataModel.petList)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: OwnerTypeOrmDataModel;

}
