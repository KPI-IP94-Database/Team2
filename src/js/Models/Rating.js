'use strict';

const db = require('../StoreDB.module');

class Rating {
  constructor(value, user_login, product_name) {
    this.value = value;
    this.user_login = user_login;
    this.product_name = product_name;
  }

  save = async () => {
    const newRating = {
      value: this.value,
      user_login: this.user_login,
      product_name: this.product_name,
    };
    await db.insert('rating', newRating);
  };

  static Find = conditions => db.select('rating', ['*'], conditions);

  static All = () => db.select('rating', ['*']);

  static Update = (rating, conditions) => {
    db.update('rating', rating, conditions);
  };

  static Delete = conditions => db.delete('rating', conditions);
}
module.exports = Rating;
