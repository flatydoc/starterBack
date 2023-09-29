export default class UserDto {
  id;
  email;
  name;
  isActivated;
  isAdmin;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.isAdmin = model.isAdmin;
  }
}
