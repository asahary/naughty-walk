export class MissingOwnerCreationPropertiesError extends Error {
  constructor() {
    super();
    this.name = 'MISSING_OWNER_CREATION_PROPERTIES';
    this.message = `Missing properties on owner creation`;
    Object.setPrototypeOf(this, MissingOwnerCreationPropertiesError.prototype);
  }
}
