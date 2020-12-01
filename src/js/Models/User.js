'use strict';

const db = require('../StoreDB.module');
const { getRatings, getComments } = require('../listener');

class User {
  constructor({ name, login, password, ratings, comments }) {
    this.name = name;
    this.login = login;
    this.password = password;
    this.ratings = ratings || [];
    this.comments = comments || [];
  }

  static getInstance = async user => {
    const ratings = await getRatings({ user_login: user.login });
    const comments = await getComments({ user_login: user.login });
    return new User({ ...user, ratings, comments });
  };

  save = async () => {
    const newUser = {
      name: this.name,
      login: this.login,
      password: this.password,
    };
    const [user] = await db.select('user', ['*'], { login: newUser.login });
    if (user) {
      this.ratings = await getRatings({ user_login: user.login });
      this.comments = await getComments({ user_login: user.login });
      for (const value in newUser) {
        if (!newUser[value]) delete newUser[value];
      }
      return db.update('user', newUser, { login: user.login });
    }
    if (this.name && this.login && this.password)
      await db.insert('user', newUser);
  };

  static Find = async cond =>
    new Promise((res, rej) => {
      db.select('user', ['*'], cond).then(users => {
        if (users.length) {
          Promise.all(
            users.map(async user => await User.getInstance(user))
          ).then((...usersWithRat) => {
            res(...usersWithRat);
          });
        } else {
          res([]);
        }
      });
    });

  static All = async () =>
    new Promise((res, rej) => {
      db.select('user', ['*']).then(users => {
        if (users.length) {
          Promise.all(
            users.map(async user => await User.getInstance(user))
          ).then((...usersWithRat) => {
            res(...usersWithRat);
          });
        } else {
          res([]);
        }
      });
    });

  static Delete = conditions => db.delete('user', conditions);
}

module.exports = User;
