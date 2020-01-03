'use strict'

class UserController {

  static get inject() {
    return [
      'App/Services/UserService',
    ]
  }

  constructor(userService) {
    this.userService = userService;
  }

  async create({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await this.userService.create(data);

    return user;
  }
}

module.exports = UserController;
