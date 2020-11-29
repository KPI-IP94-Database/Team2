'use strict';

const db = require('../StoreDB.module');

class Rating {
  constructor(value, user_name, product_name) {
    this.value = value;
    this.user_name = user_name;
    this.product_name = product_name;
  }

  save = async () => {
    const newRating = {
      value: this.value,
      user_name: this.user_name,
      product_name: this.product_name,
    };
    db.insert('rating', newRating);
  };

  static Find = async conditions =>
    await db.select('rating', ['*'], conditions);

  static All = async () => await db.select('rating', ['*']);

  static Update = (rating, conditions) => {
    db.update('rating', rating, conditions);
  };

  static delete = conditions => db.delete('rating', conditions);
}

module.exports = Rating;
