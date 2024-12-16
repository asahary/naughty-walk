import { Inject, Injectable } from "@nestjs/common";
import { IdGenerator } from '../../DomainModel/Services/idGenerator';
import { PetModel } from '../../DomainModel/Pet/petModel';
import { CreatePetRequest } from '../../ClientPayloads/Pet/CreatePet/createPetRequest';
import { Behaviour } from '../../DomainModel/Pet/behaviour';
import { CreateWalkWalksRequest } from '../../ClientPayloads/Walk/CreateWalk/createWalkWalksRequest';
import { WalkModel } from '../../DomainModel/Walk/walkModel';
import { OwnerRepository } from '../../Repository/ownerRepository';
import { PetRepository } from '../../Repository/petRepository';
import { LocationModel } from '../../DomainModel/Walk/locationModel';

@Injectable()
export class WalkBuilderFromOwnerCreationRequest {
  public constructor(
    @Inject('IdentifierGenerator')
    private readonly identifierGenerator: IdGenerator,
    @Inject('OwnerRepository')
    private readonly ownerRepository: OwnerRepository,
    @Inject('PetRepository')
    private readonly petRepository: PetRepository,
  ) {}

  async execute(request: CreateWalkWalksRequest): Promise<WalkModel> {
    const promiseResult = await Promise.all([
      this.ownerRepository.getOwner(request.owner_id),
      this.petRepository.getPetList(request.walking_pet_id_list),
    ]);
    const fromLocationDomainModel = new LocationModel(
      request.from.latitude,
      request.from.latitude,
    );
    const toLocationDomainModel = new LocationModel(
      request.to.latitude,
      request.to.latitude,
    );
    const waypointsLocation = request.waypoints.map(
      (waypoint) => new LocationModel(waypoint.latitude, waypoint.longitude),
    );

    return new WalkModel(
      this.identifierGenerator.generate(),
      promiseResult[0],
      promiseResult[1],
      fromLocationDomainModel,
      toLocationDomainModel,
      waypointsLocation,
    );
  }
}
