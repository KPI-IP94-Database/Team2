'use strict';

const User = require('../src/js/Models/User');
const db = require('../src/js/StoreDB.module');
const { hashPassword, validatePassword } = require('../src/js/security');
const assert = require('assert').strict;

const TEST_TIMEOUT = 3000;

console.log('User test started');
setTimeout(async () => {
  console.log('User test finished');
  process.exit(0);
}, TEST_TIMEOUT);

(async () => {
  const firstPassword = await hashPassword('123456hello');
  const user = new User('testUser', 'test@gmail.com', firstPassword);
  await user.save();
  const users = await User.All();
  const { password } = users[0];
  const passwordEquals = await validatePassword('123456hello', password);
  assert.ok(passwordEquals);
  await User.Update({
    name: 'User',
    login: 'test@gmail.com',
    password: await hashPassword('hi345678'),
  });
  const theSameUser = await User.Find('test@gmail.com');
  assert.equal(theSameUser.length, 1);
  const shouldBeEqual = await validatePassword(
    'hi345678',
    theSameUser[0].password
  );
  assert.ok(shouldBeEqual);
  await User.Update({
    name: 'UserName',
    login: 'testNotExist@gmail.com',
  });
  const [theSameUserWithTheSameName] = await User.Find('test@gmail.com');
  assert.notEqual(theSameUserWithTheSameName.name, 'UserName');
  await User.Delete({ login: 'test@gmail.com' });
  const emptyUsers = await User.All();
  assert.equal(emptyUsers.length, 0);
})();
