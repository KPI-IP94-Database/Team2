'use strict';

const Comment = require('../src/js/Models/Comment');
const Product = require('../src/js/Models/Product');
const User = require('../src/js/Models/User');
const { hashPassword, validatePassword } = require('../src/js/security');
const db = require('../src/js/StoreDB.module');
const assert = require('assert').strict;

module.exports = next => {
  console.log('Comment test started');
  (async () => {
    const password = await hashPassword('123456hello');
    const user = new User({
      name: 'testUser',
      login: 'test@gmail.com',
      password,
    });
    await user.save();
    const product = new Product({
      name: 'Shoes',
      description: 'First product',
      price: 15,
    });
    await product.save();
    const comment = new Comment({
      content: 'Beatiful a pair of shoes',
      user_login: 'test@gmail.com',
      product_name: 'Shoes',
    });
    await comment.save();
    const comments = await Comment.All();
    assert.ok(comments.length);
    await new Comment({
      id: comments[0].id,
      content: 'Not bad',
    }).save();
    const theSameComment = await Comment.Find({ user_login: 'test@gmail.com' });
    assert.ok(theSameComment.length);
    assert.equal(theSameComment[0].content, 'Not bad');
    const userForThisComment = await User.Find({
      login: theSameComment[0].user_login,
    });
    assert.equal(userForThisComment[0].comments[0].content, 'Not bad');
    const productForThisComment = await Product.All();
    assert.equal(productForThisComment[0].comments[0].content, 'Not bad');
    const shouldBeEqual = await validatePassword(
      '123456hello',
      userForThisComment[0].password
    );
    assert.ok(shouldBeEqual);
    await Comment.Delete({ user_login: 'test@gmail.com' });
    const emptyComments = await Comment.All();
    assert.equal(emptyComments.length, 0);
    await Product.Delete({ name: 'Shoes' });
    await User.Delete({ login: 'test@gmail.com' });
    console.log('Comment test finished');
    process.exit(0);
  })();
};
