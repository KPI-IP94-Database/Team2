'use strict';

const db = require('../StoreDB.module');

class Rating {
  constructor({ value, user_login, product_name, id }) {
    this.value = value;
    this.user_login = user_login;
    this.product_name = product_name;
    this.id = id;
  }

  save = async () => {
    const newRating = {
      value: this.value,
      user_login: this.user_login,
      product_name: this.product_name,
    };
    if (this.id) {
      const [rating] = await db.select('rating', ['*'], { id: this.id });
      if (rating) {
        for (const value in newRating) {
          if (!newRating[value]) delete newRating[value];
        }
        return db.update('rating', newRating, { id: this.id });
      }
    }
    if (this.value && this.user_login && this.product_name) {
      return db.insert('rating', newRating);
    }
  };

  static Find = conditions =>
    new Promise(async (res, rej) => {
      db.select('rating', ['*'], conditions).then(ratings => {
        if (ratings.length) res(ratings.map(rating => new Rating(rating)));
        res([]);
      });
    });

  static All = () =>
    new Promise(async (res, rej) => {
      db.select('rating', ['*']).then(ratings => {
        if (ratings.length) res(ratings.map(rating => new Rating(rating)));
        res([]);
      });
    });

  static Delete = conditions => db.delete('rating', conditions);
}

module.exports = Rating;
