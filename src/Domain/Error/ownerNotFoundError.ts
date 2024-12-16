export class OwnerNotFoundError extends Error {
  constructor(public ownerId: string) {
    super();
    this.name = 'OWNER_NOT_FOUND_ERROR';
    this.message = `Owner not found for provided id ${ownerId}`;
    Object.setPrototypeOf(this, OwnerNotFoundError.prototype);
  }
}
