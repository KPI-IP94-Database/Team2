'use strict';

const Product = require('../src/js/Models/Product');
const { hashPassword } = require('../src/js/security');
const db = require('../src/js/StoreDB.module');
const assert = require('assert').strict;

module.exports = next => {
  console.log('Product test started');

  (async () => {
    const product = new Product('Shirt', 'First product', 15);
    product.save();
    const products = await Product.All();
    assert.ok(products.length);
    await Product.Update(
      {
        description: 'Update product',
        price: 18,
      },
      { name: 'Shirt' }
    );
    const theSameProduct = await Product.Find({ name: 'Shirt' });
    assert.ok(theSameProduct.length);
    assert.equal(theSameProduct[0].price, 18);
    await Product.Delete({ name: 'Shirt' });
    const emptyProducts = await Product.All();
    assert.equal(emptyProducts.length, 0);
    console.log('Product test finished');
    next();
  })();
};
