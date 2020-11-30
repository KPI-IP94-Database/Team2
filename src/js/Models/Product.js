'use strict';

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
    await db.insert('product', newProduct);
  };

  static Find = conditions => db.select('product', ['*'], conditions);

  static All = () => db.select('product', ['*']);

  static Update = (product, conditions) => {
    db.update('product', product, conditions);
  };

  static Delete = conditions => db.delete('product', conditions);
}

module.exports = Product;
