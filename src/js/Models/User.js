'use strict';

const db = require('../StoreDB.module');

class User {
  constructor(name, login, password) {
    this.name = name;
    this.login = login;
    this.password = password;
  }

  save = async () => {
    const newUser = {
      name: this.name,
      login: this.login,
      password: this.password,
    };
    const [user] = await db.select('user', ['*'], { login: newUser.login });
    if (user) return User.Update(user);
    await db.insert('user', newUser);
  };

  static Find = async login => await db.select('user', ['*'], { login });

  static All = async () => await db.select('user', ['*']);

  static Update = user => {
    db.update('user', user, { login: user.login });
  };

  static Delete = conditions => db.delete('user', conditions);
}

module.exports = User;
