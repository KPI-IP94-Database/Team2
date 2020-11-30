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
    const user = new User('testUser', 'test@gmail.com', password);
    await user.save();
    const product = new Product('Shoes', 'First product', 15);
    await product.save();
    const comment = new Comment(
      'Beatiful a pair of shoes',
      'test@gmail.com',
      'Shoes'
    );
    await comment.save();
    const comments = await Comment.All();
    assert.ok(comments.length);
    await Comment.Update(
      {
        content: 'Not bad',
      },
      { user_login: 'test@gmail.com' }
    );
    const theSameComment = await Comment.Find({ user_login: 'test@gmail.com' });
    assert.ok(theSameComment.length);
    assert.equal(theSameComment[0].content, 'Not bad');
    const userForThisComment = await User.Find(theSameComment[0].user_login);
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
