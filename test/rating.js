'use strict';

const Rating = require('../src/js/Models/Rating');
const Product = require('../src/js/Models/Product');
const User = require('../src/js/Models/User');
const { hashPassword, validatePassword } = require('../src/js/security');
const db = require('../src/js/StoreDB.module');
const assert = require('assert').strict;

module.exports = next => {
  console.log('Rating test started');
  (async () => {
    const password = await hashPassword('123456hello');
    const user = new User({
      name: 'testUser',
      login: 'test@gmail.com',
      password,
    });
    await user.save();
    const product = new Product({
      name: 'Shirt',
      description: 'First product',
      price: 15,
    });
    await product.save();
    const rating = new Rating({
      value: 8,
      user_login: 'test@gmail.com',
      product_name: 'Shirt',
    });
    await rating.save();
    const ratings = await Rating.All();
    assert.ok(ratings.length);
    await new Rating({
      id: ratings[0].id,
      value: 6,
    }).save();
    const theSameRating = await Rating.Find({ user_login: 'test@gmail.com' });
    assert.ok(theSameRating.length);
    assert.equal(theSameRating[0].value, 6);
    const userForThisRating = await User.Find({
      login: theSameRating[0].user_login,
    });
    assert.equal(userForThisRating[0].ratings[0].value, 6);
    const productForThisRating = await Product.Find({
      name: theSameRating[0].product_name
    });
    assert.equal(productForThisRating[0].ratings[0].value, 6);
    const shouldBeEqual = await validatePassword(
      '123456hello',
      userForThisRating[0].password
    );
    assert.ok(shouldBeEqual);
    await Rating.Delete({ user_login: 'test@gmail.com' });
    const emptyRatings = await Rating.All();
    assert.equal(emptyRatings.length, 0);
    await Product.Delete({ name: 'Shirt' });
    await User.Delete({ login: 'test@gmail.com' });
    console.log('Rating test finished');
    next();
  })();
};
