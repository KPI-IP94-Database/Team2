'use strict';

module.exports = Product;


const db = require('../StoreDB.module');

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  save = async () => {
    const newProduct = {
      name: this.name,
      description: this.description,
      price: this.price,
    };
    db.insert('product', newProduct);
  };

  static Find = async conditions =>
    await db.select('product', ['*'], conditions);

  static All = async () => await db.select('product', ['*']);

  static Update = (product, conditions) => {
    db.update('product', product, conditions);
  };

  static delete = conditions => db.delete('product', conditions);
}

module.exports = Rating;
