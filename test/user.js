'use strict';

const User = require('../src/js/Models/User');
const { hashPassword, validatePassword } = require('../src/js/security');
const assert = require('assert').strict;

module.exports = next => {
  console.log('User test started');
  (async () => {
    const firstPassword = await hashPassword('123456hello');
    const user = new User({
      name: 'testUser',
      login: 'test@gmail.com',
      password: firstPassword,
    });
    await user.save();
    const users = await User.All();
    const { password } = users[0];
    const passwordEquals = await validatePassword('123456hello', password);
    assert.ok(passwordEquals);
    await new User({
      name: 'User',
      login: 'test@gmail.com',
      password: await hashPassword('hi345678'),
    }).save();
    const theSameUser = await User.Find({ login: 'test@gmail.com' });
    assert.equal(theSameUser.length, 1);
    const shouldBeEqual = await validatePassword(
      'hi345678',
      theSameUser[0].password
    );
    assert.ok(shouldBeEqual);
    await new User({
      name: 'UserName',
      login: 'testNotExist@gmail.com',
    }).save();
    const [theSameUserWithTheSameName] = await User.Find({
      login: 'test@gmail.com',
    });
    assert.notEqual(theSameUserWithTheSameName.name, 'UserName');
    await User.Delete({ login: 'test@gmail.com' });
    const emptyUsers = await User.All();
    assert.equal(emptyUsers.length, 0);
    console.log('User test finished.');
    next();
  })();
};
