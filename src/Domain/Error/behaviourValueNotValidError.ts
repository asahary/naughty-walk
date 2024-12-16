import { Behaviour } from "../DomainModel/Pet/behaviour";

export class BehaviourValueNotValidError extends Error {
  constructor(providedValue: string) {
    super();
    this.name = 'BEHAVIOUR_VALUE_NOT_VALID';
    this.message = `Provided value ${providedValue} not valid. Behaviour value should be in ${Object.values(Behaviour)}`;
    Object.setPrototypeOf(this, BehaviourValueNotValidError.prototype);
  }
}
