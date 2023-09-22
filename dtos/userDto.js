export default class UserDto {
  id;
  email;
  isActivated;
  isAdmin;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
    this.role = model.role;
  }
}
