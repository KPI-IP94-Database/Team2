'use strict';

const User = require('../src/js/Models/User');
const { hashPassword, validatePassword } = require('../src/js/security');


(async () => {
	let firstPassword;
  let user;
  let theSameUser;
  test('firstPassword true', async () => {
    firstPassword = await hashPassword('123456hello');
    expect(firstPassword).toBeTruthy();
  });


  test('is toEqual', async () => {
    user = new User({
      name: 'testUser',
      login: 'test@gmail.com',
      password: firstPassword,
    });
    await user.save();
    const users = await User.All();
    const {password} = users[0];
    const passwordEquals = await validatePassword('123456hello', password);
    expect(passwordEquals).toBeTruthy();
  });

  test('is the Same User', async () => {
    await new User({
    name: 'User',
    login: 'test@gmail.com',
    password: await hashPassword('hi345678'),
  }).save();

    theSameUser = await User.Find({ login: 'test@gmail.com' });

    expect(theSameUser.length).toEqual(1);
  });

  test('should be equal', async () => {
    const shouldBeEqual = await validatePassword(
      'hi345678',
      theSameUser[0].password
      );
    expect(shouldBeEqual).toBeTruthy();
  });

  test('the same user with the same name', async () => {
    await new User({
      name: 'UserName',
      login: 'testNotExist@gmail.com',
    }).save();
    const [theSameUserWithTheSameName] = await User.Find({
      login: 'test@gmail.com',
    });
    expect(theSameUserWithTheSameName.name).not.toEqual('UserName');
  });

  test('empty users', async () => {
    await User.Delete({ login: 'test@gmail.com' });
    const emptyUsers = await User.All();
    expect(emptyUsers.length).toEqual(0);
  });

})();

