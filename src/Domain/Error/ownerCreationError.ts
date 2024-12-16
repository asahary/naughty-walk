export class OwnerCreationError extends Error {
  constructor(public message: string) {
    super();
    this.name = 'OWNER_CREATION_ERROR';
    this.message = message;
  }
}
