import { Inject, Injectable } from "@nestjs/common";
import { DuplicatedOwnerEmailError } from "../Error/duplicatedOwnerEmailError";
import { OwnerRepository } from "../Repository/ownerRepository";
import { Behaviour } from "../DomainModel/Pet/behaviour";
import { BehaviourValueNotValidError } from "../Error/behaviourValueNotValidError";


//TODO: INSTEAD OF DOING THIS WE COULD CREATE A CLASS IN INFRASTRUCTURE LAYER IMPLEMENTING createPetRequestDto and this class using swagger decorator to validate
@Injectable()
export class EnsureBehaviourValueIsValidGuard {
  public execute(behaviour: string): void {
    if(!Behaviour[behaviour]) {
      throw new BehaviourValueNotValidError(behaviour);
    }
  }
}