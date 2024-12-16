export class DuplicatedOwnerEmailError extends Error {
  constructor() {
    super();
    this.name = 'DUPLICATED_OWNER_EMAIL';
    this.message = `Email is already used`;
    Object.setPrototypeOf(this, DuplicatedOwnerEmailError.prototype);
  }
}
