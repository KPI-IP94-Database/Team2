'use strict';

const Rating = require('../src/js/Models/Rating');
const Product = require('../src/js/Models/Product');
const User = require('../src/js/Models/User');
const { hashPassword } = require('../src/js/security');
const db = require('../src/js/StoreDB.module');
const assert = require('assert').strict;

const TEST_TIMEOUT = 3000;

module.exports = next => {
  console.log('Rating test started');
  (async () => {
    const password = await hashPassword('123456hello');
    const user = new User('testUser', 'test@gmail.com', password);
    await user.save();
    const product = new Product('Shirt', 'First product', 15);
    await product.save();
    const rating = new Rating(8, 'test@gmail.com', 'Shirt');
    await rating.save();
    const ratings = await Rating.All();
    assert.ok(ratings.length);
    await Rating.Update(
      {
        value: 6,
      },
      { user_login: 'test@gmail.com' }
    );
    const theSameRating = await Rating.Find({ user_login: 'test@gmail.com' });
    assert.ok(theSameRating.length);
    assert.equal(theSameRating[0].value, 6);
    await Rating.Delete({ user_login: 'test@gmail.com' });
    const emptyRatings = await Rating.All();
    assert.equal(emptyRatings.length, 0);
    console.log('Rating test finished');
    process.exit(0);
  })();
};
