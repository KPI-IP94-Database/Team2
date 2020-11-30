'use strict';

const db = require('../StoreDB.module');

class Comment {
  constructor(content, user_login, product_name) {
    this.content = content;
    this.user_login = user_login;
    this.product_name = product_name;
  }

  save = async () => {
    const newComment = {
      content: this.content,
      user_login: this.user_login,
      product_name: this.product_name,
    };
    await db.insert('comment', newComment);
  };

  static Find = conditions => db.select('comment', ['*'], conditions);

  static All = () => db.select('comment', ['*']);

  static Update = (comment, conditions) => {
    db.update('comment', comment, conditions);
  };

  static Delete = conditions => db.delete('comment', conditions);
}
module.exports = Comment;
