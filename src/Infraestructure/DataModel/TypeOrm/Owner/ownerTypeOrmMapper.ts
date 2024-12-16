import { OwnerTypeOrmDataModel } from "./ownerTypeOrmDataModel";
import { OwnerModel } from "../../../../Domain/DomainModel/Owner/ownerModel";
import { PetTypeOrmMapper } from "../Pet/petTypeOrmMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OwnerTypeOrmMapper
 {
   public constructor(
     private readonly petTypeOrmMapper: PetTypeOrmMapper
   ) {
   }
   public toDomainModel(userDomainModel: OwnerTypeOrmDataModel): OwnerModel {

     return new OwnerModel(
       userDomainModel.id,
       userDomainModel.email,
       userDomainModel.name,
       userDomainModel.surname,
       userDomainModel.petList.map( petDataModel =>
         this.petTypeOrmMapper.toDomainModel(petDataModel)
       )
     );
   }

   public toDataModel(ownerDomainModel: OwnerModel): OwnerTypeOrmDataModel {
     const model = new OwnerTypeOrmDataModel();

     model.id = ownerDomainModel.id;
     model.email = ownerDomainModel.email;
     model.name = ownerDomainModel.name;
     model.surname = ownerDomainModel.surname;
     model.petList = ownerDomainModel.pets.map(
       petDomainModel => this.petTypeOrmMapper.toDataModel(
         ownerDomainModel.id,
         petDomainModel
       )
     );

     return model;
   }
 }