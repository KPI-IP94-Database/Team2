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
    const [user] = await db.select('users', ['*'], { login: newUser.login });
    if (user) return this.Update(user);
    db.insert('users', newUser);
  };

  static Find = async login => await db.select('users', ['*'], { login });

  static All = async () => await db.select('users', ['*']);

  static Update = user => {
    db.update('users', user, { login: user.login });
  };

  static delete = () => db.delete('users', { login: this.login });
}

module.exports = User;
