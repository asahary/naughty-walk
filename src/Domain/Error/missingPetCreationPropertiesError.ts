export class MissingPetCreationPropertiesError extends Error {
  constructor() {
    super();
    this.name = 'MISSING_PET_CREATION_PROPERTIES';
    this.message = `Missing properties on pet creation`;
    Object.setPrototypeOf(this, MissingPetCreationPropertiesError.prototype);
  }
}
