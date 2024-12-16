import { Inject, Injectable } from "@nestjs/common";
import { DuplicatedOwnerEmailError } from "../Error/duplicatedOwnerEmailError";
import { OwnerRepository } from "../Repository/ownerRepository";


//TODO: INSTEAD OF DOING THIS WE COULD CREATE A CLASS IN INFRASTRUCTURE LAYER IMPLEMENTING createOwnerRequestDto and this class using swagger decorator to validate
@Injectable()
export class EnsureEmailIsNotDuplicatedGuard {

  public constructor(
    @Inject('OwnerRepository')
    private readonly ownerRepository: OwnerRepository
  ) {
  }
  public async execute(email: string) {
    if(await this.ownerRepository.existsOwnerEmail(email)) {
      throw new DuplicatedOwnerEmailError();
    }
  }
}