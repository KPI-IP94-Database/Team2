'use strict';

const db = require('../StoreDB.module');
const { getRatings, getComments } = require('../listener');

class Product {
  constructor({ name, description, price, ratings, comments }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.ratings = ratings;
    this.comments = comments;
  }

  static getInstance = async product => {
    const ratings = await getRatings({ product_name: product.name });
    const comments = await getComments({ product_name: product.name });
    return new Product({ ...product, ratings, comments });
  };

  save = async () => {
    const newProduct = {
      name: this.name,
      description: this.description,
      price: this.price,
    };
    const [product] = await db.select('product', ['*'], { name: this.name });
    if (product) {
      this.ratings = await getRatings({ product_name: product.name });
      this.comments = await getComments({ product_name: product.name });
      for (const value in newProduct) {
        if (!newProduct[value]) delete newProduct[value];
      }
      return db.update('product', newProduct, { name: this.name });
    }
    if (this.name && this.description && this.price)
      await db.insert('product', newProduct);
  };

  static Find = conditions =>
    new Promise((res, rej) => {
      db.select('product', ['*'], conditions).then(products => {
        if (products.length) {
          Promise.all(
            products.map(async product => await Product.getInstance(product))
          ).then((...productWithRat) => {
            res(...productWithRat);
          });
        } else {
          res([]);
        }
      });
    });

  static All = () =>
    new Promise((res, rej) => {
      db.select('product', ['*']).then(products => {
        if (products.length) {
          Promise.all(
            products.map(async product => await Product.getInstance(product))
          ).then((...productsWithRat) => {
            res(...productsWithRat);
          });
        } else {
          res([]);
        }
      });
    });

  static Delete = conditions => db.delete('product', conditions);
}

module.exports = Product;
